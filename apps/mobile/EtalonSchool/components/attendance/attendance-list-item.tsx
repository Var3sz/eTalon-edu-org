import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LessonAttendance, Student } from '../../models/attendance/types';
import { Ionicons } from '@expo/vector-icons';
import AppText from '../ui/app-text';

type AttendanceListItemProps = {
  selectedLesson: LessonAttendance;
  student: Student;
  handleToggleAttendance: (studentId: number) => void;
  handleOpenStudentDialog: (student: Student) => void;
};

export default function AttendanceListItem({
  selectedLesson,
  student,
  handleOpenStudentDialog,
  handleToggleAttendance,
}: AttendanceListItemProps) {
  const att = student.attendance.find((a) => a.lessonDateId === selectedLesson.lessonDateId);
  const attended = att?.attended ?? false;

  return (
    <Pressable
      onPress={() => handleToggleAttendance(student.id)}
      onLongPress={() => handleOpenStudentDialog(student)}
      style={({ pressed }) => [styles.studentRow, pressed && styles.studentRowPressed]}
    >
      <View>
        <AppText weight='600' style={styles.studentName}>
          {student.childName}
        </AppText>
      </View>

      <View style={styles.status}>
        <AppText style={styles.statusText}>{attended ? 'Jelen' : 'Hiányzó'}</AppText>
        <Ionicons
          name={attended ? 'checkmark-circle' : 'close-circle'}
          size={24}
          color={attended ? '#16a34a' : '#dc2626'}
        />
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
