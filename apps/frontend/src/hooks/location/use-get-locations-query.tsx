import { useSuspenseQuery } from '@tanstack/react-query';

import { GetLocations } from '@/api/models/serviceEndpoints/helpers';
import { LocationDto } from '@/models/Api';

export default function useGetLocationsQuery() {
  const { data: locationsResponse } = useSuspenseQuery({
    queryKey: ['locations'],
    queryFn: () => GetLocations<LocationDto[]>(),
  });

  if (locationsResponse.status === 200) {
    return locationsResponse.data;
  }
}
