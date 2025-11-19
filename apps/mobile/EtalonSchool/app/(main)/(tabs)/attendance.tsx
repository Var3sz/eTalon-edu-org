// app/(main)/(tabs)/attendance.tsx
import { View, Text, StyleSheet } from 'react-native';

export default function AttendanceScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Jelenlét screen ✅</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightgreen' },
  text: { fontSize: 22, fontWeight: '700' },
});
