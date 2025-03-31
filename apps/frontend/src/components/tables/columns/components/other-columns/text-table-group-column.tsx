import { ColumnDef } from '@tanstack/react-table';

import { ColumnGroupModel } from '@/components/tables/columns/types/column-types';

export default function TextTableGroupColumn<T>({
  id,
  accessorKey,
  headerTitle,
  size = 200,
  columns,
}: ColumnGroupModel<T>): ColumnDef<T> {
  return {
    id: id,
    accessorKey: accessorKey,
    header: () => <span>{headerTitle}</span>,
    size: size,
    columns: columns,
  };
}
