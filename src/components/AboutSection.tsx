import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { api } from '../lib/api';

const statLabels: [string, string][] = [
  ['projects_completed', 'Projects Completed'],
  ['technologies_used', 'Technologies Used'],
  ['clients_served', 'Clients Served'],
  ['years_experience', 'Years of Experience'],
];

export default function AboutSection() {
  const [stats, setStats] = useState<Record<string, number> | null>(null);

  useEffect(() => {
    api.get('/settings').then((d) => setStats(d.settings?.stats)).catch(() => {});
  }, []);

  return (
    <section id="about" className="max-w-7xl mx-auto px-5 md:px-8 py-24">
      <div className="grid md:grid-cols-2 gap-14 items-center">
        <div>
          <p className="text-brand-300 font-semibold text-sm uppercase tracking-widest mb-3">Who we are</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">A technology partner built for growth</h2>
          <p className="text-white/70 leading-relaxed mb-4">
            Aerowix Group is a digital technology company helping businesses build websites, software,
            and applications that actually move the needle. We combine engineering rigor with design craft.
          </p>
          <p className="text-white/70 leading-relaxed">
            Our approach is collaborative and transparent — we plan carefully, design intentionally, build
            cleanly, and support what we ship. Businesses work with us because we treat their product like our own.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-5">
          {statLabels.map(([key, label], i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-6 text-center"
            >
              <div className="text-3xl md:text-4xl font-display font-extrabold text-gradient">
                {stats ? stats[key] ?? 0 : '—'}+
              </div>
              <div className="text-white/60 text-sm mt-2">{label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
