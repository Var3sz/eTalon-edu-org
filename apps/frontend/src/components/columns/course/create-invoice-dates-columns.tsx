import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { Control, FieldValues } from 'react-hook-form';

import BinActionTableColumn from '@/components/tables/columns/components/action-columns/bin-action-table-column';
import CountingTableColumn from '@/components/tables/columns/components/action-columns/counting-table-column';
import DateInputColumn from '@/components/tables/columns/components/input-columns/date-input-column';
import TextInputColumn from '@/components/tables/columns/components/input-columns/text-input-column';
import { CreateInvoiceDateFormModel } from '@/models/course/types';

export default function CreateInvoiceDatesColumns<FormType extends FieldValues>(
  formControl: Control<FormType>,
  inEdit: boolean,
  tableLength: number
): ColumnDef<CreateInvoiceDateFormModel>[] {
  const columns = useMemo(
    () => [
      CountingTableColumn<CreateInvoiceDateFormModel>({
        id: 'No.',
        headerTitle: '',
        accessorKey: '',
      }),
      DateInputColumn<FormType, CreateInvoiceDateFormModel>({
        id: 'Számlázás dátuma',
        headerTitle: 'Számlázás dátuma',
        accessorKey: 'InvoiceDateList[index].date',
        formControl: formControl,
        inEdit: inEdit,
      }),
      TextInputColumn<FormType, CreateInvoiceDateFormModel>({
        id: 'Megjegyzés',
        headerTitle: 'Megjegyzés',
        accessorKey: 'InvoiceDateList[index].description',
        formControl: formControl,
        inEdit: inEdit,
      }),
      BinActionTableColumn<CreateInvoiceDateFormModel>({
        id: 'Törlés',
        accessorKey: 'removeRow',
      }),
    ],
    [tableLength]
  );

  return columns;
}
