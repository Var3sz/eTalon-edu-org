import { ApiProperty } from '@nestjs/swagger';
import { Location } from '@prisma/client';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class LocationDto implements Location {
  @ApiProperty()
  id: number;
  @ApiProperty()
  description: string;
  @ApiProperty()
  isDeleted: string;
}

export class UpdateLocationsInputDto {
  @ApiProperty({ nullable: true })
  @IsOptional()
  @IsInt()
  id: number | null;

  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  isDeleted: string;
}
