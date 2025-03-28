import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

import { BillingTypeDTO } from './entities/billing-type.entity';

@Injectable()
export class BillingTypeService {
  constructor(private prisma: PrismaService) {}

  async getBillingTypes(): Promise<BillingTypeDTO[]> {
    return this.prisma.billingType.findMany();
  }
}
