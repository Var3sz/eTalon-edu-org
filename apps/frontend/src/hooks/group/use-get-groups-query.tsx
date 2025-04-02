import { useSuspenseQuery } from '@tanstack/react-query';

import { GetGroups } from '@/api/models/serviceEndpoints/helpers';
import { GroupDTO } from '@/models/Api';

export default function useGetGroupsQuery() {
  const { data: groupsResponse } = useSuspenseQuery({
    queryKey: ['groups'],
    queryFn: () => GetGroups<GroupDTO[]>(),
  });

  if (groupsResponse.status === 200) {
    return groupsResponse.data;
  }
}
