import LoadingFullScreen from '@/app/loading';
import useInitManageLocationsClient from '@/hooks/location/use-init-manage-locations-client';
import { FormLocales } from '@/locales/form-locales';

import LocationColumns from '../columns/location/location-columns';
import CustomInnerStateDialog from '../dialogs/custom-innerstate-dialog';
import AddLocationsDialog from '../dialogs/location/add-locations-dialog';
import { SimpleTable } from '../tables/simple-table';
import AddButton from '../ui/add-button';

type ManageLocationsClientModel = {
  token: string;
};

export default function ManageLocationsClient({ token }: ManageLocationsClientModel) {
  const { locations, isPending, DeleteLocation } = useInitManageLocationsClient(token);

  const locationColumns = LocationColumns(DeleteLocation, token);

  return (
    <div className='flex flex-col gap-5'>
      {isPending && <LoadingFullScreen />}
      <div className='flex gap-5'>
        <span className='font-bold text-3xl'>Helyszínek kezelése</span>
        <CustomInnerStateDialog
          title={FormLocales.locations.add}
          triggerElement={<AddButton asChild title={FormLocales.locations.add} />}
        >
          <AddLocationsDialog token={token} />
        </CustomInnerStateDialog>
      </div>

      <SimpleTable columns={locationColumns} defaultData={locations ?? []} />
    </div>
  );
}
