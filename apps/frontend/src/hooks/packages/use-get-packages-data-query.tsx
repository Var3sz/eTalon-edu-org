import { GetPackages } from '@/api/models/serviceEndpoints/packages';
import { PackageDto } from '@/models/Api';
import { useSuspenseQuery } from '@tanstack/react-query';

export default function useGetPackagesDataQuery(token: string) {
  const { data: packagesResponse } = useSuspenseQuery({
    queryKey: ['packages'],
    queryFn: () => GetPackages<PackageDto[]>(token),
  });

  if (packagesResponse.status === 200) {
    return packagesResponse.data;
  }
}
