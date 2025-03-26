import { IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class StudentEntity {
  @ApiProperty()
  @IsString()
  name: string;
}
