import { object, ObjectSchema } from 'yup';

import { UpdateStudentDetailsDTO } from '@/models/Api';
import { RequiredNumberField, RequiredStringField } from '@/validation/validation-elements';

export const updateStudentDetailsSchema: ObjectSchema<UpdateStudentDetailsDTO> = object({
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
});
