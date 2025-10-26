// src/szamlazz/szamlazz-hu.module.ts
import { Module } from '@nestjs/common';
import { SzamlazzHUService } from './szamlazzhu.service';
import { SzamlazzHUController } from './szamlazzhu.controller';
import { HttpModule, HttpService } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.register({
      timeout: 20000,
      maxRedirects: 0,
    }),
  ],
  controllers: [SzamlazzHUController],
  providers: [SzamlazzHUService],
  exports: [SzamlazzHUService],
})
export class SzamlazzHUModule {}
