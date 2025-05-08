import { FieldValues, Path } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { FormBaseProps } from '@/models/ui/form-props';

export default function FormSwitchInput<T extends FieldValues>({
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
            {removeLabel === false && (
              <FormLabel className='font-normal'>
                {label}
                {required && inEdit && '*'}
              </FormLabel>
            )}
            <FormControl>
              <Switch
                checked={field.value}
                disabled={isDisabled}
                onCheckedChange={(checked) => {
                  if (isDisabled) return;
                  field.onChange(checked);
                  formSetValue?.(id, checked);
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
