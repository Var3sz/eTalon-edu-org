import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import CustomDialog from '../../../components/dialogs/custom-dialog';
import ShowPaymentDialog from '../../../components/dialogs/payment/show-payment-details-dialog';
import PaymentList from '../../../components/payments/payment-list';
import PaymentListHeader from '../../../components/payments/payment-list-header';
import AppText from '../../../components/ui/app-text';
import { useAuth } from '../../../contexts/AuthContext';
import useInitPaymentsByCourseScreen from '../../../hooks/payment/use-init-payments-by-course-screen';
import { colors } from '../../../lib/colors';

export default function PaymentsByCourseScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { getAccessToken } = useAuth();

  const {
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
  } = useInitPaymentsByCourseScreen({
    id: Number(id),
    getAccessToken: getAccessToken,
  });

  // Ha nincsenek fizetési adatok még egy adott kurzushoz
  if (!paymentData || payments.length === 0) {
    return (
      <>
        <Stack.Screen
          options={{
            title: '',
          }}
        />
        <View style={styles.center}>
          <AppText weight='600'>Nincs elérhető befizetés ehhez a kurzushoz.</AppText>
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: `Befizetések - ${paymentData.courseId}`,
          headerRight: () => (
            <>
              <Pressable
                onPress={() =>
                  queryClient.invalidateQueries({
                    queryKey: ['payments-by-course', { courseId: Number(id) }],
                  })
                }
              >
                <Ionicons name='refresh' size={40} color={colors.black} />
              </Pressable>
            </>
          ),
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
