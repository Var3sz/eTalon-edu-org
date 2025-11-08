'use server';

import { UpdateStudentDetails } from '@/api/models/serviceEndpoints/students';
import { StudentDetailsDTO, UpdateStudentDetailsDTO } from '@/models/Api';
import { UpdateStudentDetailsFormModel } from '@/models/students/types';

export const UpdateStudentDetailsAction = async (formModel: UpdateStudentDetailsFormModel, token: string) => {
  const parsedBody: UpdateStudentDetailsDTO = {
    email: formModel.email,
    lastname: formModel.lastname,
    firstname: formModel.firstname,
    billCompany: formModel.billCompany,
    city: formModel.city,
    zip: formModel.zip,
    address: formModel.address,
    vatNum: formModel.vatNum,
    childName: formModel.childName,
    childMail: formModel.childMail,
    mobile: formModel.mobile,
    billingAddressTypeId: formModel.billingAddressTypeId,
    id: formModel.id,
    sapId: formModel.sapId,
    coupon: formModel.coupon,
    childGrade: formModel.childGrade,
    childTAJ: formModel.childTAJ,
    specialDiet: formModel.specialDiet,
    specialDietDesc: formModel.specialDietDesc,
    packageType: formModel.packageType,
    packageCode: formModel.packageCode,
    disease: formModel.disease,
    diseaseDesc: formModel.diseaseDesc,
    discount: formModel.discount,
    discount2: formModel.discount2,
  };
  return await UpdateStudentDetails<UpdateStudentDetailsDTO, StudentDetailsDTO>(parsedBody, token);
};
