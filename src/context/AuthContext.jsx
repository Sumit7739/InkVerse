import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAuthSession, storeAuthSession, clearAuthSession } from '../lib/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentSession = getAuthSession();
    if (currentSession) {
      setSession(currentSession);
    }
    setLoading(false);
  }, []);

  const login = (result) => {
    storeAuthSession(result);
    setSession(getAuthSession());
  };

  const logout = () => {
    clearAuthSession();
    setSession(null);
  };

  return (
    <AuthContext.Provider value={{ session, user: session?.user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
