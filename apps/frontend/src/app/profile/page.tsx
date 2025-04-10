import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import ProfileClient from '@/components/profile/ProfileClient';
import { prefetchGetMyProfileQuery } from '@/hooks/profile/prefetch/prefetch-my-profile-query';

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  const queryClient = new QueryClient();

  await prefetchGetMyProfileQuery(queryClient, session!.user.id!, session!.tokens.accessToken!);

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        {session?.tokens.accessToken && session.user.id && (
          <ProfileClient userId={session.user.id} token={session.tokens.accessToken} />
        )}
      </HydrationBoundary>
    </div>
  );
}
