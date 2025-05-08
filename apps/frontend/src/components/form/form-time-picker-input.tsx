import { ChangeEvent } from 'react';
import { Control, FieldValues, Path } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

type TimePickerInputProps<T extends FieldValues> = {
  id: string;
  formControl: Control<T>;
  label: string;
  placeholder?: string;
  removeLabel?: boolean;
  disabled?: boolean;
  required?: boolean;
  inEdit?: boolean;
};

const formatTime = (value: string) => {
  const raw = value.replace(/\D/g, '');
  const hours = raw.slice(0, 2);
  const minutes = raw.slice(2, 4);
  return [hours, minutes].filter(Boolean).join(':');
};

export default function FormTimePickerInput<T extends FieldValues>({
  id,
  formControl,
  label,
  placeholder = 'HH:mm',
  required = false,
  removeLabel = false,
  disabled = false,
  inEdit = true,
}: TimePickerInputProps<T>) {
  return (
    <FormField
      control={formControl}
      name={id as Path<T>}
      render={({ field }) => (
        <FormItem className={cn('flex flex-col gap-0.5')}>
          {!removeLabel && (
            <FormLabel className='font-normal'>
              {label}
              {required && inEdit && '*'}
            </FormLabel>
          )}
          <FormControl>
            {inEdit ? (
              <Input
                value={field.value || ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const formatted = formatTime(e.target.value);
                  field.onChange(formatted);
                }}
                maxLength={5}
                inputMode='numeric'
                placeholder={placeholder}
                className='w-[250px]'
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
