"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, LoginCredentials, RegisterData } from '@/types/auth.types';
import * as authService from '@/services/authService';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { getUserById } from '@/services/userService';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
}

// Create a default context value to avoid undefined errors
const defaultContextValue: AuthContextType = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
};

const AuthContext = createContext<AuthContextType>(defaultContextValue);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          // User is signed in
          const userDoc = await getUserById(firebaseUser.uid);
          setUser(userDoc);
        } else {
          // User is signed out
          setUser(null);
        }
      } catch (error) {
        console.error('Auth state change error:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    try {
      const response = await authService.login(credentials);
      setUser(response.user);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    setIsLoading(true);
    try {
      const response = await authService.register(data);
      setUser(response.user);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await authService.logout();
      setUser(null);
      router.push('/login');
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
  };

  // Don't render anything until client-side hydration is complete
  if (!mounted && typeof window !== 'undefined') {
    // Return a minimal version that won't cause hydration mismatches
    return <>{children}</>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Create a custom hook that wraps useContext with error handling
export const useAuth = () => {
  // Make sure we're on the client side before using the context
  if (typeof window === 'undefined') {
    return defaultContextValue;
  }
  
  const context = useContext(AuthContext);
  return context;
};

export default AuthProvider; 