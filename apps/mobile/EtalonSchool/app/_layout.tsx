import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { colors } from '../lib/colors';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { ActivityIndicator, View } from 'react-native';

function Gate({ children }: { children: React.ReactNode }) {
  const { isReady } = useAuth();
  if (!isReady) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }
  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <Gate>
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
      </Gate>
    </AuthProvider>
  );
}
