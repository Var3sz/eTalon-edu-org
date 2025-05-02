'use client';

import LoadingFullScreen from '@/app/loading';
import FormTextInput from '@/components/form/form-text-input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import useInitSignUpClient from '@/hooks/auth/signup/use-init-sign-up-client';

export default function SignUpClient() {
  const { form, isPending, onValidSubmit, onInvalidSubmit } = useInitSignUpClient();

  return (
    <div className='flex items-center justify-center bg-gray-100 '>
      {isPending && <LoadingFullScreen />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onValidSubmit, onInvalidSubmit)} className='w-full max-w-md'>
          <Card className='bg-white shadow-xl rounded-2xl'>
            <CardHeader className='flex items-center justify-center text-center py-8'>
              <CardTitle className='text-4xl font-bold'>Regisztráció</CardTitle>
            </CardHeader>
            <CardContent className='flex flex-col items-center gap-6 min-w-full '>
              <FormTextInput
                id='email'
                formControl={form.control}
                type='email'
                label='E-mail cím'
                labelStyle='font-bold'
                divStyle='w-3/4'
                inputStyle='w-full bg-gray-100'
                inEdit
              />
              <FormTextInput
                id='name'
                formControl={form.control}
                label='Név'
                labelStyle='font-bold'
                divStyle='w-3/4'
                inputStyle='w-full bg-gray-100'
                inEdit
              />
              <FormTextInput
                id='password'
                formControl={form.control}
                type='password'
                label='Jelszó'
                labelStyle='font-bold'
                divStyle='w-3/4'
                inputStyle='w-full bg-gray-100'
                inEdit
              />
              <FormTextInput
                id='confirmPassword'
                formControl={form.control}
                type='password'
                label='Jelszó megerősítése'
                labelStyle='font-bold'
                divStyle='w-3/4'
                inputStyle='w-full bg-gray-100'
                inEdit
              />
              <Button variant='default' type='submit' className=' hover:bg-gray-300 transition'>
                Regisztrálok
              </Button>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
}
