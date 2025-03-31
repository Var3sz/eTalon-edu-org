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
    header: () => (
      <div className='flex items-center justify-center h-full'>
        <span>{headerTitle}</span>
      </div>
    ),
    size: size,
    columns: columns,
  };
}
