import { FieldValues } from 'react-hook-form';

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FormBaseProps } from '@/models/ui/form-props';

export default function FormTextInput<T extends FieldValues>({
  id,
  label,
  formControl,
  placeholder = '',
}: FormBaseProps<T>) {
  return (
    <FormField
      control={formControl}
      name={id}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} {...field} type='text' />
          </FormControl>
          <FormDescription />
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
