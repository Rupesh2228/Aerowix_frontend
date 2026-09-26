import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { api } from '../lib/api';
import { Project } from '../types';
import { useSEO } from '../hooks/useSEO';

export default function ProjectDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState<Project | null | undefined>(undefined);

  useEffect(() => {
    setProject(undefined);
    api.get(`/projects/${slug}`).then((d) => setProject(d.project)).catch(() => setProject(null));
  }, [slug]);

  useSEO({
    title: project ? (project.seo_title || project.title) : undefined,
    description: project ? (project.seo_description || project.overview || undefined) : undefined,
    image: project?.hero_image_url || undefined,
    type: 'article',
    structuredData: project ? {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: project.title,
      description: project.overview || undefined,
      image: project.hero_image_url || undefined,
      creator: { '@type': 'Organization', name: 'Aerowix Group' },
      dateCreated: project.completion_date || undefined,
    } : undefined,
  });

  if (project === undefined) {
    return <div className="pt-40 text-center text-white/50">Loading project…</div>;
  }
  if (project === null) {
    return (
      <div className="pt-40 pb-24 text-center">
        <h1 className="text-3xl font-bold mb-4">Project not found</h1>
        <Link to="/projects" className="text-brand-300">← Back to projects</Link>
      </div>
    );
  }

  return (
    <article className="pt-28 pb-24">
      <div className="max-w-5xl mx-auto px-5 md:px-8">
        <Link to="/projects" className="text-white/50 hover:text-white text-sm">← Back to projects</Link>
        <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-display font-bold mt-4 mb-6">
          {project.title}
        </motion.h1>

        {project.hero_image_url && (
          <img src={project.hero_image_url} alt={project.title} className="w-full rounded-2xl mb-10 object-cover max-h-[480px]" />
        )}

        <div className="grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-8">
            {project.overview && <Section title="Overview" text={project.overview} />}
            {project.challenges && <Section title="Challenges" text={project.challenges} />}
            {project.solution && <Section title="Solution" text={project.solution} />}
            {project.results && <Section title="Results" text={project.results} />}

            {project.screenshots?.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Screenshots</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {project.screenshots.map((s, i) => (
                    <img key={i} src={s} alt={`Screenshot ${i + 1}`} className="rounded-xl object-cover w-full" loading="lazy" />
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="glass rounded-2xl p-6 h-fit space-y-5">
            {project.client_name && <Info label="Client" value={project.client_name} />}
            <Info label="Category" value={project.category} />
            {project.completion_date && <Info label="Completed" value={new Date(project.completion_date).toLocaleDateString()} />}
            {project.technologies?.length > 0 && (
              <div>
                <div className="text-xs uppercase tracking-wider text-white/40 mb-2">Technologies</div>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((t) => <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10">{t}</span>)}
                </div>
              </div>
            )}
            {project.key_features?.length > 0 && (
              <div>
                <div className="text-xs uppercase tracking-wider text-white/40 mb-2">Key Features</div>
                <ul className="text-sm text-white/70 space-y-1.5 list-disc list-inside">
                  {project.key_features.map((f) => <li key={f}>{f}</li>)}
                </ul>
              </div>
            )}
            <div className="flex flex-col gap-3 pt-2">
              {project.live_url && (
                <a href={project.live_url} target="_blank" rel="noreferrer" className="bg-brand-600 hover:bg-brand-500 transition-colors text-center py-2.5 rounded-full font-semibold text-sm">
                  Visit Live Site
                </a>
              )}
              {project.github_url && (
                <a href={project.github_url} target="_blank" rel="noreferrer" className="glass text-center py-2.5 rounded-full font-semibold text-sm hover:bg-white/10">
                  View on GitHub
                </a>
              )}
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}

function Section({ title, text }: { title: string; text: string }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">{title}</h2>
      <p className="text-white/70 leading-relaxed whitespace-pre-line">{text}</p>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wider text-white/40">{label}</div>
      <div className="text-sm mt-1">{value}</div>
    </div>
  );
}
