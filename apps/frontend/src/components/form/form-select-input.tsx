import { Check, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Control, FieldValues, Path } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

export type ItemModel = { label: string; value: string | number };

interface FormSelectInputProps<T extends FieldValues> {
  id: Path<T>;
  label: string;
  formControl: Control<T>;
  formSetValue: (
    name: any,
    value: any,
    options?:
      | Partial<{
          shouldValidate: boolean;
          shouldDirty: boolean;
          shouldTouch: boolean;
        }>
      | undefined
  ) => void;
  placeholder?: string;
  emptySelect?: string;
  items: ItemModel[];
}

export default function FormSelectInput<T extends FieldValues>({
  id,
  label,
  formControl,
  formSetValue,
  placeholder = '',
  emptySelect = '',
  items,
}: FormSelectInputProps<T>) {
  const [open, setOpen] = useState(false);

  return (
    <FormField
      control={formControl}
      name={id}
      render={({ field }) => (
        <FormItem className='flex flex-col'>
          <FormLabel>{label}</FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button variant='outline' className='w-[250px] justify-between'>
                {field.value ? items.find((item) => item.value === field.value)?.label : placeholder}
                <ChevronDown className='h-4 w-4 opacity-50' />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-[250px] p-0'>
              <Command>
                <CommandInput placeholder={placeholder} />
                <CommandList>
                  <CommandEmpty>
                    <span className='p-2 text-sm text-gray-500'>{emptySelect}</span>
                  </CommandEmpty>
                  {items?.map((item) => (
                    <CommandItem
                      key={item.value}
                      onSelect={() => {
                        field.onChange(item.value);
                        formSetValue && formSetValue(id, item.value);
                        setOpen(false);
                      }}
                    >
                      <Check className={cn('mr-2 h-4 w-4', field.value === item.value ? 'opacity-100' : 'opacity-0')} />
                      {item.label}
                    </CommandItem>
                  ))}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormDescription />
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
