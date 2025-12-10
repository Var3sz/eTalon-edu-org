import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getServerSession } from 'next-auth';

import CoursePlannerClient from '@/components/course/planner/course-planner-client';
import { prefetchCoursesDataQuery } from '@/hooks/courses/course-plan/prefetch/prefetch-courses-data-query';
import { prefetchGroupsQuery } from '@/hooks/group/prefetch/prefetch-groups-query';
import { prefetchLocationsQuery } from '@/hooks/location/prefetch/prefetch-locations-query';
import { authOptions } from '@/lib/authOptions';

export default async function Page() {
  const queryClient = new QueryClient();
  const session = await getServerSession(authOptions);

  await prefetchCoursesDataQuery(queryClient, session?.tokens.accessToken ?? '');
  await prefetchGroupsQuery(queryClient, session?.tokens.accessToken ?? '');
  await prefetchLocationsQuery(queryClient, session?.tokens.accessToken ?? '');

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CoursePlannerClient />
    </HydrationBoundary>
  );
}
