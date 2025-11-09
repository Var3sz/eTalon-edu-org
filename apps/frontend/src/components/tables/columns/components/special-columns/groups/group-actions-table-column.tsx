import { ColumnDef } from '@tanstack/react-table';

import { ActionsTableColumnModel } from '../../../types/column-types';
import { SimpleTableColumnHeader } from '../../headers/simple-table-column.header';
import GroupActionsTableCell from './group-actions-table-cell';

type GroupActionsTableColumnModel<T> = {
  token: string;
} & ActionsTableColumnModel<T>;

export default function GroupActionsTableColumn<T>({
  id,
  accessorKey,
  headerTitle,
  deletable = true,
  edit = true,
  token,
}: GroupActionsTableColumnModel<T>): ColumnDef<T> {
  return {
    id: id,
    accessorKey: accessorKey,
    header: () => <SimpleTableColumnHeader title={headerTitle} />,
    cell: ({ row, cell }) => (
      <GroupActionsTableCell cell={cell} row={row} token={token} edit={edit} deletable={deletable} />
    ),
  };
}
