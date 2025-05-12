import * as yup from 'yup';
import { object, ObjectSchema } from 'yup';

import { UpdateStudentDetailsFormModel } from '@/models/students/types';
import { BooleanField, EmailField, RequiredNumberField, RequiredStringField } from '@/validation/validation-elements';

const updateStudentDetailsHelperSchema = yup.object({
  inEdit: BooleanField,
});

export const updateStudentDetailsSchema: ObjectSchema<UpdateStudentDetailsFormModel> = object({
  id: RequiredNumberField,
  sapId: RequiredNumberField,
  email: EmailField,
  lastname: RequiredStringField,
  firstname: RequiredStringField,
  billCompany: RequiredStringField,
  coupon: RequiredStringField,
  city: RequiredStringField,
  zip: RequiredNumberField,
  address: RequiredStringField,
  vatNum: RequiredStringField,
  childName: RequiredStringField,
  childMail: EmailField,
  childGrade: RequiredNumberField,
  childTAJ: RequiredStringField,
  specialDiet: BooleanField,
  specialDietDesc: RequiredStringField,
  mobile: RequiredStringField,
  billingAddressTypeId: RequiredNumberField,
  packageType: RequiredStringField,
  packageCode: RequiredStringField,
  disease: BooleanField,
  diseaseDesc: RequiredStringField,
  discount: RequiredStringField,
  discount2: RequiredStringField,
  Helpers: updateStudentDetailsHelperSchema,
});
