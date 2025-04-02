import * as yup from 'yup';

import { NullableNumberField, RequiredDateField, RequiredStringField } from '@/validation/validation-elements';

const courseDateSchema = yup.array().of(
  yup.object().shape({
    id: NullableNumberField,
    date: RequiredDateField,
    description: RequiredStringField,
  })
);

export const editCourseDatesSchema = yup.object().shape({
  CourseDates: courseDateSchema.defined(),
});
