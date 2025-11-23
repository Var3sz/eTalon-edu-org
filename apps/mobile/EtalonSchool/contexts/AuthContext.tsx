import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';

import { SERVER_BASE_URL } from '../api/models/serviceEndpoints/auth';
import { TokensType, User } from '../models/auth/auth';
import { SplashScreen, useRouter } from 'expo-router';
import { loadTokens, loadUser, saveTokens, saveUser } from '../lib/auth/token-storage';

SplashScreen.preventAutoHideAsync();

interface AuthContextType {
  isReady: boolean;
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  getAccessToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const REFRESH_THRESHOLD_MS = 30 * 1000;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [tokens, setTokens] = useState<TokensType | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(false);

  // Login function
  const login = async (email: string, password: string) => {
    const res = await fetch(`${SERVER_BASE_URL}auth/login`, {
      method: 'POST',
      body: JSON.stringify({ username: email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.status !== 201 && res.status !== 200) {
      console.error('Login failed', res.status, res.statusText);
      Toast.show({ type: 'error', text1: 'Sikertelen bejelentkezés!', position: 'top' });
      return;
    }

    const response = await res.json();
    const { user: userFromApi, tokens: tokensFromApi } = response as { user: User; tokens: TokensType };

    setUser(userFromApi);
    setTokens(tokensFromApi);
    await saveTokens(tokensFromApi);
    await saveUser(userFromApi);
    setIsAuthenticated(true);
    router.replace('/(main)/(tabs)/courses');
  };

  // Logout function
  const logout = async () => {
    setUser(null);
    setTokens(null);
    await saveTokens(null);
    await saveUser(null);
    setIsAuthenticated(false);
    router.replace('/(auth)');
  };

  // Refresh token
  const refreshTokens = async (): Promise<TokensType | null> => {
    try {
      const currentTokens = tokens ?? (await loadTokens());

      if (!currentTokens?.refreshToken) {
        return null;
      }

      const res = await fetch(`${SERVER_BASE_URL}auth/refresh`, {
        method: 'POST',
        headers: {
          authorization: `Refresh ${currentTokens.refreshToken}`,
        },
      });

      if (!res.ok) {
        console.error('Token refresh failed', res.status, res.statusText);
        return null;
      }

      const newTokens = (await res.json()) as TokensType;
      setTokens(newTokens);
      await saveTokens(newTokens);
      setIsAuthenticated(true);

      return newTokens;
    } catch (error) {
      console.error('Token refresh error', error);
      return null;
    }
  };

  // Public getAccessToken for API calls (auto-refresh)
  const getAccessToken = async (): Promise<string | null> => {
    let currentTokens = tokens ?? (await loadTokens());
    if (!currentTokens) {
      setIsAuthenticated(false);
      return null;
    }

    const now = Date.now();

    if (currentTokens.expiresIn - now < REFRESH_THRESHOLD_MS) {
      const refreshed = await refreshTokens();
      if (!refreshed) {
        setIsAuthenticated(false);
        return null;
      }
      currentTokens = refreshed;
    }

    return currentTokens.accessToken;
  };

  // App startup - deciding where to navigate
  useEffect(() => {
    const getAuthFromStorage = async () => {
      try {
        const storedTokens = await loadTokens();
        const storedUser = await loadUser();

        if (!storedTokens) {
          setIsAuthenticated(false);
          setUser(null);
        } else {
          const refreshed = await refreshTokens();
          setIsAuthenticated(!!refreshed);
          if (refreshed !== null) {
            setUser(storedUser);
          } else {
            setUser(null);
          }
        }
      } catch (error) {
        console.error(error);
        setIsAuthenticated(false);
      } finally {
        setIsReady(true);
      }
    };

    getAuthFromStorage();
  }, []);

  // Hide splash screen when the application is in ready state
  useEffect(() => {
    if (isReady) {
      SplashScreen.hideAsync();
    }
  }, [isReady]);

  useEffect(() => console.log('USER', user), [user]);

  return (
    <AuthContext.Provider value={{ isReady, isAuthenticated, user, login, logout, getAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
