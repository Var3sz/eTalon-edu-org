import { FlatList, StyleSheet, View } from 'react-native';

import CourseListItem from '../../../components/courses/course-list-item';
import AppText from '../../../components/ui/app-text';
import { useAuth } from '../../../contexts/AuthContext';
import useInitAttendanceScreen from '../../../hooks/attendance/use-init-attendance-screen';

export default function AttendanceScreen() {
  const { getAccessToken } = useAuth();

  const { courses, handlePressCourse } = useInitAttendanceScreen({
    getAccessToken: getAccessToken,
  });

  return (
    <View style={styles.container}>
      <AppText weight='700' style={styles.title}>
        Jelenlétek
      </AppText>
      <FlatList
        data={courses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <CourseListItem course={item} onPress={() => handlePressCourse(item.id)} />}
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
