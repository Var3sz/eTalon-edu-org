import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import CoursesTableClient from '@/components/course/table/courses-table-client';
import { prefetchCurrentCoursesQuery } from '@/hooks/courses/prefetch/prefetchCurrentCoursesQuery';

export default async function Page() {
  const queryClient = new QueryClient();

  await prefetchCurrentCoursesQuery(queryClient);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CoursesTableClient />
    </HydrationBoundary>
  );
}
