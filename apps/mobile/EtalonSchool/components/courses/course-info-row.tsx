import { StyleSheet, Text, View } from 'react-native';

type CourseInfoRowProps = {
  label: string;
  value: string;
};

export default function CourseInfoRow({ label, value }: CourseInfoRowProps) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}: </Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginBottom: 6,
    flexWrap: 'wrap',
  },
  label: {
    fontWeight: '700',
    fontSize: 16,
  },
  value: {
    fontSize: 16,
  },
});
