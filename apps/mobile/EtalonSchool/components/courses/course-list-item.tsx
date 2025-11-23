import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';

import { CourseDto } from '../../models/courses/types';
import AppText from '../ui/app-text';

type CourseListItemProps = {
  course: CourseDto;
  onPress: (course: any) => void;
  onLongPress?: (courseId: any) => void;
};

export default function CourseListItem({ course, onPress, onLongPress }: CourseListItemProps) {
  return (
    <Pressable
      onPress={onPress}
      onLongPress={course.locked ? undefined : onLongPress}
      style={({ pressed }) => [styles.item, pressed && styles.itemPressed]}
    >
      <View>
        <AppText weight='600' style={styles.title}>
          {course.courseId}
        </AppText>
        <AppText weight='600' style={styles.group}>
          {course.group}
        </AppText>
      </View>
      <View style={styles.countInfo}>
        <AppText weight='600' style={styles.infoText}>{`${course.headcount} / ${course.maxHeadCount}`}</AppText>
        {course.locked && <Ionicons name='lock-closed' size={22} color='#000' />}
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
    color: '#6b7280',
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
