import { ApiProperty } from '@nestjs/swagger';
import { Group } from '@prisma/client';

export class GroupDto implements Group {
  @ApiProperty()
  id: number;
  @ApiProperty()
  description: string;
}
