import ConfirmDialog from '@/components/dialogs/confirm-dialog';
import { Cell, Row } from '@tanstack/react-table';
import { Eye, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

type PackageActionsTableCell<T> = {
  cell: Cell<T, unknown>;
  row: Row<T>;
  deletable: boolean;
  redirect?: boolean;
  deleteFunction: (id: number) => void;
  redirection?: (cell: any) => string;
};

export default function PackageActionsTableCell<T>({
  cell,
  row,
  redirect,
  redirection,
  deletable,
  deleteFunction,
}: PackageActionsTableCell<T>) {
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  return (
    <div className='flex items-center justify-center gap-2'>
      {redirect && redirection && (
        <Link href={redirection(row.original)}>
          <Eye />
        </Link>
      )}
      {deletable && (
        <ConfirmDialog
          triggerElement={<Trash2 />}
          open={alertOpen}
          onOpenChange={setAlertOpen}
          title='Figyelem!'
          description='Biztosan szeretné inaktiválni a kiválasztott csomagot?'
          cancelAction={() => setAlertOpen(false)}
          confirmAction={() => {
            deleteFunction(row.getValue('id') as number);
          }}
        />
      )}
    </div>
  );
}
