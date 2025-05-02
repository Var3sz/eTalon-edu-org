import { RequiredStringField, EmailField } from '@/validation/validation-elements';
import * as yup from 'yup';

export const loginSchema = yup.object({
  email: EmailField,
  password: RequiredStringField,
});
