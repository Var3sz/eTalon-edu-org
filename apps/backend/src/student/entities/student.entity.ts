import { IsBoolean, IsEmail, IsInt, IsOptional, IsString } from '@nestjs/class-validator';
import { Student } from '@prisma/client';
import { IsNumber } from 'class-validator';

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
  attendance: AttendanceDto[];
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

export class StudentDetailsDTO implements Student {
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

export class AttendanceDto {
  lessonDateId: number;
  date: Date;
  description?: string;
  attended: boolean;
}

export class StudentAttendanceDto {
  courseId: string;
  students: StudentDto[];
}

export class UpdateAttendanceDto {
  @IsInt()
  studentId: number;

  @IsInt()
  lessondateId: number;

  @IsBoolean()
  attended: boolean;
}

export class UpdateStudentDetailsDTO {
  @IsNumber()
  id: number;

  @IsNumber()
  sapId: number;

  @IsEmail()
  email: string;

  @IsString()
  firstname: string;

  @IsString()
  lastname: string;

  @IsString()
  @IsOptional()
  billCompany?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsNumber()
  @IsOptional()
  zip?: number;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  coupon?: string;

  @IsString()
  @IsOptional()
  vatNum?: string;

  @IsNumber()
  billingAddressTypeId: number;

  @IsString()
  childName: string;

  @IsEmail()
  @IsOptional()
  childMail?: string;

  @IsNumber()
  @IsOptional()
  childGrade?: number;

  @IsString()
  @IsOptional()
  childTAJ?: string;

  @IsBoolean()
  specialDiet: boolean;

  @IsString()
  @IsOptional()
  specialDietDesc?: string;

  @IsString()
  @IsOptional()
  mobile?: string;

  @IsString()
  @IsOptional()
  packageType?: string;

  @IsString()
  @IsOptional()
  packageCode?: string;

  @IsBoolean()
  disease: boolean;

  @IsString()
  @IsOptional()
  diseaseDesc?: string;

  @IsString()
  @IsOptional()
  discount?: string;

  @IsString()
  @IsOptional()
  discount2?: string;
}

export class PaymentDto {
  invoiceDateId: number;
  date: Date;
  description?: string;
  billerId: number;
  payed: boolean;
  amount: number;
  invoiceNumber: string;
}

export class StudentPaymentDto {
  studentName: string;
  studentId: number;
  Payments: PaymentDto[];
}

export class PaymentsDto {
  courseId: string;
  payments: StudentPaymentDto[];
}
