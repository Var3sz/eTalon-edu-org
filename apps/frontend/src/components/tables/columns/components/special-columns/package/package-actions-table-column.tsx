import { ColumnDef } from '@tanstack/react-table';

import { Checkbox } from '@/components/ui/checkbox';

import { ActionsTableColumnModel } from '../../../types/column-types';
import PackageActionsTableCell from './package-actions-table-cell';

type PackageActionsTableColumnModel<T> = {
  deleteFunction?: (id: number) => void;
  confirmTitle?: string;
  confirmDesc?: string;
} & ActionsTableColumnModel<T>;

export default function PackageActionsTableColumn<T>({
  id,
  accessorKey,
  size,
  select = false,
  deletable = false,
  deleteFunction,
  redirection,
  redirect,
}: PackageActionsTableColumnModel<T>): ColumnDef<T> {
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
      <PackageActionsTableCell
        cell={cell}
        row={row}
        redirect
        redirection={redirection!}
        deletable={deletable}
        deleteFunction={deleteFunction!}
      />
    ),
  };
}
