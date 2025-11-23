import { StyleSheet, Text, View } from 'react-native';

import { CourseDto } from '../../../models/courses/types';
import CourseInfoRow from '../../shared/custom-info-row';

type ShowCourseDialogProps = {
  course: CourseDto;
};

export default function ShowCourseDialog({ course }: ShowCourseDialogProps) {
  return (
    <View style={styles.dialogBody}>
      <CourseInfoRow label='Kurzus azonosító' value={course.courseId} />
      <CourseInfoRow label='Csoport' value={course.group} />
      <CourseInfoRow label='Óra kezdete' value={course.startTime} />
      <CourseInfoRow label='Óra vége' value={course.endTime} />
    </View>
  );
}

const styles = StyleSheet.create({
  dialogBody: {
    flexDirection: 'column',
    gap: 2,
  },
});
