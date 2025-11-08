import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Control, useWatch } from 'react-hook-form';

import LoadingFullScreen from '@/app/loading';
import CreateGroupsColumns from '@/components/columns/group/create-groups-columns';
import { SimpleTable } from '@/components/tables/simple-table';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import useInitAddGroupsDialog from '@/hooks/group/use-init-add-groups-dialog';
import { AddGroupsFormModel } from '@/models/group/types';

export type AddGroupsDialogModel = {
  token: string;
  setOpenChangeDialog?: Dispatch<SetStateAction<boolean>>;
};

export default function AddGroupsDialog({ token, setOpenChangeDialog }: AddGroupsDialogModel) {
  const { form, isPending, onValidSubmit, onInvalidSubmit } = useInitAddGroupsDialog({
    setOpenChangeDialog,
    token,
  });

  const formValues = useWatch({ control: form.control }) as AddGroupsFormModel;

  const [tableLength, setTableLength] = useState<number>(formValues.GroupList.length);

  useEffect(() => {
    setTableLength(formValues.GroupList.length);
  }, [formValues.GroupList.length]);

  const createColumns = CreateGroupsColumns<Pick<any, keyof AddGroupsFormModel[]>>(
    form.control as unknown as Control<Pick<any, keyof AddGroupsFormModel[]>>,
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
            defaultData={formValues.GroupList}
            form={{ formId: 'GroupList', formSetValue: form.setValue }}
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
