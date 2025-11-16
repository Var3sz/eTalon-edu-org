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
  divStyle = '',
  labelStyle = '',
  type = 'text',
}: FormBaseProps<T>) {
  return (
    <FormField
      control={formControl}
      name={id as Path<T>}
      render={({ field }) => (
        <FormItem className={cn('flex flex-col gap-0.5', divStyle)}>
          {removeLabel === false && (
            <FormLabel className={cn('font-bold', labelStyle)}>
              {label}
              {required && inEdit && '*'}
            </FormLabel>
          )}
          <FormControl>
            {inEdit ? (
              <Input
                className={cn('w-[250px] bg-white', inputStyle)}
                {...field}
                type={type}
                placeholder={placeholder}
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
