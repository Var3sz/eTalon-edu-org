import { FieldValues, Path } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { FormBaseProps } from '@/models/ui/form-props';

export default function FormTextInput<T extends FieldValues>({
  id,
  label,
  formControl,
  inEdit = false,
  required = false,
  disabled = false,
  removeLabel = false,
  placeholder = '',
  inputStyle = '',
}: FormBaseProps<T>) {
  return (
    <FormField
      control={formControl}
      name={id as Path<T>}
      render={({ field }) => (
        <FormItem className='flex flex-col gap-0.5'>
          {removeLabel === false && (
            <FormLabel className='font-normal'>
              {label}
              {required && inEdit && '*'}
            </FormLabel>
          )}
          <FormControl>
            {inEdit ? (
              <Input
                className={cn('w-[250px]', inputStyle)}
                {...field}
                type='text'
                placeholder={placeholder}
                disabled={disabled}
              />
            ) : (
              <Label className='w-[250px]'>{field.value}</Label>
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
