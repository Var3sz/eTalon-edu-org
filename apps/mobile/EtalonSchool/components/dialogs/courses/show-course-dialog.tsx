import { StyleSheet, Text, View } from 'react-native';
import CourseInfoRow from '../../shared/custom-info-row';

type ShowCourseDialogProps = {
  course: any;
};

export default function ShowCourseDialog({ course }: ShowCourseDialogProps) {
  return (
    <View style={styles.dialogBody}>
      <CourseInfoRow label='Kurzus azonosító' value={course.courseId} />
      <CourseInfoRow label='Csoport' value={course.group} />
    </View>
  );
}

const styles = StyleSheet.create({
  dialogBody: {
    flexDirection: 'column',
    gap: 2,
  },
});
