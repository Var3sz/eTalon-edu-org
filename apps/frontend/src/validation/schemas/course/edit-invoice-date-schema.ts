import * as yup from 'yup';

import {
  BooleanField,
  NullableStringField,
  RequiredDateField,
  RequiredNumberField,
} from '@/validation/validation-elements';

export const invoiceDateSchema = yup.object().shape({
  id: RequiredNumberField,
  date: RequiredDateField,
  description: NullableStringField,
  Helpers: yup.object().shape({
    inEdit: BooleanField,
  }),
});
