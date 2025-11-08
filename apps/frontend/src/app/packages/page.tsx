import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getServerSession } from 'next-auth';

import PackagesClient from '@/components/packages/packages-client';
import { prefetchGroupsQuery } from '@/hooks/group/prefetch/prefetch-groups-query';
import { prefetchLocationsQuery } from '@/hooks/location/prefetch/prefetch-locations-query';
import { prefetchPackagesDataQuery } from '@/hooks/packages/prefetch/prefetch-packages-data-query';
import { authOptions } from '@/lib/authOptions';

export default async function Page() {
  const queryClient = new QueryClient();
  const session = await getServerSession(authOptions);

  await prefetchPackagesDataQuery(queryClient, session?.tokens.accessToken ?? '');
  await prefetchLocationsQuery(queryClient, session?.tokens.accessToken ?? '');
  await prefetchGroupsQuery(queryClient, session?.tokens.accessToken ?? '');

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PackagesClient />
    </HydrationBoundary>
  );
}
