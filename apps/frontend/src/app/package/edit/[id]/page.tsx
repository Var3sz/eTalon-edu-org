import EditPackageClient from '@/components/packages/edit-package-clients';
import { prefetchGroupsQuery } from '@/hooks/group/prefetch/prefetch-groups-query';
import { prefetchLocationsQuery } from '@/hooks/location/prefetch/prefetch-locations-query';
import { prefetchPackageDataByIdQuery } from '@/hooks/packages/prefetch/prefetch-package-data-by-id-query';
import { authOptions } from '@/lib/authOptions';
import { BaseServerPropsWithId } from '@/models/page/types';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getServerSession } from 'next-auth';

export default async function Page({ params }: BaseServerPropsWithId) {
  const queryClient = new QueryClient();
  const session = await getServerSession(authOptions);

  await prefetchGroupsQuery(queryClient, session?.tokens.accessToken ?? '');
  await prefetchLocationsQuery(queryClient, session?.tokens.accessToken ?? '');
  await prefetchPackageDataByIdQuery(queryClient, params.id, session?.tokens.accessToken ?? '');

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EditPackageClient packageId={params.id} />
    </HydrationBoundary>
  );
}
