import { IsDateString, IsNotEmpty, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CoursesDTO {
  id: number;
  courseId: string;
  groupDescription: string;
  occupancy: number;
  description: string;
  headcount: number;
  maxHeadcount: number;
  price: number;
  startDate: Date;
  startTime: string;
  endTime: string;
  active: boolean;
  locked: boolean;
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
