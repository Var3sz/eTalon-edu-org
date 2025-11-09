import { Cell, Row } from '@tanstack/react-table';
import { Edit2, Trash2 } from 'lucide-react';
import { useState } from 'react';

import ConfirmDialog from '@/components/dialogs/confirm-dialog';
import CustomInnerStateDialog from '@/components/dialogs/custom-innerstate-dialog';
import EditGroupDialog from '@/components/dialogs/group/edit-group-dialog';
import { FormLocales } from '@/locales/form-locales';
import { GroupDto } from '@/models/Api';

type GroupActionsTableCellModel<T> = {
  cell: Cell<T, unknown>;
  row: Row<T>;
  edit: boolean;
  deletable: boolean;
  token: string;
  DeleteGroup: (data: GroupDto) => void;
};

export default function GroupActionsTableCell<T>({
  edit,
  deletable,
  token,
  row,
  DeleteGroup,
}: GroupActionsTableCellModel<T>) {
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  return (
    <div className='w-full flex justify-evenly'>
      {edit && (
        <CustomInnerStateDialog title={FormLocales.groups.edit} triggerElement={<Edit2 />}>
          <EditGroupDialog rowData={row.original as GroupDto} token={token} />
        </CustomInnerStateDialog>
      )}
      {deletable && (
        <ConfirmDialog
          triggerElement={<Trash2 />}
          open={alertOpen}
          onOpenChange={setAlertOpen}
          title='Figyelem!'
          description='Biztosan törölni szeretné a kiválasztott csoportot?'
          cancelAction={() => setAlertOpen(false)}
          confirmAction={() => {
            DeleteGroup(row.original as GroupDto);
          }}
        />
      )}
    </div>
  );
}
