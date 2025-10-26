import { Injectable } from '@nestjs/common';
import { Payment } from './entities/szamlazzhu.entity';
import xmlbuilder = require('xmlbuilder');
import FormData = require('form-data');
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';

type BuildArgs = {
  agentKey: string;
  invoiceNumber: string;
  issuerTaxNumber?: string;
  additiv?: boolean;
  payments: Payment[];
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
  constructor(private readonly httpService: HttpService) {}

  // Befizetés rögzítése XML minta felépítése
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

  async registerCreditEntry(args: {
    agentKey: string;
    invoiceNumber: string;
    issuerTaxNumber?: string;
    additiv?: boolean;
    payments: Payment[];
  }) {
    const xmlBuf = this.buildCreditXMLBuffer(args);

    const form = new FormData();

    form.append('action-szamla_agent_kifiz', xmlBuf, {
      filename: 'kifizetes.xml',
      contentType: 'text/xml; charset=UTF-8',
    });

    try {
      const resp = await firstValueFrom(
        this.httpService.post('https://www.szamlazz.hu/szamla/', form, {
          headers: form.getHeaders(),
          responseType: 'arraybuffer',
          validateStatus: () => true,
          maxBodyLength: Infinity,
          timeout: 20000,
        })
      );

      const h = resp.headers as Record<string, any>;
      const ct = String(h['content-type'] ?? '').toLowerCase();
      const asText = () => Buffer.from(resp.data ?? '').toString('utf8');

      const szlaError = h['szlahu_error'];
      const szlaErrCode = h['szlahu_error_code'] != null ? Number(h['szlahu_error_code']) : undefined;
      const invoiceNumber = h['szlahu_szamlaszam'];

      const looksPdf = ct.includes('application/pdf') || (resp.data && Buffer.isBuffer(resp.data));
      const headerOk = !szlaError && (szlaErrCode == null || szlaErrCode === 0);
      const httpOk = resp.status >= 200 && resp.status < 300;

      if (headerOk && looksPdf && httpOk) {
        return {
          ok: true,
          status: resp.status,
          headers: h,
          pdf: Buffer.from(resp.data),
          invoiceNumber,
        };
      }

      const bodySnippet = looksPdf ? undefined : asText().slice(0, 4096);

      return {
        ok: false,
        status: resp.status,
        headers: h,
        error: szlaError ?? (httpOk ? 'Ismeretlen hiba (nem PDF válasz).' : 'HTTP hiba az Agent-től.'),
        errorCode: szlaErrCode,
        bodySnippet,
      };
    } catch (e: any) {
      const msg =
        e?.code === 'ECONNABORTED'
          ? 'Időtúllépés az Agent hívás közben.'
          : e?.code
            ? `Hálózati hiba: ${e.code}`
            : 'Ismeretlen hálózati hiba az Agent hívásnál.';

      return {
        ok: false,
        status: 599,
        error: msg,
        bodySnippet: e?.message,
      };
    }
  }
}
