import { FlatList, StyleSheet } from 'react-native';

import { LessonAttendance, Student } from '../../models/attendance/types';
import AttendanceListItem from './attendance-list-item';

type AttendanceListProps = {
  selectedLesson: LessonAttendance;
  students: Student[];
  handleToggleAttendance: (studentId: number) => void;
  handleOpenStudentDialog: (student: Student) => void;
};

export default function AttendanceList({
  students,
  selectedLesson,
  handleOpenStudentDialog,
  handleToggleAttendance,
}: AttendanceListProps) {
  return (
    <FlatList
      data={students}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.listContent}
      renderItem={({ item }) => (
        <AttendanceListItem
          selectedLesson={selectedLesson}
          student={item}
          handleOpenStudentDialog={handleOpenStudentDialog}
          handleToggleAttendance={handleToggleAttendance}
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
