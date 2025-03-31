import { ColumnDef } from '@tanstack/react-table';

import { SimpleTableColumnHeader } from '@/components/tables/columns/components/headers/simple-table-column.header';
import { ColumnBaseModel } from '@/components/tables/columns/types/column-types';

export default function TextTableColumn<T>({ id, accessorKey, headerTitle, size }: ColumnBaseModel<T>): ColumnDef<T> {
  return {
    id: id,
    accessorKey: accessorKey,
    size: size,
    header: () => <SimpleTableColumnHeader title={headerTitle} />,
    cell: ({ cell }) => {
      const value = cell.getValue() as string;
      return <span>{value}</span>;
    },
  };
}
