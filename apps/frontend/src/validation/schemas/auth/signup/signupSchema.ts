import { EmailField, RequiredStringField } from '@/validation/validation-elements';
import * as yup from 'yup';

export const signupSchema = yup.object({
  name: RequiredStringField,
  email: EmailField,
  password: RequiredStringField,
  confirmPassword: RequiredStringField.test('Confirm password teszt', 'A két jelszó nem egyezik!', function () {
    const { from } = this;
    const pass = (from as any)[0].value.password as string;
    const confirmPass = (from as any)[0].value.confirmPassword as string;
    return !(pass && pass !== confirmPass);
  }),
});
