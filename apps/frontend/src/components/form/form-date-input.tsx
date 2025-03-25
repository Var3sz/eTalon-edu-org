import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

type FormDateInputProps<T extends FieldValues> = {
  id: Path<T>;
  formControl: Control<T>;
  label: string;
  placeholder?: string;
};

export default function FormDateInput<T extends FieldValues>({
  id,
  formControl,
  label,
  placeholder,
}: FormDateInputProps<T>) {
  const { field } = useController({ name: id, control: formControl });

  return (
    <FormField
      control={formControl}
      name={id}
      render={() => (
        <FormItem className='flex flex-col'>
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                className={cn('w-[320px] justify-start', !field.value && 'text-muted-foreground')}
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
        </FormItem>
      )}
    />
  );
}
