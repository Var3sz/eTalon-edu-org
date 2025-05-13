import { SelectDialogModel } from '@/components/dialogs/types/table-toolbar-dialog-props';

export type TableToolbarProps = {
  title?: string;
  addButton?: { text?: string; dialog?: SelectDialogModel };
};
