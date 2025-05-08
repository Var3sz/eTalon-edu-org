import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { FieldValues, Path, useController } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { FormBaseProps } from '@/models/ui/form-props';

export default function FormDateInput<T extends FieldValues>({
  id,
  formControl,
  label,
  placeholder,
  inEdit = false,
  required = false,
  disabled = false,
  removeLabel = false,
}: FormBaseProps<T>) {
  const { field } = useController({ name: id as Path<T>, control: formControl });

  return (
    <FormField
      control={formControl}
      name={id as Path<T>}
      render={() => (
        <FormItem className='flex flex-col gap-0.5'>
          {removeLabel === false && (
            <FormLabel className='font-normal'>
              {label}
              {required && inEdit && '*'}
            </FormLabel>
          )}
          {inEdit ? (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  disabled={disabled}
                  variant='outline'
                  className={cn('w-[250px] justify-start', !field.value && 'text-muted-foreground')}
                >
                  <CalendarIcon className='mr-2 h-4 w-4' />
                  {field.value ? format(new Date(field.value), 'yyyy.MM.dd') : <span>{placeholder}</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0' align='start'>
                <Calendar
                  mode='single'
                  selected={field.value ? new Date(field.value) : undefined}
                  onSelect={(date) => field.onChange(date?.toISOString() ?? '')}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          ) : (
            <Label className='w-[250px]'>
              {field.value ? format(new Date(field.value), 'yyyy.MM.dd') : <span>{placeholder}</span>}
            </Label>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
