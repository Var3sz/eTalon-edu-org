export type ActionsTableColumnModel<TData> = {
  select?: boolean;
  redirect?: boolean;
  edit?: boolean;
  redirection?: (cell: any) => string;
  dialogTitle?: string;
} & ColumnBaseModel<TData>;

export type HiddenTableColumnModel<TData> = Omit<ColumnBaseModel<TData>, 'headerTitle'>;

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
