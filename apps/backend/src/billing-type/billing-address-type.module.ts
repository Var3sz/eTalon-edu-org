import { Module } from '@nestjs/common';

import { BillingAddressTypeController } from './billing-address-type.controller';
import { BillingAddressTypeService } from './billing-address-type.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [BillingAddressTypeController],
  providers: [BillingAddressTypeService, JwtService],
})
export class BillingAddressTypeModule {}
