import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const nav = [
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/projects', label: 'Projects' },
  { to: '/admin/services', label: 'Services' },
  { to: '/admin/blog', label: 'Blog' },
  { to: '/admin/testimonials', label: 'Testimonials' },
  { to: '/admin/team', label: 'Team' },
  { to: '/admin/messages', label: 'Contact Messages' },
  { to: '/admin/requests', label: 'Project Requests' },
  { to: '/admin/settings', label: 'Settings' },
];

export default function AdminLayout() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex bg-ink-950 text-white">
      <aside className="w-64 shrink-0 border-r border-white/10 p-5 hidden md:flex flex-col">
        <h1 className="text-xl font-display font-bold mb-8">Aerowix <span className="text-gradient">Admin</span></h1>
        <nav className="flex flex-col gap-1 flex-1">
          {nav.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.end}
              className={({ isActive }) => `px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-brand-600 text-white' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}>
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-white/10 pt-4">
          <p className="text-xs text-white/40 mb-2">{admin?.email}</p>
          <button onClick={() => { logout(); navigate('/admin/login'); }} className="text-sm text-red-400 hover:text-red-300">Log out</button>
        </div>
      </aside>
      <main className="flex-1 p-6 md:p-10 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
}
