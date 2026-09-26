import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { api } from '../lib/api';
import { Service } from '../types';
import { SkeletonGrid } from './Skeleton';

const FALLBACK_ICON = '⬢';

export default function ServicesSection() {
  const [services, setServices] = useState<Service[] | null>(null);

  useEffect(() => {
    api.get('/services').then((d) => setServices(d.services)).catch(() => setServices([]));
  }, []);

  return (
    <section id="services" className="max-w-7xl mx-auto px-5 md:px-8 py-24">
      <div className="max-w-2xl mb-14">
        <p className="text-brand-300 font-semibold text-sm uppercase tracking-widest mb-3">What we do</p>
        <h2 className="text-3xl md:text-5xl font-display font-bold">Full-spectrum digital services</h2>
      </div>

      {services === null ? <SkeletonGrid /> : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="glass rounded-2xl p-7 group hover:border-brand-400/40 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-600/20 flex items-center justify-center text-2xl mb-5 group-hover:bg-brand-600/40 transition-colors">
                {s.icon || FALLBACK_ICON}
              </div>
              <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed mb-4">{s.short_description}</p>
              <Link to={`/services/${s.slug}`} className="text-brand-300 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                Learn more →
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
