import { ColumnDef } from '@tanstack/react-table';

import { DataTableColumnHeader } from '@/components/tables/columns/components/headers/data-table-column-header';
import { ColumnBaseModel } from '@/components/tables/columns/types/types';
import OccupancyProgressBar from '@/components/ui/progress-bar';

export default function ProgressBarColumn<T>({
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
      return <OccupancyProgressBar value={value} />;
    },
  };
}
