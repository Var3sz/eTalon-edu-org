import { ApiProperty } from '@nestjs/swagger';
import { Package } from '@prisma/client';
import { IsBoolean, IsIn, IsInt, IsString } from 'class-validator';

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
  @ApiProperty()
  groupId: number;
  @ApiProperty()
  groupDesc: string;
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

  @ApiProperty()
  @IsInt()
  groupId: number;
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
  packageId: string;
}

class AssingDto {
  courseId: number;
  packageId: string;
}

export class PackageCourseAssignDto {
  courses: CourseAssignDto[];
  packages: PackageAssignDto[];
  assignments: AssingDto[];
}

export class AssignPackageToCourseDto {
  courseId: number;
  packageId: string;
  assign: boolean;
}
