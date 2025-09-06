import { FieldValues, Path } from 'react-hook-form';

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormBaseProps } from '@/models/ui/form-props';

export default function FormNumberInput<T extends FieldValues>({
  id,
  label,
  formControl,
  inEdit = false,
  disabled = false,
  required = false,
  removeLabel = false,
  unitOfMeasureLabel = '',
  placeholder = '',
}: FormBaseProps<T>) {
  return (
    <FormField
      control={formControl}
      name={id as Path<T>}
      render={({ field }) => (
        <FormItem className='flex flex-col gap-0.5'>
          {removeLabel === false && (
            <FormLabel className='font-bold'>
              {label}
              {unitOfMeasureLabel && `(${unitOfMeasureLabel})`}
              {required && inEdit && '*'}
            </FormLabel>
          )}
          <FormControl>
            {inEdit ? (
              <Input
                placeholder={placeholder}
                {...field}
                type='number'
                className='w-[250px] bg-white'
                disabled={disabled}
              />
            ) : (
              <Label className='w-[250px] font-normal'>{field.value}</Label>
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
