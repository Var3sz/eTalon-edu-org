import { cloneElement, ReactElement, useState } from 'react';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

export type CustomInnerStateDialogModel = {
  title: string;
  retrieveValues?: (data: any) => void;
  children: ReactElement;
  triggerElement?: ReactElement;
  contentStyle?: string;
  headerStyle?: string;
  triggerStyle?: string;
  disabled?: boolean;
};

export default function CustomInnerStateDialog({
  title,
  contentStyle,
  children,
  triggerElement,
  headerStyle,
  triggerStyle,
  disabled = false,
}: CustomInnerStateDialogModel) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {triggerElement &&
        (disabled ? (
          <div>{triggerElement}</div>
        ) : (
          <DialogTrigger className={cn('', triggerStyle)}>{triggerElement}</DialogTrigger>
        ))}
      <DialogContent
        className={cn('min-w-fit bg-white', contentStyle)}
        onEscapeKeyDown={() => {
          setOpen(false);
        }}
      >
        <DialogHeader>
          <DialogTitle className={cn('text-3xl', headerStyle)}>{title}</DialogTitle>
        </DialogHeader>
        {/** Ha a  children komponens tartalmazza a  'retrieveValues' függvényt paraméterként, akkor ez automatikusan működni fog!!!!*/}
        {cloneElement(children, { setOpenChangeDialog: setOpen })}
      </DialogContent>
    </Dialog>
  );
}
