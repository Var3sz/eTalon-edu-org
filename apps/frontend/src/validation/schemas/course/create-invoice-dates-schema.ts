import * as yup from 'yup';

import {
  BooleanField,
  NullableNumberField,
  NullableStringField,
  RequiredDateField,
} from '@/validation/validation-elements';

const InvoiceDateSchema = yup.object().shape({
  id: NullableNumberField,
  date: RequiredDateField,
  description: NullableStringField,
});

export const CreateInvoiceDatesFormSchema = yup.object().shape({
  InvoiceDateList: yup.array().of(InvoiceDateSchema).defined(),
  Helpers: yup.object().shape({
    inEdit: BooleanField,
  }),
});
