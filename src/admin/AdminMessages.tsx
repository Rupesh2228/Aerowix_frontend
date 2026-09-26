import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { ContactMessage } from '../types';

const STATUSES = ['new', 'contacted', 'in_progress', 'completed', 'archived'];

export default function AdminMessages() {
  const [items, setItems] = useState<ContactMessage[]>([]);
  function load() { api.get('/inquiries/admin/contact').then((d) => setItems(d.messages)).catch(() => {}); }
  useEffect(load, []);

  return (
    <div>
      <h1 className="text-2xl font-display font-bold mb-8">Contact Messages</h1>
      <div className="space-y-4">
        {items.map((m) => (
          <div key={m.id} className="glass rounded-2xl p-5">
            <div className="flex flex-wrap justify-between gap-3 mb-2">
              <div>
                <p className="font-medium">{m.name} <span className="text-white/40 font-normal text-sm">· {m.email}</span></p>
                <p className="text-xs text-white/40">{m.service} {m.budget && `· ${m.budget}`} · {new Date(m.created_at).toLocaleString()}</p>
              </div>
              <select value={m.status} onChange={(e) => api.patch(`/inquiries/admin/contact/${m.id}/status`, { status: e.target.value }).then(load)}
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs">
                {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <p className="text-sm text-white/70">{m.message}</p>
            <button onClick={async () => { await api.delete(`/inquiries/admin/contact/${m.id}`); load(); }} className="text-xs text-red-400 mt-3">Delete</button>
          </div>
        ))}
        {items.length === 0 && <p className="text-white/40">No messages yet.</p>}
      </div>
    </div>
  );
}
