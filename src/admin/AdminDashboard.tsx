import { useEffect, useState } from 'react';
import { api } from '../lib/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => { api.get('/dashboard/stats').then(setStats).catch(() => {}); }, []);

  const cards = [
    { label: 'Total Projects', value: stats?.totalProjects },
    { label: 'Blog Posts', value: stats?.totalBlogPosts },
    { label: 'New Contact Requests', value: stats?.newContactRequests },
    { label: 'Testimonials', value: stats?.totalTestimonials },
    { label: 'New Project Requests', value: stats?.newProjectRequests },
  ];

  return (
    <div>
      <h1 className="text-2xl font-display font-bold mb-8">Dashboard</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {cards.map((c) => (
          <div key={c.label} className="glass rounded-2xl p-6">
            <div className="text-3xl font-bold text-gradient">{c.value ?? '—'}</div>
            <div className="text-white/50 text-sm mt-2">{c.label}</div>
          </div>
        ))}
      </div>
      <p className="text-white/40 text-sm mt-10">
        Use the sidebar to manage projects, services, blog posts, testimonials, team members, and inbound inquiries.
        Changes here go live on the public site immediately — no code changes required.
      </p>
    </div>
  );
}
