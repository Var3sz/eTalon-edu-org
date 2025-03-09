export type ActionsTableColumnModel<TData> = {
  select?: boolean;
  redirect?: boolean;
  redirection?: (cell: any) => string;
} & ColumnBaseModel<TData>;

export type ColumnBaseModel<TData> = {
  id: string;
  accessorKey: string;
  headerTitle: string;
  size?: number;
};
