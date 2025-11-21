import { View, StyleSheet, Pressable, Linking } from 'react-native';
import CustomInfoRow from '../../shared/custom-info-row';
import { Ionicons } from '@expo/vector-icons';
import { Student } from '../../../models/attendance/types';

type ShowStudentDialogProps = {
  student: Student;
};

export default function ShowStudentDialog({ student }: ShowStudentDialogProps) {
  const callPhone = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  return (
    <View style={styles.container}>
      <CustomInfoRow label='Tanuló neve' value={student.childName} />
      <CustomInfoRow label='Szülő neve' value={`${student.lastname} ${student.firstname}`} />
      <CustomInfoRow label='E-mail' value={student.email} />
      <Pressable onPress={() => callPhone(student.mobile)} style={{ opacity: 0.9 }}>
        <CustomInfoRow
          label='Telefon'
          value={student.mobile}
          rightIcon={<Ionicons name='call' size={20} color='#2563eb' />}
        />
      </Pressable>
      <CustomInfoRow label='Város' value={student.city} />
      <CustomInfoRow label='Irányítószám' value={student.zip.toString()} />
      <CustomInfoRow label='Cím' value={student.address} />
      <CustomInfoRow label='SAP azonosító' value={student.sapId.toString()} />
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
