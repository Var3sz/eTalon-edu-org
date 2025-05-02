import { IsInt, IsNotEmpty, IsOptional, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Student } from '@prisma/client';

export class StudentDto implements Student {
  id: number;
  sapId: number;
  subdate: Date;
  email: string;
  firstname: string;
  lastname: string;
  billCompany: string;
  city: string;
  zip: number;
  address: string;
  coupon: string;
  vatNum: string;
  billingAddressTypeId: number;
  childName: string;
  childMail: string;
  childGrade: number;
  childTAJ: string;
  specialDiet: boolean;
  specialDietDesc: string;
  mobile: string;
  packageType: string;
  packageCode: string;
  disease: boolean;
  diseaseDesc: string;
  discount: string;
  discount2: string;
}

export class CreateStudentDto {
  sapId: number;
  subdate: Date;
  email: string;
  firstname: string;
  lastname: string;
  billCompany: string;
  city: string;
  zip: number | null;
  address: string;
  coupon: string;
  vatNum: string;
  billingAddressTypeId: number;
  childName: string;
  childMail: string;
  childGrade: number;
  childTAJ: string;
  specialDiet: boolean;
  specialDietDesc: string;
  mobile: string;
  packageType: string;
  packageCode: string;
  disease: boolean;
  diseaseDesc: string;
}

export class CourseStudentsDTO {
  id: number;
  email: string;
  lastname: string;
  firstname: string;
  billCompany: string;
  city: string;
  zip: number;
  address: string;
  vatNumber: string;
  children: string;
  childrenMail: string;
  mobile: string;
  billingTypeId: number;
  courseId: number;
  courseCode: string;
}

export class StudentDetailsDTO {
  id: number;
  email: string;
  lastname: string;
  firstname: string;
  billCompany: string;
  city: string;
  zip: number;
  address: string;
  vatNumber: string;
  children: string;
  childrenMail: string;
  mobile: string;
  billingTypeId: number;
}

export class UpdateStudentDetailsDTO {
  @ApiProperty({ required: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ required: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  lastname: string;

  @ApiProperty({ required: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  billCompany?: string;

  @ApiProperty({ required: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ required: true })
  @IsOptional()
  @IsInt()
  zip: number;

  @ApiProperty({ required: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  vatNumber?: string;

  @ApiProperty({ required: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  children: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  childrenMail?: string;

  @ApiProperty({ required: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  mobile: string;

  @ApiProperty({ required: true })
  @IsOptional()
  @IsInt()
  billingTypeId: number;
}
