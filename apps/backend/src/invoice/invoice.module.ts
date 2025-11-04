import { Module } from '@nestjs/common';
import { InvoiceController } from './invoice.controller';
import { InvoiceService } from './invoice.service';
import { SzamlazzHUService } from 'src/szamlazzhu/szamlazzhu.service';
import { HttpModule } from '@nestjs/axios';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [HttpModule],
  controllers: [InvoiceController],
  providers: [InvoiceService, SzamlazzHUService, JwtService],
})
export class InvoiceModule {}
