import { ColumnDef } from '@tanstack/react-table';

import { ColumnBaseModel } from '@/components/tables/columns/types/column-types';

export default function CountingTableColumn<T>({ id, size = 10 }: ColumnBaseModel<T>): ColumnDef<T> {
  return {
    id: id,
    cell: ({ row }) => (
      <div className='flex justify-end w-full'>
        <span className='flex justify-end w-[20px] ml-5 font-breuer-bold text-[18px] text-[#17181A]'>
          {Number(row.index + 1)}
        </span>
      </div>
    ),
    size: size,
  };
}
