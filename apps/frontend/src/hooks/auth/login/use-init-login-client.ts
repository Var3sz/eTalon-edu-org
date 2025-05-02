import { toast } from '@/components/ui/use-toast';
import { LoginFormModel } from '@/models/auth/types';
import { LoginFormDefault } from '@/validation/default-values/auth/login/login-form-default';
import { loginSchema } from '@/validation/schemas/auth/login/loginSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useMemo, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';

export default function useInitLoginClient() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');

  const [isPending, startTransaction] = useTransition();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<LoginFormModel>({
    defaultValues: LoginFormDefault(),
    resolver: yupResolver<LoginFormModel>(loginSchema),
  });

  const onValidSubmit = async (formModel: LoginFormModel) => {
    startTransaction(async () => {
      const result = await signIn('Credentials', {
        username: formModel.email,
        password: formModel.password,
        redirect: false,
        callbackUrl: callbackUrl!,
      });

      if (!result?.ok) {
        setIsSubmitting(false);
        toast({
          title: 'Sikertelen bejelentkezés!',
          description: 'Hibás e-mail vagy jelszó.',
          variant: 'destructive',
        });
        return;
      }

      toast({
        title: 'Sikeres bejelentkezés!',
        variant: 'success',
      });

      window.location.href = result.url!;
    });
  };

  const onInvalidSubmit = () => {
    toast({
      title: 'Hibás adatok!',
      description: 'Hiba történt a validáció során!',
      variant: 'destructive',
    });
  };

  return useMemo(
    () => ({ form, isPending, isSubmitting, onValidSubmit, onInvalidSubmit }),
    [form, isPending, isSubmitting, onValidSubmit, onInvalidSubmit]
  );
}
