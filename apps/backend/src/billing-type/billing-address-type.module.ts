import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { BillingAddressTypeController } from './billing-address-type.controller';
import { BillingAddressTypeService } from './billing-address-type.service';

@Module({
  controllers: [BillingAddressTypeController],
  providers: [BillingAddressTypeService, JwtService],
})
export class BillingAddressTypeModule {}
