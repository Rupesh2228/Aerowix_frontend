import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { Testimonial } from '../types';
import { Field, TextInput, TextArea, ImageUploadField, ConfirmDialog } from './FormFields';

const empty: Partial<Testimonial> = { customer_name: '', company: '', position: '', profile_image_url: '', content: '', rating: 5, is_active: true };

export default function AdminTestimonials() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [editing, setEditing] = useState<Partial<Testimonial> | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  function load() { api.get('/testimonials/admin/all').then((d) => setItems(d.testimonials)).catch(() => {}); }
  useEffect(load, []);

  async function save() {
    if (!editing) return;
    if (editing.id) await api.put(`/testimonials/admin/${editing.id}`, editing);
    else await api.post('/testimonials/admin', editing);
    setEditing(null); load();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-display font-bold">Testimonials</h1>
        <button onClick={() => setEditing({ ...empty })} className="bg-brand-600 hover:bg-brand-500 px-4 py-2 rounded-lg text-sm font-semibold">+ Add Testimonial</button>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        {items.map((t) => (
          <div key={t.id} className="glass rounded-2xl p-5">
            <div className="text-yellow-400 text-sm mb-2">{'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}</div>
            <p className="text-sm text-white/70 mb-3 line-clamp-3">"{t.content}"</p>
            <p className="text-sm font-medium">{t.customer_name}</p>
            <p className="text-xs text-white/40 mb-3">{[t.position, t.company].filter(Boolean).join(', ')}</p>
            <div className="flex gap-3 text-xs">
              <button onClick={() => setEditing(t)} className="text-brand-300">Edit</button>
              <button onClick={() => setDeleteId(t.id)} className="text-red-400">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-start justify-center p-5 overflow-y-auto" onClick={() => setEditing(null)}>
          <div className="glass rounded-2xl p-6 max-w-lg w-full my-10" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-semibold text-lg mb-5">{editing.id ? 'Edit Testimonial' : 'Add Testimonial'}</h3>
            <div className="space-y-4">
              <Field label="Customer name"><TextInput value={editing.customer_name} onChange={(e) => setEditing({ ...editing, customer_name: e.target.value })} /></Field>
              <Field label="Company"><TextInput value={editing.company || ''} onChange={(e) => setEditing({ ...editing, company: e.target.value })} /></Field>
              <Field label="Position"><TextInput value={editing.position || ''} onChange={(e) => setEditing({ ...editing, position: e.target.value })} /></Field>
              <ImageUploadField label="Profile photo" value={editing.profile_image_url || ''} onChange={(url) => setEditing({ ...editing, profile_image_url: url })} />
              <Field label="Testimonial"><TextArea rows={4} value={editing.content || ''} onChange={(e) => setEditing({ ...editing, content: e.target.value })} /></Field>
              <Field label="Rating (1-5)"><TextInput type="number" min={1} max={5} value={editing.rating ?? 5} onChange={(e) => setEditing({ ...editing, rating: Number(e.target.value) })} /></Field>
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={!!editing.is_active} onChange={(e) => setEditing({ ...editing, is_active: e.target.checked })} /> Active</label>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setEditing(null)} className="px-4 py-2 rounded-lg text-sm text-white/70 hover:bg-white/5">Cancel</button>
              <button onClick={save} className="px-5 py-2 rounded-lg text-sm bg-brand-600 hover:bg-brand-500 font-semibold">Save</button>
            </div>
          </div>
        </div>
      )}
      <ConfirmDialog open={deleteId !== null} title="Delete this testimonial?" onCancel={() => setDeleteId(null)} onConfirm={async () => { await api.delete(`/testimonials/admin/${deleteId}`); setDeleteId(null); load(); }} />
    </div>
  );
}
