import { useEffect } from 'react';

import useGetGroupsQuery from '@/hooks/group/use-get-groups-query';
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
  const groups = useGetGroupsQuery(token);

  const groupColumns = GroupColumns(token);

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('tab', 'groups');
    window.history.replaceState(null, '', url.toString());
  }, []);

  return (
    <div className='flex flex-col gap-5'>
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
