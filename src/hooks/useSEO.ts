import { useEffect } from 'react';

interface SEOOptions {
  title?: string;
  description?: string;
  image?: string;
  type?: string;
  structuredData?: Record<string, any>;
}

const DEFAULT_TITLE = 'Aerowix Group — Building Digital Experiences That Move Businesses Forward';
const DEFAULT_DESCRIPTION = 'We build modern websites, powerful software, scalable applications, and digital strategies that help businesses grow.';

function setMeta(nameOrProp: string, content: string, isProperty = false) {
  if (!content) return;
  const attr = isProperty ? 'property' : 'name';
  let tag = document.querySelector(`meta[${attr}="${nameOrProp}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, nameOrProp);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function setCanonical(url: string) {
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }
  link.href = url;
}

function setStructuredData(data: Record<string, any> | undefined) {
  const existing = document.getElementById('structured-data');
  if (existing) existing.remove();
  if (!data) return;
  const script = document.createElement('script');
  script.id = 'structured-data';
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

// Sets document title, meta description, Open Graph + Twitter card tags,
// a canonical URL, and (optionally) a JSON-LD structured data block.
// Runs client-side; for full crawler-visible SEO on first paint, pair this
// with server-side rendering or a prerender step at deploy time.
export function useSEO({ title, description, image, type = 'website', structuredData }: SEOOptions) {
  useEffect(() => {
    const finalTitle = title ? `${title} | Aerowix Group` : DEFAULT_TITLE;
    const finalDescription = description || DEFAULT_DESCRIPTION;

    document.title = finalTitle;
    setMeta('description', finalDescription);
    setMeta('og:title', finalTitle, true);
    setMeta('og:description', finalDescription, true);
    setMeta('og:type', type, true);
    if (image) setMeta('og:image', image, true);
    setMeta('twitter:card', image ? 'summary_large_image' : 'summary');
    setMeta('twitter:title', finalTitle);
    setMeta('twitter:description', finalDescription);
    if (image) setMeta('twitter:image', image);
    setCanonical(window.location.href);
    setStructuredData(structuredData);
  }, [title, description, image, type, JSON.stringify(structuredData)]);
}
