import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-grid-glow">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px]" />

      <div className="max-w-7xl mx-auto px-5 md:px-8 grid md:grid-cols-2 gap-12 items-center w-full">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-brand-300 border border-brand-500/30 rounded-full px-4 py-1.5 mb-6"
          >
            Digital Technology Partner
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-display font-extrabold leading-[1.05] tracking-tight"
          >
            Building Digital Experiences That <span className="text-gradient">Move Businesses</span> Forward.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg text-white/70 max-w-xl"
          >
            We build modern websites, powerful software, scalable applications, and digital strategies that help businesses grow.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-9 flex flex-wrap gap-4"
          >
            <Link to="/start-a-project" className="bg-brand-600 hover:bg-brand-500 transition-colors px-7 py-3.5 rounded-full font-semibold shadow-lg shadow-brand-600/30">
              Start a Project
            </Link>
            <Link to="/projects" className="glass hover:bg-white/10 transition-colors px-7 py-3.5 rounded-full font-semibold">
              Explore Our Work
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }}
          className="relative h-[420px] hidden md:block"
        >
          <motion.div
            animate={{ y: [0, -14, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-6 left-6 w-56 glass rounded-2xl p-4 shadow-2xl"
          >
            <div className="flex gap-1.5 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" /><span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" /><span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
            </div>
            <div className="space-y-2">
              <div className="h-2 w-4/5 bg-brand-400/50 rounded" />
              <div className="h-2 w-3/5 bg-white/20 rounded" />
              <div className="h-2 w-full bg-white/10 rounded" />
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 16, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className="absolute top-40 right-2 w-52 glass rounded-2xl p-4 shadow-2xl font-mono text-xs text-brand-200"
          >
            <p>&lt;Aerowix /&gt;</p>
            <p className="text-white/40">deploy: success ✓</p>
            <p className="text-white/40">status: 200 OK</p>
          </motion.div>

          <motion.div
            animate={{ y: [0, -10, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute bottom-10 left-16 w-44 glass rounded-2xl p-4 shadow-2xl"
          >
            <div className="w-full h-16 rounded-lg bg-gradient-to-br from-brand-500/40 to-purple-500/30 mb-2" />
            <div className="h-2 w-2/3 bg-white/20 rounded" />
          </motion.div>

          <svg className="absolute inset-0 w-full h-full -z-10 opacity-30" viewBox="0 0 400 400">
            <circle cx="80" cy="80" r="3" fill="#5c85f8" />
            <circle cx="300" cy="150" r="3" fill="#5c85f8" />
            <circle cx="200" cy="300" r="3" fill="#a78bfa" />
            <line x1="80" y1="80" x2="300" y2="150" stroke="#3560f0" strokeWidth="1" />
            <line x1="300" y1="150" x2="200" y2="300" stroke="#3560f0" strokeWidth="1" />
          </svg>

          <div className="absolute -inset-10 -z-20 bg-brand-600/20 blur-[100px] rounded-full" />
        </motion.div>
      </div>
    </section>
  );
}
