import * as yup from 'yup';

import { ValidationLocales } from '@/locales/validation-locales';

export const NullableNumberField = yup.number().nullable().defined();
export const NullableStringField = yup.string().nullable().defined();
export const NullableDateField = yup.date().nullable().defined();
export const BooleanField = yup.boolean().required(ValidationLocales.REQUIRED_FIELD).defined();

export const RequiredNumberField = yup.number().required(ValidationLocales.REQUIRED_FIELD).defined();
export const RequiredStringField = yup.string().required(ValidationLocales.REQUIRED_FIELD).defined();
export const RequiredDateField = yup.date().required(ValidationLocales.REQUIRED_FIELD).defined();
