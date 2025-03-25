import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { CourseService } from './course.service';
import { CourseEntity } from './entities/course.entity';

@ApiTags('Courses')
@Controller('courses')
export class CourseController {
  constructor(private courseService: CourseService) {}

  @Get()
  @ApiOkResponse({ type: [CourseEntity] })
  async findAll(): Promise<CourseEntity[]> {
    return this.courseService.getAllCourses();
  }
}
