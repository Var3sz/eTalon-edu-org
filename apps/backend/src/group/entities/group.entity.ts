import { ApiProperty } from '@nestjs/swagger';
import { Group } from '@prisma/client';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GroupDto implements Group {
  @ApiProperty()
  id: number;
  @ApiProperty()
  description: string;
  @ApiProperty()
  isDeleted: string;
}

export class UpdateGroupsInputDto {
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
