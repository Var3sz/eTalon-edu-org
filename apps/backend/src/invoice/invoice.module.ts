import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SzamlazzHUService } from 'src/szamlazzhu/szamlazzhu.service';

import { InvoiceController } from './invoice.controller';
import { InvoiceService } from './invoice.service';

@Module({
  imports: [HttpModule],
  controllers: [InvoiceController],
  providers: [InvoiceService, SzamlazzHUService, JwtService],
})
export class InvoiceModule {}
