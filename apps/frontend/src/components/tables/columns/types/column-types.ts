import { ColumnDef } from '@tanstack/react-table';
import { Control, FieldValues } from 'react-hook-form';

import { ItemModel } from '@/models/ui/form-props';

export type ActionsTableColumnModel<TData> = {
  select?: boolean;
  redirect?: boolean;
  edit?: boolean;
  redirection?: (cell: any) => string;
  dialogTitle?: string;
} & ColumnBaseModel<TData>;

export type HiddenTableColumnModel<TData> = Omit<ColumnBaseModel<TData>, 'headerTitle'>;

type InputModel<FormType extends FieldValues> = {
  required?: boolean;
  unitOfMeasureLabel?: string;
  formControl: Control<FormType>;
  disabled?: boolean;
  maxDecimal?: number;
  inEdit: boolean;
};

export type ColumnSelectModel<FormType extends FieldValues, TData> = {
  items: ItemModel[];
  placeholder: string;
  emptySelect: string;
  formSetValue?: (
    name: any,
    value: any,
    options?:
      | Partial<{
          shouldValidate: boolean;
          shouldDirty: boolean;
          shouldTouch: boolean;
        }>
      | undefined
  ) => void;
  valueType?: 'string' | 'number' | undefined;
  token?: string;
} & ColumnBaseModel<TData> &
  InputModel<FormType>;

export type ColumnInputModel<FormType extends FieldValues, TData> = ColumnBaseModel<TData> & InputModel<FormType>;

export type ColumnGroupModel<T> = {
  columns?: ColumnDef<T>[];
} & ColumnBaseModel<T>;

export type ClickableColumnModel<TData> = {
  dialogTitle?: string;
  courseId: string;
  token: string;
} & ColumnBaseModel<TData>;

export type CheckboxColumnModel<TData> = {
  hideHeader?: boolean;
  disabled?: boolean;
  inEdit?: boolean;
  isSingleSelection?: boolean;
} & ColumnBaseModel<TData>;

export type ColumnBinModel<TData> = Omit<ColumnBaseModel<TData>, 'headerTitle'> & {
  hideHeader?: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type ColumnBaseModel<TData> = {
  id: string;
  accessorKey: string;
  headerTitle: string;
  size?: number;
  cellStyle?: string;
};
