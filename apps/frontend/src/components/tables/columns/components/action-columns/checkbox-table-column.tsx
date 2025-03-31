import { ColumnDef } from '@tanstack/react-table';

import { CheckboxColumnModel } from '@/components/tables/columns/types/column-types';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

export default function CheckboxTableColumn<T>({
  id,
  isSingleSelection = false,
  size = 10,
  accessorKey,
  disabled = false,
  hideHeader = false,
  inEdit = true,
}: CheckboxColumnModel<T>): ColumnDef<T> {
  return {
    id: id,
    accessorKey: accessorKey,
    header: ({ table, header }) =>
      hideHeader ? (
        <div />
      ) : (
        <div
          className={cn(`flex flex-row text-clip overflow-hidden`)}
          style={{
            minWidth: '15px',
            width: header.getSize(),
          }}
        >
          {isSingleSelection === false ? (
            <Checkbox
              checked={table.getIsAllPageRowsSelected()}
              className={cn('flex my-auto')}
              onCheckedChange={(value) => table.toggleAllPageRowsSelected(Boolean(value))}
              aria-label='Select all'
            />
          ) : (
            <div />
          )}
        </div>
      ),
    cell: ({ row, table }) => {
      return (
        inEdit && (
          <Checkbox
            checked={row.getIsSelected()}
            className={cn('flex my-auto ml-1 ')}
            onCheckedChange={(value) => {
              if (isSingleSelection) {
                table.toggleAllRowsSelected(false);
              }
              row.toggleSelected(Boolean(value));
            }}
            aria-label='Select row'
            disabled={disabled}
          />
        )
      );
    },
    size: size,
  };
}
