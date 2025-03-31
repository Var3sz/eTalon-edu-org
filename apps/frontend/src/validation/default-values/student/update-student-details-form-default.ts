import { StudentAttendance } from '@/hooks/courses/use-init-course-client';
import { UpdateStudentDetailsFormModel } from '@/models/students/types';

export const UpdateStudentDetailsFormDefault = (studentData: StudentAttendance): UpdateStudentDetailsFormModel => {
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
