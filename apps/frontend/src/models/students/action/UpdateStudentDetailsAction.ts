'use server';

import { UpdateStudentDetails } from '@/api/models/serviceEndpoints/course';
import { StudentDetailsDTO, UpdateStudentDetailsDTO } from '@/models/Api';

export const UpdateStudentDetailsAction = async (studentId: number, formModel: UpdateStudentDetailsDTO) => {
  return await UpdateStudentDetails<UpdateStudentDetailsDTO, StudentDetailsDTO>(studentId, formModel);
};
