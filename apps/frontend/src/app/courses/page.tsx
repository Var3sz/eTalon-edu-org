import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import CoursesTableClient from '@/components/course/table/courses-table-client';
import { prefetchActiveCoursesQuery } from '@/hooks/courses/prefetch/prefetch-active-courses-query';

export default async function Page() {
  const queryClient = new QueryClient();

  await prefetchActiveCoursesQuery(queryClient);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CoursesTableClient />
    </HydrationBoundary>
  );
}
