import EditCourseClient from '@/components/course/edit/edit-course-client';
import { prefetchCourseDataByIdQuery } from '@/hooks/courses/edit-course/prefetch/prefetch-course-data-by-id-query';
import { prefetchGroupsQuery } from '@/hooks/group/prefetch/prefetch-groups-query';
import { prefetchLocationsQuery } from '@/hooks/location/prefetch/prefetch-locations-query';
import { BaseServerPropsWithId } from '@/models/page/types';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

export default async function Page({ params }: BaseServerPropsWithId) {
  const queryClient = new QueryClient();

  await prefetchGroupsQuery(queryClient);
  await prefetchLocationsQuery(queryClient);
  await prefetchCourseDataByIdQuery(queryClient, params.id);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EditCourseClient courseId={params.id} />
    </HydrationBoundary>
  );
}
