import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#007aff',
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name='courses'
        options={{
          title: 'Kurzusok',
          tabBarIcon: ({ color }) => <Ionicons name='book-outline' size={30} color={color} />,
        }}
      />

      <Tabs.Screen
        name='attendance'
        options={{
          title: 'Jelenlét',
          tabBarIcon: ({ color }) => <Ionicons name='people-outline' size={30} color={color} />,
        }}
      />

      <Tabs.Screen
        name='payments'
        options={{
          title: 'Számlázás',
          tabBarIcon: ({ color }) => <Ionicons name='wallet-outline' size={30} color={color} />,
        }}
      />
    </Tabs>
  );
}
