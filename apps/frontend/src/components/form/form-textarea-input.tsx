'use client';
import { Label } from '@radix-ui/react-dropdown-menu';
import { Control, FieldValues, Path } from 'react-hook-form';

import { cn } from '@/lib/utils';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Textarea } from '../ui/textarea';

type FormTextAreaInputModel<T extends FieldValues> = {
  formControl: Control<T>;
  id: string;
  inEdit?: boolean;
  placeholder?: string;
  removeLabel?: boolean;
  unitOfMeasureLabel?: string;
  disabled?: boolean;
  maxLength?: number;
  inputType?: 'number' | 'text';
  required?: boolean;
  divStyle?: string;
  textStyle?: string;
  label?: string;
  inputStyle?: string;
};
export default function FormTextAreaInput<T extends FieldValues>({
  divStyle,
  formControl,
  inEdit = true,
  placeholder,
  unitOfMeasureLabel,
  removeLabel = false,
  maxLength = 200,
  required = false,
  disabled = false,
  id,
  inputStyle,
  label,
  textStyle,
}: FormTextAreaInputModel<T>) {
  return (
    <FormField
      control={formControl}
      name={id as Path<T>}
      render={({ field }) => (
        <FormItem className={cn('flex-col flex my-auto h-max', divStyle)}>
          {removeLabel === false && (
            <FormLabel
              className={cn('text-black text-opacity-90 text-[14px] font-breuer-regular font-bold ', textStyle)}
            >
              {label}
              {unitOfMeasureLabel && `(${unitOfMeasureLabel})`}
              {required && '*'}
            </FormLabel>
          )}
          {inEdit ? (
            <FormControl>
              <Textarea
                placeholder={placeholder}
                maxLength={maxLength}
                disabled={disabled}
                className={cn(
                  'w-[250px] min-h-fit text-[14px] text-black font-breuer-bold resize-none aria-[invalid=true]:border-[#dc2626] bg-white',
                  inputStyle
                )}
                {...field}
              />
            </FormControl>
          ) : (
            <Label
              className={cn(
                'w-[250px] h-auto text-[14px] text-black font-breuer-bold resize-none aria-[invalid=true]:border-[#dc2626]',
                inputStyle
              )}
            >
              {field.value}
            </Label>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
