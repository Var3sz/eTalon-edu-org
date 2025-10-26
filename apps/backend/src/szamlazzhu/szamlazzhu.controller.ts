import { Body, Controller, Post, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { Response } from 'express';
import { SzamlazzHUService } from './szamlazzhu.service';
import { RegisterCreditEntryDto } from './entities/szamlazzhu.entity';

@Controller('szamlazz')
export class SzamlazzHUController {
  constructor(private readonly szamlaService: SzamlazzHUService) {}

  // POST /szamlazz/kifizetes → siker: PDF; hiba: JSON
  @Post('kifizetes')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async generateAndSend(@Body() dto: RegisterCreditEntryDto, @Res() res: Response) {
    const r = await this.szamlaService.registerCreditEntry(dto);

    if (r.ok) {
      // Ha az Agent adott saját fájlnevet a content-disposition-ben, használhatod azt
      const filename = 'szamlazz-kifizetes.pdf';
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `inline; filename="${filename}"`);
      // opcionális: üzleti meta a response headerek alapján
      if (r.invoiceNumber) res.setHeader('X-Invoice-Number', String(r.invoiceNumber));
      return res.status(r.status).send(r.pdf);
    }

    // Hibaválasz – az upstream kódját visszaadhatjuk,
    // de ha 2xx volt, mégis hiba header, adjunk 422-t.
    const status = r.status >= 400 ? r.status : 422;

    return res.status(status).json({
      ok: false,
      status: r.status,
      error: r.error,
      errorCode: r.errorCode,
      // hasznos meta: mutasd meg, ha az Agent adott invoice számot/egyebet
      agentHeaders: {
        szlahu_error: r.headers?.['szlahu_error'],
        szlahu_error_code: r.headers?.['szlahu_error_code'],
        szlahu_szamlaszam: r.headers?.['szlahu_szamlaszam'],
        'content-type': r.headers?.['content-type'],
      },
      bodySnippet: r.bodySnippet,
    });
  }
}
