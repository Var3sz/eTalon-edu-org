import { Dispatch, SetStateAction } from 'react';
import { useWatch } from 'react-hook-form';

import LoadingFullScreen from '@/app/loading';
import FormDateInput from '@/components/form/form-date-input';
import FormTextInput from '@/components/form/form-text-input';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import useInitEditInvoiceDateDialog from '@/hooks/courses/edit-course/use-init-edit-invoice-date-dialog';
import { FormLocales } from '@/locales/form-locales';
import { InvoiceDateDto } from '@/models/Api';
import { UpdateInvoiceDateFormModel } from '@/models/course/types';

type EditInvoiceDateDialogProps = {
  courseId: string;
  rowData: InvoiceDateDto;
  token: string;
  setOpenChangeDialog?: Dispatch<SetStateAction<boolean>>;
};

export default function EditInvoiceDateDialog({
  courseId,
  rowData,
  token,
  setOpenChangeDialog,
}: EditInvoiceDateDialogProps) {
  const { form, isPending, onValidSubmit, onInvalidSubmit } = useInitEditInvoiceDateDialog({
    courseId,
    rowData,
    setOpenChangeDialog,
    token,
  });
  const formValues = useWatch({ control: form.control }) as UpdateInvoiceDateFormModel;

  return (
    <div>
      {isPending && <LoadingFullScreen />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onValidSubmit, onInvalidSubmit)} className='flex flex-col gap-5'>
          <div className='flex gap-5'>
            <FormDateInput
              id='date'
              formControl={form.control}
              label={FormLocales.invoiceDate.date}
              inEdit={formValues.Helpers.inEdit}
            />
            <FormTextInput
              id='description'
              formControl={form.control}
              label={FormLocales.invoiceDate.description}
              inEdit={formValues.Helpers.inEdit}
            />
          </div>
          <div className='flex self-end gap-5'>
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
