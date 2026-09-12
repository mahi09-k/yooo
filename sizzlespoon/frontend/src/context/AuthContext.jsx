import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../api/axios';

// ── Context ────────────────────────────────────────────────────────────────────
const AuthContext = createContext(null);

// ── Storage Keys ──────────────────────────────────────────────────────────────
const TOKEN_KEY = 'sizzlespoon_token';
const USER_KEY  = 'sizzlespoon_user';

// ── Provider ───────────────────────────────────────────────────────────────────
export const AuthProvider = ({ children }) => {
  const [user,    setUser]    = useState(() => {
    const stored = localStorage.getItem(USER_KEY);
    return stored ? JSON.parse(stored) : null;
  });
  const [token,   setToken]   = useState(() => localStorage.getItem(TOKEN_KEY));
  const [loading, setLoading] = useState(false);

  // ── Persist token + user to localStorage whenever they change ──────────────
  useEffect(() => {
    if (token && user) {
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    }
  }, [token, user]);

  // ── Register ───────────────────────────────────────────────────────────────
  const register = useCallback(async (Username, Email, Password) => {
    setLoading(true);
    try {
      const { data } = await api.post('/auth/register', { Username, Email, Password });
      setToken(data.token);
      setUser(data.user);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Registration failed.' };
    } finally {
      setLoading(false);
    }
  }, []);

  // ── Login ──────────────────────────────────────────────────────────────────
  const login = useCallback(async (Email, Password) => {
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', { Email, Password });
      setToken(data.token);
      setUser(data.user);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Login failed.' };
    } finally {
      setLoading(false);
    }
  }, []);

  // ── Logout ─────────────────────────────────────────────────────────────────
  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
  }, []);

  // ── Helpers ────────────────────────────────────────────────────────────────
  const isAuthenticated = !!token;
  const isAdmin = user?.Role === 'admin';

  return (
    <AuthContext.Provider value={{ user, token, loading, isAuthenticated, isAdmin, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ── Custom Hook ────────────────────────────────────────────────────────────────
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
};
