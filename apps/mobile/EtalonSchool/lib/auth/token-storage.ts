import * as SecureStore from 'expo-secure-store';

const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const EXPIRES_AT_KEY = 'expires_at'; // ms timestamp

export type TokensType = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number; // ms
};

async function safeSetItem(key: string, value: string) {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (e) {
    console.warn('[SecureStore] setItem error', key, e);
  }
}

async function safeGetItem(key: string): Promise<string | null> {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (e) {
    console.warn('[SecureStore] getItem error', key, e);
    return null;
  }
}

async function safeDeleteItem(key: string) {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (e) {
    console.warn('[SecureStore] deleteItem error', key, e);
  }
}

export async function saveTokens(tokens: TokensType) {
  await safeSetItem(ACCESS_TOKEN_KEY, tokens.accessToken);
  await safeSetItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
  await safeSetItem(EXPIRES_AT_KEY, String(tokens.expiresIn));
}

export async function getAccessToken() {
  return await safeGetItem(ACCESS_TOKEN_KEY);
}

export async function getRefreshToken() {
  return await safeGetItem(REFRESH_TOKEN_KEY);
}

export async function getExpiresAt(): Promise<number | null> {
  const value = await safeGetItem(EXPIRES_AT_KEY);
  return value ? Number(value) : null;
}

export async function clearTokens() {
  await safeDeleteItem(ACCESS_TOKEN_KEY);
  await safeDeleteItem(REFRESH_TOKEN_KEY);
  await safeDeleteItem(EXPIRES_AT_KEY);
}
