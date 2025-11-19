// app/(main)/(tabs)/attendance.tsx
import { useRouter } from 'expo-router';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { coursesMock } from '../../../mock/courses';
import CourseListItem from '../../../components/courses/course-list-item';

export default function AttendanceScreen() {
  const router = useRouter();

  const handlePressCourse = (courseId: string) => {
    router.push({
      pathname: '/attendance/[courseId]',
      params: { courseId },
    });
  };

  return (
    <FlatList
      data={coursesMock}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <CourseListItem course={item} onPress={() => handlePressCourse(item.courseId)} />}
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightgreen' },
  text: { fontSize: 22, fontWeight: '700' },
});
