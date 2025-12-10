import { FlatList, StyleSheet, View } from 'react-native';

import CourseListItem from '../../../components/courses/course-list-item';
import ConfirmDialog from '../../../components/dialogs/confirm-dialog';
import ShowCourseDialog from '../../../components/dialogs/courses/show-course-dialog';
import CustomDialog from '../../../components/dialogs/custom-dialog';
import AppText from '../../../components/ui/app-text';
import { useAuth } from '../../../contexts/AuthContext';
import useInitCoursesScreen from '../../../hooks/courses/use-init-courses-screen';

export default function CoursesScreen() {
  const { getAccessToken } = useAuth();

  const {
    courses,
    selectedCourse,
    dialogOpen,
    confirmDialogOpen,
    setDialogOpen,
    setConfirmDialogOpen,
    handlePressCourse,
    handleLongPressCourse,
    handleCloseModal,
    handlePositiveEvent,
  } = useInitCoursesScreen({
    getAccessToken: getAccessToken,
  });

  return (
    <>
      <View style={styles.container}>
        <AppText weight='700' style={styles.title}>
          Kurzusok
        </AppText>
        <FlatList
          data={courses}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <CourseListItem
              course={item}
              onPress={() => handlePressCourse(item)}
              onLongPress={() => handleLongPressCourse(item)}
            />
          )}
        />
      </View>

      <ConfirmDialog
        open={confirmDialogOpen}
        onOpenChange={setConfirmDialogOpen}
        onConfirm={handlePositiveEvent}
        onCancel={handleCloseModal}
        title={`Biztosan lezárja a kurzust?`}
        description={'Amennyiben lezárja a kurzust, az a későbbiekben nem lesz visszavonható!'}
      />

      <CustomDialog open={dialogOpen} onOpenChange={setDialogOpen} title='Kurzus adatok'>
        <ShowCourseDialog course={selectedCourse!} />
      </CustomDialog>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 10,
  },
  title: {
    alignSelf: 'center',
    marginTop: 10,
    fontSize: 25,
  },
});
