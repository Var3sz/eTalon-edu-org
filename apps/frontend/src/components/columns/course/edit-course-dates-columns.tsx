'use client';

import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { Control, FieldValues } from 'react-hook-form';

import BinActionTableColumn from '@/components/tables/columns/components/action-columns/bin-action-table-column';
import CountingTableColumn from '@/components/tables/columns/components/action-columns/counting-table-column';
import DateInputColumn from '@/components/tables/columns/components/input-columns/date-input-column';
import TextInputColumn from '@/components/tables/columns/components/input-columns/text-input-column';
import { CourseDateFormModel } from '@/models/course/types';

export default function EditCourseDatesColumns<FormType extends FieldValues>(
  formControl: Control<FormType>
): ColumnDef<CourseDateFormModel>[] {
  return useMemo(
    () => [
      CountingTableColumn<CourseDateFormModel>({
        id: 'No.',
        headerTitle: '',
        accessorKey: 'CourseDates[index].Id',
      }),
      DateInputColumn<FormType, CourseDateFormModel>({
        id: 'Óra dátuma',
        headerTitle: 'Óra dátuma',
        formControl: formControl,
        required: true,
        accessorKey: 'CourseDates[index].date',
        inEdit: true,
      }),
      TextInputColumn<FormType, CourseDateFormModel>({
        id: 'Leírás',
        headerTitle: 'Leírás',
        formControl: formControl,
        required: true,
        accessorKey: 'CourseDates[index].description',
        inEdit: true,
      }),
      BinActionTableColumn<CourseDateFormModel>({
        id: 'Törlés',
        accessorKey: 'removeRow',
      }),
    ],
    []
  );
}
