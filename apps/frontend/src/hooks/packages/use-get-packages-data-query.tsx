import { GetPackages } from '@/api/models/serviceEndpoints/packages';
import { PackageDto } from '@/models/Api';
import { useSuspenseQuery } from '@tanstack/react-query';

export default function useGetPackagesDataQuery() {
  const { data: packagesResponse } = useSuspenseQuery({
    queryKey: ['packages'],
    queryFn: () => GetPackages<PackageDto[]>(),
  });

  if (packagesResponse.status === 200) {
    return packagesResponse.data;
  }
}
