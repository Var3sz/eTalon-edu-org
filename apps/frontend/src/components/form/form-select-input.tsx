import { Check, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { FieldValues, Path } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { FormSelectInputProps, ItemModel } from '@/models/ui/form-props';

function getLabelFromValue(items: ItemModel[], value: string | number | undefined | null): string {
  const found = items.find((item) => item.value === value);
  return found?.label ?? '';
}

export default function FormSelectInput<T extends FieldValues>({
  id,
  label,
  formControl,
  formSetValue,
  items,
  inEdit = false,
  required = false,
  disabled = false,
  placeholder = '',
  emptySelect = '',
}: FormSelectInputProps<T>) {
  const [open, setOpen] = useState(false);

  return (
    <FormField
      control={formControl}
      name={id as Path<T>}
      render={({ field }) => (
        <FormItem className='flex flex-col gap-0.5'>
          <FormLabel className='font-bold'>
            {label}
            {required && inEdit && '*'}
          </FormLabel>
          {inEdit ? (
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button variant='outline' className='w-[250px] bg-white justify-between' disabled={disabled}>
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
                        <Check
                          className={cn('mr-2 h-4 w-4', field.value === item.value ? 'opacity-100' : 'opacity-0')}
                        />
                        {item.label}
                      </CommandItem>
                    ))}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          ) : (
            <Label className='w-[250px] font-normal'>{getLabelFromValue(items, field.value)}</Label>
          )}

          <FormDescription />
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
