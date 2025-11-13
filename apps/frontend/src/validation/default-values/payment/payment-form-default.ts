import { StudentPaymentForm } from '@/hooks/payments/use-init-payment-client';

export const PaymentFormDefault = (): StudentPaymentForm => {
  return {
    payments: [],
    Helpers: {
      inEdit: false,
    },
  };
};
