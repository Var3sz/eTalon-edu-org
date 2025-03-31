import { ColumnDef } from '@tanstack/react-table';
import { Edit, Eye } from 'lucide-react';
import Link from 'next/link';

import { ActionsTableColumnModel } from '@/components/tables/columns/types/column-types';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import CustomInnerStateDialog from '@/components/dialogs/custom-innerstate-dialog';

export default function ActionsTableColumn<T>({
  id,
  size = 30,
  accessorKey,
  select = false,
  redirect = false,
  edit = false,
  redirection,
  dialogTitle = '',
}: ActionsTableColumnModel<T>): ColumnDef<T> {
  return {
    id: id,
    accessorKey: accessorKey,
    size: size,
    enableHiding: false,
    enableSorting: false,
    enableColumnFilter: false,
    header: ({ table }) => {
      return (
        select && (
          <Checkbox
            checked={table.getIsAllRowsSelected()}
            onCheckedChange={(value) => {
              table.toggleAllRowsSelected(Boolean(value));
            }}
          />
        )
      );
    },
    cell: ({ row, cell }) => {
      return (
        <div
          className='flex items-center justify-items-center gap-1'
          style={{
            minWidth: `${size}px`,
            width: cell.column.getSize(),
          }}
        >
          {select &&
            (() => {
              return (
                <Checkbox
                  checked={row.getIsSelected()}
                  className={cn('flex my-auto')}
                  onCheckedChange={(value) => {
                    row.toggleSelected(Boolean(value));
                  }}
                  aria-label='Select row'
                />
              );
            })()}
          {redirect && redirection && (
            <Link href={redirection(row.original)}>
              <Eye />
            </Link>
          )}
          {edit && (
            <CustomInnerStateDialog title={dialogTitle} triggerElement={<Edit />}>
              <div />
            </CustomInnerStateDialog>
          )}
        </div>
      );
    },
  };
}
