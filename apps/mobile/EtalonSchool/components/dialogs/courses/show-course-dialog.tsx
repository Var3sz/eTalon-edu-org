import { StyleSheet, Text, View } from 'react-native';
import CourseInfoRow from '../../courses/course-info-row';

type ShowCourseDialogProps = {
  course: any;
};

export default function ShowCourseDialog({ course }: ShowCourseDialogProps) {
  return (
    <View style={styles.dialogBody}>
      <CourseInfoRow label='Kurzus azonosító' value={course.courseId} />
      <CourseInfoRow label='Csoport' value={course.group} />

      {/* Későbbiek, ha kell */}
      {/* <CourseInfoRow label="Helyszín" value={course.location} />
      <CourseInfoRow label="Óra kezdete" value={course.startTime} />
      <CourseInfoRow label="Óra vége" value={course.endTime} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  dialogBody: {
    flexDirection: 'column',
    gap: 2,
  },
});
