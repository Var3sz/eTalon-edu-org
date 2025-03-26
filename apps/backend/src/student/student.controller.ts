import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { StudentEntity } from './entities/student.entity';
import { StudentService } from './student.service';

@ApiTags('Students')
@Controller('students')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Get('/GetStudentsByCourseId/:id')
  @ApiOperation({ summary: 'Get student names by course ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Course ID' })
  @ApiResponse({ status: 200, description: 'List of student names', type: [StudentEntity] })
  async findChildrenByCourseId(@Param('id') id: number): Promise<StudentEntity[]> {
    return this.studentService.getAllStudentNamesByCourseId(Number(id));
  }
}
