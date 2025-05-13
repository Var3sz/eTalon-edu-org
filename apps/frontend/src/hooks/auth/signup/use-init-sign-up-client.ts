import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useMemo, useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { toast } from '@/components/ui/use-toast';
import { SignupFormModel } from '@/models/auth/types';
import { SignupFormDefault } from '@/validation/default-values/auth/signup/signup-form-default';
import { signupSchema } from '@/validation/schemas/auth/signup/signupSchema';

export default function UseInitSignUpClient() {
  const [isPending, startTransaction] = useTransition();
  const router = useRouter();

  const form = useForm<SignupFormModel>({
    defaultValues: SignupFormDefault(),
    resolver: yupResolver<SignupFormModel>(signupSchema),
  });

  const onValidSubmit = async (formModel: SignupFormModel) => {
    startTransaction(async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}auth/register`, {
        method: 'POST',
        body: JSON.stringify({ name: formModel.name, email: formModel.email, password: formModel.password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        toast({
          title: 'Sikertelen regisztráció!',
          description: response.statusText,
          variant: 'destructive',
        });
        return;
      }

      await response.json();
      toast({
        title: 'Sikeres regisztráció!',
        variant: 'success',
      });
      router.push('/api/auth/signin');
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
    () => ({ form, isPending, onValidSubmit, onInvalidSubmit }),
    [form, isPending, onValidSubmit, onInvalidSubmit]
  );
}
