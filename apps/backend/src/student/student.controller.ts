import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { StudentService } from './student.service';

@ApiTags('Students')
@Controller('students')
export class StudentController {
  constructor(private studentService: StudentService) {}

  /*@Patch('/UpdateChildrenDetails/:id')
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
  }*/
}
