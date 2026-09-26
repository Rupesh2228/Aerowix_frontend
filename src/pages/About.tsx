import { useEffect, useState } from 'react';
import AboutSection from '../components/AboutSection';
import ProcessSection from '../components/ProcessSection';
import { api } from '../lib/api';
import { TeamMember } from '../types';

export default function About() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  useEffect(() => { api.get('/team').then((d) => setTeam(d.team)).catch(() => {}); }, []);

  return (
    <div className="pt-16">
      <AboutSection />
      <ProcessSection />
      {team.length > 0 && (
        <section className="max-w-7xl mx-auto px-5 md:px-8 py-24">
          <p className="text-brand-300 font-semibold text-sm uppercase tracking-widest mb-3">The people behind Aerowix</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-14">Our team</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((m) => (
              <div key={m.id} className="glass rounded-2xl p-6 text-center">
                <div className="w-20 h-20 rounded-full bg-white/5 mx-auto mb-4 overflow-hidden">
                  {m.photo_url && <img src={m.photo_url} alt={m.name} className="w-full h-full object-cover" />}
                </div>
                <h3 className="font-semibold">{m.name}</h3>
                <p className="text-white/50 text-sm">{m.role}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
