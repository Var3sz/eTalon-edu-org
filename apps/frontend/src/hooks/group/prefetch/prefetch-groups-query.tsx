import { QueryClient } from '@tanstack/react-query';

import { GetGroups } from '@/api/models/serviceEndpoints/helpers';
import { GroupDto } from '@/models/Api';

export const prefetchGroupsQuery = async (client: QueryClient, token: string) => {
  await client.prefetchQuery({ queryKey: ['groups'], queryFn: () => GetGroups<GroupDto[]>(token) });
};
