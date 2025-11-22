import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';

import { colors } from '../lib/colors';
import { ActivityIndicator, View } from 'react-native';

import {
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { QueryClient, QueryClientProvider, useIsFetching } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

const queryClient = new QueryClient();

function RootNavigator() {
  const { isAuthenticated, user } = useAuth();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.bg },
        headerShadowVisible: false,
        headerTitleStyle: { color: colors.text },
        contentStyle: { backgroundColor: colors.bg },
        headerTitleAlign: 'center',
      }}
    >
      {isAuthenticated === true ? (
        <Stack.Screen name='(main)' options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name='(auth)' options={{ headerShown: false }} />
      )}
    </Stack>
  );
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter300: Inter_300Light,
    Inter400: Inter_400Regular,
    Inter500: Inter_500Medium,
    Inter600: Inter_600SemiBold,
    Inter700: Inter_700Bold,
  });

  // if (!fontsLoaded) {
  //   return (
  //     <View
  //       style={{
  //         flex: 1,
  //         backgroundColor: colors.bg ?? '#ffffff',
  //         alignItems: 'center',
  //         justifyContent: 'center',
  //       }}
  //     >
  //       <ActivityIndicator size='small' color={colors.primary} />
  //     </View>
  //   );
  // }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <>
          <StatusBar style='dark' />
          <RootNavigator />
          <Toast />
        </>
      </AuthProvider>
    </QueryClientProvider>
  );
}
