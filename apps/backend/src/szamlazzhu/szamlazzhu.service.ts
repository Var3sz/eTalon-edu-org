import { Injectable } from '@nestjs/common';

import { Payment } from './entities/szamlazzhu.entity';
import xmlbuilder = require('xmlbuilder');
import FormData = require('form-data');
import { HttpService } from '@nestjs/axios';
import { PrismaService } from 'nestjs-prisma';
import { firstValueFrom } from 'rxjs';

import { buildCookieHeaderFromJ, extractJSessionId } from '../utils/utils';

type BuildArgs = {
  agentKey: string;
  invoiceNumber: string;
  issuerTaxNumber?: string;
  additiv?: boolean;
  payments: Payment[];
  userId?: number;
};

export type AgentResult =
  | {
      ok: true;
      status: number;
      headers: Record<string, any>;
      pdf: Buffer;
      invoiceNumber?: string | undefined;
    }
  | {
      ok: false;
      status: number;
      headers?: Record<string, any>;
      error?: string;
      errorCode?: number;
      bodySnippet?: string;
    };

@Injectable()
export class SzamlazzHUService {
  constructor(
    private readonly httpService: HttpService,
    private readonly prismaService: PrismaService
  ) {}

  // Befizetés rögzítése XML felépítése
  buildCreditXMLBuffer({ agentKey, invoiceNumber, issuerTaxNumber, additiv, payments }: BuildArgs): Buffer {
    const root = xmlbuilder
      .create('xmlszamlakifiz', { encoding: 'UTF-8' })
      .att('xmlns', 'http://www.szamlazz.hu/xmlszamlakifiz')
      .att('xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance')
      .att(
        'xsi:schemaLocation',
        'http://www.szamlazz.hu/xmlszamlakifiz https://www.szamlazz.hu/szamla/docs/xsds/agentkifiz/xmlszamlakifiz.xsd'
      );

    const beall = root.ele('beallitasok');
    beall.ele('szamlaagentkulcs', agentKey);
    beall.ele('szamlaszam', invoiceNumber);
    if (issuerTaxNumber) beall.ele('adoszam', issuerTaxNumber);
    beall.ele('additiv', additiv ? 'true' : 'false');

    for (const p of payments) {
      const k = root.ele('kifizetes');
      k.ele('datum', p.datum);
      k.ele('jogcim', p.jogcim);
      k.ele('osszeg', String(p.osszeg));
      if (p.leiras) k.ele('leiras', p.leiras);
    }

    const xml = root.end({ pretty: false });
    return Buffer.from(xml, 'utf-8');
  }

  async registerCreditEntry(args: BuildArgs) {
    const userId = args.userId ?? -1;

    const currentJ = await this.getJSessionId(userId);
    const cookieHeader = buildCookieHeaderFromJ(currentJ);

    const xmlBuf = this.buildCreditXMLBuffer(args);

    const form = new FormData();

    form.append('action-szamla_agent_kifiz', xmlBuf, {
      filename: 'kifizetes.xml',
      contentType: 'text/xml; charset=UTF-8',
    });

    const headers = { ...form.getHeaders(), ...(cookieHeader ? { Cookie: cookieHeader } : {}) };

    try {
      const resp = await firstValueFrom(
        this.httpService.post('https://www.szamlazz.hu/szamla/', form, {
          headers: headers,
          responseType: 'arraybuffer',
          validateStatus: () => true,
          maxBodyLength: Infinity,
          timeout: 20000,
        })
      );

      const setCookie = resp.headers?.['set-cookie'] as string[] | string | undefined;
      const newJ = extractJSessionId(setCookie);
      let jsessionUpdated = false;
      if (newJ && newJ !== currentJ) {
        await this.upsertJSessionId(userId, newJ);
        jsessionUpdated = true;
      }

      const h = resp.headers as Record<string, any>;
      const ct = String(h['content-type'] ?? '').toLowerCase();
      const looksPdf = ct.includes('application/pdf') || Buffer.isBuffer(resp.data);

      return {
        status: resp.status,
        headers: h,
        pdf: looksPdf ? Buffer.from(resp.data) : undefined,
        cookieSent: cookieHeader ?? null,
        jsessionReceived: newJ ?? null,
        jsessionUpdated,
      };
    } catch (e: any) {
      const msg =
        e?.code === 'ECONNABORTED'
          ? 'Időtúllépés a Számla Agent hívása közben.'
          : e?.code
            ? `Hálózati hiba: ${e.code}`
            : 'Ismeretlen hálózati hiba a Számla Agent hívása során.';

      return {
        ok: false,
        status: 599,
        error: msg,
        bodySnippet: e?.message,
      };
    }
  }

  async getJSessionId(billerId: number): Promise<string | null> {
    const row = await this.prismaService.user.findUnique({ where: { id: billerId } });
    return row.sessionCookie ?? null;
  }

  async upsertJSessionId(billerId: number, jsessionId: string): Promise<void> {
    await this.prismaService.user.update({
      where: { id: billerId },
      data: { sessionCookie: jsessionId },
    });
  }
}
