import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';

import { TokensType, User } from '../models/auth/auth';
import { SERVER_BASE_URL } from '../api/models/serviceEndpoints/auth';
import { loadAccessToken, loadRefreshToken, saveAccessToken, saveRefreshToken } from '../lib/auth/token-storage';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  accessToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  getTokens: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const login = async (email: string, password: string) => {
    const res = await fetch(`${SERVER_BASE_URL}auth/login`, {
      method: 'POST',
      body: JSON.stringify({ username: email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.status !== 201 && res.status !== 200) {
      console.error('Login failed', res.status, res.statusText);
      Alert.alert('Sikertelen bejelentkezés!');
      return;
    }

    const response = await res.json();
    const { user, tokens } = response;

    setUser(user);
    setAccessToken(tokens.accessToken);
    await saveAccessToken(tokens.accessToken);
    await saveRefreshToken(tokens.refreshToken);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    setUser(null);
    setAccessToken(null);
    await saveAccessToken(null);
    await saveRefreshToken(null);
    setIsAuthenticated(false);
  };

  const getTokens = async () => {
    const access = await loadAccessToken();
    const refresh = await loadRefreshToken();

    console.log(access, refresh, user);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, accessToken, login, logout, getTokens }}>
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
