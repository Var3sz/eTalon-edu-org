import { ColumnDef } from '@tanstack/react-table';

import { DataTableColumnHeader } from '@/components/tables/columns/components/headers/data-table-column-header';
import { ColumnBaseModel } from '@/components/tables/columns/types/column-types';
import { cn } from '@/lib/utils';

export default function TextWithFilterTableColumn<T>({
  id,
  accessorKey,
  headerTitle,
  size = 300,
  cellStyle = '',
}: ColumnBaseModel<T>): ColumnDef<T> {
  return {
    id: id,
    accessorKey: accessorKey,
    meta: { displayName: headerTitle },
    size: size,
    header: ({ column }) => <DataTableColumnHeader column={column} title={headerTitle} />,
    cell: ({ cell }) => {
      const value = cell.getValue() as string;
      return (
        <div className={cn('text-lg', cellStyle)} style={{ minWidth: `${size}px` }}>
          <span>{value}</span>
        </div>
      );
    },
  };
}
