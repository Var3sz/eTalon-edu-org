import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { Alert } from 'react-native';

import { Login } from '../../api/models/serviceEndpoints/auth';
import { LoginFormDefault } from '../../models/validation/default/auth/auth-form-default';
import { LoginSchema } from '../../models/validation/schemas/auth/auth-schema';
import { LoginDto } from '../../models/auth/auth';

export default function useInitLoginScreen() {
  const form = useForm<LoginDto>({
    resolver: yupResolver(LoginSchema),
    defaultValues: LoginFormDefault(),
  });

  return useMemo(() => ({ form }), [form]);
}
