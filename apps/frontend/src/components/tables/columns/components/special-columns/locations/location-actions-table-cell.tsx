import ConfirmDialog from '@/components/dialogs/confirm-dialog';
import CustomInnerStateDialog from '@/components/dialogs/custom-innerstate-dialog';
import EditLocationDialog from '@/components/dialogs/location/edit-location-dialog';
import { FormLocales } from '@/locales/form-locales';
import { LocationDto } from '@/models/Api';
import { Cell, Row } from '@tanstack/react-table';
import { Edit2, Trash2 } from 'lucide-react';
import { useState } from 'react';

type LocationActionsTableCellModel<T> = {
  cell: Cell<T, unknown>;
  row: Row<T>;
  edit: boolean;
  deletable: boolean;
  token: string;
  DeleteLocation: (data: LocationDto) => void;
};

export default function LocationActionsTableCell<T>({
  edit,
  deletable,
  token,
  row,
  DeleteLocation,
}: LocationActionsTableCellModel<T>) {
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  return (
    <div className='w-full flex justify-evenly'>
      {edit && (
        <CustomInnerStateDialog title={FormLocales.locations.edit} triggerElement={<Edit2 />}>
          <EditLocationDialog rowData={row.original as LocationDto} token={token} />
        </CustomInnerStateDialog>
      )}
      {deletable && (
        <ConfirmDialog
          triggerElement={<Trash2 />}
          open={alertOpen}
          onOpenChange={setAlertOpen}
          title='Figyelem!'
          description={'Biztosan törölni szeretné a kiválasztott helyszínt?'}
          cancelAction={() => setAlertOpen(false)}
          confirmAction={() => {
            DeleteLocation(row.original as LocationDto);
          }}
        />
      )}
    </div>
  );
}
