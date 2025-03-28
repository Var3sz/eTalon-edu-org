import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { BillingTypeService } from './billing-type.service';
import { BillingTypeDTO } from './entities/billing-type.entity';

@ApiTags('BillingTypes')
@Controller('billingType')
export class BillingTypeController {
  constructor(private billingTypeService: BillingTypeService) {}

  @Get('/GetBillingType')
  @ApiOperation({ summary: 'Get billing types' })
  @ApiResponse({ status: 200, description: 'List of billing types', type: [BillingTypeDTO] })
  async getAllBillingTypes(): Promise<BillingTypeDTO[]> {
    return this.billingTypeService.getBillingTypes();
  }
}
