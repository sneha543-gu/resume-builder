import React, { createContext, useContext, useState } from 'react';
import { loginUser, signUpUser, type StoredUser } from '../lib/userDB';

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthContextValue {
  isLoggedIn: boolean;
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function toPublicUser(stored: StoredUser): User {
  return { id: stored.id, username: stored.username, email: stored.email };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const isLoading = false;

  // Login with email + password — throws if wrong credentials
  const login = async (email: string, password: string): Promise<void> => {
    const stored = loginUser(email, password); // throws on error
    const pub = toPublicUser(stored);
    setUser(pub);
    setIsLoggedIn(true);
  };

  // Signup — throws if email already exists or weak password
  const signup = async (
    username: string,
    email: string,
    password: string
  ): Promise<void> => {
    signUpUser(username, email, password); // throws on error
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
