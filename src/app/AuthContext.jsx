'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext(undefined);

const USERS_KEY = 'habitflow-users-v1';
const CURRENT_USER_KEY = 'habitflow-current-user-v1';

// Seed demo account credentials
const DEMO_USER = {
  email: 'test@example.com',
  password: 'password123',
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize users and current session
  useEffect(() => {
    try {
      // 1. Ensure demo user exists in local database
      const savedUsersRaw = localStorage.getItem(USERS_KEY);
      let users = savedUsersRaw ? JSON.parse(savedUsersRaw) : [];
      
      const demoExists = users.some(u => u.email.toLowerCase() === DEMO_USER.email.toLowerCase());
      if (!demoExists) {
        users.push(DEMO_USER);
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
      }

      // 2. Load active session
      const activeSession = localStorage.getItem(CURRENT_USER_KEY);
      if (activeSession) {
        setUser(JSON.parse(activeSession));
      }
    } catch (err) {
      console.error('Failed to initialize auth state:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    // Simulate natural networking delay for visual satisfaction (spinner, transitions)
    await new Promise((resolve) => setTimeout(resolve, 800));

    try {
      const savedUsersRaw = localStorage.getItem(USERS_KEY);
      const users = savedUsersRaw ? JSON.parse(savedUsersRaw) : [DEMO_USER];
      
      const matchedUser = users.find(
        u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );

      if (!matchedUser) {
        throw new Error('Invalid email or password. Please try again.');
      }

      const activeUser = { email: matchedUser.email };
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(activeUser));
      setUser(activeUser);
    } catch (err) {
      setLoading(false);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email, password) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      const savedUsersRaw = localStorage.getItem(USERS_KEY);
      const users = savedUsersRaw ? JSON.parse(savedUsersRaw) : [DEMO_USER];

      const emailExists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
      if (emailExists) {
        throw new Error('An account with this email already exists.');
      }

      const newUser = { email, password };
      users.push(newUser);
      localStorage.setItem(USERS_KEY, JSON.stringify(users));

      const activeUser = { email };
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(activeUser));
      setUser(activeUser);
    } catch (err) {
      setLoading(false);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem(CURRENT_USER_KEY);
      setUser(null);
    } catch (err) {
      console.error('Failed to logout:', err);
    }
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      signup,
      logout,
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
