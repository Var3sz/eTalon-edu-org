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

    if (r.pdf) {
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'inline; filename="szamlazz-kifizetes.pdf"');
      // opcionális diagnosztika:
      if (r.jsessionReceived) res.setHeader('X-JSESSIONID', r.jsessionReceived);
      if (r.jsessionUpdated) res.setHeader('X-JSESSION-Updated', 'true');
      return res.status(r.status).send(r.pdf);
    }

    const status = r.status >= 400 ? r.status : 422;
    return res.status(status).json({
      ok: false,
      status: r.status,
      agentHeaders: {
        szlahu_error: r.headers?.['szlahu_error'],
        szlahu_error_code: r.headers?.['szlahu_error_code'],
        szlahu_szamlaszam: r.headers?.['szlahu_szamlaszam'],
        'content-type': r.headers?.['content-type'],
      },
      cookieSent: r.cookieSent,
      jsessionReceived: r.jsessionReceived,
      jsessionUpdated: r.jsessionUpdated,
      note: 'PDF nem érkezett vagy hiba történt.',
    });
  }
}
