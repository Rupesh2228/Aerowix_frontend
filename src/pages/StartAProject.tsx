import { useState } from 'react';
import { api } from '../lib/api';
import { Input, Select } from './Contact';

const SERVICES = ['Web Development', 'Software Development', 'App Development', 'Digital Marketing', 'SEO', 'UI/UX Design', 'Website Maintenance & Hosting'];
const TYPES = ['New Website', 'New Application', 'Redesign', 'Ongoing Maintenance', 'Marketing Campaign', 'Other'];

export default function StartAProject() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', service: '', project_type: '', budget: '', deadline: '', description: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  function update(k: string, v: string) { setForm((f) => ({ ...f, [k]: v })); }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('submitting'); setError('');
    try {
      await api.post('/inquiries/project-request', form);
      setStatus('success');
    } catch (err: any) { setStatus('error'); setError(err.message); }
  }

  return (
    <section className="max-w-3xl mx-auto px-5 md:px-8 pt-32 pb-24">
      <p className="text-brand-300 font-semibold text-sm uppercase tracking-widest mb-3">New project</p>
      <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Start a Project</h1>
      <p className="text-white/60 mb-10">Share your requirements and our team will follow up with next steps.</p>

      {status === 'success' ? (
        <div className="glass rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-semibold mb-2">Request received ✓</h2>
          <p className="text-white/60">We'll review your project and reach out within one business day.</p>
        </div>
      ) : (
        <form onSubmit={submit} className="glass rounded-2xl p-8 grid sm:grid-cols-2 gap-5">
          <Input label="Name" value={form.name} onChange={(v: string) => update('name', v)} required />
          <Input label="Email" type="email" value={form.email} onChange={(v: string) => update('email', v)} required />
          <Input label="Phone" value={form.phone} onChange={(v: string) => update('phone', v)} />
          <Input label="Company" value={form.company} onChange={(v: string) => update('company', v)} />
          <Select label="Required service" value={form.service} onChange={(v: string) => update('service', v)} options={SERVICES} />
          <Select label="Project type" value={form.project_type} onChange={(v: string) => update('project_type', v)} options={TYPES} />
          <Input label="Estimated budget" value={form.budget} onChange={(v: string) => update('budget', v)} placeholder="$5,000 - $10,000" />
          <Input label="Deadline" value={form.deadline} onChange={(v: string) => update('deadline', v)} placeholder="e.g. 8 weeks" />
          <div className="sm:col-span-2">
            <label className="text-sm text-white/60 mb-1.5 block">Project description *</label>
            <textarea required rows={6} value={form.description} onChange={(e) => update('description', e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-400 transition-colors" />
          </div>
          {status === 'error' && <p className="sm:col-span-2 text-red-400 text-sm">{error}</p>}
          <button type="submit" disabled={status === 'submitting'} className="sm:col-span-2 bg-brand-600 hover:bg-brand-500 disabled:opacity-60 transition-colors py-3.5 rounded-full font-semibold">
            {status === 'submitting' ? 'Submitting…' : 'Submit Project Request'}
          </button>
        </form>
      )}
    </section>
  );
}
