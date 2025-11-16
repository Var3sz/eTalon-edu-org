import { GetPackageById } from '@/api/models/serviceEndpoints/packages';
import { RawPackageDto } from '@/models/Api';
import { QueryClient } from '@tanstack/react-query';

export const prefetchPackageDataByIdQuery = async (client: QueryClient, packageId: string, token: string) => {
  await client.prefetchQuery({
    queryKey: ['package', { id: packageId }],
    queryFn: () => GetPackageById<RawPackageDto>(packageId, token),
  });
};
