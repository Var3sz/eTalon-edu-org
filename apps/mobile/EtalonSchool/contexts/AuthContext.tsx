import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';

import { TokensType, User } from '../models/auth/auth';
import { SERVER_BASE_URL } from '../api/models/serviceEndpoints/auth';
import { loadAccessToken, loadRefreshToken, saveAccessToken, saveRefreshToken } from '../lib/auth/token-storage';
import Toast from 'react-native-toast-message';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  getAccessToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

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
  };

  const logout = async () => {
    setUser(null);
    await saveAccessToken(null);
    await saveRefreshToken(null);
    setIsAuthenticated(false);
  };

  const getAccessToken = async () => {
    const accessToken = await loadAccessToken();
    return accessToken;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, getAccessToken }}>
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
