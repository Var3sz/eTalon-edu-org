import { PlusIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

type AddButtonProps = {
  title: string;
};

export default function AddButton({ title }: AddButtonProps) {
  return (
    <div className='flex self-center'>
      <Button variant='default'>
        {title}
        <PlusIcon />
      </Button>
    </div>
  );
}
