import * as yup from 'yup';

import { ValidationLocales } from '@/locales/validation-locales';

export const NullableNumberField = yup.number().nullable();
export const NullableStringField = yup.string().nullable();
export const NullableDateField = yup.date().nullable();
export const BooleanField = yup.boolean().required(ValidationLocales.REQUIRED_FIELD);

export const RequiredNumberField = yup.number().required(ValidationLocales.REQUIRED_FIELD);
export const RequiredStringField = yup.string().required(ValidationLocales.REQUIRED_FIELD);
export const RequiredDateField = yup.date().required(ValidationLocales.REQUIRED_FIELD);
