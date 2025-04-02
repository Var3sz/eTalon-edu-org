import { ColumnDef } from '@tanstack/react-table';
import { FieldValues } from 'react-hook-form';

import FormSelectInput from '@/components/form/form-select-input';
import InputHeader from '@/components/tables/columns/components/headers/input-column-header';
import { ColumnSelectModel } from '@/components/tables/columns/types/column-types';

export default function SelectTableColumn<FormType extends FieldValues, TableType>({
  id,
  items,
  placeholder,
  emptySelect,
  formSetValue,
  accessorKey,
  headerTitle,
  required,
  formControl,
  disabled,
  inEdit = true,
}: ColumnSelectModel<FormType, TableType>): ColumnDef<TableType> {
  return {
    id: id,
    accessorKey: accessorKey,
    header: ({ header, column, table }) => (
      <InputHeader headerTitle={headerTitle} header={header} required={required} column={column} table={table} />
    ),
    cell: ({ row }) => {
      return (
        <div className='my-2 '>
          <FormSelectInput
            label=''
            inEdit={inEdit}
            placeholder={placeholder}
            emptySelect={emptySelect}
            formSetValue={formSetValue}
            items={items}
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
