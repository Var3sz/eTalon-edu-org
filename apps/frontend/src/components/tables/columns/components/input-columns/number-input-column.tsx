import { ColumnDef } from '@tanstack/react-table';
import { FieldValues } from 'react-hook-form';

import FormNumberInput from '@/components/form/form-number-input';
import InputHeader from '@/components/tables/columns/components/headers/input-column-header';
import { ColumnInputModel } from '@/components/tables/columns/types/column-types';

export default function NumberInputColumn<FormType extends FieldValues, TableType>({
  id,
  accessorKey,
  size = 200,
  headerTitle,
  formControl,
  inEdit,
  disabled = false,
  unitOfMeasureLabel,
  required,
}: ColumnInputModel<FormType, TableType>): ColumnDef<TableType> {
  return {
    id: id,
    accessorKey: accessorKey,
    size: size,
    header: ({ header, column, table }) => (
      <InputHeader
        header={header}
        headerTitle={headerTitle}
        required={required}
        column={column}
        table={table}
        unitOfMeasureLabel={unitOfMeasureLabel}
      />
    ),
    cell: ({ row }) => (
      <div className='my-2'>
        <FormNumberInput
          inEdit={inEdit}
          removeLabel
          formControl={formControl!}
          disabled={disabled}
          unitOfMeasureLabel={unitOfMeasureLabel}
          id={String(accessorKey)?.replace('[index]', `[${row.index}]`)}
        />
      </div>
    ),
  };
}
