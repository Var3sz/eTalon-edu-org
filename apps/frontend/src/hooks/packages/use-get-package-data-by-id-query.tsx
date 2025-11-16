'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { GetPackageById } from '@/api/models/serviceEndpoints/packages';
import { RawPackageDto } from '@/models/Api';

export function useGetPackageDataByIdQuery(packageId: string, token: string) {
  return useSuspenseQuery({
    queryKey: ['package', { id: packageId }],
    queryFn: () => GetPackageById<RawPackageDto>(packageId, token),
    staleTime: 60 * 60 * 1000,
  });
}
