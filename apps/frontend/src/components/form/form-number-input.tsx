import { FieldValues } from 'react-hook-form';

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FormBaseProps } from '@/models/ui/form-props';
import { Label } from '@/components/ui/label';

export default function FormNumberInput<T extends FieldValues>({
  id,
  label,
  formControl,
  inEdit = false,
  disabled = false,
  required = false,
  placeholder = '',
}: FormBaseProps<T>) {
  return (
    <FormField
      control={formControl}
      name={id}
      render={({ field }) => (
        <FormItem className='flex flex-col'>
          <FormLabel className='font-normal'>
            {label}
            {required && inEdit && '*'}
          </FormLabel>
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
