import { Children, Dispatch, ReactNode, SetStateAction } from 'react';
import { Button, Modal, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../lib/colors';
import { Ionicons } from '@expo/vector-icons';

type ConfirmDialogProps = {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  title: string;
  description: string;
};

export default function ConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  onCancel,
  confirmText = 'Megerősítés',
  cancelText = 'Mégsem',
  title,
  description,
}: ConfirmDialogProps) {
  return (
    <Modal visible={open} onRequestClose={() => onOpenChange(false)} transparent animationType='fade'>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{title}</Text>
          <Text style={styles.modalText}>{description}</Text>

          <View style={styles.modalButton}>
            <Button title={cancelText} onPress={onCancel} color={colors.destructive} />
            <Button title={confirmText} onPress={onConfirm} color={colors.primary} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    minHeight: 80,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  modalText: {
    fontSize: 15,
    marginBottom: 4,
  },
  modalButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignContent: 'flex-start',
    gap: 4,
    marginTop: 30,
  },
});
