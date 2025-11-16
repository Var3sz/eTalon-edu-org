import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { Control, FieldValues } from 'react-hook-form';

import BinActionTableColumn from '@/components/tables/columns/components/action-columns/bin-action-table-column';
import CountingTableColumn from '@/components/tables/columns/components/action-columns/counting-table-column';
import TextInputColumn from '@/components/tables/columns/components/input-columns/text-input-column';
import { AddLocationFormModel } from '@/models/location/type';

export default function CreateLocationsColumns<FormType extends FieldValues>(
  formControl: Control<FormType>,
  inEdit: boolean,
  tableLength: number
): ColumnDef<AddLocationFormModel>[] {
  const columns = useMemo(
    () => [
      CountingTableColumn<AddLocationFormModel>({
        id: 'No.',
        headerTitle: '',
        accessorKey: '',
      }),
      TextInputColumn<FormType, AddLocationFormModel>({
        id: 'Helyszín megnevezése',
        headerTitle: 'Helyszín megnevezése',
        accessorKey: 'LocationList[index].description',
        formControl: formControl,
        inEdit: inEdit,
      }),
      BinActionTableColumn<AddLocationFormModel>({
        id: 'Törlés',
        accessorKey: 'removeRow',
      }),
    ],
    [tableLength]
  );

  return columns;
}
