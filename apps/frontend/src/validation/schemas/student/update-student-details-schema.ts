import * as yup from 'yup';

import { UpdateStudentDetailsDTO } from '@/models/Api';
import { BooleanField, RequiredNumberField, RequiredStringField } from '@/validation/validation-elements';
import { object, ObjectSchema } from 'yup';
import { UpdateStudentDetailsFormModel } from '@/models/students/types';

const updateStudentDetailsHelperSchema = yup.object({
  inEdit: BooleanField,
});

export const updateStudentDetailsSchema: ObjectSchema<UpdateStudentDetailsFormModel> = object({
  email: RequiredStringField,
  lastname: RequiredStringField,
  firstname: RequiredStringField,
  billCompany: RequiredStringField,
  city: RequiredStringField,
  zip: RequiredNumberField,
  address: RequiredStringField,
  vatNumber: RequiredStringField,
  children: RequiredStringField,
  childrenMail: RequiredStringField,
  mobile: RequiredStringField,
  billingTypeId: RequiredNumberField,
  Helpers: updateStudentDetailsHelperSchema,
});
