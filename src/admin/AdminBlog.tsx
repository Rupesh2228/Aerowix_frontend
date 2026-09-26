import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { BlogPost } from '../types';
import { Field, TextInput, TextArea, SelectInput, TagsInput, ImageUploadField, ConfirmDialog } from './FormFields';

const empty: Partial<BlogPost> = { title: '', excerpt: '', content: '', featured_image_url: '', author: '', category: '', tags: [], status: 'draft' };

export default function AdminBlog() {
  const [items, setItems] = useState<BlogPost[]>([]);
  const [editing, setEditing] = useState<Partial<BlogPost> | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  function load() { api.get('/blog/admin/all').then((d) => setItems(d.posts)).catch(() => {}); }
  useEffect(load, []);

  async function save() {
    if (!editing) return;
    if (editing.id) await api.put(`/blog/admin/${editing.id}`, editing);
    else await api.post('/blog/admin', editing);
    setEditing(null); load();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-display font-bold">Blog Posts</h1>
        <button onClick={() => setEditing({ ...empty })} className="bg-brand-600 hover:bg-brand-500 px-4 py-2 rounded-lg text-sm font-semibold">+ Add Article</button>
      </div>

      <div className="glass rounded-2xl overflow-hidden overflow-x-auto">
        <table className="w-full text-sm min-w-[600px]">
          <thead className="text-left text-white/40 border-b border-white/10"><tr><th className="p-4">Title</th><th className="p-4">Category</th><th className="p-4">Status</th><th className="p-4">Actions</th></tr></thead>
          <tbody>
            {items.map((p) => (
              <tr key={p.id} className="border-b border-white/5 last:border-0">
                <td className="p-4 font-medium">{p.title}</td>
                <td className="p-4 text-white/60">{p.category}</td>
                <td className="p-4"><span className={`px-2 py-0.5 rounded-full text-xs ${p.status === 'published' ? 'bg-green-500/20 text-green-300' : 'bg-white/10 text-white/50'}`}>{p.status}</span></td>
                <td className="p-4">
                  <div className="flex gap-3 text-xs">
                    <button onClick={() => setEditing(p)} className="text-brand-300">Edit</button>
                    <button onClick={() => api.put(`/blog/admin/${p.id}`, { status: p.status === 'published' ? 'draft' : 'published' }).then(load)} className="text-white/50">{p.status === 'published' ? 'Unpublish' : 'Publish'}</button>
                    <button onClick={() => setDeleteId(p.id)} className="text-red-400">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && <tr><td colSpan={4} className="p-8 text-center text-white/40">No articles yet.</td></tr>}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-start justify-center p-5 overflow-y-auto" onClick={() => setEditing(null)}>
          <div className="glass rounded-2xl p-6 max-w-2xl w-full my-10" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-semibold text-lg mb-5">{editing.id ? 'Edit Article' : 'Add Article'}</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2"><Field label="Title"><TextInput value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} /></Field></div>
              <Field label="Author"><TextInput value={editing.author || ''} onChange={(e) => setEditing({ ...editing, author: e.target.value })} /></Field>
              <Field label="Category"><TextInput value={editing.category || ''} onChange={(e) => setEditing({ ...editing, category: e.target.value })} /></Field>
              <div className="sm:col-span-2"><ImageUploadField label="Featured image" value={editing.featured_image_url || ''} onChange={(url) => setEditing({ ...editing, featured_image_url: url })} /></div>
              <div className="sm:col-span-2"><Field label="Excerpt"><TextArea rows={2} value={editing.excerpt || ''} onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })} /></Field></div>
              <div className="sm:col-span-2"><Field label="Content"><TextArea rows={8} value={editing.content || ''} onChange={(e) => setEditing({ ...editing, content: e.target.value })} /></Field></div>
              <div className="sm:col-span-2"><Field label="Tags (comma-separated)"><TagsInput value={editing.tags || []} onChange={(v) => setEditing({ ...editing, tags: v })} /></Field></div>
              <Field label="SEO title"><TextInput value={editing.seo_title || ''} onChange={(e) => setEditing({ ...editing, seo_title: e.target.value })} /></Field>
              <Field label="Status"><SelectInput options={['draft', 'published']} value={editing.status} onChange={(e) => setEditing({ ...editing, status: e.target.value as any })} /></Field>
              <div className="sm:col-span-2"><Field label="SEO description"><TextArea rows={2} value={editing.seo_description || ''} onChange={(e) => setEditing({ ...editing, seo_description: e.target.value })} /></Field></div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setEditing(null)} className="px-4 py-2 rounded-lg text-sm text-white/70 hover:bg-white/5">Cancel</button>
              <button onClick={save} className="px-5 py-2 rounded-lg text-sm bg-brand-600 hover:bg-brand-500 font-semibold">Save</button>
            </div>
          </div>
        </div>
      )}
      <ConfirmDialog open={deleteId !== null} title="Delete this article?" onCancel={() => setDeleteId(null)} onConfirm={async () => { await api.delete(`/blog/admin/${deleteId}`); setDeleteId(null); load(); }} />
    </div>
  );
}
