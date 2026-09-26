import { useState } from 'react';
import { api } from '../lib/api';

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-wider text-white/40 mb-1.5 block">{label}</label>
      {children}
    </div>
  );
}

const inputClass = "w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-brand-400 transition-colors";

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={inputClass} />;
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={inputClass} />;
}

export function SelectInput({ options, ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { options: string[] }) {
  return (
    <select {...props} className={inputClass}>
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}

// Comma-separated tags input -> string[]
export function TagsInput({ value, onChange, placeholder }: { value: string[]; onChange: (v: string[]) => void; placeholder?: string }) {
  const [text, setText] = useState(value.join(', '));
  return (
    <input
      value={text}
      placeholder={placeholder || 'comma, separated, values'}
      onChange={(e) => { setText(e.target.value); onChange(e.target.value.split(',').map((s) => s.trim()).filter(Boolean)); }}
      className={inputClass}
    />
  );
}

export function ImageUploadField({ value, onChange, label = 'Image' }: { value: string; onChange: (url: string) => void; label?: string }) {
  const [uploading, setUploading] = useState(false);
  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const res = await api.upload(file);
      onChange(res.url);
    } catch (err) {
      alert('Upload failed. Check Cloudinary configuration in backend .env');
    } finally { setUploading(false); }
  }
  return (
    <Field label={label}>
      <div className="flex items-center gap-3">
        {value && <img src={value} alt="" className="w-14 h-14 rounded-lg object-cover border border-white/10" />}
        <div className="flex-1">
          <input value={value} onChange={(e) => onChange(e.target.value)} placeholder="Image URL (or upload below)" className={inputClass} />
          <input type="file" accept="image/*" onChange={handleFile} className="text-xs text-white/50 mt-2" />
          {uploading && <p className="text-xs text-brand-300 mt-1">Uploading…</p>}
        </div>
      </div>
    </Field>
  );
}

export function ConfirmDialog({ open, title, onConfirm, onCancel }: { open: boolean; title: string; onConfirm: () => void; onCancel: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-5" onClick={onCancel}>
      <div className="glass rounded-2xl p-6 max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
        <h3 className="font-semibold mb-2">{title}</h3>
        <p className="text-white/50 text-sm mb-6">This action cannot be undone.</p>
        <div className="flex gap-3 justify-end">
          <button onClick={onCancel} className="px-4 py-2 rounded-lg text-sm text-white/70 hover:bg-white/5">Cancel</button>
          <button onClick={onConfirm} className="px-4 py-2 rounded-lg text-sm bg-red-600 hover:bg-red-500 font-medium">Delete</button>
        </div>
      </div>
    </div>
  );
}
