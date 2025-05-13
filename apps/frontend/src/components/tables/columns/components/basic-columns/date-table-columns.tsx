import { ColumnDef } from '@tanstack/react-table';
import { ColumnBaseModel } from '../../types/column-types';
import { SimpleTableColumnHeader } from '../headers/simple-table-column.header';
import { DatePatterns } from '@/api/consts/date-patterns';
import { cn, formatDateCustom } from '@/lib/utils';

export default function DateTableColumn<T>({
  id,
  accessorKey,
  headerTitle,
  cellStyle = '',
  size = 300,
}: ColumnBaseModel<T>): ColumnDef<T> {
  return {
    id: id,
    accessorKey: accessorKey,
    size: size,
    header: ({ column }) => <SimpleTableColumnHeader title={headerTitle} />,
    cell: ({ cell }) => {
      try {
        const date = cell.getValue() as Date;
        return (
          <span className={cn('flex justify-center ', cellStyle)}>{formatDateCustom(date, DatePatterns.DATE)}</span>
        );
      } catch (e) {
        return <></>;
      }
    },
  };
}
