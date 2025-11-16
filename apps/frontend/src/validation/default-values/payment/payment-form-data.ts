import { PaymentForm, StudentPaymentForm } from '@/hooks/payments/use-init-payment-client';

export const PaymentFormData = (data: PaymentForm[]): StudentPaymentForm => {
  return {
    payments: data,
    Helpers: {
      inEdit: false,
    },
  };
};
