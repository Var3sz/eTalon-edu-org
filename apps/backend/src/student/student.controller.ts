import { Body, Controller, Get, Param, ParseIntPipe, Put } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SAPIService } from 'src/SAPI/SAPI.service';

import {
  PaymentsDto,
  StudentAttendanceDto,
  StudentDetailsDTO,
  UpdateAttendanceDto,
  UpdateStudentDetailsDTO,
} from './entities/student.entity';
import { StudentService } from './student.service';

@ApiTags('Students')
@Controller('students')
export class StudentController {
  constructor(
    private studentService: StudentService,
    private sapiService: SAPIService
  ) {}

  @Get('students')
  async getAllStudents() {
    return await this.studentService.getAllStudents();
  }

  // This querys the SAPI database in every 15 minutes if the application is running
  @Cron('0 * * * * *')
  async insertStudentsFromSAPIDatabase() {
    const latestSubDate = await this.studentService.getLatestSubDate();
    const newStudents = await this.sapiService.fetchStudents(latestSubDate);
    if (newStudents.length > 0) {
      return await this.studentService.insertStudents(newStudents);
    }
    return newStudents;
  }

  @Get('GetStudentsByCourseWithAttendances/:id')
  @ApiOkResponse({ status: 200, type: StudentAttendanceDto })
  async getStudentsByCourseWithAttendances(@Param('id', ParseIntPipe) id: number): Promise<StudentAttendanceDto> {
    return await this.studentService.getStudentsByCourseWithAttendances(id);
  }

  @Get('GetStudentsByCourseWithPayments/:id')
  @ApiOkResponse({ status: 200, type: PaymentsDto })
  async getStudentsByCourseWithPayments(@Param('id', ParseIntPipe) id: number): Promise<PaymentsDto> {
    return await this.studentService.getStudentsByCourseWithPaymentData(id);
  }

  @Put('UpdateAttendances')
  async updateAttendance(@Body() dto: UpdateAttendanceDto[]) {
    return this.studentService.updateAttendanceBulk(dto);
  }

  @Put('/UpdateStudentDetails')
  @ApiOkResponse({ status: 200, type: StudentDetailsDTO })
  async updateStudentDetails(@Body() updateBody: UpdateStudentDetailsDTO): Promise<StudentDetailsDTO> {
    return this.studentService.updateStudentDetails(updateBody);
  }
}
