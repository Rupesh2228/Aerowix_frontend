import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { Service } from '../types';
import { Field, TextInput, TextArea, ConfirmDialog } from './FormFields';

const empty: Partial<Service> = { title: '', short_description: '', icon: '', content: '', order_index: 0, is_active: true };

export default function AdminServices() {
  const [items, setItems] = useState<Service[]>([]);
  const [editing, setEditing] = useState<Partial<Service> | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  function load() { api.get('/services/admin/all').then((d) => setItems(d.services)).catch(() => {}); }
  useEffect(load, []);

  async function save() {
    if (!editing) return;
    if (editing.id) await api.put(`/services/admin/${editing.id}`, editing);
    else await api.post('/services/admin', editing);
    setEditing(null); load();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-display font-bold">Services</h1>
        <button onClick={() => setEditing({ ...empty })} className="bg-brand-600 hover:bg-brand-500 px-4 py-2 rounded-lg text-sm font-semibold">+ Add Service</button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((s) => (
          <div key={s.id} className="glass rounded-2xl p-5">
            <div className="text-2xl mb-3">{s.icon || '⬢'}</div>
            <h3 className="font-semibold mb-1">{s.title}</h3>
            <p className="text-white/50 text-sm mb-4 line-clamp-2">{s.short_description}</p>
            <div className="flex gap-3 text-xs">
              <button onClick={() => setEditing(s)} className="text-brand-300 hover:text-brand-200">Edit</button>
              <button onClick={() => setDeleteId(s.id)} className="text-red-400 hover:text-red-300">Delete</button>
              <span className="ml-auto text-white/30">{s.is_active ? 'Active' : 'Hidden'}</span>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-start justify-center p-5 overflow-y-auto" onClick={() => setEditing(null)}>
          <div className="glass rounded-2xl p-6 max-w-lg w-full my-10" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-semibold text-lg mb-5">{editing.id ? 'Edit Service' : 'Add Service'}</h3>
            <div className="space-y-4">
              <Field label="Title"><TextInput value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} /></Field>
              <Field label="Icon (emoji)"><TextInput value={editing.icon || ''} onChange={(e) => setEditing({ ...editing, icon: e.target.value })} placeholder="💻" /></Field>
              <Field label="Short description"><TextArea rows={2} value={editing.short_description || ''} onChange={(e) => setEditing({ ...editing, short_description: e.target.value })} /></Field>
              <Field label="Full content"><TextArea rows={4} value={editing.content || ''} onChange={(e) => setEditing({ ...editing, content: e.target.value })} /></Field>
              <Field label="Order"><TextInput type="number" value={editing.order_index ?? 0} onChange={(e) => setEditing({ ...editing, order_index: Number(e.target.value) })} /></Field>
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={!!editing.is_active} onChange={(e) => setEditing({ ...editing, is_active: e.target.checked })} /> Active (visible on site)</label>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setEditing(null)} className="px-4 py-2 rounded-lg text-sm text-white/70 hover:bg-white/5">Cancel</button>
              <button onClick={save} className="px-5 py-2 rounded-lg text-sm bg-brand-600 hover:bg-brand-500 font-semibold">Save</button>
            </div>
          </div>
        </div>
      )}
      <ConfirmDialog open={deleteId !== null} title="Delete this service?" onCancel={() => setDeleteId(null)} onConfirm={async () => { await api.delete(`/services/admin/${deleteId}`); setDeleteId(null); load(); }} />
    </div>
  );
}
