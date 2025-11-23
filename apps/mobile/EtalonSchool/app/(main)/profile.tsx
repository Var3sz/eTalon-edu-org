import { StyleSheet, Text, View } from 'react-native';

import AppText from '../../components/ui/app-text';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      {/* Nagy kör avatar */}
      <View style={styles.avatar}>
        <AppText weight='600' style={styles.avatarText}>
          VÁ
        </AppText>
      </View>

      {/* Név */}
      <AppText weight='700' style={styles.name}>
        Varga Ádám
      </AppText>

      {/* Valami extra infó */}
      <AppText weight='500' style={styles.subtitle}>
        adam.varga@bluebax.com
      </AppText>
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
