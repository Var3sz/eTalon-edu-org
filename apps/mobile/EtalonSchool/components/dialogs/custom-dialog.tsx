import { Ionicons } from '@expo/vector-icons';
import { Dispatch, ReactNode, SetStateAction } from 'react';
import { Modal, StyleSheet, View } from 'react-native';

import AppText from '../ui/app-text';

type CustomDialogProps = {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  title: string;
  children: ReactNode;
};

export default function CustomDialog({ open, onOpenChange, title, children }: CustomDialogProps) {
  return (
    <Modal visible={open} onRequestClose={() => onOpenChange(false)} transparent animationType='fade'>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <AppText weight='700' style={styles.modalTitle}>
              {title}
            </AppText>
            <Ionicons name='close' size={30} onPress={() => onOpenChange(false)} />
          </View>
          {children}
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
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalContent: {
    width: '80%',
    minHeight: 80,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
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
