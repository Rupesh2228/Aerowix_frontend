import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../lib/api';
import { Service } from '../types';
import { useSEO } from '../hooks/useSEO';

export default function ServiceDetail() {
  const { slug } = useParams();
  const [service, setService] = useState<Service | null | undefined>(undefined);

  useEffect(() => {
    api.get(`/services/${slug}`).then((d) => setService(d.service)).catch(() => setService(null));
  }, [slug]);

  useSEO({
    title: service ? (service.title) : undefined,
    description: service ? (service.short_description || undefined) : undefined,
    structuredData: service ? {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: service.title,
      description: service.short_description || undefined,
      provider: { '@type': 'Organization', name: 'Aerowix Group' },
    } : undefined,
  });

  if (service === undefined) return <div className="pt-40 text-center text-white/50">Loading…</div>;
  if (service === null) return (
    <div className="pt-40 pb-24 text-center">
      <h1 className="text-3xl font-bold mb-4">Service not found</h1>
      <Link to="/services" className="text-brand-300">← Back to services</Link>
    </div>
  );

  return (
    <article className="max-w-3xl mx-auto px-5 md:px-8 pt-32 pb-24">
      <Link to="/services" className="text-white/50 hover:text-white text-sm">← Back to services</Link>
      <div className="w-14 h-14 rounded-xl bg-brand-600/20 flex items-center justify-center text-2xl my-6">{service.icon || '⬢'}</div>
      <h1 className="text-4xl font-display font-bold mb-4">{service.title}</h1>
      <p className="text-white/60 text-lg mb-8">{service.short_description}</p>
      {service.content && <div className="text-white/70 leading-relaxed whitespace-pre-line">{service.content}</div>}
      <Link to="/start-a-project" className="inline-flex mt-10 bg-brand-600 hover:bg-brand-500 transition-colors px-7 py-3.5 rounded-full font-semibold">
        Start a Project
      </Link>
    </article>
  );
}
