import { LoginFormModel } from '@/models/auth/types';

export const LoginFormDefault = (): LoginFormModel => {
  return {
    email: null,
    password: null,
  };
};
