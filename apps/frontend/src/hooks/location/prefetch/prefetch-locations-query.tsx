import { QueryClient } from '@tanstack/react-query';

import { GetLocations } from '@/api/models/serviceEndpoints/helpers';

export const prefetchLocationsQuery = async (client: QueryClient) => {
  await client.prefetchQuery({ queryKey: ['locations'], queryFn: () => GetLocations() });
};
