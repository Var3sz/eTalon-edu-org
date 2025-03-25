import { ColumnDef } from '@tanstack/react-table';
import { LockIcon } from 'lucide-react';

import { DataTableColumnHeader } from '@/components/tables/columns/components/headers/data-table-column-header';
import { ColumnBaseModel } from '@/components/tables/columns/types/types';

export default function LockedTableColumn<T>({
  id,
  accessorKey,
  headerTitle,
  size = 50,
}: ColumnBaseModel<T>): ColumnDef<T> {
  return {
    id: id,
    accessorKey: accessorKey,
    size: size,
    header: ({ column }) => <DataTableColumnHeader column={column} title={headerTitle} />,
    cell: ({ cell }) => {
      const locked = cell.getValue() as boolean;
      return locked ? (
        <div className='flex justify-center'>
          <LockIcon size={25} />
        </div>
      ) : (
        <div />
      );
    },
  };
}
