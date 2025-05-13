import PackagesClient from '@/components/packages/packages-client';
import { prefetchLocationsQuery } from '@/hooks/location/prefetch/prefetch-locations-query';
import { prefetchPackagesDataQuery } from '@/hooks/packages/prefetch/prefetch-packages-data-query';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

export default async function Page() {
  const queryClient = new QueryClient();

  await prefetchPackagesDataQuery(queryClient);
  await prefetchLocationsQuery(queryClient);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PackagesClient />
    </HydrationBoundary>
  );
}
