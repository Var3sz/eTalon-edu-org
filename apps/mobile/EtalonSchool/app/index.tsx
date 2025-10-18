import React, { useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { router } from 'expo-router';
import { colors } from '../lib/colors';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const disabled = !email || !password;

  const onLogin = () => {
    Alert.alert('Bejelentkezés', `Email: ${email}`);
    router.replace('/home');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.bg }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>
        {/* Logo (swap with your real logo if you have one) */}
        <View style={styles.logoWrap}>
          <Image source={require('../assets/splash.png')} style={styles.logo} resizeMode='contain' />
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>Bejelentkezés</Text>

          <View style={styles.field}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              autoCapitalize='none'
              keyboardType='email-address'
              placeholder='you@example.com'
              placeholderTextColor={colors.subtext}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Jelszó</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholder='••••••••'
              placeholderTextColor={colors.subtext}
            />
          </View>

          <Pressable
            onPress={onLogin}
            disabled={disabled}
            style={({ pressed }) => [styles.button, { opacity: disabled ? 0.5 : pressed ? 0.9 : 1 }]}
          >
            <Text style={styles.buttonText}>Belépés</Text>
          </Pressable>
        </View>

        <Text
          style={styles.footer}
          numberOfLines={1}
          adjustsFontSizeToFit
          allowFontScaling={false}
          ellipsizeMode='tail'
        >
          © {new Date().getFullYear()} Etalon School
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 24, paddingTop: 48, alignItems: 'center', justifyContent: 'center' },
  logoWrap: { alignItems: 'center', marginBottom: 24 },
  logo: { width: 120, height: 60, marginBottom: 8 },
  brand: { color: colors.text, fontSize: 18, fontWeight: '600' },
  card: {
    width: '100%',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  title: { color: colors.text, fontSize: 20, fontWeight: '700', marginBottom: 16 },
  field: { marginBottom: 14 },
  label: { color: colors.subtext, marginBottom: 6 },
  input: {
    height: 46,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
    color: colors.text,
  },
  button: {
    height: 48,
    backgroundColor: colors.primary,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
  },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  footer: {
    marginTop: 16,
    color: colors.subtext,
    textAlign: 'center',
    alignSelf: 'center',
    maxWidth: '100%',
    flexShrink: 1,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
});
