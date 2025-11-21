import { Stack, useLocalSearchParams } from 'expo-router';
import { Payment, StudentPayment, StudentPaymentResponse } from '../../../models/payment/type';
import { PaymentMock } from '../../../mock/payment';
import { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import AppText from '../../../components/ui/app-text';
import CustomDialog from '../../../components/dialogs/custom-dialog';
import PaymentListHeader from '../../../components/payments/payment-list-header';
import PaymentList from '../../../components/payments/payment-list';
import ShowPaymentDialog from '../../../components/dialogs/payment/show-payment-details-dialog';

export type SelectedPaymentDetail = {
  student: StudentPayment;
  payment: Payment;
};

const MOCK_DATA: StudentPaymentResponse = PaymentMock;

export default function PaymentsByCourseScreen() {
  const { courseId } = useLocalSearchParams<{ courseId: string }>();

  // TODO: itt majd fetch-elsz courseId alapján
  const [paymentData, setPaymentData] = useState<StudentPaymentResponse | null>(MOCK_DATA);

  // ⬇️ A lesson-öket az első diák attendance listájából vesszük
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

  // Ha nincsenek fizetési adatok még egy adott kurzushoz
  if (!paymentData || payments.length === 0) {
    return (
      <View style={styles.center}>
        <AppText weight='600'>Nincs elérhető befizetés ehhez a kurzushoz.</AppText>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: `Befizetések - ${paymentData.courseId}`,
        }}
      />

      <View style={styles.container}>
        <PaymentListHeader
          payments={payments}
          selectedPayment={selectedPayment}
          selectedPaymentIndex={selectedPaymentIndex}
          handlePrev={handlePrev}
          handleNext={handleNext}
        />

        <PaymentList
          students={paymentData.payments}
          selectedPayment={selectedPayment}
          handleOpenPaymentDialog={handleOpenPaymentDialog}
        />
      </View>

      <CustomDialog open={paymentDetailsDialogOpen} onOpenChange={setPaymentDetailsDialogOpen} title='Befizetés adatai'>
        {selectedPaymentDetail && <ShowPaymentDialog paymentDetail={selectedPaymentDetail} />}
      </CustomDialog>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 12,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
