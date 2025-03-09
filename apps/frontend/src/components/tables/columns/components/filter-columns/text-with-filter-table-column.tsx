import { ColumnDef } from '@tanstack/react-table';

import { DataTableColumnHeader } from '@/components/tables/columns/components/headers/data-table-column-header';
import { ColumnBaseModel } from '@/components/tables/columns/types/types';

export default function TextWithFilterTableColumn<T>({
  id,
  accessorKey,
  headerTitle,
  size,
}: ColumnBaseModel<T>): ColumnDef<T> {
  return {
    id: id,
    accessorKey: accessorKey,
    size: size,
    header: ({ column }) => <DataTableColumnHeader column={column} title={headerTitle} />,
    cell: ({ cell }) => {
      const value = cell.getValue() as string;
      return <span>{value}</span>;
    },
  };
}
