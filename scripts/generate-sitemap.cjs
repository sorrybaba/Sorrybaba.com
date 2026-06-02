const fs = require('fs');
const path = require('path');

// Dynamic data definitions for robust compilation matching src/data.ts & src/pages/Blog.tsx
const PRODUCTS = [
  'e-gift-sorry-card',
  'e-gift-flower-bouquet',
  'e-gift-love-letter',
  'physical-teddy-bear',
  'physical-rose-box',
  'physical-memory-frame'
];

const COLLECTIONS = [
  'best-sellers',
  'new-arrivals',
  'featured',
  'under-5000-lkr',
  'premium-gifts'
];

const BLOGS = [
  'how-to-apologize-to-wife',
  'perfect-surprise-girlfriend',
  'understanding-relationship-silence',
  'digital-versus-physical-apologies'
];

const RECURRING_PAGES = [
  '',
  'about',
  'how-it-works',
  'contact',
  'faq',
  'blog',
  'legal/privacy-policy',
  'legal/terms-and-conditions',
  'legal/refund-policy',
  'legal/cookie-policy',
  'products',
  'products/apology-gifts',
  'products/surprise-gifts',
  'products/romantic-gifts',
  'products/friendship-gifts',
  'products/custom-gifts',
  'collections',
  'waitlist',
  'launch-notification',
  'special-offers',
  'referral-program'
];

const LANGUAGES = ['en', 'si', 'ta'];

function generateSitemap() {
  const currentDate = new Date().toISOString().split('T')[0];
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // 1. Core English/Root Pages
  RECURRING_PAGES.forEach((page) => {
    const loc = page ? `https://sorrybaba.com/${page}` : 'https://sorrybaba.com/';
    xml += '  <url>\n';
    xml += `    <loc>${loc}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += '    <changefreq>daily</changefreq>\n';
    xml += '    <priority>0.8</priority>\n';
    xml += '  </url>\n';
  });

  // 2. Multilingual Base page duplications
  LANGUAGES.forEach((lang) => {
    RECURRING_PAGES.forEach((page) => {
      const loc = page ? `https://sorrybaba.com/${lang}/${page}` : `https://sorrybaba.com/${lang}`;
      xml += '  <url>\n';
      xml += `    <loc>${loc}</loc>\n`;
      xml += `    <lastmod>${currentDate}</lastmod>\n`;
      xml += '    <changefreq>weekly</changefreq>\n';
      xml += '    <priority>0.6</priority>\n';
      xml += '  </url>\n';
    });
  });

  // 3. Dynamic Product detail URLs
  PRODUCTS.forEach((prod) => {
    // Both standard path format and products subpath
    const plainPath = `https://sorrybaba.com/product/${prod}`;
    const cleanSubPath = `https://sorrybaba.com/products/${prod}`;
    
    [plainPath, cleanSubPath].forEach((loc) => {
      xml += '  <url>\n';
      xml += `    <loc>${loc}</loc>\n`;
      xml += `    <lastmod>${currentDate}</lastmod>\n`;
      xml += '    <changefreq>weekly</changefreq>\n';
      xml += '    <priority>0.9</priority>\n';
      xml += '  </url>\n';
    });

    // Multilingual details support
    LANGUAGES.forEach((lang) => {
      const fullL = `https://sorrybaba.com/${lang}/products/${prod}`;
      xml += '  <url>\n';
      xml += `    <loc>${fullL}</loc>\n`;
      xml += `    <lastmod>${currentDate}</lastmod>\n`;
      xml += '    <changefreq>weekly</changefreq>\n';
      xml += '    <priority>0.7</priority>\n';
      xml += '  </url>\n';
    });
  });

  // 4. Dynamic Collections URLs
  COLLECTIONS.forEach((col) => {
    const loc = `https://sorrybaba.com/collections/${col}`;
    xml += '  <url>\n';
    xml += `    <loc>${loc}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += '    <changefreq>weekly</changefreq>\n';
    xml += '    <priority>0.8</priority>\n';
    xml += '  </url>\n';

    // Multilingual collections support
    LANGUAGES.forEach((lang) => {
      const fullL = `https://sorrybaba.com/${lang}/collections/${col}`;
      xml += '  <url>\n';
      xml += `    <loc>${fullL}</loc>\n`;
      xml += `    <lastmod>${currentDate}</lastmod>\n`;
      xml += '    <changefreq>weekly</changefreq>\n';
      xml += '    <priority>0.6</priority>\n';
      xml += '  </url>\n';
    });
  });

  // 5. Dynamic Blog timeline URLs
  BLOGS.forEach((blog) => {
    const loc = `https://sorrybaba.com/blog/${blog}`;
    xml += '  <url>\n';
    xml += `    <loc>${loc}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += '    <changefreq>weekly</changefreq>\n';
    xml += '    <priority>0.8</priority>\n';
    xml += '  </url>\n';

    LANGUAGES.forEach((lang) => {
      const fullL = `https://sorrybaba.com/${lang}/blog/${blog}`;
      xml += '  <url>\n';
      xml += `    <loc>${fullL}</loc>\n`;
      xml += `    <lastmod>${currentDate}</lastmod>\n`;
      xml += '    <changefreq>weekly</changefreq>\n';
      xml += '    <priority>0.6</priority>\n';
      xml += '  </url>\n';
    });
  });

  xml += '</urlset>\n';

  const destPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
  fs.writeFileSync(destPath, xml, 'utf8');
  console.log(`[SEO Engine] Dynamic sitemap generated successfully at ${destPath}`);
}

generateSitemap();
