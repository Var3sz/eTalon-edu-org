import { FieldValues } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { FormBaseProps } from '@/models/ui/form-props';

export default function FormTextInput<T extends FieldValues>({
  id,
  label,
  formControl,
  placeholder = '',
  inputStyle = '',
}: FormBaseProps<T>) {
  return (
    <FormField
      control={formControl}
      name={id}
      render={({ field }) => (
        <FormItem className='flex flex-col gap-0.5'>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} {...field} type='text' className={cn('w-[250px]', inputStyle)} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
