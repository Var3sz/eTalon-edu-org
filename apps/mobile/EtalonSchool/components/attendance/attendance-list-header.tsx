import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LessonAttendance } from '../../models/attendance/types';
import AppText from '../ui/app-text';

type AttendanceListHeaderProps = {
  lessons: LessonAttendance[];
  selectedLessonIndex: number;
  selectedLesson: LessonAttendance;
  handlePrev: () => void;
  handleNext: () => void;
};

export default function AttendanceListHeader({
  selectedLessonIndex,
  selectedLesson,
  lessons,
  handlePrev,
  handleNext,
}: AttendanceListHeaderProps) {
  return (
    <View style={styles.header}>
      <Pressable
        onPress={handlePrev}
        disabled={selectedLessonIndex === 0}
        style={({ pressed }) => [
          styles.navButton,
          selectedLessonIndex === 0 && styles.navButtonDisabled,
          pressed && styles.navButtonPressed,
        ]}
      >
        <Ionicons name='chevron-back' size={20} />
      </Pressable>

      <View style={styles.headerCenter}>
        <AppText weight='600' style={styles.lessonTitle}>
          {selectedLesson.description}
        </AppText>
        <AppText weight='600' style={styles.lessonDate}>
          {new Date(selectedLesson.date).toLocaleDateString('hu-HU')}
        </AppText>
      </View>

      <Pressable
        onPress={handleNext}
        disabled={selectedLessonIndex === lessons.length - 1}
        style={({ pressed }) => [
          styles.navButton,
          selectedLessonIndex === lessons.length - 1 && styles.navButtonDisabled,
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
