import { Dispatch, ReactElement, SetStateAction } from 'react';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

type CustomDialogProps = {
  title: string;
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  triggerElement: ReactElement;
  children: ReactElement;
};

export default function CustomDialog({ title, open, onOpenChange, triggerElement, children }: CustomDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger>{triggerElement}</DialogTrigger>
      <DialogContent className={cn('bg-white min-w-fit')} onEscapeKeyDown={() => onOpenChange(false)}>
        <DialogHeader>
          <DialogTitle className='text-3xl'>{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
