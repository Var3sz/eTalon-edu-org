import { Column, Header, Table } from '@tanstack/react-table';

export type TableHeaderPropsModel<TData, TValue> = {
  header: Header<TData, TValue>;
};

export type TableColumnPropsModel<TData, TValue> = {
  column: Column<TData, TValue>;
};
export type TablePropsModel<T> = {
  table: Table<T>;
};

export type TableDataModel<T> = {
  data: T[];
};

export type TablePropsWithHeaderModel<TData, TValue> = TablePropsModel<TData> & TableHeaderPropsModel<TData, TValue>;
