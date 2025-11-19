// app/(main)/(tabs)/courses.tsx
import { Text, StyleSheet, FlatList, Modal, Button } from 'react-native';
import { coursesMock } from '../../../mock/courses';
import CourseListItem from '../../../components/courses/course-list-item';
import { useState } from 'react';
import ConfirmDialog from '../../../components/dialogs/confirm-dialog';
import CustomDialog from '../../../components/dialogs/custom-dialog';
import ShowCourseDialog from '../../../components/dialogs/courses/show-course-dialog';

export default function CoursesScreen() {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
  const [selectedCourse, setSelectedCourse] = useState<any | null>(null);

  const handlePressCourse = (course: any) => {
    setSelectedCourse(course);
    setDialogOpen(true);
  };

  const handleLongPressCourse = () => {
    setConfirmDialogOpen(true);
  };

  const handleCloseModal = () => {
    setConfirmDialogOpen(false);
  };

  const handlePositiveEvent = () => {};

  return (
    <>
      <FlatList
        data={coursesMock}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CourseListItem course={item} onPress={() => handlePressCourse(item)} onLongPress={handleLongPressCourse} />
        )}
      />

      <ConfirmDialog
        open={confirmDialogOpen}
        onOpenChange={setConfirmDialogOpen}
        onConfirm={handlePositiveEvent}
        onCancel={handleCloseModal}
        title={`Biztosan lezárja a kurzust?`}
        description={'Amennyiben lezárja a kurzust, az a későbbiekben nem lesz visszavonható!'}
      />

      <CustomDialog open={dialogOpen} onOpenChange={setDialogOpen} title='Kurzus adatok'>
        <ShowCourseDialog course={selectedCourse} />
      </CustomDialog>
    </>
  );
}
