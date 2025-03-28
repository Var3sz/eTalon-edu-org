import { ApiProperty } from '@nestjs/swagger';

export class BillingTypeDTO {
  @ApiProperty()
  id: number;
  @ApiProperty()
  description: string;
}
