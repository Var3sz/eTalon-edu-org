'use client';

import { useSession } from 'next-auth/react';

import useInitPaymentClient from '@/hooks/payments/use-init-payment-client';

type PaymentClientProps = {
  courseId: string;
};

export default function PaymentClient({ courseId }: PaymentClientProps) {
  const { data: session } = useSession();

  const { payments } = useInitPaymentClient({ courseId: courseId, token: session?.tokens.accessToken ?? '' });

  return <div />;
}
