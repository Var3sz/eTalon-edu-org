import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';

import { SERVER_BASE_URL } from '../api/models/serviceEndpoints/auth';
import { loadAccessToken, saveAccessToken, saveRefreshToken } from '../lib/auth/token-storage';
import { User } from '../models/auth/auth';
import { SplashScreen, useRouter } from 'expo-router';

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

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(false);

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
    const { user, tokens } = response;

    setUser(user);
    await saveAccessToken(tokens.accessToken);
    await saveRefreshToken(tokens.refreshToken);
    setIsAuthenticated(true);
    router.replace('/(main)/(tabs)/courses');
  };

  const logout = async () => {
    setUser(null);
    await saveAccessToken(null);
    await saveRefreshToken(null);
    setIsAuthenticated(false);
    router.replace('/(auth)');
  };

  const getAccessToken = async () => {
    const accessToken = await loadAccessToken();
    return accessToken;
  };

  // App startup - deciding where to navigate
  useEffect(() => {
    const getAuthFromStorage = async () => {
      try {
        const value = await loadAccessToken();
        if (value !== null) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error(error);
      }
      setIsReady(true);
    };
    getAuthFromStorage();
  }, []);

  // Hide splash screen when the application is in ready state
  useEffect(() => {
    if (isReady) {
      SplashScreen.hideAsync();
    }
  }, [isReady]);

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
