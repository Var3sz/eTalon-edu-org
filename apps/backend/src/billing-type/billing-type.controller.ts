import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { BillingTypeService } from './billing-type.service';
import { BillingTypeDTO } from './entities/billing-type.entity';

@ApiTags('BillingTypes')
@Controller('billingType')
export class BillingTypeController {
  constructor(private billingTypeService: BillingTypeService) {}

  @Get('/GetBillingTypes')
  @ApiResponse({ status: 200, description: 'Success', type: [BillingTypeDTO] })
  async getBillingTypes(): Promise<BillingTypeDTO[]> {
    return this.billingTypeService.getBillingTypes();
  }
}
