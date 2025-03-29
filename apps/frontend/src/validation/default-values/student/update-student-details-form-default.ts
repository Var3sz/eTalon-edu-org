import { StudentDetailsDTO, UpdateStudentDetailsDTO } from '@/models/Api';
import { UpdateStudentDetailsFormModel } from '@/models/students/types';

export const UpdateStudentDetailsFormDefault = (studentData: StudentDetailsDTO): UpdateStudentDetailsFormModel => {
  return {
    email: studentData.email,
    lastname: studentData.lastname,
    firstname: studentData.firstname,
    billCompany: studentData.billCompany,
    city: studentData.city,
    zip: studentData.zip,
    address: studentData.address,
    vatNumber: studentData.vatNumber,
    children: studentData.children,
    childrenMail: studentData.childrenMail,
    mobile: studentData.mobile,
    billingTypeId: studentData.billingTypeId,
    Helpers: {
      inEdit: false,
    },
  };
};
