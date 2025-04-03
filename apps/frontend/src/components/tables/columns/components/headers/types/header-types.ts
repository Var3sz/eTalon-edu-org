import {
  TableColumnPropsModel,
  TableHeaderPropsModel,
  TablePropsModel,
} from '@/components/tables/columns/types/table-props';

export type HeaderBaseModel = {
  headerTitle: string;
  headerTextStyle?: string;
  headerDivStyle?: string;
};

export type InputHeaderModel<TData, TValue> = {
  required?: boolean;
  unitOfMeasureLabel?: string;
} & HeaderBaseModel &
  TableHeaderPropsModel<TData, TValue> &
  TablePropsModel<TData> &
  TableColumnPropsModel<TData, TValue>;
