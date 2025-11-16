import { useSuspenseQuery } from '@tanstack/react-query';

import { GetPackages } from '@/api/models/serviceEndpoints/packages';
import { PackageDto } from '@/models/Api';

export default function useGetPackagesDataQuery(token: string) {
  return useSuspenseQuery({
    queryKey: ['packages'],
    queryFn: () => GetPackages<PackageDto[]>(token),
    staleTime: 60 * 60 * 1000,
  });
}
