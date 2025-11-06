import { GetPackages } from '@/api/models/serviceEndpoints/packages';
import { PackageDto } from '@/models/Api';
import { useSuspenseQuery } from '@tanstack/react-query';

export default function useGetPackagesDataQuery(token: string) {
  return useSuspenseQuery({
    queryKey: ['packages'],
    queryFn: () => GetPackages<PackageDto[]>(token),
    staleTime: 60 * 60 * 1000,
  });
}
