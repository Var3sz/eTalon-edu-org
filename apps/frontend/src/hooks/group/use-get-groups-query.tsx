import { useSuspenseQuery } from '@tanstack/react-query';

import { GetGroups } from '@/api/models/serviceEndpoints/helpers';
import { GroupDto } from '@/models/Api';

export default function useGetGroupsQuery() {
  const { data: groupsResponse } = useSuspenseQuery({
    queryKey: ['groups'],
    queryFn: () => GetGroups<GroupDto[]>(),
  });

  if (groupsResponse.status === 200) {
    return groupsResponse.data;
  }
}
