// components/CourseListItem.js
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type CourseListItemProps = {
  course: any;
  onPress: (course: any) => void;
};

export default function CourseListItem({ course, onPress }: CourseListItemProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.item, pressed && styles.itemPressed]}
      disabled={course.closed === true}
    >
      <View>
        <Text style={styles.title}>{course.courseId}</Text>
        <Text style={styles.group}>{course.group}</Text>
      </View>
      <View style={styles.countInfo}>
        <Text style={styles.infoText}>{`${course.headCount} / ${course.maxHeadCount}`}</Text>
        {course.closed && <Ionicons name='lock-closed' size={22} color='#000' />}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 6,
    marginHorizontal: 12,
    borderRadius: 10,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  group: {
    fontSize: 16,
    color: '#555',
    marginTop: 2,
  },
  countInfo: {
    flexDirection: 'row',
    gap: 10,
  },

  infoText: {
    marginTop: 2,
    fontSize: 16,
  },
  itemPressed: {
    opacity: 0.7,
  },
});
