import { FlatList, StyleSheet } from 'react-native';
import { Payment, StudentPayment } from '../../models/payment/type';
import PaymentListItem from './payment-list-item';

type PaymentListProps = {
  selectedPayment: Payment;
  students: StudentPayment[];
  // handleOpenStudentDialog: (student: StudentPayment) => void;
};

export default function PaymentList({ students, selectedPayment /* handleOpenStudentDialog */ }: PaymentListProps) {
  return (
    <FlatList
      data={students}
      keyExtractor={(item) => item.studentId.toString()}
      contentContainerStyle={styles.listContent}
      renderItem={({ item }) => (
        <PaymentListItem
          selectedPayment={selectedPayment}
          student={item}
          //   handleOpenStudentDialog={handleOpenStudentDialog}
          //   handleToggleAttendance={handleToggleAttendance}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingTop: 4,
  },
});
