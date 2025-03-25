import { IsBoolean, IsDecimal, IsInt, IsString } from '@nestjs/class-validator';

export class CourseEntity {
  @IsInt()
  id: number;
  @IsString()
  courseId: string;
  @IsInt()
  occupancy: number;
  @IsString()
  description: string;
  @IsInt()
  headcount: number;
  @IsInt()
  maxHeadcount: number;
  @IsDecimal()
  price: number;
  @IsString()
  groupDescription: string;
  @IsBoolean()
  locked: boolean;
}
