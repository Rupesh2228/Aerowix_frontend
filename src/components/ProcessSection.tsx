import { motion } from 'framer-motion';

const steps = [
  ['01', 'Discover', 'Understand your goals, users, and constraints.'],
  ['02', 'Plan', 'Map scope, architecture, and timeline.'],
  ['03', 'Design', 'Craft the experience and visual identity.'],
  ['04', 'Develop', 'Build with clean, scalable engineering.'],
  ['05', 'Test', 'QA across devices, browsers, and edge cases.'],
  ['06', 'Launch', 'Ship to production with confidence.'],
  ['07', 'Support', 'Maintain, monitor, and iterate post-launch.'],
];

export default function ProcessSection() {
  return (
    <section className="max-w-7xl mx-auto px-5 md:px-8 py-24">
      <div className="max-w-2xl mb-14">
        <p className="text-brand-300 font-semibold text-sm uppercase tracking-widest mb-3">How we work</p>
        <h2 className="text-3xl md:text-5xl font-display font-bold">Our process</h2>
      </div>

      <div className="relative">
        <div className="hidden md:block absolute top-8 left-0 right-0 h-px bg-white/10" />
        <div className="grid md:grid-cols-7 gap-8 md:gap-4">
          {steps.map(([n, title, desc], i) => (
            <motion.div
              key={n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="relative"
            >
              <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center text-brand-300 font-display font-bold text-lg mb-4 relative z-10">
                {n}
              </div>
              <h3 className="font-semibold mb-1.5">{title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
