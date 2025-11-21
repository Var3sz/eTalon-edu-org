import { Pressable, StyleSheet, View } from 'react-native';
import { Payment, StudentPayment } from '../../models/payment/type';
import AppText from '../ui/app-text';
import { Ionicons } from '@expo/vector-icons';

type PaymentListItemProps = {
  selectedPayment: Payment;
  student: StudentPayment;
  //   handleTogglePayment: (studentId: number) => void;
  //   handleOpenStudentDialog: (student: Student) => void;
};

export default function PaymentListItem({
  selectedPayment,
  student,
  //   handleOpenStudentDialog,
  //   handleTogglePayment,
}: PaymentListItemProps) {
  const att = student.Payments.find((a) => a.invoiceDateId === selectedPayment.invoiceDateId);
  const payed = att?.payed ?? false;

  return (
    <Pressable
      //   onPress={() => handleToggleAttendance(student.id)}
      //   onLongPress={() => handleOpenStudentDialog(student)}
      style={({ pressed }) => [styles.studentRow, pressed && styles.studentRowPressed]}
    >
      <View>
        <AppText weight='600' style={styles.studentName}>
          {student.studentName}
        </AppText>
      </View>

      <View style={styles.status}>
        <AppText style={styles.statusText}>{payed ? 'Fizetett' : 'Nem fizetett'}</AppText>
        <Ionicons name={payed ? 'checkmark-circle' : 'close-circle'} size={24} color={payed ? '#16a34a' : '#dc2626'} />
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
