import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';

import { Payment, StudentPayment } from '../../models/payment/type';
import AppText from '../ui/app-text';

type PaymentListHeaderProps = {
  payments: Payment[];
  selectedPaymentIndex: number;
  selectedPayment: Payment;
  handlePrev: () => void;
  handleNext: () => void;
};

export default function PaymentListHeader({
  payments,
  selectedPayment,
  selectedPaymentIndex,
  handlePrev,
  handleNext,
}: PaymentListHeaderProps) {
  return (
    <View style={styles.header}>
      <Pressable
        onPress={handlePrev}
        disabled={selectedPaymentIndex === 0}
        style={({ pressed }) => [
          styles.navButton,
          selectedPaymentIndex === 0 && styles.navButtonDisabled,
          pressed && styles.navButtonPressed,
        ]}
      >
        <Ionicons name='chevron-back' size={20} />
      </Pressable>

      <View style={styles.headerCenter}>
        <AppText weight='600' style={styles.lessonTitle}>
          {selectedPayment.description}
        </AppText>
        <AppText weight='600' style={styles.lessonDate}>
          {new Date(selectedPayment.date).toLocaleDateString('hu-HU')}
        </AppText>
      </View>

      <Pressable
        onPress={handleNext}
        disabled={selectedPaymentIndex === payments.length - 1}
        style={({ pressed }) => [
          styles.navButton,
          selectedPaymentIndex === payments.length - 1 && styles.navButtonDisabled,
          pressed && styles.navButtonPressed,
        ]}
      >
        <Ionicons name='chevron-forward' size={20} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  lessonDate: {
    fontSize: 14,
    color: '#6b7280',
  },
  navButton: {
    padding: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  navButtonDisabled: {
    opacity: 0.3,
  },
  navButtonPressed: {
    opacity: 0.6,
  },
  parentName: {
    fontSize: 13,
    color: '#6b7280',
  },
});
