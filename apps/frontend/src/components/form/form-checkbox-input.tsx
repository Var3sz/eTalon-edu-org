import { FieldValues, Path } from 'react-hook-form';

import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { FormBaseProps } from '@/models/ui/form-props';

export default function FormCheckboxInput<T extends FieldValues>({
  id,
  label,
  formControl,
  formSetValue,
  inEdit = false,
  required = false,
  disabled = false,
  removeLabel = false,
}: FormBaseProps<T>) {
  return (
    <FormField
      control={formControl}
      name={id as Path<T>}
      render={({ field }) => {
        const isDisabled = !inEdit || disabled;
        return (
          <FormItem className='flex flex-col'>
            {!removeLabel && (
              <FormLabel className='text-normal'>
                {label}
                {required && inEdit && '*'}
              </FormLabel>
            )}
            <FormControl>
              <Checkbox
                checked={field.value}
                disabled={isDisabled}
                onCheckedChange={(checked) => {
                  if (isDisabled) return;
                  field.onChange(checked);
                  formSetValue && formSetValue(id, checked);
                }}
                className={isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
