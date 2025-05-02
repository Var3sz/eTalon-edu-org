import { SignupFormModel } from '@/models/auth/types';

export const SignupFormDefault = (): SignupFormModel => {
  return {
    email: null,
    name: null,
    password: null,
    confirmPassword: null,
  };
};
