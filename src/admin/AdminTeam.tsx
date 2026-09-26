import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { TeamMember } from '../types';
import { Field, TextInput, TextArea, ImageUploadField, ConfirmDialog } from './FormFields';

const empty: Partial<TeamMember> = { name: '', role: '', photo_url: '', bio: '', social_links: {}, is_active: true };

export default function AdminTeam() {
  const [items, setItems] = useState<TeamMember[]>([]);
  const [editing, setEditing] = useState<Partial<TeamMember> | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  function load() { api.get('/team/admin/all').then((d) => setItems(d.team)).catch(() => {}); }
  useEffect(load, []);

  async function save() {
    if (!editing) return;
    if (editing.id) await api.put(`/team/admin/${editing.id}`, editing);
    else await api.post('/team/admin', editing);
    setEditing(null); load();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-display font-bold">Team</h1>
        <button onClick={() => setEditing({ ...empty })} className="bg-brand-600 hover:bg-brand-500 px-4 py-2 rounded-lg text-sm font-semibold">+ Add Member</button>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {items.map((m) => (
          <div key={m.id} className="glass rounded-2xl p-5 text-center">
            <div className="w-16 h-16 rounded-full bg-white/5 mx-auto mb-3 overflow-hidden">{m.photo_url && <img src={m.photo_url} className="w-full h-full object-cover" />}</div>
            <p className="font-medium text-sm">{m.name}</p>
            <p className="text-xs text-white/40 mb-3">{m.role}</p>
            <div className="flex gap-3 text-xs justify-center">
              <button onClick={() => setEditing(m)} className="text-brand-300">Edit</button>
              <button onClick={() => setDeleteId(m.id)} className="text-red-400">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-start justify-center p-5 overflow-y-auto" onClick={() => setEditing(null)}>
          <div className="glass rounded-2xl p-6 max-w-md w-full my-10" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-semibold text-lg mb-5">{editing.id ? 'Edit Member' : 'Add Member'}</h3>
            <div className="space-y-4">
              <Field label="Name"><TextInput value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} /></Field>
              <Field label="Role"><TextInput value={editing.role || ''} onChange={(e) => setEditing({ ...editing, role: e.target.value })} /></Field>
              <ImageUploadField label="Photo" value={editing.photo_url || ''} onChange={(url) => setEditing({ ...editing, photo_url: url })} />
              <Field label="Bio"><TextArea rows={3} value={editing.bio || ''} onChange={(e) => setEditing({ ...editing, bio: e.target.value })} /></Field>
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={!!editing.is_active} onChange={(e) => setEditing({ ...editing, is_active: e.target.checked })} /> Active</label>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setEditing(null)} className="px-4 py-2 rounded-lg text-sm text-white/70 hover:bg-white/5">Cancel</button>
              <button onClick={save} className="px-5 py-2 rounded-lg text-sm bg-brand-600 hover:bg-brand-500 font-semibold">Save</button>
            </div>
          </div>
        </div>
      )}
      <ConfirmDialog open={deleteId !== null} title="Delete this member?" onCancel={() => setDeleteId(null)} onConfirm={async () => { await api.delete(`/team/admin/${deleteId}`); setDeleteId(null); load(); }} />
    </div>
  );
}
