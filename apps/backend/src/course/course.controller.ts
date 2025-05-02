import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CourseService } from './course.service';
import {
  ActiveCourseDto,
  CourseDetailsDto,
  CourseDto,
  CreateCourseDateDto,
  UpdateCourseDto,
} from './entities/course.entity';
import { RawCourseDTO, UpsertCourseDTO } from './entities/create.course.entity';

@ApiTags('Courses')
@Controller('courses')
export class CourseController {
  constructor(private courseService: CourseService) {}

  /**
   * @returns Active courses
   */
  @Get('/GetActiveCourses')
  @ApiOkResponse({ type: ActiveCourseDto, isArray: true })
  async getActiveCourses(): Promise<ActiveCourseDto[]> {
    return await this.courseService.getActiveCourses();
  }

  /**
   *
   * @param id Id of the course
   * @returns Corresponding course
   */
  @Get('/GetCourseById/:id')
  @ApiOkResponse({ type: CourseDto })
  async getCourseById(@Param('id', ParseIntPipe) id: number) {
    return await this.courseService.getCourseById(id);
  }

  @Put('/UpdateCourse/:id')
  @ApiOkResponse({ type: CourseDto })
  async updateCourse(@Param('id', ParseIntPipe) id: number, @Body() updateBody: UpdateCourseDto) {
    return await this.courseService.updateCourse(updateBody, id);
  }

  @Post('/CreateCourses')
  @ApiOkResponse({ type: CourseDto, isArray: true })
  @ApiBody({ type: UpdateCourseDto, isArray: true })
  async createCourses(@Body() createBody: UpdateCourseDto[]) {
    return await this.courseService.createCourses(createBody);
  }

  /* 
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
  } */
}
