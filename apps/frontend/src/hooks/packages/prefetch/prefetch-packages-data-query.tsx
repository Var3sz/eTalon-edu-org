import { QueryClient } from '@tanstack/react-query';

import { GetPackages } from '@/api/models/serviceEndpoints/packages';
import { PackageDto } from '@/models/Api';

export const prefetchPackagesDataQuery = async (queryClient: QueryClient) => {
  await queryClient.prefetchQuery({
    queryKey: ['packages'],
    queryFn: () => GetPackages<PackageDto[]>(),
  });
};
