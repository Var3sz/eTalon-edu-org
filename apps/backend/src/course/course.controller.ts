import { Controller, Get, Param } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { CourseService } from './course.service';
import { CourseDetailsDto, CoursesDTO } from './entities/course.entity';

@ApiTags('Courses')
@Controller('courses')
export class CourseController {
  constructor(private courseService: CourseService) {}

  @Get('/GetActiveCourses')
  @ApiResponse({ status: 200, description: 'Success', type: [CoursesDTO] })
  @ApiResponse({ status: 500, description: 'Failure', type: [String] })
  async getActiveCourses(): Promise<CoursesDTO[]> {
    return this.courseService.getActiveCourses();
  }

  @Get('/GetCourseDetailsById/:id')
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Failure', type: [CourseDetailsDto] })
  async getCourseDetailsById(@Param('id') id: number) {
    return this.courseService.getCourseDetailsById(Number(id));
  }
}
