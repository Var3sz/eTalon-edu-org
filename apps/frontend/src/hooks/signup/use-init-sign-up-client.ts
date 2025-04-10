import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useMemo, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { toast } from '@/components/ui/use-toast';
import { RequiredStringField } from '@/validation/validation-elements';

type RegisterFormModel = {
  email: string | null;
  name: string | null;
  password: string | null;
  confirmPassword: string | null;
};

const registerSchema = yup.object({
  name: RequiredStringField,
  email: RequiredStringField,
  password: RequiredStringField,
  confirmPassword: RequiredStringField.test('Confirm password teszt', 'A két jelszó nem egyezik!', function () {
    const { from } = this;
    const pass = (from as any)[0].value.password as string;
    const confirmPass = (from as any)[0].value.confirmPassword as string;
    return !(pass && pass !== confirmPass);
  }),
});

export default function UseInitSignUpClient() {
  const [isPending, startTransaction] = useTransition();
  const router = useRouter();

  const form = useForm<RegisterFormModel>({
    defaultValues: { email: null, name: null, password: null, confirmPassword: null },
    resolver: yupResolver<RegisterFormModel>(registerSchema),
  });

  const onValidSubmit = async (formModel: RegisterFormModel) => {
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
