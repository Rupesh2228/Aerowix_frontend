import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { ProjectRequest } from '../types';

const STATUSES = ['new', 'contacted', 'in_progress', 'completed', 'archived'];

export default function AdminProjectRequests() {
  const [items, setItems] = useState<ProjectRequest[]>([]);
  function load() { api.get('/inquiries/admin/project-requests').then((d) => setItems(d.requests)).catch(() => {}); }
  useEffect(load, []);

  return (
    <div>
      <h1 className="text-2xl font-display font-bold mb-8">Project Requests</h1>
      <div className="space-y-4">
        {items.map((r) => (
          <div key={r.id} className="glass rounded-2xl p-5">
            <div className="flex flex-wrap justify-between gap-3 mb-2">
              <div>
                <p className="font-medium">{r.name} <span className="text-white/40 font-normal text-sm">· {r.email}</span></p>
                <p className="text-xs text-white/40">{r.service} {r.project_type && `· ${r.project_type}`} {r.budget && `· ${r.budget}`} · {new Date(r.created_at).toLocaleString()}</p>
              </div>
              <select value={r.status} onChange={(e) => api.patch(`/inquiries/admin/project-requests/${r.id}/status`, { status: e.target.value }).then(load)}
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs">
                {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <p className="text-sm text-white/70">{r.description}</p>
            <button onClick={async () => { await api.delete(`/inquiries/admin/project-requests/${r.id}`); load(); }} className="text-xs text-red-400 mt-3">Delete</button>
          </div>
        ))}
        {items.length === 0 && <p className="text-white/40">No project requests yet.</p>}
      </div>
    </div>
  );
}
