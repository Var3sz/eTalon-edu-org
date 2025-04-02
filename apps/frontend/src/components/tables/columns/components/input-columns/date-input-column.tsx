import { ColumnDef } from '@tanstack/react-table';
import { FieldValues } from 'react-hook-form';

import FormDateInput from '@/components/form/form-date-input';
import InputHeader from '@/components/tables/columns/components/headers/input-column-header';
import { ColumnInputModel } from '@/components/tables/columns/types/column-types';

export default function DateInputColumn<FormType extends FieldValues, TableType>({
  id,
  disabled,
  required,
  accessorKey,
  headerTitle,
  formControl,
  inEdit,
}: ColumnInputModel<FormType, TableType>): ColumnDef<TableType> {
  return {
    id: id,
    accessorKey: accessorKey as string,
    header: ({ header, column, table }) => (
      <InputHeader header={header} required={required} column={column} table={table} headerTitle={headerTitle} />
    ),
    cell: ({ row }) => {
      return (
        <FormDateInput
          removeLabel
          inEdit={inEdit}
          required={required}
          disabled={disabled}
          formControl={formControl!}
          id={(accessorKey as string).replace('[index]', `[${row.index}]`)! as any}
        />
      );
    },
  };
}
