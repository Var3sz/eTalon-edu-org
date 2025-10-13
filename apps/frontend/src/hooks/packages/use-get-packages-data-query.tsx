import { useSuspenseQuery } from '@tanstack/react-query';

import { GetPackages } from '@/api/models/serviceEndpoints/packages';
import { PackageDto } from '@/models/Api';

export default function useGetPackagesDataQuery() {
  const { data: packagesResponse } = useSuspenseQuery({
    queryKey: ['packages'],
    queryFn: () => GetPackages<PackageDto[]>(),
  });

  if (packagesResponse.status === 200) {
    return packagesResponse.data;
  }
}
