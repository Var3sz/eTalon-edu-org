import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getServerSession } from 'next-auth';

import EditCourseClient from '@/components/course/edit/edit-course-client';
import { prefetchCourseDataByIdQuery } from '@/hooks/courses/edit-course/prefetch/prefetch-course-data-by-id-query';
import { prefetchCourseDatesDataByIdQuery } from '@/hooks/courses/edit-course/prefetch/prefetch-course-dates-data-by-id-query';
import { prefetchInvoiceDatesDataByIdQuery } from '@/hooks/courses/edit-course/prefetch/prefetch-invoice-dates-data-by-id-query';
import { prefetchGroupsQuery } from '@/hooks/group/prefetch/prefetch-groups-query';
import { prefetchLocationsQuery } from '@/hooks/location/prefetch/prefetch-locations-query';
import { authOptions } from '@/lib/authOptions';
import { BaseServerPropsWithId } from '@/models/page/types';

export default async function Page({ params }: BaseServerPropsWithId) {
  const queryClient = new QueryClient();
  const session = await getServerSession(authOptions);

  await prefetchGroupsQuery(queryClient, session?.tokens.accessToken ?? '');
  await prefetchLocationsQuery(queryClient, session?.tokens.accessToken ?? '');
  await prefetchCourseDataByIdQuery(queryClient, params.id, session?.tokens.accessToken ?? '');
  await prefetchCourseDatesDataByIdQuery(queryClient, params.id, session?.tokens.accessToken ?? '');
  await prefetchInvoiceDatesDataByIdQuery(queryClient, params.id, session?.tokens.accessToken ?? '');

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EditCourseClient courseId={params.id} />
    </HydrationBoundary>
  );
}
