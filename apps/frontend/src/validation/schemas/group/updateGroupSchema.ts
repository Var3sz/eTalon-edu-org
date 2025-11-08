import * as yup from 'yup';

import {
  BooleanField,
  NullableStringField,
  RequiredNumberField,
  RequiredStringField,
} from '@/validation/validation-elements';

export const updateGroupSchema = yup.object().shape({
  id: RequiredNumberField,
  description: RequiredStringField,
  Helpers: yup.object().shape({
    inEdit: BooleanField,
  }),
});
