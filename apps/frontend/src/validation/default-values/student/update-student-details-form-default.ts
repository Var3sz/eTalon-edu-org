import { StudentAttendance } from '@/hooks/courses/use-init-course-client';
import { UpdateStudentDetailsFormModel } from '@/models/students/types';

export const UpdateStudentDetailsFormDefault = (studentData: StudentAttendance): UpdateStudentDetailsFormModel => {
  return {
    id: studentData.id,
    sapId: studentData.sapId,
    email: studentData.email,
    firstname: studentData.firstname,
    lastname: studentData.lastname,
    billCompany: studentData.billCompany,
    city: studentData.city,
    zip: studentData.zip,
    address: studentData.address,
    coupon: studentData.coupon,
    vatNum: studentData.vatNum,
    billingAddressTypeId: studentData.billingAddressTypeId,
    childName: studentData.childName,
    childMail: studentData.childMail,
    childGrade: studentData.childGrade,
    childTAJ: studentData.childTAJ,
    specialDiet: studentData.specialDiet,
    specialDietDesc: studentData.specialDietDesc,
    mobile: studentData.mobile,
    packageType: studentData.packageType,
    packageCode: studentData.packageCode,
    disease: studentData.disease,
    diseaseDesc: studentData.diseaseDesc,
    discount: studentData.discount,
    discount2: studentData.discount2,
    Helpers: {
      inEdit: false,
    },
  };
};
