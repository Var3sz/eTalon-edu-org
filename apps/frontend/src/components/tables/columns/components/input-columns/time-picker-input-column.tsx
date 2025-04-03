import { ColumnDef } from '@tanstack/react-table';
import { FieldValues } from 'react-hook-form';

import FormTimePickerInput from '@/components/form/form-time-picker-input';
import InputHeader from '@/components/tables/columns/components/headers/input-column-header';
import { ColumnInputModel } from '@/components/tables/columns/types/column-types';

export default function TimePickerInputColumn<FormType extends FieldValues, TableType>({
  id,
  accessorKey,
  size = 120,
  headerTitle,
  formControl,
  inEdit,
  required,
}: ColumnInputModel<FormType, TableType>): ColumnDef<TableType> {
  return {
    id: id,
    accessorKey: accessorKey,
    size: size,
    header: ({ header, column, table }) => (
      <InputHeader headerTitle={headerTitle} header={header} table={table} column={column} required={required} />
    ),
    cell: ({ row }) => (
      <div className='my-2'>
        <FormTimePickerInput
          inEdit={inEdit}
          removeLabel
          formControl={formControl!}
          id={String(accessorKey)?.replace('[index]', `[${row.index}]`)}
          label={headerTitle}
        />
      </div>
    ),
  };
}
