import { Dispatch, ReactElement, SetStateAction } from 'react';

import { DialogLocales } from '@/locales/dialog-locales';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';

export type ConfirmDialogModel = {
  title: string;
  confirmAction: () => void;
  cancelAction: () => void;
  triggerElement?: ReactElement;
  description?: string | ReactElement;
  confirmText?: string;
  cancelText?: string;
};

export type ConfigDialogStates = {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
} & ConfirmDialogModel;

export default function ConfirmDialog({
  title,
  description,
  onOpenChange,
  cancelAction,
  confirmAction,
  triggerElement,
  cancelText = DialogLocales.CANCEL,
  confirmText = DialogLocales.CONFIRM,
  open,
}: ConfigDialogStates) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      {triggerElement && <AlertDialogTrigger>{triggerElement}</AlertDialogTrigger>}
      <AlertDialogContent
        onEscapeKeyDown={() => {
          onOpenChange(false);
          cancelAction();
        }}
      >
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description && <AlertDialogDescription>{description}</AlertDialogDescription>}
        </AlertDialogHeader>
        <AlertDialogFooter className='mt-3'>
          <AlertDialogCancel onClick={cancelAction}>{cancelText}</AlertDialogCancel>
          <AlertDialogAction onClick={confirmAction}>{confirmText}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
