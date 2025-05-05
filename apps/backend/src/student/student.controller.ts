import { Get, Controller, Param, ParseIntPipe, Put } from '@nestjs/common';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

import { StudentAttendanceDto, StudentDetailsDTO, UpdateStudentDetailsDTO } from './entities/student.entity';
import { StudentService } from './student.service';
import { SAPIService } from 'src/SAPI/SAPI.service';
import { Cron } from '@nestjs/schedule';

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

  // This querys the SAPI database in every 15 minutes if the application is runnin
  @Cron('0 */15 * * * *')
  async insertStudentsFromSAPIDatabase() {
    const latestSubDate = await this.studentService.getLatestSubDate();
    console.log(latestSubDate);
    const newStudents = await this.sapiService.fetchStudents(latestSubDate);
    console.log(newStudents);
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

  /* @Put('/UpdateStudentDetails/:id')
  @ApiResponse({ status: 200, description: 'Success', type: [StudentDetailsDTO] })
  async updateStudentDetails(
    @Param('id') id: number,
    @Body() requestDTO: UpdateStudentDetailsDTO
  ): Promise<StudentDetailsDTO> {
    return this.studentService.updateStudentDetails(Number(id), requestDTO);
  } */
}
