import { QueryClient } from '@tanstack/react-query';

import { GetLocations } from '@/api/models/serviceEndpoints/helpers';
import { LocationDto } from '@/models/Api';

export const prefetchLocationsQuery = async (client: QueryClient, token: string) => {
  await client.prefetchQuery({ queryKey: ['locations'], queryFn: () => GetLocations<LocationDto[]>(token) });
};
