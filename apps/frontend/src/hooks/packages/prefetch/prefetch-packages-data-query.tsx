import { QueryClient } from '@tanstack/react-query';

import { GetPackages } from '@/api/models/serviceEndpoints/packages';
import { PackageDto } from '@/models/Api';

export const prefetchPackagesDataQuery = async (queryClient: QueryClient, token: string) => {
  await queryClient.prefetchQuery({
    queryKey: ['packages'],
    queryFn: () => GetPackages<PackageDto[]>(token),
  });
};
