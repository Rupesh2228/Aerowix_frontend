import React, { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../lib/api';

interface Admin { id: number; name?: string; email: string; role: string }
interface AuthCtx {
  admin: Admin | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const Ctx = createContext<AuthCtx>({} as AuthCtx);
export const useAuth = () => useContext(Ctx);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('aerowix_admin_token');
    if (!token) { setLoading(false); return; }
    api.get('/auth/me')
      .then((d) => setAdmin(d.admin))
      .catch(() => localStorage.removeItem('aerowix_admin_token'))
      .finally(() => setLoading(false));
  }, []);

  async function login(email: string, password: string) {
    const data = await api.post('/auth/login', { email, password });
    localStorage.setItem('aerowix_admin_token', data.token);
    setAdmin(data.admin);
  }

  function logout() {
    localStorage.removeItem('aerowix_admin_token');
    setAdmin(null);
  }

  return <Ctx.Provider value={{ admin, loading, login, logout }}>{children}</Ctx.Provider>;
};
