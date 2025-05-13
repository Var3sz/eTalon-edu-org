import { Dispatch, SetStateAction, ReactElement } from 'react';

export type SelectDialogModel = {
  title: string;
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  triggerElement?: ReactElement;
  children?: ReactElement;
  headerStyle?: string;
  bodyStyle?: string;
};
