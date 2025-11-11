'use client';

import useInitPaymentClient from '@/hooks/payments/use-init-payment-client';
import { useSession } from 'next-auth/react';

type PaymentClientProps = {
  courseId: string;
};

export default function PaymentClient({ courseId }: PaymentClientProps) {
  const { data: session } = useSession();

  const { payments } = useInitPaymentClient({ courseId: courseId, token: session?.tokens.accessToken ?? '' });

  console.log(payments);

  return <></>;
}
