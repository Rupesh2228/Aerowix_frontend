import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../lib/api';
import { BlogPost } from '../types';
import { SkeletonGrid } from '../components/Skeleton';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[] | null>(null);

  useEffect(() => { api.get('/blog').then((d) => setPosts(d.posts)).catch(() => setPosts([])); }, []);

  return (
    <section className="max-w-7xl mx-auto px-5 md:px-8 pt-32 pb-24">
      <p className="text-brand-300 font-semibold text-sm uppercase tracking-widest mb-3">Insights</p>
      <h1 className="text-4xl md:text-6xl font-display font-bold mb-12">Blog</h1>

      {posts === null ? <SkeletonGrid /> : posts.length === 0 ? (
        <p className="text-white/50">No articles published yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((p) => (
            <Link key={p.id} to={`/blog/${p.slug}`} className="group block glass rounded-2xl overflow-hidden hover:-translate-y-1.5 transition-all duration-300">
              <div className="h-44 bg-white/5">
                {p.featured_image_url ? <img src={p.featured_image_url} alt={p.title} className="w-full h-full object-cover" loading="lazy" /> : <div className="w-full h-full bg-gradient-to-br from-brand-800/40 to-purple-800/30" />}
              </div>
              <div className="p-5">
                {p.category && <span className="text-xs font-semibold text-brand-300 uppercase tracking-wider">{p.category}</span>}
                <h3 className="text-lg font-semibold mt-1.5 group-hover:text-brand-200 transition-colors">{p.title}</h3>
                {p.excerpt && <p className="text-white/50 text-sm mt-2 line-clamp-2">{p.excerpt}</p>}
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
