import { ColumnDef } from '@tanstack/react-table';
import { FieldValues } from 'react-hook-form';

import FormSwitchInput from '@/components/form/form-switch-input';
import InputHeader from '@/components/tables/columns/components/headers/input-column-header';
import { ColumnInputModel } from '@/components/tables/columns/types/column-types';

export default function SwitchTableColumn<FormType extends FieldValues, TableType>({
  id,
  accessorKey,
  disabled,
  headerTitle,
  formControl,
  inEdit,
  size,
}: ColumnInputModel<FormType, TableType>): ColumnDef<TableType> {
  return {
    id: id,
    accessorKey: accessorKey,
    size: size,
    header: ({ header, column, table }) => (
      <InputHeader headerTitle={headerTitle} header={header} column={column} table={table} />
    ),
    cell: ({ row, cell }) => {
      return (
        <div
          className='flex items-center justify-center gap-1'
          style={{
            minWidth: `${size}px`,
            width: cell.column.getSize(),
          }}
        >
          <FormSwitchInput
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
