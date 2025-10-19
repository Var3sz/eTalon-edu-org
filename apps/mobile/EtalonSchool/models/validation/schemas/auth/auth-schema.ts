import * as yup from 'yup';
import { EmailField, RequiredStringField } from '../../validation-elements';

export const LoginSchema = yup.object({
  username: EmailField,
  password: RequiredStringField,
});
