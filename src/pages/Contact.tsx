import { useState } from 'react';
import { api } from '../lib/api';

const SERVICES = ['Web Development', 'Software Development', 'App Development', 'Digital Marketing', 'SEO', 'UI/UX Design', 'Website Maintenance & Hosting'];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', service: '', budget: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  function update(k: string, v: string) { setForm((f) => ({ ...f, [k]: v })); }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('submitting'); setError('');
    try {
      await api.post('/inquiries/contact', form);
      setStatus('success');
      setForm({ name: '', email: '', phone: '', company: '', service: '', budget: '', message: '' });
    } catch (err: any) {
      setStatus('error'); setError(err.message);
    }
  }

  return (
    <section className="max-w-3xl mx-auto px-5 md:px-8 pt-32 pb-24">
      <p className="text-brand-300 font-semibold text-sm uppercase tracking-widest mb-3">Get in touch</p>
      <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Let's Build Something Great Together.</h1>
      <p className="text-white/60 mb-10">Tell us a bit about your project and we'll get back to you shortly.</p>

      {status === 'success' ? (
        <div className="glass rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-semibold mb-2">Message sent ✓</h2>
          <p className="text-white/60">Thanks for reaching out — our team will get back to you within one business day.</p>
        </div>
      ) : (
        <form onSubmit={submit} className="glass rounded-2xl p-8 grid sm:grid-cols-2 gap-5">
          <Input label="Name" value={form.name} onChange={(v: string) => update('name', v)} required />
          <Input label="Email" type="email" value={form.email} onChange={(v: string) => update('email', v)} required />
          <Input label="Phone" value={form.phone} onChange={(v: string) => update('phone', v)} />
          <Input label="Company" value={form.company} onChange={(v: string) => update('company', v)} />
          <Select label="Service" value={form.service} onChange={(v: string) => update('service', v)} options={SERVICES} />
          <Input label="Budget" value={form.budget} onChange={(v: string) => update('budget', v)} placeholder="$5,000 - $10,000" />
          <div className="sm:col-span-2">
            <label className="text-sm text-white/60 mb-1.5 block">Project details *</label>
            <textarea required rows={5} value={form.message} onChange={(e) => update('message', e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-400 transition-colors" />
          </div>
          {status === 'error' && <p className="sm:col-span-2 text-red-400 text-sm">{error}</p>}
          <button type="submit" disabled={status === 'submitting'} className="sm:col-span-2 bg-brand-600 hover:bg-brand-500 disabled:opacity-60 transition-colors py-3.5 rounded-full font-semibold">
            {status === 'submitting' ? 'Sending…' : 'Send Message'}
          </button>
        </form>
      )}
    </section>
  );
}

export function Input({ label, value, onChange, type = 'text', required, placeholder }: any) {
  return (
    <div>
      <label className="text-sm text-white/60 mb-1.5 block">{label}{required && ' *'}</label>
      <input type={type} value={value} required={required} placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-400 transition-colors" />
    </div>
  );
}

export function Select({ label, value, onChange, options }: any) {
  return (
    <div>
      <label className="text-sm text-white/60 mb-1.5 block">{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-400 transition-colors">
        <option value="">Select…</option>
        {options.map((o: string) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}
