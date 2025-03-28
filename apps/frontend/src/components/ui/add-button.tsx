import { PlusIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type AddButtonProps = {
  title: string;
  asChild?: boolean;
  buttonStyle?: string;
};

export default function AddButton({ title, asChild = false, buttonStyle = '' }: AddButtonProps) {
  return (
    <Button asChild={asChild} className={cn('text-black h-[30px]', buttonStyle)}>
      <div className='flex gap-2'>
        <PlusIcon />
        {title}
      </div>
    </Button>
  );
}
