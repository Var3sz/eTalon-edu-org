import LoadingFullScreen from '@/app/loading';
import useInitManageGroupsClient from '@/hooks/group/use-init-manage-groups-client';
import { FormLocales } from '@/locales/form-locales';

import GroupColumns from '../columns/group/group-columns';
import CustomInnerStateDialog from '../dialogs/custom-innerstate-dialog';
import AddGroupsDialog from '../dialogs/group/add-groups-dialog';
import { SimpleTable } from '../tables/simple-table';
import AddButton from '../ui/add-button';

type ManageGroupsClientModel = {
  token: string;
};

export default function ManageGroupsClient({ token }: ManageGroupsClientModel) {
  const { groups, isPending, DeleteGroup } = useInitManageGroupsClient(token);

  const groupColumns = GroupColumns(DeleteGroup, token);

  return (
    <div className='flex flex-col gap-5'>
      {isPending && <LoadingFullScreen />}
      <div className='flex gap-5'>
        <span className='font-bold text-3xl'>Csoportok kezelése</span>
        <CustomInnerStateDialog
          title={FormLocales.groups.add}
          triggerElement={<AddButton asChild title={FormLocales.groups.add} />}
        >
          <AddGroupsDialog token={token} />
        </CustomInnerStateDialog>
      </div>

      <SimpleTable columns={groupColumns} defaultData={groups ?? []} />
    </div>
  );
}
