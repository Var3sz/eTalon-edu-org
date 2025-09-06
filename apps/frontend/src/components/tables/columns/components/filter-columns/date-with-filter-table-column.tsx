import { ColumnDef } from '@tanstack/react-table';

import { DatePatterns } from '@/api/consts/date-patterns';
import { cn, formatDateCustom } from '@/lib/utils';

import { ColumnBaseModel } from '../../types/column-types';
import { DataTableColumnHeader } from '../headers/data-table-column-header';

export default function DateWithFilterTableColumn<T>({
  id,
  accessorKey,
  headerTitle,
  cellStyle = '',
  size = 300,
}: ColumnBaseModel<T>): ColumnDef<T> {
  return {
    id: id,
    meta: { displayName: headerTitle },
    accessorKey: accessorKey,
    size: size,
    header: ({ column }) => <DataTableColumnHeader column={column} title={headerTitle} />,
    cell: ({ cell }) => {
      try {
        const date = cell.getValue() as Date;
        return (
          <span className={cn('flex justify-center text-lg', cellStyle)}>
            {formatDateCustom(date, DatePatterns.DATE)}
          </span>
        );
      } catch (e) {
        return <div />;
      }
    },
  };
}
