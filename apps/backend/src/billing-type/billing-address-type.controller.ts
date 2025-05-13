import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { BillingAddressTypeService } from './billing-address-type.service';
import { BillingAddressTypeDto } from './entities/billing-address-type.entity';

@ApiTags('BillingAddressTypes')
@Controller('billingAddressType')
export class BillingAddressTypeController {
  constructor(private billingAddressTypeService: BillingAddressTypeService) {}

  @Get('/GetBillingAddressTypes')
  @ApiOkResponse({ type: BillingAddressTypeDto, isArray: true })
  async getBillingAddressTypes(): Promise<BillingAddressTypeDto[]> {
    return this.billingAddressTypeService.getBillingAddressTypes();
  }
}
