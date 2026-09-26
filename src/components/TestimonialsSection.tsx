import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../lib/api';
import { Testimonial } from '../types';

export default function TestimonialsSection() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    api.get('/testimonials').then((d) => setItems(d.testimonials)).catch(() => setItems([]));
  }, []);

  useEffect(() => {
    if (items.length < 2) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % items.length), 6000);
    return () => clearInterval(t);
  }, [items.length]);

  if (items.length === 0) return null;
  const t = items[index];

  return (
    <section className="max-w-4xl mx-auto px-5 md:px-8 py-24 text-center">
      <p className="text-brand-300 font-semibold text-sm uppercase tracking-widest mb-3">What clients say</p>
      <h2 className="text-3xl md:text-4xl font-display font-bold mb-12">Trusted by growing businesses</h2>

      <div className="relative min-h-[220px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4 }}
            className="glass rounded-2xl p-8 md:p-10"
          >
            <div className="text-yellow-400 mb-4">{'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}</div>
            <p className="text-lg text-white/80 leading-relaxed mb-6">"{t.content}"</p>
            <div className="flex items-center justify-center gap-3">
              {t.profile_image_url && <img src={t.profile_image_url} alt={t.customer_name} className="w-10 h-10 rounded-full object-cover" />}
              <div className="text-left">
                <div className="font-semibold text-sm">{t.customer_name}</div>
                <div className="text-white/50 text-xs">{[t.position, t.company].filter(Boolean).join(', ')}</div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {items.length > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {items.map((_, i) => (
            <button key={i} onClick={() => setIndex(i)} className={`w-2 h-2 rounded-full transition-all ${i === index ? 'bg-brand-400 w-6' : 'bg-white/20'}`} />
          ))}
        </div>
      )}
    </section>
  );
}
