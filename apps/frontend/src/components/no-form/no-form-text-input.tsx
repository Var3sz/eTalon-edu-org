import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Dispatch, SetStateAction } from 'react';

type NoFormTextInputModel = {
  value: string | null;
  setValue: Dispatch<SetStateAction<string | null>>;
  inEdit?: boolean;
  text?: string;
  required?: boolean;
  inputStyle?: string;
  textStyle?: string;
  disabled?: boolean;
  withLabel?: boolean;
};

export default function NoFormTextInput({
  value,
  setValue,
  text,
  required = false,
  inEdit = false,
  inputStyle = '',
  textStyle = '',
  disabled = false,
  withLabel = false,
}: NoFormTextInputModel) {
  return (
    <div className='flex flex-col'>
      {withLabel && (
        <Label className={cn('font-bold text-black text-[14px] ', textStyle)}>
          {text}
          {required && inEdit === true && '*'}
        </Label>
      )}
      <Input
        className={cn('w-[250px]', inputStyle)}
        type='text'
        disabled={disabled}
        value={value!}
        onChange={(event) => {
          if (event.target.value === '') {
            setValue(null);
          } else {
            setValue(event.target.value);
          }
        }}
      />
    </div>
  );
}
