import { ColumnDef } from '@tanstack/react-table';
import { ActionsTableColumnModel } from '../../../types/column-types';
import { SimpleTableColumnHeader } from '../../headers/simple-table-column.header';
import CustomInnerStateDialog from '@/components/dialogs/custom-innerstate-dialog';
import { FormLocales } from '@/locales/form-locales';
import { Edit2 } from 'lucide-react';
import { LocationDto } from '@/models/Api';
import EditLocationDialog from '@/components/dialogs/location/edit-location-dialog';

type LocationActionsTableColumnModel<T> = ActionsTableColumnModel<T> & { token: string };

export default function LocationActionsTableColumn<T>({
  id,
  accessorKey,
  headerTitle,
  edit = true,
  token,
}: LocationActionsTableColumnModel<T>): ColumnDef<T> {
  return {
    id: id,
    accessorKey: accessorKey,
    header: () => <SimpleTableColumnHeader title={headerTitle} />,
    cell: ({ row }) => {
      return (
        <div className='w-fit mx-auto flex space-between gap-5'>
          {edit && (
            <CustomInnerStateDialog title={FormLocales.groups.edit} triggerElement={<Edit2 />}>
              <EditLocationDialog rowData={row.original as LocationDto} token={token} />
            </CustomInnerStateDialog>
          )}
        </div>
      );
    },
  };
}
