export type ActionsTableColumnModel<TData> = {
  select?: boolean;
  redirect?: boolean;
  redirection?: (cell: any) => string;
} & ColumnBaseModel<TData>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type ColumnBaseModel<TData> = {
  id: string;
  accessorKey: string;
  headerTitle: string;
  size?: number;
};
