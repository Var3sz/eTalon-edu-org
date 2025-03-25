import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import CourseClient from '@/components/course/details/course-client';
import { prefetchCourseDetailsByIdQuery } from '@/hooks/courses/prefetch/prefetchCourseDetailsByIdQuery';
import { BaseServerPropsWithId } from '@/models/page/types';

export default async function Page({ params }: BaseServerPropsWithId) {
  const queryClient = new QueryClient();

  await prefetchCourseDetailsByIdQuery(queryClient, params.id);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CourseClient courseId={params.id} />
    </HydrationBoundary>
  );
}
