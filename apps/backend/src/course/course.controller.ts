import { Body, Controller, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { CourseService } from './course.service';
import {
  ActiveCourseDto,
  CourseDto,
  CreateLessonDateDto,
  LessonDateDto,
  UpdateCourseDto,
  UpdateLessonDateDto,
} from './entities/course.entity';

@ApiTags('Courses')
@Controller('courses')
export class CourseController {
  constructor(private courseService: CourseService) {}

  /**
   * @returns Active courses in raw form
   */
  @Get('/GetCourses')
  @ApiOkResponse({ type: CourseDto, isArray: true })
  async getCourses(): Promise<CourseDto[]> {
    return await this.courseService.getAllActiveCourse();
  }

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

  @Get('/CourseDatesByCourseId/:id')
  @ApiOkResponse({ type: LessonDateDto, isArray: true })
  async getCourseDates(@Param('id', ParseIntPipe) id: number) {
    return await this.courseService.getCourseLessonDates(id);
  }

  @Post('/CreateLessonDates')
  @ApiOkResponse({ type: LessonDateDto, isArray: true })
  async createLessonDates(@Body() createBody: CreateLessonDateDto) {
    return await this.courseService.createLessonDates(createBody);
  }

  @Put('/UpdateLessonDate')
  @ApiOkResponse({ type: LessonDateDto })
  async updateLessonDate(@Body() updateBody: UpdateLessonDateDto) {
    return await this.courseService.updateLessonDate(updateBody);
  }
}
