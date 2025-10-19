import { useMemo, useTransition } from 'react';
import { Login } from '../../api/models/serviceEndpoints/auth';
import { LoginDto } from '../../models/auth';
import { Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import { LoginFormDefault } from '../../models/validation/default/auth/auth-form-default';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginSchema } from '../../models/validation/schemas/auth/auth-schema';

export default function useInitLoginScreen() {
  const [isPending, startTransaction] = useTransition();

  const form = useForm<LoginDto>({
    resolver: yupResolver(LoginSchema),
    defaultValues: LoginFormDefault(),
  });

  const onValidFormSubmit = (formModel: LoginDto) => {
    startTransaction(async () => {
      const loginResponse = await Login<LoginDto, any>(formModel);
      if (loginResponse.status === 200 || loginResponse.status === 201) {
        Alert.alert('Sikeres');
      } else {
        Alert.alert('Sikertelen');
      }
    });
  };

  const onInvalidFormSubmit = (e: any) => {
    console.error(e);
  };

  return useMemo(
    () => ({ form, isPending, onValidFormSubmit, onInvalidFormSubmit }),
    [isPending, form, onValidFormSubmit, onInvalidFormSubmit]
  );
}
