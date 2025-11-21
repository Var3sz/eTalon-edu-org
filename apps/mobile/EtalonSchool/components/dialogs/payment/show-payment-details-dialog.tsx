import { View, StyleSheet, Pressable, Linking } from 'react-native';
import CustomInfoRow from '../../shared/custom-info-row';
import { SelectedPaymentDetail } from '../../../app/(main)/payment/[courseId]';

type ShowPaymentDialogProps = {
  paymentDetail: SelectedPaymentDetail;
};

export default function ShowPaymentDialog({ paymentDetail }: ShowPaymentDialogProps) {
  return (
    <View style={styles.container}>
      <CustomInfoRow label='Tanuló neve' value={paymentDetail.student.studentName} />
      <CustomInfoRow label='Számla azonosító' value={paymentDetail.payment.invoiceNumber ?? ''} />
      <CustomInfoRow
        label='Fizetett összeg / Fizetendő össszeg'
        value={`${paymentDetail.payment.amount} / ${paymentDetail.payment.amountToBePayed}`}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 6,
    marginTop: 8,
  },
});
