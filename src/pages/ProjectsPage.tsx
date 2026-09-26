import ProjectsGrid from '../components/ProjectsGrid';

export default function ProjectsPage() {
  return (
    <section className="max-w-7xl mx-auto px-5 md:px-8 pt-32 pb-24">
      <p className="text-brand-300 font-semibold text-sm uppercase tracking-widest mb-3">Our work</p>
      <h1 className="text-4xl md:text-6xl font-display font-bold mb-12">Projects</h1>
      <ProjectsGrid />
    </section>
  );
}
