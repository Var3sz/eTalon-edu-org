import { useSuspenseQuery } from '@tanstack/react-query';

import { GetLocations } from '@/api/models/serviceEndpoints/helpers';
import { LocationDto } from '@/models/Api';

export default function useGetLocationsQuery(token: string) {
  const { data: locationsResponse } = useSuspenseQuery({
    queryKey: ['locations'],
    queryFn: () => GetLocations<LocationDto[]>(token),
    staleTime: 60 * 60 * 1000,
  });

  if (locationsResponse.status === 200) {
    return locationsResponse.data;
  }
}
