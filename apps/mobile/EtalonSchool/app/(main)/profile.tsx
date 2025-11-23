import { StyleSheet, View } from 'react-native';

import AppText from '../../components/ui/app-text';
import { useAuth } from '../../contexts/AuthContext';
import useInitProfileScreen from '../../hooks/profile-screen/use-init-profile-screen';

export default function ProfileScreen() {
  const { user, getAccessToken } = useAuth();

  const { profileData, getInitials } = useInitProfileScreen({ user, getAccessToken });

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <AppText weight='600' style={styles.avatarText}>
          {getInitials(profileData?.name)}
        </AppText>
      </View>

      <AppText weight='700' style={styles.name}>
        {profileData?.name}
      </AppText>

      <AppText weight='500' style={styles.subtitle}>
        {profileData?.email}
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
