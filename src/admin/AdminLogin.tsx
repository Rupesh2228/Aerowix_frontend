import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      await login(email, password);
      navigate('/admin');
    } catch (err: any) {
      setError(err.message || 'Login failed.');
    } finally { setLoading(false); }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-5 bg-ink-950">
      <form onSubmit={submit} className="glass rounded-2xl p-8 w-full max-w-sm">
        <h1 className="text-2xl font-display font-bold mb-1">Aerowix <span className="text-gradient">Admin</span></h1>
        <p className="text-white/50 text-sm mb-6">Sign in to manage your website.</p>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-white/60 mb-1.5 block">Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 focus:outline-none focus:border-brand-400" />
          </div>
          <div>
            <label className="text-sm text-white/60 mb-1.5 block">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 pr-20 focus:outline-none focus:border-brand-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword((visible) => !visible)}
                className="absolute inset-y-0 right-3 text-xs font-semibold text-white/50 hover:text-white transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button type="submit" disabled={loading} className="w-full bg-brand-600 hover:bg-brand-500 disabled:opacity-60 transition-colors py-2.5 rounded-xl font-semibold">
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </div>
      </form>
    </div>
  );
}
