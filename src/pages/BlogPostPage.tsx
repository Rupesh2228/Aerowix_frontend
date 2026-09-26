import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../lib/api';
import { BlogPost } from '../types';
import { useSEO } from '../hooks/useSEO';

export default function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPost | null | undefined>(undefined);

  useEffect(() => {
    setPost(undefined);
    api.get(`/blog/${slug}`).then((d) => setPost(d.post)).catch(() => setPost(null));
  }, [slug]);

  useSEO({
    title: post ? (post.seo_title || post.title) : undefined,
    description: post ? (post.seo_description || post.excerpt || undefined) : undefined,
    image: post?.featured_image_url || undefined,
    type: 'article',
    structuredData: post ? {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt || undefined,
      image: post.featured_image_url || undefined,
      author: { '@type': 'Person', name: post.author || 'Aerowix Group' },
      datePublished: post.published_at || undefined,
    } : undefined,
  });

  if (post === undefined) return <div className="pt-40 text-center text-white/50">Loading…</div>;
  if (post === null) return (
    <div className="pt-40 pb-24 text-center">
      <h1 className="text-3xl font-bold mb-4">Article not found</h1>
      <Link to="/blog" className="text-brand-300">← Back to blog</Link>
    </div>
  );

  return (
    <article className="max-w-3xl mx-auto px-5 md:px-8 pt-32 pb-24">
      <Link to="/blog" className="text-white/50 hover:text-white text-sm">← Back to blog</Link>
      {post.category && <p className="text-brand-300 font-semibold text-sm uppercase tracking-widest mt-6 mb-3">{post.category}</p>}
      <h1 className="text-4xl font-display font-bold mb-4">{post.title}</h1>
      <p className="text-white/50 text-sm mb-8">{post.author && `By ${post.author} · `}{post.published_at && new Date(post.published_at).toLocaleDateString()}</p>
      {post.featured_image_url && <img src={post.featured_image_url} alt={post.title} className="w-full rounded-2xl mb-8" />}
      <div className="text-white/70 leading-relaxed whitespace-pre-line">{post.content}</div>
      {post.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-10">
          {post.tags.map((t) => <span key={t} className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10">#{t}</span>)}
        </div>
      )}
    </article>
  );
}
