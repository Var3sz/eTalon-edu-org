import { ColumnDef } from '@tanstack/react-table';

import { HiddenTableColumnModel } from '@/components/tables/columns/types/types';

export default function HiddenTableColumn<T>({ id, accessorKey, size = 0 }: HiddenTableColumnModel<T>): ColumnDef<T> {
  return {
    header: () => {
      return <div />;
    },
    cell: () => <div />,
    id: id,
    size: size,
    accessorKey: accessorKey,
  };
}
