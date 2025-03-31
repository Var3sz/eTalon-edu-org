'use server';

import { UpdateStudentDetails } from '@/api/models/serviceEndpoints/course';
import { StudentDetailsDTO, UpdateStudentDetailsDTO } from '@/models/Api';
import { UpdateStudentDetailsFormModel } from '@/models/students/types';

export const UpdateStudentDetailsAction = async (studentId: number, formModel: UpdateStudentDetailsFormModel) => {
  const parsedBody: UpdateStudentDetailsDTO = {
    email: formModel.email,
    lastname: formModel.lastname,
    firstname: formModel.firstname,
    billCompany: formModel.billCompany,
    city: formModel.city,
    zip: formModel.zip,
    address: formModel.address,
    vatNumber: formModel.vatNumber,
    children: formModel.children,
    childrenMail: formModel.childrenMail,
    mobile: formModel.mobile,
    billingTypeId: formModel.billingTypeId,
  };
  return await UpdateStudentDetails<UpdateStudentDetailsDTO, StudentDetailsDTO>(studentId, parsedBody);
};
