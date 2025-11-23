import { useMemo, useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import CustomDialog from '../../../components/dialogs/custom-dialog';
import ShowStudentDialog from '../../../components/dialogs/students/show-student-details-dialog';
import AttendanceList from '../../../components/attendance/attendance-list';
import AttendanceListHeader from '../../../components/attendance/attendance-list-header';
import AppText from '../../../components/ui/app-text';
import useInitAttendanceByCourseScreen from '../../../hooks/attendance/use-init-attendance-by-course-screen';
import { useAuth } from '../../../contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../lib/colors';

export default function AttendanceByCourseScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { getAccessToken } = useAuth();

  const {
    courseData,
    lessons,
    selectedLesson,
    selectedLessonIndex,
    selectedStudent,
    studentDialogOpen,
    queryClient,
    handlePrev,
    handleNext,
    handleOpenStudentDialog,
    handleToggleAttendance,
    setStudentDialogOpen,
    handleUpdateAttendances,
  } = useInitAttendanceByCourseScreen({
    id: Number(id),
    getAccessToken: getAccessToken,
  });

  // Ha nincsenek jelenléti adatok még egy adott kurzushoz
  if (!courseData || lessons.length === 0) {
    return (
      <>
        <Stack.Screen
          options={{
            title: '',
          }}
        />
        <View style={styles.center}>
          <AppText weight='600'>Nincs elérhető jelenlét ehhez a kurzushoz.</AppText>
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: `Jelenlét - ${courseData.courseId}`,
          headerRight: () => (
            <>
              <Pressable
                onPress={() =>
                  queryClient.invalidateQueries({
                    queryKey: ['attendance-by-course', { courseId: Number(id) }],
                  })
                }
              >
                <Ionicons name='refresh' size={40} color={colors.black} />
              </Pressable>
            </>
          ),
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

        <View style={styles.bottomButtonWrapper}>
          <Pressable style={styles.saveButton} onPress={() => handleUpdateAttendances()}>
            <AppText weight='700' style={styles.saveButtonText}>
              Mentés
            </AppText>
          </Pressable>
        </View>
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
  bottomButtonWrapper: {
    paddingVertical: 16,
  },
  saveButton: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
