import * as yup from 'yup';

import { EmailField, RequiredStringField } from '@/validation/validation-elements';

export const loginSchema = yup.object({
  email: EmailField,
  password: RequiredStringField,
});
