import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

import { CourseService } from './course.service';
import {
  ActiveCourseDto,
  CourseDto,
  CreateInvoiceDateDto,
  CreateLessonDateDto,
  InvoiceDateDto,
  LessonDateDto,
  UpdateCourseDto,
  UpdateInvoiceDateDto,
  UpdateLessonDateDto,
} from './entities/course.entity';

@ApiTags('Courses')
@ApiBearerAuth()
@UseGuards(JwtGuard)
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

  @Get('/InvoiceDatesByCourseId/:id')
  @ApiOkResponse({ type: InvoiceDateDto, isArray: true })
  async getInvoiceDates(@Param('id', ParseIntPipe) id: number) {
    return await this.courseService.getCourseInvoiceDates(id);
  }

  @Post('/CreateLessonDates')
  @ApiOkResponse({ type: LessonDateDto, isArray: true })
  async createLessonDates(@Body() createBody: CreateLessonDateDto) {
    return await this.courseService.createLessonDates(createBody);
  }

  @Post('/CreateInvoiceDates')
  @ApiOkResponse({ type: InvoiceDateDto, isArray: true })
  async createInvoiceDates(@Body() createBody: CreateInvoiceDateDto) {
    return await this.courseService.createInvoiceDates(createBody);
  }

  @Put('/UpdateLessonDate')
  @ApiOkResponse({ type: LessonDateDto })
  async updateLessonDate(@Body() updateBody: UpdateLessonDateDto) {
    return await this.courseService.updateLessonDate(updateBody);
  }

  @Put('/UpdateInvoiceDate')
  @ApiOkResponse({ type: LessonDateDto })
  async updateInvoiceDate(@Body() updateBody: UpdateInvoiceDateDto) {
    return await this.courseService.updateInvoiceDate(updateBody);
  }

  @Delete('/InactivateCourse/:id')
  @ApiOkResponse()
  async inactivateCourseById(@Param('id', ParseIntPipe) id: number) {
    return await this.courseService.inactivateCourseById(id);
  }
}
