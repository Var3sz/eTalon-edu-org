import BinActionTableColumn from '@/components/tables/columns/components/action-columns/bin-action-table-column';
import CountingTableColumn from '@/components/tables/columns/components/action-columns/counting-table-column';
import DateInputColumn from '@/components/tables/columns/components/input-columns/date-input-column';
import TextInputColumn from '@/components/tables/columns/components/input-columns/text-input-column';
import { CreateCourseDateFormModel } from '@/models/course/types';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { Control, FieldValues } from 'react-hook-form';

export default function CreateCourseDatesColumns<FormType extends FieldValues>(
  formControl: Control<FormType>,
  inEdit: boolean,
  tableLength: number
): ColumnDef<CreateCourseDateFormModel>[] {
  const columns = useMemo(
    () => [
      CountingTableColumn<CreateCourseDateFormModel>({
        id: 'No.',
        headerTitle: '',
        accessorKey: '',
      }),
      DateInputColumn<FormType, CreateCourseDateFormModel>({
        id: 'Óra dátuma',
        headerTitle: 'Óra dátuma',
        accessorKey: 'CourseDateList[index].date',
        formControl: formControl,
        inEdit: inEdit,
      }),
      TextInputColumn<FormType, CreateCourseDateFormModel>({
        id: 'Óra leírása',
        headerTitle: 'Óra leírása',
        accessorKey: 'CourseDateList[index].description',
        formControl: formControl,
        inEdit: inEdit,
      }),
      BinActionTableColumn<CreateCourseDateFormModel>({
        id: 'Törlés',
        accessorKey: 'removeRow',
      }),
    ],
    [tableLength]
  );

  return columns;
}
