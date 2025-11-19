import { StyleSheet, Text, View } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      {/* Nagy kör avatar */}
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>VÁ</Text>
      </View>

      {/* Név */}
      <Text style={styles.name}>Varga Ádám</Text>

      {/* Valami extra infó */}
      <Text style={styles.subtitle}>adam.varga@bluebax.com</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 12,
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#e0e0ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    borderWidth: 3,
    borderColor: '#4f46e5',
  },
  avatarText: {
    fontSize: 48,
    fontWeight: '700',
    color: '#312e81',
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
});
