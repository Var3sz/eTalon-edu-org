import { Body, Controller, Param, Put } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { StudentDetailsDTO, UpdateStudentDetailsDTO } from './entities/student.entity';
import { StudentService } from './student.service';

@ApiTags('Students')
@Controller('students')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Put('/UpdateStudentDetails/:id')
  @ApiResponse({ status: 200, description: 'Success', type: [StudentDetailsDTO] })
  async updateStudentDetails(
    @Param('id') id: number,
    @Body() requestDTO: UpdateStudentDetailsDTO
  ): Promise<StudentDetailsDTO> {
    return this.studentService.updateStudentDetails(Number(id), requestDTO);
  }
}
