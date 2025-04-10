import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

import { JwtGuard } from '../auth/guards/jwt.guard';
import { SaveResultDto } from '../common/results.entity';
import { CourseService } from './course.service';
import { CourseDetailsDto, CoursesDTO, CreateCourseDateDto } from './entities/course.entity';
import { RawCourseDTO, UpsertCourseDTO } from './entities/create.course.entity';

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

  @Get('/GetCoursesForModification')
  @ApiResponse({ status: 200, description: 'Success', type: [RawCourseDTO] })
  @ApiResponse({ status: 500, description: 'Failure', type: [String] })
  async getCoursesForModification(): Promise<RawCourseDTO[]> {
    return this.courseService.getCoursesForModification();
  }

  @Get('/GetCourseDetailsById/:id')
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Failure', type: [CourseDetailsDto] })
  async getCourseDetailsById(@Param('id') id: number) {
    return this.courseService.getCourseDetailsById(Number(id));
  }

  @Post('/CreateOrUpdateCourses')
  @ApiCreatedResponse({ description: 'Courses upserted successfully.', type: SaveResultDto })
  @ApiBody({ type: [UpsertCourseDTO] })
  async upsertCourses(@Body() courses: UpsertCourseDTO[]): Promise<SaveResultDto> {
    if (!Array.isArray(courses) || courses.length === 0) {
      return {
        saved: false,
        title: 'Érvénytelen kérés!',
        description: 'Nincsen módosítandó kurzus',
      };
    }

    return this.courseService.upsertMultipleCourses(courses);
  }

  @Post('CreateCourseDatesForCourse/:id')
  @ApiResponse({ status: 201, description: 'Created' })
  @ApiBody({ type: [CreateCourseDateDto] })
  async addMultipleCourseDates(
    @Param('id', ParseIntPipe) courseId: number,
    @Body(new ValidationPipe({ whitelist: true, transform: true }))
    courseDates: CreateCourseDateDto[]
  ) {
    return this.courseService.addMultipleCourseDatesToCourse(courseId, courseDates);
  }
}
