import { ColumnDef } from '@tanstack/react-table';
import { ColumnBaseModel } from '../../types/column-types';
import { DataTableColumnHeader } from '../headers/data-table-column-header';

type NumberWithFilterTableColumnModel<T> = {
  unitOfMeasure?: string;
} & ColumnBaseModel<T>;

export default function NumberWithFilterTableColumn<T>({
  id,
  accessorKey,
  headerTitle,
  unitOfMeasure = '',
  size = 300,
}: NumberWithFilterTableColumnModel<T>): ColumnDef<T> {
  return {
    id: id,
    accessorKey: accessorKey,
    meta: { displayName: headerTitle },
    size: size,
    header: ({ column }) => <DataTableColumnHeader column={column} title={headerTitle} unitOfMeasure={unitOfMeasure} />,
    cell: ({ cell }) => {
      const value = cell.getValue() as number;
      return (
        <div className='flex justify-end' style={{ minWidth: `${size}px` }}>
          <span>{value}</span>
        </div>
      );
    },
  };
}
