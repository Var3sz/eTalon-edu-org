'use client';

import LoadingFullScreen from '@/app/loading';
import useInitLoginClient from '@/hooks/auth/login/use-init-login-client';
import { Form } from '../ui/form';
import FormTextInput from '../form/form-text-input';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';

export default function LoginClient() {
  const { form, isPending, isSubmitting, onValidSubmit, onInvalidSubmit } = useInitLoginClient();

  return (
    <div className='flex items-center justify-center bg-gray-100 '>
      {(isPending || isSubmitting) && <LoadingFullScreen />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onValidSubmit, onInvalidSubmit)} className='w-full max-w-md'>
          <Card className='bg-white shadow-xl rounded-2xl'>
            <CardHeader className='flex items-center justify-center text-center py-8'>
              <CardTitle className='text-4xl font-bold'>Bejelentkezés</CardTitle>
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
                id='password'
                formControl={form.control}
                type='password'
                label='Jelszó'
                labelStyle='font-bold'
                divStyle='w-3/4'
                inputStyle='w-full bg-gray-100'
                inEdit
              />
              <Button variant='default' type='submit' className=' hover:bg-gray-300 transition'>
                Bejelentkezés
              </Button>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
}
