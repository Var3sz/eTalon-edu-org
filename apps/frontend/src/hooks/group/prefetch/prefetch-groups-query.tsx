import { QueryClient } from '@tanstack/react-query';

import { GetGroups } from '@/api/models/serviceEndpoints/helpers';

export const prefetchGroupsQuery = async (client: QueryClient) => {
  await client.prefetchQuery({ queryKey: ['groups'], queryFn: () => GetGroups() });
};
