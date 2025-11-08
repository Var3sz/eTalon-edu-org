import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getServerSession } from 'next-auth';

import ProfileClient from '@/components/profile/ProfileClient';
import { prefetchGroupsQuery } from '@/hooks/group/prefetch/prefetch-groups-query';
import { prefetchLocationsQuery } from '@/hooks/location/prefetch/prefetch-locations-query';
import { prefetchGetMyProfileQuery } from '@/hooks/profile/prefetch/prefetch-my-profile-query';
import { authOptions } from '@/lib/authOptions';

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  const queryClient = new QueryClient();

  await prefetchGroupsQuery(queryClient, session?.tokens.accessToken ?? '');
  await prefetchLocationsQuery(queryClient, session?.tokens.accessToken ?? '');
  await prefetchGetMyProfileQuery(queryClient, session!.user.id!, session!.tokens.accessToken!);

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        {session?.tokens.accessToken && session.user.id && <ProfileClient userId={session.user.id} />}
      </HydrationBoundary>
    </div>
  );
}
