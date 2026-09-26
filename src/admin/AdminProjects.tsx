import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { Project, PROJECT_CATEGORIES } from '../types';
import { Field, TextInput, TextArea, SelectInput, TagsInput, ImageUploadField, ConfirmDialog } from './FormFields';

const empty: Partial<Project> = {
  title: '', category: 'Websites', status: 'draft', is_featured: false, hero_image_url: '',
  screenshots: [], overview: '', client_name: '', services_provided: [], technologies: [],
  key_features: [], challenges: '', solution: '', results: '', live_url: '', github_url: '',
  completion_date: '', seo_title: '', seo_description: '',
};

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editing, setEditing] = useState<Partial<Project> | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  function load() { api.get('/projects/admin/all').then((d) => setProjects(d.projects)).catch(() => {}); }
  useEffect(load, []);

  async function save() {
    if (!editing) return;
    setSaving(true);
    try {
      if (editing.id) await api.put(`/projects/admin/${editing.id}`, editing);
      else await api.post('/projects/admin', editing);
      setEditing(null); load();
    } catch (err: any) { alert(err.message); } finally { setSaving(false); }
  }

  async function remove(id: number) {
    await api.delete(`/projects/admin/${id}`); setDeleteId(null); load();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-display font-bold">Projects</h1>
        <button onClick={() => setEditing({ ...empty })} className="bg-brand-600 hover:bg-brand-500 px-4 py-2 rounded-lg text-sm font-semibold">+ Add Project</button>
      </div>

      <div className="glass rounded-2xl overflow-hidden overflow-x-auto">
        <table className="w-full text-sm min-w-[720px]">
          <thead className="text-left text-white/40 border-b border-white/10">
            <tr><th className="p-4">Image</th><th className="p-4">Name</th><th className="p-4">Category</th><th className="p-4">Status</th><th className="p-4">Featured</th><th className="p-4">Date</th><th className="p-4">Actions</th></tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id} className="border-b border-white/5 last:border-0">
                <td className="p-4"><div className="w-12 h-12 rounded-lg bg-white/5 overflow-hidden">{p.hero_image_url && <img src={p.hero_image_url} className="w-full h-full object-cover" />}</div></td>
                <td className="p-4 font-medium">{p.title}</td>
                <td className="p-4 text-white/60">{p.category}</td>
                <td className="p-4"><span className={`px-2 py-0.5 rounded-full text-xs ${p.status === 'published' ? 'bg-green-500/20 text-green-300' : 'bg-white/10 text-white/50'}`}>{p.status}</span></td>
                <td className="p-4">{p.is_featured ? '★' : ''}</td>
                <td className="p-4 text-white/50">{p.completion_date ? new Date(p.completion_date).toLocaleDateString() : '—'}</td>
                <td className="p-4">
                  <div className="flex gap-3 text-xs">
                    <button onClick={() => setEditing({ ...p, completion_date: p.completion_date?.slice(0, 10) || '' })} className="text-brand-300 hover:text-brand-200">Edit</button>
                    <button onClick={() => api.patch(`/projects/admin/${p.id}/status`, { status: p.status === 'published' ? 'draft' : 'published' }).then(load)} className="text-white/50 hover:text-white">
                      {p.status === 'published' ? 'Unpublish' : 'Publish'}
                    </button>
                    <button onClick={() => setDeleteId(p.id)} className="text-red-400 hover:text-red-300">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
            {projects.length === 0 && <tr><td colSpan={7} className="p-8 text-center text-white/40">No projects yet.</td></tr>}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-start justify-center p-5 overflow-y-auto" onClick={() => setEditing(null)}>
          <div className="glass rounded-2xl p-6 max-w-2xl w-full my-10" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-semibold text-lg mb-5">{editing.id ? 'Edit Project' : 'Add Project'}</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Title"><TextInput value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} /></Field>
              <Field label="Category"><SelectInput options={PROJECT_CATEGORIES} value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })} /></Field>
              <Field label="Client name"><TextInput value={editing.client_name || ''} onChange={(e) => setEditing({ ...editing, client_name: e.target.value })} /></Field>
              <Field label="Completion date"><TextInput type="date" value={editing.completion_date || ''} onChange={(e) => setEditing({ ...editing, completion_date: e.target.value })} /></Field>
              <div className="sm:col-span-2"><ImageUploadField label="Hero image" value={editing.hero_image_url || ''} onChange={(url) => setEditing({ ...editing, hero_image_url: url })} /></div>
              <div className="sm:col-span-2"><Field label="Overview"><TextArea rows={3} value={editing.overview || ''} onChange={(e) => setEditing({ ...editing, overview: e.target.value })} /></Field></div>
              <div className="sm:col-span-2"><Field label="Technologies (comma-separated)"><TagsInput value={editing.technologies || []} onChange={(v) => setEditing({ ...editing, technologies: v })} /></Field></div>
              <div className="sm:col-span-2"><Field label="Key features (comma-separated)"><TagsInput value={editing.key_features || []} onChange={(v) => setEditing({ ...editing, key_features: v })} /></Field></div>
              <div className="sm:col-span-2"><Field label="Services provided (comma-separated)"><TagsInput value={editing.services_provided || []} onChange={(v) => setEditing({ ...editing, services_provided: v })} /></Field></div>
              <div className="sm:col-span-2"><Field label="Challenges"><TextArea rows={2} value={editing.challenges || ''} onChange={(e) => setEditing({ ...editing, challenges: e.target.value })} /></Field></div>
              <div className="sm:col-span-2"><Field label="Solution"><TextArea rows={2} value={editing.solution || ''} onChange={(e) => setEditing({ ...editing, solution: e.target.value })} /></Field></div>
              <div className="sm:col-span-2"><Field label="Results"><TextArea rows={2} value={editing.results || ''} onChange={(e) => setEditing({ ...editing, results: e.target.value })} /></Field></div>
              <Field label="Live URL"><TextInput value={editing.live_url || ''} onChange={(e) => setEditing({ ...editing, live_url: e.target.value })} /></Field>
              <Field label="GitHub URL"><TextInput value={editing.github_url || ''} onChange={(e) => setEditing({ ...editing, github_url: e.target.value })} /></Field>
              <Field label="Status"><SelectInput options={['draft', 'published']} value={editing.status} onChange={(e) => setEditing({ ...editing, status: e.target.value as any })} /></Field>
              <label className="flex items-center gap-2 mt-6 text-sm"><input type="checkbox" checked={!!editing.is_featured} onChange={(e) => setEditing({ ...editing, is_featured: e.target.checked })} /> Featured project</label>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setEditing(null)} className="px-4 py-2 rounded-lg text-sm text-white/70 hover:bg-white/5">Cancel</button>
              <button onClick={save} disabled={saving} className="px-5 py-2 rounded-lg text-sm bg-brand-600 hover:bg-brand-500 font-semibold disabled:opacity-60">{saving ? 'Saving…' : 'Save Project'}</button>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog open={deleteId !== null} title="Delete this project?" onCancel={() => setDeleteId(null)} onConfirm={() => deleteId && remove(deleteId)} />
    </div>
  );
}
