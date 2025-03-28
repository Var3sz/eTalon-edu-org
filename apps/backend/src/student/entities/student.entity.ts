import { IsInt, IsOptional, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
  @ApiProperty()
  id: number;
  @ApiProperty()
  email: string;
  @ApiProperty()
  lastname: string;
  @ApiProperty()
  firstname: string;
  @ApiProperty()
  billCompany: string;
  @ApiProperty()
  city: string;
  @ApiProperty()
  zip: number;
  @ApiProperty()
  address: string;
  @ApiProperty()
  vatNumber: string;
  @ApiProperty()
  children: string;
  @ApiProperty()
  childrenMail: string;
  @ApiProperty()
  mobile: string;
  @ApiProperty()
  billingTypeId: number;
  @ApiProperty()
  courseId: number;
}

export class UpdateStudentDetailsDTO {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  lastname?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  firstname?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  billCompany?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  zip?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  vatNumber?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  children?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  childrenMail?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  mobile?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  billingTypeId?: number;
}
