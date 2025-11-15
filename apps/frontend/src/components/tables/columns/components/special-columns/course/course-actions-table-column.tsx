import { ColumnDef } from '@tanstack/react-table';
import { ActionsTableColumnModel } from '../../../types/column-types';
import { Checkbox } from '@/components/ui/checkbox';
import CourseActionsTableCell from './course-actions-table-cell';

type CourseActionsTableColumnModel<T> = {
  deleteFunction?: (id: number) => void;
  confirmTitle?: string;
  confirmDesc?: string;
} & ActionsTableColumnModel<T>;

export default function CourseActionsTableColumn<T>({
  id,
  accessorKey,
  size,
  select = false,
  deletable = false,
  deleteFunction,
  redirection,
}: CourseActionsTableColumnModel<T>): ColumnDef<T> {
  return {
    id: id,
    accessorKey: accessorKey,
    size: size,
    enableHiding: false,
    enableSorting: false,
    enableColumnFilter: false,
    header: ({ table }) => {
      return (
        select && (
          <Checkbox
            checked={table.getIsAllRowsSelected()}
            onCheckedChange={(value) => {
              table.toggleAllRowsSelected(Boolean(value));
            }}
          />
        )
      );
    },
    cell: ({ row, cell }) => (
      <CourseActionsTableCell
        cell={cell}
        row={row}
        deletable={deletable}
        deleteFunction={deleteFunction!}
        redirect={true}
        redirection={redirection!}
      />
    ),
  };
}
