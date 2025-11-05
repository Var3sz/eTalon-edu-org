import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import CourseClient from '@/components/course/course-client';
import { prefetchBillingTypesQuery } from '@/hooks/billing-type/prefetch/prefetch-billing-types-query';
import { BaseServerPropsWithId } from '@/models/page/types';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function Page({ params }: BaseServerPropsWithId) {
  const queryClient = new QueryClient();
  const session = await getServerSession(authOptions);

  await prefetchBillingTypesQuery(queryClient, session?.tokens.accessToken ?? ' ');

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CourseClient courseId={params.id} />
    </HydrationBoundary>
  );
}
