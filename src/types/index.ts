export interface Project {
  id: number;
  title: string;
  slug: string;
  category: string;
  status: 'draft' | 'published';
  is_featured: boolean;
  hero_image_url: string | null;
  screenshots: string[];
  overview: string | null;
  client_name: string | null;
  services_provided: string[];
  technologies: string[];
  key_features: string[];
  challenges: string | null;
  solution: string | null;
  results: string | null;
  live_url: string | null;
  github_url: string | null;
  completion_date: string | null;
  seo_title?: string | null;
  seo_description?: string | null;
}

export interface Service {
  id: number;
  title: string;
  slug: string;
  short_description: string | null;
  icon: string | null;
  content: string | null;
  order_index: number;
  is_active: boolean;
}

export interface Testimonial {
  id: number;
  customer_name: string;
  company: string | null;
  position: string | null;
  profile_image_url: string | null;
  content: string;
  rating: number;
  is_active: boolean;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  featured_image_url: string | null;
  author: string | null;
  category: string | null;
  tags: string[];
  seo_title?: string | null;
  seo_description?: string | null;
  status: 'draft' | 'published';
  published_at: string | null;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string | null;
  photo_url: string | null;
  bio: string | null;
  social_links: Record<string, string>;
  is_active: boolean;
}

export interface ContactMessage {
  id: number;
  name: string; email: string; phone: string | null; company: string | null;
  service: string | null; budget: string | null; message: string;
  status: 'new' | 'contacted' | 'in_progress' | 'completed' | 'archived';
  created_at: string;
}

export interface ProjectRequest {
  id: number;
  name: string; email: string; phone: string | null; company: string | null;
  service: string | null; project_type: string | null; budget: string | null;
  deadline: string | null; description: string;
  status: 'new' | 'contacted' | 'in_progress' | 'completed' | 'archived';
  created_at: string;
}

export const PROJECT_CATEGORIES = ['Websites', 'Web Applications', 'Software', 'Mobile Apps', 'UI/UX', 'SEO', 'Digital Marketing'];
