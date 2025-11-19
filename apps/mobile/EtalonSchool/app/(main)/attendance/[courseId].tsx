// app/(main)/attendance/[courseId].tsx
import { useMemo, useState } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Attendacemock } from '../../../mock/attendance';
import CustomDialog from '../../../components/dialogs/custom-dialog';
import ShowStudentDialog from '../../../components/dialogs/students/show-student-details-dialog';
import { colors } from '../../../lib/colors';

// --- Típusok a backend struktúrára ---

type LessonAttendance = {
  lessonDateId: number;
  date: string; // ISO string
  description: string;
  attended: boolean;
};

type Student = {
  id: number;
  firstname: string;
  lastname: string;
  childName: string;
  email: string;
  mobile: string;
  city: string;
  zip: number;
  address: string;
  sapId: number;
  attendance: LessonAttendance[];
};

type CourseAttendanceResponse = {
  courseId: string;
  students: Student[];
};

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

  if (!courseData || lessons.length === 0) {
    return (
      <View style={styles.center}>
        <Text>Nincs elérhető jelenlét ehhez a kurzushoz.</Text>
      </View>
    );
  }

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

  return (
    <>
      <Stack.Screen
        options={{
          title: `Jelenlét - ${courseData.courseId}`,
        }}
      />

      <View style={styles.container}>
        {/* --- Fejléc: lapozás óradátumok között --- */}
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
            <Text style={styles.lessonTitle}>{selectedLesson.description}</Text>
            <Text style={styles.lessonDate}>{new Date(selectedLesson.date).toLocaleDateString('hu-HU')}</Text>
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

        {/* --- Diáklista az adott órára --- */}
        <FlatList
          data={courseData.students}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => {
            const att = item.attendance.find((a) => a.lessonDateId === selectedLesson.lessonDateId);
            const attended = att?.attended ?? false;

            return (
              <Pressable
                onPress={() => handleToggleAttendance(item.id)}
                onLongPress={() => handleOpenStudentDialog(item)}
                style={({ pressed }) => [styles.studentRow, pressed && styles.studentRowPressed]}
              >
                <View>
                  <Text style={styles.studentName}>{item.childName}</Text>
                </View>

                <View style={styles.status}>
                  <Text style={styles.statusText}>{attended ? 'Jelen' : 'Hiányzó'}</Text>
                  <Ionicons
                    name={attended ? 'checkmark-circle' : 'close-circle'}
                    size={24}
                    color={attended ? '#16a34a' : '#dc2626'}
                  />
                </View>
              </Pressable>
            );
          }}
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
  listContent: {
    paddingTop: 4,
  },
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
  studentName: {
    fontSize: 16,
    fontWeight: '600',
  },
  parentName: {
    fontSize: 13,
    color: '#6b7280',
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusText: {
    fontSize: 14,
  },
});
