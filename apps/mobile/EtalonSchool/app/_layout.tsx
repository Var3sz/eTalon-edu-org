import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { colors } from '../lib/colors';

export default function RootLayout() {
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
        }}
      >
        <Stack.Screen name='index' options={{ headerShown: false, title: 'Bejelentkezés' }} />
        <Stack.Screen name='home' options={{ title: 'Kezdőlap' }} />
      </Stack>
    </>
  );
}
