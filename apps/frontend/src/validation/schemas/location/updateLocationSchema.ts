import * as yup from 'yup';

import { BooleanField, RequiredNumberField, RequiredStringField } from '@/validation/validation-elements';

export const updateLocationSchema = yup.object().shape({
  id: RequiredNumberField,
  description: RequiredStringField,
  Helpers: yup.object().shape({
    inEdit: BooleanField,
  }),
});
