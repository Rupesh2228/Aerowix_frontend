import { Link } from 'react-router-dom';
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-5">
      <h1 className="text-6xl font-display font-bold mb-4">404</h1>
      <p className="text-white/60 mb-8">This page doesn't exist.</p>
      <Link to="/" className="bg-brand-600 hover:bg-brand-500 transition-colors px-6 py-3 rounded-full font-semibold">Back home</Link>
    </div>
  );
}
