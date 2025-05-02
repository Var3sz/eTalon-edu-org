import { IsDateString, IsNotEmpty, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ActiveCoursesView, Course } from '@prisma/client';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

/**
 * Dto for the active courses
 */
export class ActiveCourseDto implements ActiveCoursesView {
  @ApiProperty()
  description: string;
  @ApiProperty()
  id: number;
  @ApiProperty()
  courseId: string;
  @ApiProperty()
  groupDescription: string;
  @ApiProperty()
  occupancy: number;
  @ApiProperty({ required: false, nullable: true })
  headcount: number | null;
  @ApiProperty()
  maxHeadCount: number;
  @ApiProperty()
  price: number;
  @ApiProperty()
  startDate: Date;
  @ApiProperty()
  startTime: string;
  @ApiProperty()
  endTime: string;
  @ApiProperty()
  active: boolean;
  @ApiProperty()
  locked: boolean;
}

/**
 * Dto for a course
 */
export class CourseDto implements Course {
  @ApiProperty()
  description: string;
  @ApiProperty()
  id: number;
  @ApiProperty()
  courseId: string;
  @ApiProperty({ required: false, nullable: true })
  headcount: number | null;
  @ApiProperty()
  maxHeadCount: number;
  @ApiProperty()
  startDate: Date;
  @ApiProperty()
  startTime: string;
  @ApiProperty()
  endTime: string;
  @ApiProperty()
  active: boolean;
  @ApiProperty()
  locked: boolean;
  @ApiProperty()
  groupId: number;
  @ApiProperty()
  locationId: number;
}

/**
 * Dto for updating a course
 */

export class UpdateCourseDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  courseId: string;
  @IsNumber()
  @ApiProperty({ required: false, nullable: true })
  headcount: number | null;
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  maxHeadCount: number;
  @IsDateString()
  @IsNotEmpty()
  @ApiProperty()
  startDate: Date;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  startTime: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  endTime: string;
  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  active: boolean;
  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  locked: boolean;
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  groupId: number;
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  locationId: number;
}

export class AttendanceRecordDto {
  @ApiProperty({ required: false })
  studentId?: number;

  @ApiProperty({ required: false })
  courseDateId?: number;

  @ApiProperty()
  attended: boolean;
}

export class CourseDateDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  description: string;

  @ApiProperty({ type: [AttendanceRecordDto] })
  attendance: AttendanceRecordDto[];
}

export class StudentDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  children: string;
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
  childrenMail: string;
  @ApiProperty()
  mobile: string;
  @ApiProperty()
  billingTypeId: number;

  @ApiProperty({ type: [AttendanceRecordDto] })
  attendance: AttendanceRecordDto[];
}

export class CourseCourseDateDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  courseId: number;

  @ApiProperty()
  courseDateId: number;

  @ApiProperty({ type: CourseDateDto })
  courseDate: CourseDateDto;
}

export class CourseStudentDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  courseId: number;

  @ApiProperty()
  studentId: number;

  @ApiProperty({ type: StudentDto })
  student: StudentDto;
}

export class CourseDetailsDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  courseId: string;

  @ApiProperty({ type: [CourseStudentDto] })
  students: CourseStudentDto[];

  @ApiProperty({ type: [CourseCourseDateDto] })
  courseDates: CourseCourseDateDto[];
}

export class CreateCourseDateDto {
  @ApiProperty()
  @IsDateString()
  date: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;
}
