import * as yup from 'yup';
import { object, ObjectSchema } from 'yup';

import { UpdateStudentDetailsFormModel } from '@/models/students/types';
import {
  BooleanField,
  NullableStringField,
  RequiredNumberField,
  RequiredStringField,
} from '@/validation/validation-elements';

const updateStudentDetailsHelperSchema = yup.object({
  inEdit: BooleanField,
});

export const updateStudentDetailsSchema: ObjectSchema<UpdateStudentDetailsFormModel> = object({
  email: RequiredStringField,
  lastname: RequiredStringField,
  firstname: RequiredStringField,
  billCompany: NullableStringField,
  city: RequiredStringField,
  zip: RequiredNumberField,
  address: RequiredStringField,
  vatNumber: NullableStringField,
  children: RequiredStringField,
  childrenMail: NullableStringField,
  mobile: RequiredStringField,
  billingTypeId: RequiredNumberField,
  Helpers: updateStudentDetailsHelperSchema,
});
