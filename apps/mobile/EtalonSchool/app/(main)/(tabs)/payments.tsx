import { useRouter } from 'expo-router';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { coursesMock } from '../../../mock/courses';
import CourseListItem from '../../../components/courses/course-list-item';
import AppText from '../../../components/ui/app-text';

export default function PaymentsScreen() {
  const router = useRouter();

  const handlePressCourse = (courseId: string) => {
    router.push({
      pathname: '/payment/[courseId]',
      params: { courseId },
    });
  };

  return (
    <View style={styles.container}>
      <AppText weight='700' style={styles.title}>
        Befizetések
      </AppText>
      <FlatList
        data={coursesMock}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CourseListItem course={item} onPress={() => handlePressCourse(item.courseId)} />}
      />
    </View>
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
