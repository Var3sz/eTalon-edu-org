import {
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Toast from 'react-native-toast-message';

import { AuthProvider } from '../contexts/AuthContext';
import { colors } from '../lib/colors';

const queryClient = new QueryClient();

export default function RootLayout() {
  useFonts({
    Inter300: Inter_300Light,
    Inter400: Inter_400Regular,
    Inter500: Inter_500Medium,
    Inter600: Inter_600SemiBold,
    Inter700: Inter_700Bold,
  });

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
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
            <Stack.Screen name='(main)' options={{ headerShown: false, animation: 'none' }} />
            <Stack.Screen name='(auth)' options={{ headerShown: false, animation: 'none' }} />
          </Stack>
          <Toast />
        </>
      </AuthProvider>
    </QueryClientProvider>
  );
}
