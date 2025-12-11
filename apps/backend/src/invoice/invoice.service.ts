import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { DatePatterns } from 'src/api/consts/date-patterns';
import { SzamlazzHUService } from 'src/szamlazzhu/szamlazzhu.service';
import { formatDateCustom } from 'src/utils/utils';

import { BulkPaymentResult, UpdatePaymentsDto } from './entities/invoice.entity';

@Injectable()
export class InvoiceService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly szamlaService: SzamlazzHUService
  ) {}

  async updatePayment(updates: UpdatePaymentsDto[]) {
    const results: BulkPaymentResult[] = [];

    const pairs = updates.map((u) => ({ studentId: u.studentId, invoiceDateId: u.invoiceDateId }));
    const currentRows = await this.prisma.payment.findMany({
      where: { OR: pairs },
      select: { studentId: true, invoiceDateId: true, amount: true },
    });

    const currentMap = new Map(currentRows.map((r) => [`${r.studentId}-${r.invoiceDateId}`, r.amount ?? 0]));

    for (let i = 0; i < updates.length; i++) {
      const u = updates[i];

      if (u.payedAmount === 0) {
        results.push({
          index: i,
          input: u,
          ok: true,
          skipped: true,
          skipReason: 'ZERO_AMOUNT',
          message: 'A befizetett összeg nulla forint',
        });
        continue;
      }

      const key = `${u.studentId}-${u.invoiceDateId}`;
      const prevAmount = currentMap.get(key) ?? 0;
      if (u.payedAmount === prevAmount) {
        results.push({
          index: i,
          input: u,
          ok: true,
          skipped: true,
          skipReason: 'UNCHANGED_AMOUNT',
          message: `A befizetett összeg nem változott.`,
        });
        continue;
      }

      // metadatok lekérdezése a Számla Agent-el való kommunikációhoz
      const [biller, invDate] = await Promise.all([
        this.prisma.user.findUnique({
          where: { id: u.billerId },
          select: { agentKey: true, sessionCookie: true },
        }),
        this.prisma.invoiceDates.findUnique({
          where: { id: u.invoiceDateId },
          select: { date: true },
        }),
      ]);

      if (!biller.agentKey) {
        results.push({
          index: i,
          input: u,
          ok: false,
          message: 'A számlázónak nincsen API kulcsa a Számla Agenthez.',
        });
        break;
      }

      const datum = formatDateCustom(invDate.date, DatePatterns.DATEURI);

      const payments = [
        {
          datum,
          jogcim: 'Befizetés',
          osszeg: u.payedAmount,
          leiras: `Gyerek azonosítója: ${u.studentId}, számlaszám: ${u.invoiceNumber}`,
        },
      ];

      const agentResp = await this.szamlaService.registerCreditEntry({
        agentKey: biller.agentKey,
        issuerTaxNumber: undefined,
        invoiceNumber: u.invoiceNumber,
        additiv: false,
        payments,
        userId: u.billerId,
      });

      const status = (agentResp as any)?.status ?? 500;
      const isOk = status >= 200 && status < 300;

      if (!isOk) {
        const msg =
          (agentResp as any)?.error || (agentResp as any)?.bodySnippet || `Sikertelen rögzítés - HTTP ${status}`;
        results.push({ index: i, input: u, ok: false, status, message: msg });
        break;
      }

      const pdfBuf: Buffer | undefined = (agentResp as any).pdf;

      try {
        await this.prisma.$transaction(async (tx) => {
          await tx.payment.update({
            where: {
              studentId_invoiceDateId: {
                studentId: u.studentId,
                invoiceDateId: u.invoiceDateId,
              },
            },
            data: {
              payed: u.payed,
              amount: u.payedAmount,
              invoiceNumber: u.invoiceNumber,
              billerId: u.billerId,
              amountToBePayed: u.amountToBePayed,
            },
          });
        });

        currentMap.set(key, u.payedAmount);

        results.push({
          index: i,
          input: u,
          ok: true,
          status,
          pdfSaved: Boolean(pdfBuf?.length),
          message: 'A Számla Agent hívása és az adatbázis frissítése sikeres volt!',
        });
      } catch (dbErr: any) {
        results.push({
          index: i,
          input: u,
          ok: false,
          message: `Adatbázis frissítésé sikertelen: ${dbErr?.message ?? dbErr}`,
        });
        break;
      }
    }

    const okCount = results.filter((r) => r.ok).length;
    const skippedCount = results.filter((r) => r.skipped).length;

    return {
      okCount,
      skippedCount,
      total: updates.length,
      stoppedAt: okCount === updates.length ? null : (results.find((r) => !r.ok)?.index ?? 0),
      results,
    };
  }
}
