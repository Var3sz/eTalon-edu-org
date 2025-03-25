import { Control, FieldValues, Path } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';

interface FormSwitchInputProps<T extends FieldValues> {
  id: Path<T>;
  label: string;
  formControl: Control<T>;
  formSetValue?: (id: string, value: boolean) => void;
}

export default function FormSwitchInput<T extends FieldValues>({
  id,
  label,
  formControl,
  formSetValue,
}: FormSwitchInputProps<T>) {
  return (
    <FormField
      control={formControl}
      name={id}
      render={({ field }) => (
        <FormItem className='flex flex-col '>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Switch
              checked={field.value}
              onCheckedChange={(checked) => {
                field.onChange(checked);
                formSetValue && formSetValue(id, checked);
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
