import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getServerSession } from 'next-auth';

import PaymentsTableClient from '@/components/payments/table/payments-table-client';
import { prefetchActiveCoursesQuery } from '@/hooks/courses/prefetch/prefetch-active-courses-query';
import { authOptions } from '@/lib/authOptions';
import { BaseServerPropsWithId } from '@/models/page/types';

export default async function Page() {
  const queryClient = new QueryClient();
  const session = await getServerSession(authOptions);

  await prefetchActiveCoursesQuery(queryClient, session?.tokens.accessToken ?? '');

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PaymentsTableClient />
    </HydrationBoundary>
  );
}
