import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '../lib/api';

export default function Footer() {
  const [info, setInfo] = useState<any>(null);

  useEffect(() => {
    api.get('/settings').then((d) => setInfo(d.settings?.company_info)).catch(() => {});
  }, []);

  return (
    <footer className="border-t border-white/10 mt-24">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-16 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <h3 className="text-2xl font-display font-bold">Aerowix <span className="text-gradient">Group</span></h3>
          <p className="mt-4 text-white/60 max-w-sm">
            {info?.description || 'Building digital solutions for the modern world.'}
          </p>
          <div className="flex gap-4 mt-6 text-white/60">
            {['facebook', 'instagram', 'linkedin', 'github'].map((s) => (
              info?.social?.[s] ? (
                <a key={s} href={info.social[s]} target="_blank" rel="noreferrer" className="hover:text-white transition-colors capitalize text-sm">{s}</a>
              ) : null
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-white/50">Company</h4>
          <div className="flex flex-col gap-3 text-white/70 text-sm">
            <Link to="/services" className="hover:text-white">Services</Link>
            <Link to="/projects" className="hover:text-white">Projects</Link>
            <Link to="/about" className="hover:text-white">About</Link>
            <Link to="/blog" className="hover:text-white">Blog</Link>
            <Link to="/contact" className="hover:text-white">Contact</Link>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-white/50">Contact</h4>
          <div className="flex flex-col gap-3 text-white/70 text-sm">
            {info?.email && <a href={`mailto:${info.email}`} className="hover:text-white">{info.email}</a>}
            {info?.phone && <span>{info.phone}</span>}
            {info?.address && <span>{info.address}</span>}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs text-white/40">
        © {new Date().getFullYear()} Aerowix Group. All rights reserved.
      </div>
    </footer>
  );
}
