import { ColumnDef } from '@tanstack/react-table';
import { PlusIcon, Trash2 } from 'lucide-react';

import { ColumnBinModel } from '@/components/tables/columns/types/column-types';

export default function BinActionTableColumn<T>({
  id,
  accessorKey,
  size,
  hideHeader,
}: ColumnBinModel<T>): ColumnDef<T> {
  return {
    id: id,
    accessorKey: accessorKey,
    header: ({ table }) => {
      return (
        !hideHeader && (
          <PlusIcon
            className='cursor-pointer w-[50px]'
            size={20}
            stroke='#292D32'
            onClick={table.options.meta?.addRow}
          />
        )
      );
    },
    cell: ({ table, row }) => {
      return (
        <Trash2
          className='cursor-pointer w-[50px]'
          size={20}
          stroke='#292D32'
          onClick={() => table.options.meta?.removeRow(row.index)}
        />
      );
    },
    size: size,
  };
}
