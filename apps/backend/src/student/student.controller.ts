import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CourseStudentsDTO, StudentDetailsDTO, UpdateStudentDetailsDTO } from './entities/student.entity';
import { StudentService } from './student.service';

@ApiTags('Students')
@Controller('students')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Get('/GetStudentsByCourseId/:id')
  @ApiOperation({ summary: 'Get student names by course ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Course ID' })
  @ApiResponse({ status: 200, description: 'List of student names', type: [CourseStudentsDTO] })
  async findChildrenByCourseId(@Param('id') id: number): Promise<CourseStudentsDTO[]> {
    return this.studentService.getAllStudentNamesByCourseId(Number(id));
  }

  @Get('/GetStudentDetailsById/:id')
  @ApiOperation({ summary: 'Get student details by student ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Student ID' })
  @ApiResponse({ status: 200, description: 'Student details', type: [StudentDetailsDTO] })
  @ApiResponse({ status: 404, description: 'Student not found' })
  async getChildrenDetailsById(@Param('id') id: number): Promise<StudentDetailsDTO> {
    return this.studentService.getChildrenDetailsById(Number(id));
  }

  @Patch('/UpdateChildrenDetails/:id')
  @ApiOperation({ summary: 'Update student details by student ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Student ID' })
  @ApiResponse({ status: 200, description: 'Student details', type: [StudentDetailsDTO] })
  @ApiResponse({ status: 404, description: 'Student not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async updateChildrenDetails(
    @Param('id') id: number,
    @Body() requestDTO: UpdateStudentDetailsDTO
  ): Promise<StudentDetailsDTO> {
    return this.studentService.updateChildrenData(Number(id), requestDTO);
  }
}
