import { useQueryClient } from '@tanstack/react-query';
import { useMemo, useState, useTransition } from 'react';

import { StudentPaymentDto } from '@/models/Api';

import useGetPaymentsDataByCourseId from './use-get-payments-data-by-id-query';

type UseInitPaymentClientModel = {
  courseId: string;
  token: string;
};

export default function useInitPaymentClient({ courseId, token }: UseInitPaymentClientModel) {
  const [isPending, startTransaction] = useTransition();
  const queryClient = useQueryClient();

  const { data: paymentsDataResponse } = useGetPaymentsDataByCourseId(courseId, token);

  const payments: StudentPaymentDto | null =
    paymentsDataResponse?.status === 200 && paymentsDataResponse.data ? paymentsDataResponse.data : null;

  return useMemo(() => ({ payments }), [payments]);
}
