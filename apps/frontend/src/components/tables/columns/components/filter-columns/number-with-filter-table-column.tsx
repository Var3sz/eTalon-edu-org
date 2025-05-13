import { ColumnDef } from '@tanstack/react-table';
import { ColumnBaseModel } from '../../types/column-types';
import { DataTableColumnHeader } from '../headers/data-table-column-header';

export default function NumberWithFilterTableColumn<T>({
  id,
  accessorKey,
  headerTitle,
  size = 300,
}: ColumnBaseModel<T>): ColumnDef<T> {
  return {
    id: id,
    accessorKey: accessorKey,
    size: size,
    header: ({ column }) => <DataTableColumnHeader column={column} title={headerTitle} />,
    cell: ({ cell }) => {
      const value = cell.getValue() as number;
      return (
        <div style={{ minWidth: `${size}px` }}>
          <span>{value}</span>
        </div>
      );
    },
  };
}
