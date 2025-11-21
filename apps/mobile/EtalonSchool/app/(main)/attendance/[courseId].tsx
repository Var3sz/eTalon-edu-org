import { useMemo, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { Attendacemock } from '../../../mock/attendance';
import CustomDialog from '../../../components/dialogs/custom-dialog';
import ShowStudentDialog from '../../../components/dialogs/students/show-student-details-dialog';
import { CourseAttendanceResponse, Student } from '../../../models/attendance/types';
import AttendanceList from '../../../components/attendance/attendance-list';
import AttendanceListHeader from '../../../components/attendance/attendance-list-header';
import AppText from '../../../components/ui/app-text';

// --- IDE JÖN MAJD AZ API VÁLASZ ---
const MOCK_DATA: CourseAttendanceResponse = Attendacemock;

export default function AttendanceByCourseScreen() {
  const { courseId } = useLocalSearchParams<{ courseId: string }>();

  // TODO: itt majd fetch-elsz courseId alapján
  const [courseData, setCourseData] = useState<CourseAttendanceResponse | null>(MOCK_DATA);

  // ⬇️ A lesson-öket az első diák attendance listájából vesszük
  const lessons = useMemo(() => {
    if (!courseData || courseData.students.length === 0) return [];
    return courseData.students[0].attendance;
  }, [courseData]);

  const [selectedLessonIndex, setSelectedLessonIndex] = useState(0);

  const selectedLesson = lessons[selectedLessonIndex];

  const handlePrev = () => {
    setSelectedLessonIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setSelectedLessonIndex((prev) => (prev < lessons.length - 1 ? prev + 1 : prev));
  };

  const handleToggleAttendance = (studentId: number) => {
    setCourseData((prev) => {
      if (!prev) return prev;
      const lessonId = selectedLesson.lessonDateId;

      return {
        ...prev,
        students: prev.students.map((s) => {
          if (s.id !== studentId) return s;
          return {
            ...s,
            attendance: s.attendance.map((a) => (a.lessonDateId === lessonId ? { ...a, attended: !a.attended } : a)),
          };
        }),
      };
    });

    // TODO: itt majd API call a módosítás mentésére
  };

  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [studentDialogOpen, setStudentDialogOpen] = useState(false);

  const handleOpenStudentDialog = (student: Student) => {
    setSelectedStudent(student);
    setStudentDialogOpen(true);
  };

  // Ha nincsenek jelenléti adatok még egy adott kurzushoz
  if (!courseData || lessons.length === 0) {
    return (
      <View style={styles.center}>
        <AppText weight='600'>Nincs elérhető jelenlét ehhez a kurzushoz.</AppText>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: `Jelenlét - ${courseData.courseId}`,
        }}
      />

      <View style={styles.container}>
        <AttendanceListHeader
          lessons={lessons}
          selectedLesson={selectedLesson}
          selectedLessonIndex={selectedLessonIndex}
          handlePrev={handlePrev}
          handleNext={handleNext}
        />

        <AttendanceList
          students={courseData.students}
          selectedLesson={selectedLesson}
          handleOpenStudentDialog={handleOpenStudentDialog}
          handleToggleAttendance={handleToggleAttendance}
        />
      </View>

      <CustomDialog open={studentDialogOpen} onOpenChange={setStudentDialogOpen} title='Tanuló adatai'>
        {selectedStudent && <ShowStudentDialog student={selectedStudent} />}
      </CustomDialog>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 12,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
