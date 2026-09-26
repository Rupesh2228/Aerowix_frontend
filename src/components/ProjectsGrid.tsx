import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { api } from '../lib/api';
import { Project, PROJECT_CATEGORIES } from '../types';
import { SkeletonGrid } from './Skeleton';

export default function ProjectsGrid({ limit, showFilters = true }: { limit?: number; showFilters?: boolean }) {
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [category, setCategory] = useState('All');

  useEffect(() => {
    setProjects(null);
    const q = category !== 'All' ? `?category=${encodeURIComponent(category)}${limit ? `&limit=${limit}` : ''}` : (limit ? `?limit=${limit}` : '');
    api.get(`/projects${q}`).then((d) => setProjects(d.projects)).catch(() => setProjects([]));
  }, [category, limit]);

  return (
    <div>
      {showFilters && (
        <div className="flex flex-wrap gap-2 mb-10">
          {['All', ...PROJECT_CATEGORIES].map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${category === c ? 'bg-brand-600 text-white' : 'glass text-white/70 hover:text-white'}`}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      {projects === null ? <SkeletonGrid /> : projects.length === 0 ? (
        <p className="text-white/50">No projects published in this category yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            >
              <Link to={`/projects/${p.slug}`} className="group block glass rounded-2xl overflow-hidden hover:-translate-y-1.5 hover:border-brand-400/40 transition-all duration-300">
                <div className="h-48 overflow-hidden bg-white/5">
                  {p.hero_image_url ? (
                    <img src={p.hero_image_url} alt={p.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : <div className="w-full h-full bg-gradient-to-br from-brand-800/40 to-purple-800/30" />}
                </div>
                <div className="p-5">
                  <span className="text-xs font-semibold text-brand-300 uppercase tracking-wider">{p.category}</span>
                  <h3 className="text-lg font-semibold mt-1.5 group-hover:text-brand-200 transition-colors">{p.title}</h3>
                  {p.overview && <p className="text-white/50 text-sm mt-2 line-clamp-2">{p.overview}</p>}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
