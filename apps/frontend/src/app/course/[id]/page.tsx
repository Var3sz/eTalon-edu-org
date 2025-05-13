import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import CourseClient from '@/components/course/course-client';
import { prefetchBillingTypesQuery } from '@/hooks/billing-type/prefetch/prefetch-billing-types-query';
import { BaseServerPropsWithId } from '@/models/page/types';

export default async function Page({ params }: BaseServerPropsWithId) {
  const queryClient = new QueryClient();

  await prefetchBillingTypesQuery(queryClient);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CourseClient courseId={params.id} />
    </HydrationBoundary>
  );
}
