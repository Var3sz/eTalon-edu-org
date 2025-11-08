import { ColumnDef } from '@tanstack/react-table';
import { Eye } from 'lucide-react';
import Link from 'next/link';

import { ActionsTableColumnModel } from '@/components/tables/columns/types/column-types';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

export default function ActionsTableColumn<T>({
  id,
  size = 30,
  accessorKey,
  select = false,
  redirect = false,
  redirection,
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
    cell: ({ row }) => {
      return (
        <div className='flex items-center justify-center gap-1'>
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
        </div>
      );
    },
  };
}
