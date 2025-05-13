import { Dispatch, ReactElement, SetStateAction } from 'react';

export type SelectDialogModel = {
  title: string;
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  triggerElement?: ReactElement;
  children?: ReactElement;
  headerStyle?: string;
  bodyStyle?: string;
};
