import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { api } from '../lib/api';
import { Project } from '../types';

export default function FeaturedProject() {
  const [project, setProject] = useState<Project | null | undefined>(undefined);

  useEffect(() => {
    api.get('/projects/featured').then((d) => setProject(d.project)).catch(() => setProject(null));
  }, []);

  if (project === null || !project) return null;

  return (
    <section className="max-w-7xl mx-auto px-5 md:px-8 py-24">
      <p className="text-brand-300 font-semibold text-sm uppercase tracking-widest mb-3">Featured work</p>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="glass rounded-3xl overflow-hidden grid md:grid-cols-2"
      >
        <div className="h-64 md:h-auto bg-white/5">
          {project.hero_image_url ? (
            <img src={project.hero_image_url} alt={project.title} className="w-full h-full object-cover" />
          ) : <div className="w-full h-full bg-gradient-to-br from-brand-800/50 to-purple-800/30" />}
        </div>
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <span className="text-xs font-semibold text-brand-300 uppercase tracking-wider mb-3">{project.category}</span>
          <h3 className="text-2xl md:text-3xl font-display font-bold mb-4">{project.title}</h3>
          <p className="text-white/60 mb-6 leading-relaxed">{project.overview}</p>
          {project.technologies?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {project.technologies.map((t) => (
                <span key={t} className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70">{t}</span>
              ))}
            </div>
          )}
          <Link to={`/projects/${project.slug}`} className="inline-flex w-fit items-center gap-2 bg-brand-600 hover:bg-brand-500 transition-colors px-6 py-3 rounded-full font-semibold">
            View Case Study →
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
