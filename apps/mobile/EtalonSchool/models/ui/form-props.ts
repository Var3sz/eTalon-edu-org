import { FieldValues, Control } from 'react-hook-form';

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
  unitOfMeasureLabel?: string;
  secureTextEntry?: boolean;
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
  divStyle?: string;
  labelStyle?: string;
};
