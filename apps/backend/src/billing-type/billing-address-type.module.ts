import { Module } from '@nestjs/common';

import { BillingAddressTypeController } from './billing-address-type.controller';
import { BillingAddressTypeService } from './billing-address-type.service';

@Module({
  controllers: [BillingAddressTypeController],
  providers: [BillingAddressTypeService],
})
export class BillingAddressTypeModule {}
