import { useSuspenseQuery } from '@tanstack/react-query';

import { GetGroups } from '@/api/models/serviceEndpoints/helpers';
import { GroupDto } from '@/models/Api';

export default function useGetGroupsQuery(token: string) {
  const { data: groupsResponse } = useSuspenseQuery({
    queryKey: ['groups'],
    queryFn: () => GetGroups<GroupDto[]>(token),
  });

  if (groupsResponse.status === 200) {
    return groupsResponse.data;
  }
}
