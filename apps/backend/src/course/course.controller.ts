import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CourseService } from './course.service';
import { CoursesDTO } from './entities/course.entity';

@ApiTags('Courses')
@Controller('courses')
export class CourseController {
  constructor(private courseService: CourseService) {}

  @Get('/GetCourses')
  @ApiOperation({ summary: 'Get active courses' })
  @ApiResponse({ status: 200, description: 'List of active courses', type: [CoursesDTO] })
  async findAll(): Promise<CoursesDTO[]> {
    return this.courseService.getAllCourses();
  }
}
