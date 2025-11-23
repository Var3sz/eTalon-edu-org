import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';

import { Payment, StudentPayment } from '../../models/payment/type';
import AppText from '../ui/app-text';

type PaymentListItemProps = {
  selectedPayment: Payment;
  student: StudentPayment;
  handleOpenPaymentDialog: (student: StudentPayment) => void;
};

export default function PaymentListItem({ selectedPayment, student, handleOpenPaymentDialog }: PaymentListItemProps) {
  const payment = student.Payments.find((a) => a.invoiceDateId === selectedPayment.invoiceDateId);
  const payed = payment?.payed ?? false;
  const payedAmount = payment?.amount ?? 0;

  const getStatusText = (): string => {
    let text = 'Nem fizetett';
    if (payed === true) {
      text = 'Fizetett';
    } else if (payedAmount > 0) {
      text = 'Hiányos';
    }

    return text;
  };

  const getStatusIcon = (): any => {
    let text = 'close-circle';
    if (payed === true) {
      text = 'checkmark-circle';
    } else if (payedAmount > 0) {
      text = 'time';
    }
    return text;
  };

  const getStatusColor = (): any => {
    let text = '#dc2626';
    if (payed === true) {
      text = '#16a34a';
    } else if (payedAmount > 0) {
      text = '#fcb04eff';
    }
    return text;
  };

  return (
    <Pressable
      onPress={() => handleOpenPaymentDialog(student)}
      style={({ pressed }) => [styles.studentRow, pressed && styles.studentRowPressed]}
    >
      <View>
        <AppText weight='600' style={styles.studentName}>
          {student.studentName}
        </AppText>
      </View>

      <View style={styles.status}>
        <AppText style={styles.statusText}>{getStatusText()}</AppText>
        <Ionicons name={getStatusIcon()} size={24} color={getStatusColor()} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  studentRow: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 1,
  },
  studentRowPressed: {
    opacity: 0.7,
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  studentName: {
    fontSize: 16,
  },
  statusText: {
    fontSize: 14,
  },
});
