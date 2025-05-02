import { ApiProperty } from '@nestjs/swagger';
import { Location } from '@prisma/client';

export class LocationDto implements Location {
  @ApiProperty()
  id: number;
  @ApiProperty()
  description: string;
}
