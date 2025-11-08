import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Control, useWatch } from 'react-hook-form';

import LoadingFullScreen from '@/app/loading';
import CreateInvoiceDatesColumns from '@/components/columns/course/create-invoice-dates-columns';
import { SimpleTable } from '@/components/tables/simple-table';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import useInitCreateInvoiceDatesDialog from '@/hooks/courses/edit-course/use-init-create-invoice-dates-dialog';
import { CreateInvoiceDatesFormModel } from '@/models/course/types';

type CreateInvoiceDatesDialogProps = {
  courseId: string;
  setOpenChangeDialog?: Dispatch<SetStateAction<boolean>>;
  token: string;
};

export default function CreateInvoiceDatesDialog({
  courseId,
  setOpenChangeDialog,
  token,
}: CreateInvoiceDatesDialogProps) {
  const { form, isPending, onValidSubmit, onInvalidSubmit } = useInitCreateInvoiceDatesDialog({
    courseId,
    setOpenChangeDialog,
    token,
  });

  const formValues = useWatch({ control: form.control }) as CreateInvoiceDatesFormModel;

  const [tableLength, setTableLength] = useState<number>(formValues.InvoiceDateList.length);

  useEffect(() => {
    setTableLength(formValues.InvoiceDateList.length);
  }, [formValues.InvoiceDateList.length]);

  const createColumns = CreateInvoiceDatesColumns<Pick<any, keyof CreateInvoiceDatesFormModel[]>>(
    form.control as unknown as Control<Pick<any, keyof CreateInvoiceDatesFormModel[]>>,
    formValues.Helpers.inEdit,
    tableLength
  );

  return (
    <div>
      {isPending && <LoadingFullScreen />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onValidSubmit, onInvalidSubmit)} className='flex flex-col gap-3'>
          <SimpleTable
            columns={createColumns}
            defaultData={formValues.InvoiceDateList}
            form={{ formId: 'InvoiceDateList', formSetValue: form.setValue }}
            newRowElement={{ id: null, date: null, description: null }}
          />
          <div className='flex gap-5 mt-5 self-end'>
            <Button
              variant='destructive'
              type='button'
              onClick={(e) => {
                e.preventDefault();
                setOpenChangeDialog && setOpenChangeDialog(false);
              }}
            >
              Mégse
            </Button>
            <Button variant='default' type='submit'>
              Mentés
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
