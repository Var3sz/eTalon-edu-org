import { LoginDto } from '../../../auth';

export const LoginFormDefault = (): LoginDto => {
  return {
    username: '',
    password: '',
  };
};
