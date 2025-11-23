import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { Pressable } from 'react-native';
import { colors } from '../../../lib/colors';

export default function AttendanceLayout() {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitleAlign: 'center',
        headerLeft: () => (
          <>
            <Pressable onPress={() => router.back()}>
              <Ionicons name='arrow-back' size={40} color={colors.black} />
            </Pressable>
          </>
        ),
      }}
    />
  );
}
