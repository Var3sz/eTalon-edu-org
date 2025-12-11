'use client';

import { useSession } from 'next-auth/react';
import { useWatch } from 'react-hook-form';

import LoadingFullScreen from '@/app/loading';
import useInitPaymentClient, { StudentPaymentForm } from '@/hooks/payments/use-init-payment-client';

import PaymentColumns from '../columns/payment/payment-columns';
import { SimpleTable } from '../tables/simple-table';
import { Button } from '../ui/button';
import { Form } from '../ui/form';

type PaymentClientProps = {
  courseId: string;
};

export default function PaymentClient({ courseId }: PaymentClientProps) {
  const { data: session } = useSession();

  const { form, isPending, courseName, paymentData, dateCols, onValidFormSubmit, onInvalidFormSubmit } =
    useInitPaymentClient({
      courseId: courseId,
      token: session?.tokens.accessToken ?? '',
      userId: session?.user.id ?? 0,
    });

  const formValues = useWatch({ control: form.control }) as StudentPaymentForm;

  return (
    <div className='w-3/4 py-10 mx-auto'>
      {isPending && <LoadingFullScreen />}
      <span className='block font-bold text-3xl mb-3'>Befizetési adatok{courseName ? ` - ${courseName}` : ''}</span>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onValidFormSubmit, onInvalidFormSubmit)} className='flex flex-col'>
          <SimpleTable
            columns={PaymentColumns({
              paymentData: paymentData,
              dateColumns: dateCols,
              formControl: form.control,
              inEdit: formValues.Helpers.inEdit,
              token: session?.tokens.accessToken ?? '',
            })}
            defaultData={paymentData}
          />
          <div className='flex self-end gap-5 mt-3'>
            {formValues.Helpers.inEdit ? (
              <div className='flex gap-3'>
                <Button
                  variant='destructive'
                  type='button'
                  onClick={(e) => {
                    e.preventDefault();
                    form.setValue('Helpers.inEdit', false);
                  }}
                >
                  Mégsem
                </Button>
                <Button variant='default' type='submit'>
                  Mentés
                </Button>
              </div>
            ) : (
              <Button
                variant='modify'
                onClick={(e) => {
                  e.preventDefault();
                  form.setValue('Helpers.inEdit', true);
                }}
              >
                Módosítás
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
