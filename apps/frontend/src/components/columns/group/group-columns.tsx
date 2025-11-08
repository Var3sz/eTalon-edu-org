import CountingTableColumn from '@/components/tables/columns/components/action-columns/counting-table-column';
import TextTableColumn from '@/components/tables/columns/components/basic-columns/text-table-column';
import GroupActionsTableColumn from '@/components/tables/columns/components/special-columns/groups/group-actions-table-column';
import { GroupDto } from '@/models/Api';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';

export default function GroupColumns(token: string): ColumnDef<GroupDto>[] {
  const columns = useMemo(
    () => [
      CountingTableColumn<GroupDto>({
        id: 'No.',
        headerTitle: '',
        accessorKey: '',
      }),
      TextTableColumn<GroupDto>({
        id: 'description',
        accessorKey: 'description',
        headerTitle: 'Megnevezés',
        cellStyle: 'justify-center',
      }),
      GroupActionsTableColumn<GroupDto>({
        id: 'actions',
        accessorKey: 'action',
        headerTitle: 'Módosítás',
        token: token,
      }),
    ],
    []
  );

  return columns;
}
