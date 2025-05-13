import { ColumnDef } from '@tanstack/react-table';
import { FieldValues } from 'react-hook-form';

import FormCheckboxInput from '@/components/form/form-checkbox-input';
import InputHeader from '@/components/tables/columns/components/headers/input-column-header';
import { ColumnInputModel } from '@/components/tables/columns/types/column-types';

export default function CheckboxTableColumn<FormType extends FieldValues, TableType>({
  id,
  accessorKey,
  size,
  disabled,
  headerTitle,
  formControl,
  inEdit,
}: ColumnInputModel<FormType, TableType>): ColumnDef<TableType> {
  return {
    id: id,
    size: size,
    accessorKey: accessorKey,
    header: ({ header, column, table }) => (
      <InputHeader headerTitle={headerTitle} header={header} column={column} table={table} />
    ),
    cell: ({ cell, row }) => {
      return (
        <div
          className='flex w-full justify-center'
          style={{
            minWidth: `${size}px`,
            width: cell.column.getSize(),
          }}
        >
          <FormCheckboxInput
            inEdit={inEdit}
            disabled={disabled}
            removeLabel
            formControl={formControl!}
            id={String(accessorKey)?.replace('[index]', `[${row.index}]`) as any}
          />
        </div>
      );
    },
  };
}
