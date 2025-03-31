import { Control, FieldValues } from 'react-hook-form';

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

export type ColumnInputModel<FormType extends FieldValues, TData> = ColumnBaseModel<TData> & InputModel<FormType>;

export type ClickableColumnModel<TData> = {
  dialogTitle?: string;
} & ColumnBaseModel<TData>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type ColumnBaseModel<TData> = {
  id: string;
  accessorKey: string;
  headerTitle: string;
  size?: number;
};
