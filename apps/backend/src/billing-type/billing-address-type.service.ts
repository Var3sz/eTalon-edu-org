import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

import { BillingAddressTypeDto } from './entities/billing-address-type.entity';

@Injectable()
export class BillingAddressTypeService {
  constructor(private prisma: PrismaService) {}

  /**
   * Gives back all of the BillingAddressTypes
   * @returns {BillingAddressTypeDto[]} BillingAddressTypes
   */
  async getBillingAddressTypes(): Promise<BillingAddressTypeDto[]> {
    return this.prisma.billingAddressType.findMany();
  }
}
