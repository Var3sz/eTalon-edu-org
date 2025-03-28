import { ApiProperty } from '@nestjs/swagger';

export class CourseDTO {}

export class CoursesDTO {
  @ApiProperty()
  id: number;
  @ApiProperty()
  courseId: string;
  @ApiProperty()
  occupancy: number;
  @ApiProperty()
  description: string;
  @ApiProperty()
  headcount: number;
  @ApiProperty()
  maxHeadcount: number;
  @ApiProperty()
  price: number;
  @ApiProperty()
  groupDescription: string;
  @ApiProperty()
  locked: boolean;
}
