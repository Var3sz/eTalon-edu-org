// app/(main)/(tabs)/invoices.tsx
import { View, Text, StyleSheet } from 'react-native';

export default function InvoicesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Számlázás screen 💸</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightblue' },
  text: { fontSize: 22, fontWeight: '700' },
});
