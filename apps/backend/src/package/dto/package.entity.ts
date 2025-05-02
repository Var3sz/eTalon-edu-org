import { ApiProperty } from '@nestjs/swagger';
import { Package } from '@prisma/client';
import { IsInt, IsString } from 'class-validator';

export class PackageDto implements Package {
  @ApiProperty()
  id: number;
  @ApiProperty()
  packageId: string;
  @ApiProperty()
  price: number;
}

export class CreatePackageDto {
  @ApiProperty()
  @IsString()
  packageId: string;

  @ApiProperty()
  @IsInt()
  price: number;
}
