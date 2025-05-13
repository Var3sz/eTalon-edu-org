import {
  BooleanField,
  NullableNumberField,
  NullableStringField,
  RequiredDateField,
} from '@/validation/validation-elements';
import * as yup from 'yup';

const CourseDateSchema = yup.object().shape({
  id: NullableNumberField,
  date: RequiredDateField,
  description: NullableStringField,
});

export const CreateCourseDatesFormSchema = yup.object().shape({
  CourseDateList: yup.array().of(CourseDateSchema).defined(),
  Helpers: yup.object().shape({
    inEdit: BooleanField,
  }),
});
