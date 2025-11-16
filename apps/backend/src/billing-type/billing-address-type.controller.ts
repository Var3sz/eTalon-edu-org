import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

import { BillingAddressTypeService } from './billing-address-type.service';
import { BillingAddressTypeDto } from './entities/billing-address-type.entity';

@ApiTags('BillingAddressTypes')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('billingAddressType')
export class BillingAddressTypeController {
  constructor(private billingAddressTypeService: BillingAddressTypeService) {}

  @Get('/GetBillingAddressTypes')
  @ApiOkResponse({ type: BillingAddressTypeDto, isArray: true })
  async getBillingAddressTypes(): Promise<BillingAddressTypeDto[]> {
    return this.billingAddressTypeService.getBillingAddressTypes();
  }
}
