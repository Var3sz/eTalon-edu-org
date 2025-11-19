// app/_layout.tsx
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator } from 'react-native';

import { colors } from '../lib/colors';
import { useAuth, AuthProvider } from '../contexts/AuthContext';

function RootNavigator() {
  // const { isAuthenticated, user, loading } = useAuth();

  // console.log(isAuthenticated);
  // console.log(user);

  // if (loading) {
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
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.bg },
        headerShadowVisible: false,
        headerTitleStyle: { color: colors.text },
        contentStyle: { backgroundColor: colors.bg },
        headerTitleAlign: 'center',
      }}
    >
      {/* {isAuthenticated === true ? ( */}
      <Stack.Screen name='(main)' options={{ headerShown: false }} />
      {/*  ) : ( */}
      <Stack.Screen name='(auth)' options={{ headerShown: false }} />
      {/*  )} */}
    </Stack>
  );
}

export default function RootLayout() {
  return (
    //<AuthProvider>
    <>
      <StatusBar style='dark' />
      <RootNavigator />
    </>
    //</AuthProvider>
  );
}
