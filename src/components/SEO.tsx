import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
}

export const SEO: React.FC<SEOProps> = ({ title, description, canonical }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    // 1. Update title
    document.title = title;

    // 2. Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // 3. Update canonical link
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }

    // Identify if the route represents home (inclusive of locale variations)
    const normalizedPath = pathname.replace(/\/$/, ''); // strip trailing slash
    const isHome = 
      normalizedPath === '' || 
      normalizedPath === '/en' || 
      normalizedPath === '/si' || 
      normalizedPath === '/ta';

    const finalCanonical = canonical || (isHome ? 'https://sorrybaba.com/' : `https://sorrybaba.com${pathname}`);
    linkCanonical.setAttribute('href', finalCanonical);

    // 4. Update Open Graph Tags for complete SEO excellence
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);

    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute('content', description);

    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', finalCanonical);

    let twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute('content', title);

    let twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) twitterDescription.setAttribute('content', description);

  }, [title, description, canonical, pathname]);

  return null;
};
