import * as yup from 'yup';

import { BooleanField, RequiredNumberField, RequiredStringField } from '@/validation/validation-elements';

export const updateGroupSchema = yup.object().shape({
  id: RequiredNumberField,
  isDeleted: RequiredStringField,
  description: RequiredStringField,
  Helpers: yup.object().shape({
    inEdit: BooleanField,
  }),
});
