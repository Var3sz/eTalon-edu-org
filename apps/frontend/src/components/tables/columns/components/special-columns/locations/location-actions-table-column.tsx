import { ColumnDef } from '@tanstack/react-table';

import { ActionsTableColumnModel } from '../../../types/column-types';
import { SimpleTableColumnHeader } from '../../headers/simple-table-column.header';
import LocationActionsTableCell from './location-actions-table-cell';

type LocationActionsTableColumnModel<T> = {
  token: string;
} & ActionsTableColumnModel<T>;

export default function LocationActionsTableColumn<T>({
  id,
  accessorKey,
  headerTitle,
  edit = true,
  deletable = true,
  token,
}: LocationActionsTableColumnModel<T>): ColumnDef<T> {
  return {
    id: id,
    accessorKey: accessorKey,
    header: () => <SimpleTableColumnHeader title={headerTitle} />,
    cell: ({ row, cell }) => (
      <LocationActionsTableCell cell={cell} row={row} token={token} edit={edit} deletable={deletable} />
    ),
  };
}
