import { StudentDetailsDTO, UpdateStudentDetailsDTO } from '@/models/Api';

export const UpdateStudentDetailsFormDefault = (studentData: StudentDetailsDTO): UpdateStudentDetailsDTO => {
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
  };
};
