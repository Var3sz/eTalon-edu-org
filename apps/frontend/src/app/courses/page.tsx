import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import CoursesTableClient from '@/components/course/table/courses-table-client';
import { prefetchActiveCoursesQuery } from '@/hooks/courses/prefetch/prefetch-active-courses-query';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';

export default async function Page() {
  const queryClient = new QueryClient();
  const session = await getServerSession(authOptions);

  await prefetchActiveCoursesQuery(queryClient, session?.tokens.accessToken ?? '');

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CoursesTableClient />
    </HydrationBoundary>
  );
}
