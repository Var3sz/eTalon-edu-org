import { IsDateString, IsNotEmpty, IsString, ValidateNested } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ActiveCoursesView, Course, LessonDates } from '@prisma/client';
import { Type } from 'class-transformer';
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

export class LessonDateDto implements LessonDates {
  id: number;
  description: string | null;
  date: Date;
}

/**
 * Dto for creating LessonDates
 */
export class LessonDateInfoDto {
  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @IsString()
  description: string | null;
}

export class CreateLessonDateDto {
  @IsNumber()
  courseId: number;

  @ValidateNested({ each: true })
  @Type(() => LessonDateInfoDto)
  dateInfo: LessonDateInfoDto[];
}

/**
 * Dto for updating a single LessonDate
 */
export class UpdateLessonDateDto {
  @IsNumber()
  id: number;

  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @IsString()
  description: string | null;
}
