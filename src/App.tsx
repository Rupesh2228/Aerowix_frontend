import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetail from './pages/ProjectDetail';
import ServicesPage from './pages/ServicesPage';
import ServiceDetail from './pages/ServiceDetail';
import About from './pages/About';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import Contact from './pages/Contact';
import StartAProject from './pages/StartAProject';
import NotFound from './pages/NotFound';

import AdminLogin from './admin/AdminLogin';
import ProtectedRoute from './admin/ProtectedRoute';
import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/AdminDashboard';
import AdminProjects from './admin/AdminProjects';
import AdminServices from './admin/AdminServices';
import AdminBlog from './admin/AdminBlog';
import AdminTestimonials from './admin/AdminTestimonials';
import AdminTeam from './admin/AdminTeam';
import AdminMessages from './admin/AdminMessages';
import AdminProjectRequests from './admin/AdminProjectRequests';
import AdminSettings from './admin/AdminSettings';

function PublicLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [location.pathname]);
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Routes>
      {/* Public site */}
      <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
      <Route path="/services" element={<PublicLayout><ServicesPage /></PublicLayout>} />
      <Route path="/services/:slug" element={<PublicLayout><ServiceDetail /></PublicLayout>} />
      <Route path="/projects" element={<PublicLayout><ProjectsPage /></PublicLayout>} />
      <Route path="/projects/:slug" element={<PublicLayout><ProjectDetail /></PublicLayout>} />
      <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
      <Route path="/blog" element={<PublicLayout><BlogPage /></PublicLayout>} />
      <Route path="/blog/:slug" element={<PublicLayout><BlogPostPage /></PublicLayout>} />
      <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
      <Route path="/start-a-project" element={<PublicLayout><StartAProject /></PublicLayout>} />

      {/* Admin */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
        <Route index element={<AdminDashboard />} />
        <Route path="projects" element={<AdminProjects />} />
        <Route path="services" element={<AdminServices />} />
        <Route path="blog" element={<AdminBlog />} />
        <Route path="testimonials" element={<AdminTestimonials />} />
        <Route path="team" element={<AdminTeam />} />
        <Route path="messages" element={<AdminMessages />} />
        <Route path="requests" element={<AdminProjectRequests />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
    </Routes>
  );
}
