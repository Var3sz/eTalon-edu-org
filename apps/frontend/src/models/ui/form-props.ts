import { Control, FieldValues, Path } from 'react-hook-form';

export type FormBaseProps<T extends FieldValues> = {
  id: Path<T>;
  label: string;
  formControl: Control<T>;
  placeholder?: string;
  type?: string;
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
};
