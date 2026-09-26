import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { Field, TextInput, TextArea } from './FormFields';

export default function AdminSettings() {
  const [company, setCompany] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    api.get('/settings').then((d) => { setCompany(d.settings?.company_info || {}); setStats(d.settings?.stats || {}); }).catch(() => {});
  }, []);

  async function save() {
    await api.put('/settings/admin/company_info', { value: company });
    await api.put('/settings/admin/stats', { value: stats });
    setSaved(true); setTimeout(() => setSaved(false), 2000);
  }

  if (!company || !stats) return <p className="text-white/40">Loading…</p>;

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-display font-bold mb-8">Website Settings</h1>

      <div className="glass rounded-2xl p-6 space-y-4 mb-8">
        <h2 className="font-semibold">Company Information</h2>
        <Field label="Company name"><TextInput value={company.name || ''} onChange={(e) => setCompany({ ...company, name: e.target.value })} /></Field>
        <Field label="Tagline"><TextInput value={company.tagline || ''} onChange={(e) => setCompany({ ...company, tagline: e.target.value })} /></Field>
        <Field label="Description"><TextArea rows={3} value={company.description || ''} onChange={(e) => setCompany({ ...company, description: e.target.value })} /></Field>
        <Field label="Email"><TextInput value={company.email || ''} onChange={(e) => setCompany({ ...company, email: e.target.value })} /></Field>
        <Field label="Phone"><TextInput value={company.phone || ''} onChange={(e) => setCompany({ ...company, phone: e.target.value })} /></Field>
        <Field label="Address"><TextInput value={company.address || ''} onChange={(e) => setCompany({ ...company, address: e.target.value })} /></Field>
        {['facebook', 'instagram', 'linkedin', 'github'].map((s) => (
          <Field key={s} label={`${s.charAt(0).toUpperCase() + s.slice(1)} URL`}>
            <TextInput value={company.social?.[s] || ''} onChange={(e) => setCompany({ ...company, social: { ...company.social, [s]: e.target.value } })} />
          </Field>
        ))}
      </div>

      <div className="glass rounded-2xl p-6 space-y-4 mb-8">
        <h2 className="font-semibold">Homepage Stats</h2>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Projects completed"><TextInput type="number" value={stats.projects_completed ?? 0} onChange={(e) => setStats({ ...stats, projects_completed: Number(e.target.value) })} /></Field>
          <Field label="Technologies used"><TextInput type="number" value={stats.technologies_used ?? 0} onChange={(e) => setStats({ ...stats, technologies_used: Number(e.target.value) })} /></Field>
          <Field label="Clients served"><TextInput type="number" value={stats.clients_served ?? 0} onChange={(e) => setStats({ ...stats, clients_served: Number(e.target.value) })} /></Field>
          <Field label="Years of experience"><TextInput type="number" value={stats.years_experience ?? 0} onChange={(e) => setStats({ ...stats, years_experience: Number(e.target.value) })} /></Field>
        </div>
      </div>

      <button onClick={save} className="bg-brand-600 hover:bg-brand-500 px-6 py-2.5 rounded-lg font-semibold text-sm">Save Settings</button>
      {saved && <span className="ml-3 text-green-400 text-sm">Saved ✓</span>}
    </div>
  );
}
