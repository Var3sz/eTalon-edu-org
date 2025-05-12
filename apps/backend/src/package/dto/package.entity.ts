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
