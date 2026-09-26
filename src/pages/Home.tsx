import Hero from '../components/Hero';
import ServicesSection from '../components/ServicesSection';
import ProjectsGrid from '../components/ProjectsGrid';
import AboutSection from '../components/AboutSection';
import ProcessSection from '../components/ProcessSection';
import FeaturedProject from '../components/FeaturedProject';
import TestimonialsSection from '../components/TestimonialsSection';
import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';

export default function Home() {
  useSEO({
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Aerowix Group',
      description: 'We build modern websites, powerful software, scalable applications, and digital strategies that help businesses grow.',
      url: typeof window !== 'undefined' ? window.location.origin : undefined,
    },
  });

  return (
    <>
      <Hero />
      <ServicesSection />
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-24">
        <div className="flex items-end justify-between mb-14 flex-wrap gap-4">
          <div>
            <p className="text-brand-300 font-semibold text-sm uppercase tracking-widest mb-3">Our work</p>
            <h2 className="text-3xl md:text-5xl font-display font-bold">Recent projects</h2>
          </div>
          <Link to="/projects" className="text-brand-300 font-medium hover:text-brand-200">View all projects →</Link>
        </div>
        <ProjectsGrid limit={6} showFilters={false} />
      </section>
      <FeaturedProject />
      <AboutSection />
      <ProcessSection />
      <TestimonialsSection />

      <section className="max-w-5xl mx-auto px-5 md:px-8 py-24 text-center">
        <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Let's Build Something Great Together.</h2>
        <p className="text-white/60 max-w-xl mx-auto mb-8">Tell us about your project and we'll get back to you within one business day.</p>
        <Link to="/start-a-project" className="inline-flex bg-brand-600 hover:bg-brand-500 transition-colors px-8 py-4 rounded-full font-semibold text-lg shadow-lg shadow-brand-600/30">
          Start a Project
        </Link>
      </section>
    </>
  );
}
