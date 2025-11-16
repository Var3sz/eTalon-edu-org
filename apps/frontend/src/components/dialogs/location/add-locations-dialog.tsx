import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Control, useWatch } from 'react-hook-form';

import LoadingFullScreen from '@/app/loading';
import CreateLocationsColumns from '@/components/columns/location/create-locations-columns';
import { SimpleTable } from '@/components/tables/simple-table';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import useInitAddLocationsDialog from '@/hooks/location/use-init-add-locations-dialog';
import { AddLocationsFormModel } from '@/models/location/type';

export type AddLocationsDialogModel = {
  token: string;
  setOpenChangeDialog?: Dispatch<SetStateAction<boolean>>;
};

export default function AddLocationsDialog({ token, setOpenChangeDialog }: AddLocationsDialogModel) {
  const { form, isPending, onValidSubmit, onInvalidSubmit } = useInitAddLocationsDialog({
    setOpenChangeDialog,
    token,
  });

  const formValues = useWatch({ control: form.control }) as AddLocationsFormModel;

  const [tableLength, setTableLength] = useState<number>(formValues.LocationList.length);

  useEffect(() => {
    setTableLength(formValues.LocationList.length);
  }, [formValues.LocationList.length]);

  const createColumns = CreateLocationsColumns<Pick<any, keyof AddLocationsFormModel[]>>(
    form.control as unknown as Control<Pick<any, keyof AddLocationsFormModel[]>>,
    formValues.Helpers.inEdit,
    tableLength
  );

  return (
    <div className='max-w-[1000px]'>
      {isPending && <LoadingFullScreen />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onValidSubmit, onInvalidSubmit)} className='flex flex-col gap-3'>
          <SimpleTable
            columns={createColumns}
            defaultData={formValues.LocationList}
            form={{ formId: 'LocationList', formSetValue: form.setValue }}
            newRowElement={{
              description: null,
              isDeleted: 'N',
            }}
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
