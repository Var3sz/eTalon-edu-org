import { useRouter } from 'expo-router';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { getAccessToken } from '../lib/auth/securestore';

interface AuthContextType {
  isAuthenticated: boolean;
  isReady: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(false);
  const router = useRouter();

  // Rehydrate tokens on app start
  useEffect(() => {
    (async () => {
      const access = await getAccessToken();
      setIsAuthenticated(Boolean(access));
      setIsReady(true);
    })();
  }, []);

  // Login function (redirect to home)
  const login = async () => {
    setIsAuthenticated(true);
    router.replace('/(main)/(tabs)/(home)');
  };

  // Logout function (redirect to login)
  const logout = async () => {
    setIsAuthenticated(false);
    router.replace('/(auth)');
  };

  return <AuthContext.Provider value={{ isAuthenticated, isReady, login, logout }}>{children}</AuthContext.Provider>;
};

// Hook to use authentication state
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
