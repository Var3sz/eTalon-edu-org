import { useRouter } from 'expo-router';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import CourseListItem from '../../../components/courses/course-list-item';
import AppText from '../../../components/ui/app-text';
import { useAuth } from '../../../contexts/AuthContext';
import useInitPaymentScreen from '../../../hooks/payment/use-init-payment-screen';
import { coursesMock } from '../../../mock/courses';

export default function PaymentsScreen() {
  const { getAccessToken } = useAuth();

  const { courses, handlePressCourse } = useInitPaymentScreen({
    getAccessToken: getAccessToken,
  });

  return (
    <View style={styles.container}>
      <AppText weight='700' style={styles.title}>
        Befizetések
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
