import { ColumnDef } from '@tanstack/react-table';
import { FieldValues } from 'react-hook-form';

import FormTextInput from '@/components/form/form-text-input';
import InputHeader from '@/components/tables/columns/components/headers/input-column-header';
import { ColumnInputModel } from '@/components/tables/columns/types/column-types';

export default function TextInputColumn<FormType extends FieldValues, TableType>({
  id,
  accessorKey,
  size = 200,
  headerTitle,
  formControl,
  inEdit,
  disabled = false,
  required,
}: ColumnInputModel<FormType, TableType>): ColumnDef<TableType> {
  return {
    id: id,
    accessorKey: accessorKey,
    size: size,
    header: ({ header, column, table }) => (
      <InputHeader header={header} headerTitle={headerTitle} required={required} column={column} table={table} />
    ),
    cell: ({ row }) => (
      <div className='my-2'>
        <FormTextInput
          inEdit={inEdit}
          removeLabel
          formControl={formControl!}
          disabled={disabled}
          id={String(accessorKey)?.replace('[index]', `[${row.index}]`)}
        />
      </div>
    ),
  };
}
