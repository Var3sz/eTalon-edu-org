import { FieldValues } from 'react-hook-form';

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
  placeholder = '',
}: FormBaseProps<T>) {
  return (
    <FormField
      control={formControl}
      name={id as any}
      render={({ field }) => (
        <FormItem className='flex flex-col'>
          {removeLabel === false && (
            <FormLabel className='font-normal'>
              {label}
              {required && inEdit && '*'}
            </FormLabel>
          )}
          <FormControl>
            {inEdit ? (
              <Input placeholder={placeholder} {...field} type='number' className='w-[250px]' disabled={disabled} />
            ) : (
              <Label className='w-[250px]'>{field.value}</Label>
            )}
          </FormControl>
          <FormDescription />
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
