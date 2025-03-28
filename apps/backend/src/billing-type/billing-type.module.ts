import { Module } from '@nestjs/common';

import { BillingTypeController } from './billing-type.controller';
import { BillingTypeService } from './billing-type.service';

@Module({
  controllers: [BillingTypeController],
  providers: [BillingTypeService],
})
export class BillingTypeModule {}
