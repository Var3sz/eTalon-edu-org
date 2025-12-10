import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';

import { SelectedPaymentDetail, StudentPayment, StudentPaymentResponse } from '../../models/payment/type';
import useGetPaymentsDataByCourseQuery from './use-get-payments-data-by-course-query';

type UseInitPaymentsByCourseScreenProps = {
  id: number;
  getAccessToken: () => Promise<string | null>;
};

export default function useInitPaymentsByCourseScreen({ id, getAccessToken }: UseInitPaymentsByCourseScreenProps) {
  const queryClient = useQueryClient();

  const { data: paymentsDataResponse } = useGetPaymentsDataByCourseQuery({
    courseId: id,
    getAccessToken: getAccessToken,
  });

  const paymentsData: StudentPaymentResponse | null =
    paymentsDataResponse?.status === 200 && paymentsDataResponse.data ? paymentsDataResponse.data : null;

  const [paymentData, setPaymentData] = useState<StudentPaymentResponse | null>(null);

  useEffect(() => {
    setPaymentData(paymentsData);
  }, [paymentsData]);

  const payments = useMemo(() => {
    if (!paymentData || paymentData.payments.length === 0) return [];
    return paymentData.payments[0].Payments;
  }, [paymentData]);

  const [selectedPaymentIndex, setSelectedPaymentIndex] = useState(0);

  const selectedPayment = payments[selectedPaymentIndex];

  const handlePrev = () => {
    setSelectedPaymentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setSelectedPaymentIndex((prev) => (prev < payments.length - 1 ? prev + 1 : prev));
  };

  const [selectedPaymentDetail, setSelectedPaymentDetail] = useState<SelectedPaymentDetail | null>(null);
  const [paymentDetailsDialogOpen, setPaymentDetailsDialogOpen] = useState(false);

  const handleOpenPaymentDialog = (student: StudentPayment) => {
    const paymentForStudent = student.Payments.find((p) => p.invoiceDateId === selectedPayment.invoiceDateId);

    if (!paymentForStudent) return;

    setSelectedPaymentDetail({
      student,
      payment: paymentForStudent,
    });
    setPaymentDetailsDialogOpen(true);
  };

  return useMemo(
    () => ({
      paymentData,
      payments,
      selectedPayment,
      selectedPaymentIndex,
      selectedPaymentDetail,
      paymentDetailsDialogOpen,
      queryClient,
      handlePrev,
      handleNext,
      handleOpenPaymentDialog,
      setPaymentDetailsDialogOpen,
    }),
    [
      paymentData,
      payments,
      selectedPayment,
      selectedPaymentIndex,
      selectedPaymentDetail,
      paymentDetailsDialogOpen,
      queryClient,
      handlePrev,
      handleNext,
      handleOpenPaymentDialog,
      setPaymentDetailsDialogOpen,
    ]
  );
}
