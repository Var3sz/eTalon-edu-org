import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const EXPIRES_AT_KEY = 'expires_at'; // ms timestamp

export type TokensType = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number; // ms
};

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
    if (value == null) {
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

export async function saveAccessToken(token: string | null) {
  return setItem(ACCESS_TOKEN_KEY, token);
}

export async function loadAccessToken() {
  return getItem(ACCESS_TOKEN_KEY);
}

export async function deleteAccessToken() {
  return setItem(ACCESS_TOKEN_KEY, null);
}

export async function saveRefreshToken(token: string | null) {
  return setItem(REFRESH_TOKEN_KEY, token);
}

export async function loadRefreshToken() {
  return getItem(REFRESH_TOKEN_KEY);
}

export async function deleteRefreshToken() {
  return setItem(REFRESH_TOKEN_KEY, null);
}
