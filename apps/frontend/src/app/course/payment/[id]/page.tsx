import PaymentClient from '@/components/payments/payment-client';
import { authOptions } from '@/lib/authOptions';
import { BaseServerPropsWithId } from '@/models/page/types';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getServerSession } from 'next-auth';

export default async function Page({ params }: BaseServerPropsWithId) {
  const queryClient = new QueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PaymentClient courseId={params.id} />
    </HydrationBoundary>
  );
}
