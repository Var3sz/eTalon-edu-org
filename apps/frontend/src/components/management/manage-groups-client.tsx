import useGetGroupsQuery from '@/hooks/group/use-get-groups-query';
import { SimpleTable } from '../tables/simple-table';
import GroupColumns from '../columns/group/group-columns';
import { useEffect } from 'react';

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
    <div>
      <SimpleTable columns={groupColumns} defaultData={groups ?? []} />
    </div>
  );
}
