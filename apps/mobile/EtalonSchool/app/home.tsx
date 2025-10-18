import { View, Text, StyleSheet, Pressable } from 'react-native';
import { colors } from '../lib/colors';
import { router } from 'expo-router';

export default function Home() {
  return (
    <View style={styles.wrap}>
      <Text style={styles.text}>Sikeres bejelentkezés! 🎉</Text>

      <Pressable
        onPress={() => router.replace('/')}
        style={({ pressed }) => [styles.btn, { opacity: pressed ? 0.9 : 1 }]}
      >
        <Text style={styles.btnText}>Kijelentkezés</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: colors.bg, alignItems: 'center', justifyContent: 'center', padding: 24 },
  text: { color: colors.text, fontSize: 18, fontWeight: '600', marginBottom: 16 },
  btn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    height: 44,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: { color: '#fff', fontWeight: '700' },
});
