import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import CoursePlannerClient from '@/components/course/planner/course-planner-client';
import { prefetchCoursesDataQuery } from '@/hooks/courses/course-plan/prefetch/prefetch-courses-data-query';
import { prefetchGroupsQuery } from '@/hooks/group/prefetch/prefetch-groups-query';
import { prefetchLocationsQuery } from '@/hooks/location/prefetch/prefetch-locations-query';

export default async function Page() {
  const queryClient = new QueryClient();

  // Prefetch function
  await prefetchCoursesDataQuery(queryClient);
  await prefetchGroupsQuery(queryClient);
  await prefetchLocationsQuery(queryClient);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CoursePlannerClient />
    </HydrationBoundary>
  );
}
