import { ApiProperty } from '@nestjs/swagger';
import { BillingAddressType } from '@prisma/client';

export class BillingAddressTypeDto implements BillingAddressType {
  @ApiProperty()
  id: number;
  @ApiProperty()
  description: string;
}
