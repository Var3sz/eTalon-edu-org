import { GetPackages } from '@/api/models/serviceEndpoints/packages';
import { PackageDto } from '@/models/Api';
import { QueryClient } from '@tanstack/react-query';

export const prefetchPackagesDataQuery = async (queryClient: QueryClient) => {
  await queryClient.prefetchQuery({
    queryKey: ['packages'],
    queryFn: () => GetPackages<PackageDto[]>(),
  });
};
