import { Label } from '@radix-ui/react-label';
import { CheckIcon, ChevronDown, SearchIcon } from 'lucide-react';
import { Dispatch, SetStateAction, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { ItemModel } from '@/models/ui/form-props';

type NoFormSelectInputModel = {
  inEdit?: boolean;
  emptySelect?: string;
  iconColor?: string;
  valueType?: 'number' | 'string';
  placeholder?: string;
  removeLabel?: boolean;
  items: ItemModel[];
  disabled?: boolean;
  required?: boolean;
  divStyle?: string;
  textStyle?: string;
  inputTextStyle?: string;
  shouldSkipDefaultFormUpdate?: boolean;
  text: string;
  specialSearch?: boolean;
  confirmChange?: boolean;
  confirmTitle?: string;
  confirmText?: string;
  unitOfMeasureLabel?: string;
  setValue: Dispatch<SetStateAction<number | null>>;
  callbackFunction?: (newValue: any) => void;
  value: string | number | null;
};

export default function NoFormSelectInput({
  inEdit,
  emptySelect,
  items,
  disabled,
  required,
  text,
  specialSearch = false,
  inputTextStyle,
  iconColor = '#809FB8',
  confirmChange,
  textStyle,
  placeholder,
  unitOfMeasureLabel,
  setValue,
  callbackFunction,
  value,
  valueType,
}: NoFormSelectInputModel) {
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);

  const [newSelectedItem, setNewSelectedItem] = useState<ItemModel | null>(null);

  const expandedItems = [{ value: null, description: placeholder }, ...items] as ItemModel[];

  const getSelectedValue = () => {
    return expandedItems.find((item) => item.value === value)?.label ?? placeholder;
  };

  const onSelectFuntion = (item: ItemModel) => {
    setValue(Number(item.value));
    callbackFunction && callbackFunction(valueType === 'string' ? item.value : Number(item.value));
    setOpen(false);
  };

  return (
    <div className='flex flex-col'>
      <Label className={cn('text-[14px] text-black font-bold text-opacity-90', textStyle)}>
        {text}
        {unitOfMeasureLabel && `(${unitOfMeasureLabel})`}
        {required && inEdit === true && '*'}
      </Label>
      <Popover open={open} onOpenChange={!disabled ? setOpen : () => {}}>
        <PopoverTrigger asChild disabled={disabled}>
          <Button
            asChild
            variant='outline'
            role='combobox'
            className={cn('w-[260px] text-left  aria-[invalid=true]:border-[#dc2626]', inputTextStyle)}
            disabled={disabled}
          >
            <div className={`flex${disabled === true ? ' text-opacity-50' : ''}`}>
              <span className='text-left font-normal overflow-hidden truncate'>{getSelectedValue()}</span>
              {specialSearch ? (
                <SearchIcon className='ml-auto' stroke={iconColor} />
              ) : (
                <ChevronDown className='ml-auto' stroke={iconColor} />
              )}
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className='p-0 w-[260px]'>
          <Command className='w-[260px] pt-2'>
            <CommandInput
              placeholder={placeholder}
              className='h-7 w-[260px] bg-[#F9FAFB] text-[#9F9F9F] mb-2 px-2 border border-solid border-input'
              onValueChange={(value) => {
                value;
              }}
            />
            <CommandEmpty>{emptySelect}</CommandEmpty>
            <CommandGroup className='max-h-[200px] overflow-auto'>
              {expandedItems.map((item) => (
                <CommandItem
                  value={item.label}
                  key={item.value}
                  onSelect={() => {
                    item.value !== value
                      ? confirmChange
                        ? (setNewSelectedItem(item), setConfirmOpen(true))
                        : onSelectFuntion(item)
                      : setOpen(false);
                  }}
                >
                  {item.label}
                  <CheckIcon className={cn('ml-auto h-4 w-4', item.value === value ? 'opacity-100' : 'opacity-0')} />
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
