import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { Control, FieldValues } from 'react-hook-form';

import BinActionTableColumn from '@/components/tables/columns/components/action-columns/bin-action-table-column';
import CountingTableColumn from '@/components/tables/columns/components/action-columns/counting-table-column';
import TextInputColumn from '@/components/tables/columns/components/input-columns/text-input-column';
import { AddGroupFormModel } from '@/models/group/types';

export default function CreateGroupsColumns<FormType extends FieldValues>(
  formControl: Control<FormType>,
  inEdit: boolean,
  tableLength: number
): ColumnDef<AddGroupFormModel>[] {
  const columns = useMemo(
    () => [
      CountingTableColumn<AddGroupFormModel>({
        id: 'No.',
        headerTitle: '',
        accessorKey: '',
      }),
      TextInputColumn<FormType, AddGroupFormModel>({
        id: 'Csoport megnevezése',
        headerTitle: 'Csoport megnevezése',
        accessorKey: 'GroupList[index].description',
        formControl: formControl,
        inEdit: inEdit,
      }),
      BinActionTableColumn<AddGroupFormModel>({
        id: 'Törlés',
        accessorKey: 'removeRow',
      }),
    ],
    [tableLength]
  );

  return columns;
}
