import { FieldValues, Path } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
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
  divStyle = '',
  inputStyle = '',
}: FormBaseProps<T>) {
  return (
    <FormField
      control={formControl}
      name={id as Path<T>}
      render={({ field }) => (
        <FormItem className={cn('flex flex-col gap-0.5')}>
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
                className={cn('w-[250px] bg-white', inputStyle)}
                disabled={disabled}
              />
            ) : (
              <Label className={cn('w-[250px] font-normal', inputStyle)}>{field.value}</Label>
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
