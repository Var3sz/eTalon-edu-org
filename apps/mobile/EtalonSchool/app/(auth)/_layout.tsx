import { Redirect, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { colors } from '../../lib/colors';
import { useAuth } from '../../contexts/AuthContext';

export default function AuthLayout() {
  const { isReady, isAuthenticated } = useAuth();

  if (!isReady) {
    return null;
  }

  if (isAuthenticated) {
    return <Redirect href='/(main)/(tabs)/courses' />;
  }

  return (
    <>
      <StatusBar style='dark' />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.bg },
          headerShadowVisible: false,
          headerTitleStyle: { color: colors.text },
          contentStyle: { backgroundColor: colors.bg },
          headerTitleAlign: 'center',
          headerShown: false,
        }}
      >
        <Stack.Screen name='index' options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
