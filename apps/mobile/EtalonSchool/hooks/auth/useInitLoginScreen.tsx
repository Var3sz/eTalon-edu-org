import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { LoginDto } from '../../models/auth/auth';
import { LoginFormDefault } from '../../models/validation/default/auth/auth-form-default';
import { LoginSchema } from '../../models/validation/schemas/auth/auth-schema';

export default function useInitLoginScreen() {
  const form = useForm<LoginDto>({
    resolver: yupResolver(LoginSchema),
    defaultValues: LoginFormDefault(),
  });

  return useMemo(() => ({ form }), [form]);
}
