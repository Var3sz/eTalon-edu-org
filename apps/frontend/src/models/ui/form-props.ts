import { Control, FieldValues } from 'react-hook-form';

export type ItemModel = { label: string; value: string | number };

export type FormSelectInputProps<T extends FieldValues> = {
  emptySelect?: string;
  items: ItemModel[];
} & FormBaseProps<T>;

export type FormBaseProps<T extends FieldValues> = {
  id: string;
  label?: string;
  formControl: Control<T>;
  placeholder?: string;
  type?: string;
  inEdit?: boolean;
  required?: boolean;
  disabled?: boolean;
  removeLabel?: boolean;
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
  inputStyle?: string;
};
