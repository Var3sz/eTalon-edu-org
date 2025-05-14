import LoadingFullScreen from '@/app/loading';
import CreatePackagesColumns from '@/components/columns/package/create-packages-table-columns';
import { SimpleTable } from '@/components/tables/simple-table';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import useGetGroupsQuery from '@/hooks/group/use-get-groups-query';
import useGetLocationsQuery from '@/hooks/location/use-get-locations-query';
import useInitCreatePackagesDialog from '@/hooks/packages/use-init-create-packages-dialog';
import { CreatePackagesFormModel } from '@/models/package/types';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Control, useWatch } from 'react-hook-form';

type CreatePackagesDialogProps = {
  setOpenChangeDialog?: Dispatch<SetStateAction<boolean>>;
};

export default function CreatePackagesDialog({ setOpenChangeDialog }: CreatePackagesDialogProps) {
  const { form, isPending, onValidSubmit, onInvalidSubmit } = useInitCreatePackagesDialog({ setOpenChangeDialog });

  const locations = useGetLocationsQuery();
  const groups = useGetGroupsQuery();

  const formValues = useWatch({ control: form.control }) as CreatePackagesFormModel;

  const [tableLength, setTableLength] = useState<number>(formValues.PackageList.length);

  useEffect(() => {
    setTableLength(formValues.PackageList.length);
  }, [formValues.PackageList.length]);

  const createColumns = CreatePackagesColumns<Pick<any, keyof CreatePackagesFormModel[]>>(
    form.control as unknown as Control<Pick<any, keyof CreatePackagesFormModel[]>>,
    formValues.Helpers.inEdit,
    tableLength,
    locations!,
    groups!
  );

  return (
    <div>
      {isPending && <LoadingFullScreen />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onValidSubmit, onInvalidSubmit)} className='flex flex-col gap-3'>
          <SimpleTable
            columns={createColumns}
            defaultData={formValues.PackageList}
            form={{ formId: 'PackageList', formSetValue: form.setValue }}
            newRowElement={{
              packageId: null,
              price: null,
              type: null,
              locationId: null,
              active: true,
              groupId: null,
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
