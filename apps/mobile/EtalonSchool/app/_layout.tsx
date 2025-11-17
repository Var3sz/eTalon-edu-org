import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, View } from 'react-native';

import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { colors } from '../lib/colors';

export default function RootLayout() {
  return (
    <AuthProvider>
      <StatusBar style='dark' />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.bg },
          headerShadowVisible: false,
          headerTitleStyle: { color: colors.text },
          contentStyle: { backgroundColor: colors.bg },
          headerTitleAlign: 'center',
        }}
      >
        <Stack.Screen name='(auth)' options={{ headerShown: false }} />
        <Stack.Screen name='(main)' options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
  );
}
