import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const links = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/projects', label: 'Projects' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all ${scrolled ? 'glass shadow-lg shadow-black/20' : 'bg-transparent'}`}>
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-5 md:px-8 h-16 md:h-20">
        <Link to="/" className="text-xl md:text-2xl font-display font-bold tracking-tight">
          Aerowix <span className="text-gradient">Group</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/80">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={({ isActive }) => isActive ? 'text-white' : 'hover:text-white transition-colors'}>
              {l.label}
            </NavLink>
          ))}
        </div>

        <button
          onClick={toggleTheme}
          className="hidden md:inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-xs font-semibold text-white/80 hover:bg-white/10 hover:text-white transition-colors"
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          <span aria-hidden="true">{theme === 'dark' ? '☀' : '☾'}</span>
          {theme === 'dark' ? 'Light mode' : 'Dark mode'}
        </button>

        <button
          onClick={() => navigate('/start-a-project')}
          className="hidden md:inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-500 transition-colors px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg shadow-brand-600/30"
        >
          Start a Project
        </button>

        <button className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5" onClick={() => setOpen(!open)} aria-label="Menu">
          <motion.span animate={{ rotate: open ? 45 : 0, y: open ? 6 : 0 }} className="w-6 h-0.5 bg-white block" />
          <motion.span animate={{ opacity: open ? 0 : 1 }} className="w-6 h-0.5 bg-white block" />
          <motion.span animate={{ rotate: open ? -45 : 0, y: open ? -6 : 0 }} className="w-6 h-0.5 bg-white block" />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden glass overflow-hidden"
          >
            <div className="flex flex-col p-5 gap-4">
              {links.map((l) => (
                <NavLink key={l.to} to={l.to} onClick={() => setOpen(false)} className="text-white/90 text-base font-medium">
                  {l.label}
                </NavLink>
              ))}
              <button
                onClick={toggleTheme}
                className="border border-white/10 rounded-full px-5 py-3 text-left font-semibold text-white/90 hover:bg-white/10 transition-colors"
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {theme === 'dark' ? '☀  Light mode' : '☾  Dark mode'}
              </button>
              <Link to="/start-a-project" onClick={() => setOpen(false)} className="bg-brand-600 text-center px-5 py-3 rounded-full font-semibold">
                Start a Project
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
