import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from '@nestjs/class-validator';

export class UpsertCourseDTO {
  id: number | null;
  courseId: string;
  description: string;
  price: number | null;
  active: boolean;
  endTime: string;
  groupId: number;
  headCount: number | null;
  locationId: number;
  maxHeadcount: number | null;
  @ApiProperty()
  @IsDateString()
  startDate: string;
  startTime: string;
  locked: boolean;
}

export class RawCourseDTO {
  id: number;
  courseId: string;
  description: string;
  price: number | null;
  active: boolean;
  endTime: string;
  groupId: number;
  headcount: number | null;
  locationId: number;
  maxHeadcount: number;
  startDate: Date;
  startTime: string;
  locked: boolean;
}
