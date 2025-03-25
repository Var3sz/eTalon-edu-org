import { ColumnDef } from '@tanstack/react-table';
import { Control, FieldValues, Path } from 'react-hook-form';

import FormTextInput from '@/components/form/form-text-input';
import { SimpleTableColumnHeader } from '@/components/tables/columns/components/headers/simple-table-column.header';
import { ColumnBaseModel } from '@/components/tables/columns/types/types';

type NumberInputColumProps<TableType, FormType extends FieldValues> = {
  fieldId: Path<FormType>;
  formControl: Control<FormType>;
} & ColumnBaseModel<TableType>;

export default function NumberInputColumn<TableType, FormType extends FieldValues>({
  id,
  accessorKey,
  size = 200,
  headerTitle,
  fieldId,
  formControl,
}: NumberInputColumProps<TableType, FormType>): ColumnDef<TableType> {
  return {
    id: id,
    accessorKey: accessorKey,
    size: size,
    header: () => <SimpleTableColumnHeader title={headerTitle} />,
    cell: () => {
      return <FormTextInput id={fieldId} label='' formControl={formControl} />;
    },
  };
}
