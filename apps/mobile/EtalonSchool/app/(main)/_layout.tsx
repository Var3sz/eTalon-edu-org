import { Redirect, Stack, useRouter } from 'expo-router';

import { useAuth } from '../../contexts/AuthContext';
import { Pressable, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../lib/colors';

export default function AppLayout() {
  const { isAuthenticated, logout } = useAuth();
  if (!isAuthenticated) {
    return <Redirect href='/(auth)' />;
  }
  const router = useRouter();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name='(tabs)'
        options={{
          headerShown: true,
          headerTitle: '',
          headerLeft: () => (
            <>
              <Pressable style={{ marginLeft: 2 }} onPress={() => router.push('/profile')}>
                <Ionicons name='person-circle-outline' size={40} color='#000' />
              </Pressable>
            </>
          ),
          headerRight: () => (
            <>
              <Pressable
                style={{ marginRight: 2 }}
                onPress={async () => {
                  await logout();
                  if (!isAuthenticated) {
                    return <Redirect href='/(auth)' />;
                  }
                }}
              >
                <Ionicons name='log-out-outline' size={40} color='#000' />
              </Pressable>
            </>
          ),
        }}
      />
      <Stack.Screen
        name='profile'
        options={{
          headerShown: true,
          headerTitle: '',
          headerLeft: () => (
            <>
              <Pressable onPress={() => router.back()}>
                <Ionicons name='arrow-back' size={40} color={colors.black} />
              </Pressable>
            </>
          ),
        }}
      />
    </Stack>
  );
}
