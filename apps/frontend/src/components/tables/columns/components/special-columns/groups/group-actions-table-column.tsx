import { ColumnDef } from '@tanstack/react-table';
import { Edit2 } from 'lucide-react';

import CustomInnerStateDialog from '@/components/dialogs/custom-innerstate-dialog';
import EditGroupDialog from '@/components/dialogs/group/edit-group-dialog';
import { FormLocales } from '@/locales/form-locales';
import { GroupDto } from '@/models/Api';

import { ActionsTableColumnModel } from '../../../types/column-types';
import { SimpleTableColumnHeader } from '../../headers/simple-table-column.header';

type GroupActionsTableColumnModel<T> = ActionsTableColumnModel<T> & { token: string };

export default function GroupActionsTableColumn<T>({
  id,
  accessorKey,
  headerTitle,
  edit = true,
  token,
}: GroupActionsTableColumnModel<T>): ColumnDef<T> {
  return {
    id: id,
    accessorKey: accessorKey,
    header: () => <SimpleTableColumnHeader title={headerTitle} />,
    cell: ({ row }) => {
      return (
        <div className='w-fit mx-auto flex space-between gap-5'>
          {edit && (
            <CustomInnerStateDialog title={FormLocales.groups.edit} triggerElement={<Edit2 />}>
              <EditGroupDialog rowData={row.original as GroupDto} token={token} />
            </CustomInnerStateDialog>
          )}
        </div>
      );
    },
  };
}
