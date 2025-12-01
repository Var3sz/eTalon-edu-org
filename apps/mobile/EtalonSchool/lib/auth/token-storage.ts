import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { TokensType, User } from '../../models/auth/auth';

const TOKENS_KEY = 'auth_tokens';
const USER_KEY = 'user';

async function isSecureStoreAvailable() {
  if (Platform.OS !== 'ios' && Platform.OS !== 'android') {
    return false;
  }

  try {
    return await SecureStore.isAvailableAsync();
  } catch {
    return false;
  }
}

async function setItem(key: string, value: string | null) {
  const available = await isSecureStoreAvailable();
  if (!available) return;

  try {
    if (value === null) {
      await SecureStore.deleteItemAsync(key);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  } catch (e) {
    console.warn('SecureStore setItem error', e);
  }
}

async function getItem(key: string): Promise<string | null> {
  const available = await isSecureStoreAvailable();
  if (!available) return null;

  try {
    return await SecureStore.getItemAsync(key);
  } catch (e) {
    console.warn('SecureStore getItem error', e);
    return null;
  }
}

export async function saveTokens(tokens: TokensType | null) {
  if (!tokens) {
    await setItem(TOKENS_KEY, null);
    return;
  }
  await setItem(TOKENS_KEY, JSON.stringify(tokens));
}

export async function loadTokens(): Promise<TokensType | null> {
  const raw = await getItem(TOKENS_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as TokensType;
  } catch {
    return null;
  }
}

export async function saveUser(user: User | null) {
  if (!user) {
    await setItem(USER_KEY, null);
    return;
  }
  await setItem(USER_KEY, JSON.stringify(user));
}

export async function loadUser(): Promise<User | null> {
  const raw = await getItem(USER_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}
