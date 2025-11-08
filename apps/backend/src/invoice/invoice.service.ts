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

  async updatePaymentBulk(updates: UpdatePaymentsDto[]) {
    const results: BulkPaymentResult[] = [];

    // Egyedi diák-számlázási dátum párok
    const pairs = updates.map((u) => ({ studentId: u.studentId, invoiceDateId: u.invoiceDateId }));
    const currentRows = await this.prisma.payment.findMany({
      where: { OR: pairs },
      select: { studentId: true, invoiceDateId: true, amount: true },
    });

    const currentMap = new Map(currentRows.map((r) => [`${r.studentId}-${r.invoiceDateId}`, r.amount ?? 0]));

    for (let i = 0; i < updates.length; i++) {
      const u = updates[i];

      // 1/a) ZERO_AMOUNT skip
      if (u.payedAmount === 0) {
        results.push({
          index: i,
          input: u,
          ok: true,
          skipped: true,
          skipReason: 'ZERO_AMOUNT',
          message: 'Kihagyva: a befizetett összeg nulla forint.',
        });
        continue;
      }

      // 1/b) UNCHANGED_AMOUNT skip (összeg nem változott a DB-hez képest)
      const key = `${u.studentId}-${u.invoiceDateId}`;
      const prevAmount = currentMap.get(key) ?? 0;
      if (u.payedAmount === prevAmount) {
        results.push({
          index: i,
          input: u,
          ok: true,
          skipped: true,
          skipReason: 'UNCHANGED_AMOUNT',
          message: `Kihagyva: a befizetett összeg nem változott.`,
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
          leiras: `Student #${u.studentId} • ${u.invoiceNumber}`,
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
          (agentResp as any)?.error || (agentResp as any)?.bodySnippet || `Agent hívás sikertelen (HTTP ${status}).`;
        results.push({ index: i, input: u, ok: false, status, message: msg });
        break;
      }

      // 3) Saját DB frissítés per-tétel tranzakcióban
      const pdfBuf: Buffer | undefined = (agentResp as any).pdf;

      try {
        await this.prisma.$transaction(async (tx) => {
          // A kapcsoló sor FRISSÍTÉSE (nincs upsert/insert: a sor már létezik)
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
            },
          });
        });

        // update siker → frissítsük a currentMap-et, hogy a későbbi duplikátokat is helyesen ítéljük meg
        currentMap.set(key, u.payedAmount);

        results.push({
          index: i,
          input: u,
          ok: true,
          status,
          pdfSaved: Boolean(pdfBuf?.length),
          message: 'Számla Agent hívás és adatbázis frissítése sikeres!',
        });
      } catch (dbErr: any) {
        results.push({
          index: i,
          input: u,
          ok: false,
          message: `Adatbázis frissítés hiba: ${dbErr?.message ?? dbErr}`,
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
      stoppedAt: okCount === updates.length ? null : results.find((r) => !r.ok)?.index ?? 0,
      results,
    };
  }
}
