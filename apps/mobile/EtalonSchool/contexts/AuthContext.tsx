import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';

import { TokensType, User } from '../models/auth/auth';
import { SERVER_BASE_URL } from '../api/models/serviceEndpoints/auth';
import { clearTokens, getAccessToken, getExpiresAt, getRefreshToken, saveTokens } from '../lib/auth/token-storage';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  accessToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // const applyTokens = (tokens: TokensType | null) => {
  //   if (tokens) {
  //     setAccessToken(tokens.accessToken);
  //     setRefreshToken(tokens.refreshToken);
  //     setIsAuthenticated(true);
  //   } else {
  //     setAccessToken(null);
  //     setRefreshToken(null);
  //     setIsAuthenticated(false);
  //   }
  // };

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
    // applyTokens(tokens);
    // await saveTokens(tokens);
  };

  const logout = async () => {
    setUser(null);
    // applyTokens(null);
    // await clearTokens();
  };

  // useEffect(() => {
  //   const initAuth = async () => {
  //     try {
  //       const [storedAccess, storedRefresh, expiresAt] = await Promise.all([
  //         getAccessToken(),
  //         getRefreshToken(),
  //         getExpiresAt(),
  //       ]);

  //       if (!storedRefresh || !expiresAt) {
  //         applyTokens(null);
  //         return;
  //       }

  //       const now = Date.now();

  //       if (storedAccess && now < expiresAt) {
  //         applyTokens({
  //           accessToken: storedAccess,
  //           refreshToken: storedRefresh,
  //           expiresIn: expiresAt,
  //         });
  //       } else {
  //         await clearTokens();
  //         applyTokens(null);
  //       }
  //     } catch (e) {
  //       console.error('[Auth] initAuth error', e);
  //       await clearTokens();
  //       applyTokens(null);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   initAuth();
  // }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, accessToken, loading, login, logout }}>
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
