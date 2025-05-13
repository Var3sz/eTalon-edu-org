import { ApiProperty } from '@nestjs/swagger';
import { Package } from '@prisma/client';
import { IsBoolean, IsInt, IsString } from 'class-validator';

export class PackageDto implements Package {
  @ApiProperty()
  type: string;
  @ApiProperty()
  id: number;
  @ApiProperty()
  packageId: string;
  @ApiProperty()
  price: number;
  @ApiProperty()
  locationId: number;
  @ApiProperty()
  locationDesc: string;
  @ApiProperty()
  active: boolean;
}

export class CreatePackageDto {
  @ApiProperty()
  @IsString()
  packageId: string;

  @ApiProperty()
  @IsInt()
  price: number;

  @ApiProperty()
  @IsString()
  type: string;

  @ApiProperty()
  @IsInt()
  locationId: number;

  @ApiProperty()
  @IsBoolean()
  active: boolean;
}

export class UpdatePackageDto {
  @ApiProperty()
  @IsString()
  packageId: string;

  @ApiProperty()
  @IsInt()
  price: number;

  @ApiProperty()
  @IsString()
  type: string;
}

class CourseAssignDto {
  id: number;
  courseId: string;
}

class PackageAssignDto {
  id: number;
  packageCode: string;
}

export class PackageCourseAssignDto {
  courses: CourseAssignDto[];
  packages: PackageAssignDto[];
}
