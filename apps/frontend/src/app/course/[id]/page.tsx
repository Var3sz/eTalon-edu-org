import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getServerSession } from 'next-auth';

import CourseClient from '@/components/course/course-client';
import { prefetchBillingTypesQuery } from '@/hooks/billing-type/prefetch/prefetch-billing-types-query';
import { authOptions } from '@/lib/authOptions';
import { BaseServerPropsWithId } from '@/models/page/types';

export default async function Page({ params }: BaseServerPropsWithId) {
  const queryClient = new QueryClient();
  const session = await getServerSession(authOptions);

  await prefetchBillingTypesQuery(queryClient, session?.tokens.accessToken ?? ' ');

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CourseClient CourseId={params.id} />
    </HydrationBoundary>
  );
}
