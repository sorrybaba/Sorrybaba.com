/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShieldCheck, Truck, PhoneCall, Gift } from 'lucide-react';
import { trackEvent } from '../lib/analytics';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  // JSON-LD Schema structures for Search Engine parsing
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "GiftStore",
    "name": "SorryBaba.com",
    "url": "https://sorrybaba.com",
    "logo": "https://sorrybaba.com/logo.svg",
    "description": "Premium apology gift platform and emotional digital reconciliation service in Sri Lanka.",
    "telephone": "+94776826937",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "SorryBaba HQ, Galle Road",
      "addressLocality": "Colombo",
      "addressRegion": "Western",
      "postalCode": "00300",
      "addressCountry": "LK"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://sorrybaba.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Wife & Husband Gifts",
        "item": "https://sorrybaba.com/wife-husband-gifts"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Girlfriend & Boyfriend Gifts",
        "item": "https://sorrybaba.com/girlfriend-boyfriend-gifts"
      }
    ]
  };

  return (
    <footer className="bg-white border-t border-brand-pink-soft/30 pt-16 pb-8 text-gray-600">
      
      {/* Brand Benefit Highlights */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-6 py-8 bg-brand-bg rounded-3xl border border-brand-pink-soft/30">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-brand-pink-soft/40 text-brand-pink rounded-xl">
              <Gift size={20} />
            </div>
            <div>
              <h4 className="font-display font-bold text-sm text-gray-800">Coded with Emotion</h4>
              <p className="text-xs text-gray-500 mt-1">Gifts formulated to make loved ones smile and say forgive me.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-brand-blue-soft text-brand-blue rounded-xl">
              <Truck size={20} />
            </div>
            <div>
              <h4 className="font-display font-bold text-sm text-gray-800">All Island Delivery</h4>
              <p className="text-xs text-gray-500 mt-1">Speedy delivery across all 9 provinces in Sri Lanka.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-purple-100 text-brand-purple rounded-xl">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h4 className="font-display font-bold text-sm text-gray-800">Instant E-Gifts</h4>
              <p className="text-xs text-gray-500 mt-1">Apology cards, flower bouquets & letters in 30 mins.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-green-100 text-green-500 rounded-xl">
              <PhoneCall size={20} />
            </div>
            <div>
              <h4 className="font-display font-bold text-sm text-gray-800">WhatsApp Concierge</h4>
              <p className="text-xs text-gray-500 mt-1">Special instructions and customizable note coordination.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Column 1: Brand Intro & Social */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-brand-pink-soft flex items-center justify-center">
                <img src="/logo.svg" alt="Mascot icon" className="w-full h-full" referrerPolicy="no-referrer" />
              </div>
              <span className="font-display text-lg font-extrabold text-brand-pink">
                Sorry<span className="text-brand-purple">Baba</span>.com
              </span>
            </Link>
            <p className="text-xs leading-relaxed text-gray-500">
              Made a mistake? Send love, not excuses! SorryBaba.com helps couples, friends, and families reconnect with thoughtful, cute apology cards, glowing memory frames, cuddle plush bears and flowers.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/94776826937"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('whatsapp_click', { source: 'footer_social' })}
                className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-xs font-semibold hover:scale-105 transition-transform shadow-sm"
              >
                WA
              </a>
              <span className="text-[10px] font-mono text-gray-500">Call/WhatsApp: +94776826937</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h5 className="font-display font-bold text-gray-800 text-sm mb-4">Reconciliation Catalog</h5>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/wife-husband-gifts" className="hover:text-brand-pink transition-colors">Wife & Husband Gifts</Link>
              </li>
              <li>
                <Link to="/girlfriend-boyfriend-gifts" className="hover:text-brand-pink transition-colors">Girlfriend & Boyfriend Gifts</Link>
              </li>
              <li>
                <Link to="/collections" className="hover:text-brand-pink transition-colors font-medium">Curated Collections</Link>
              </li>
              <li>
                <Link to="/all-products" className="hover:text-brand-pink transition-colors font-semibold text-brand-pink">Explore All Gifts (Inventory)</Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-brand-pink transition-colors font-medium text-gray-600">Reconciliation Blog & Tips</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Trust & Legal */}
          <div>
            <h5 className="font-display font-bold text-gray-800 text-sm mb-4">SorryBaba Trust & Help</h5>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/about" className="hover:text-brand-pink transition-colors">Our Story & Vision</Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-brand-pink transition-colors">How SorryBaba Works</Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-brand-pink transition-colors">Frequently Questions (FAQ)</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-brand-pink transition-colors">Contact Support Centre</Link>
              </li>
              <li>
                <Link to="/legal/privacy-policy" className="hover:text-brand-pink transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/legal/refund-policy" className="hover:text-brand-pink transition-colors">Refund & Cancellation</Link>
              </li>
              <li>
                <Link to="/legal/cookie-policy" className="hover:text-brand-pink transition-colors">Cookie Policy</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h5 className="font-display font-bold text-gray-800 text-sm mb-4">Apologise Better</h5>
            <p className="text-xs text-gray-500 mb-3 leading-relaxed">
              Join 5,000+ lovers receiving sweet relationship ideas, emotional communication habits, and secret discount coupons.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); trackEvent('contact_submit', { form: 'newsletter' }); alert('Thank you for subscribing to SorryBaba communications!'); }} className="flex gap-2">
              <input
                type="email"
                placeholder="Your email address..."
                required
                className="bg-gray-150 border border-gray-200 text-xs rounded-xl px-3 py-2 flex-1 focus:outline-none focus:border-brand-pink text-gray-700 font-medium"
              />
              <button
                type="submit"
                className="bg-brand-pink text-white font-bold text-xs rounded-xl px-4 py-2 hover:bg-brand-pink/90 transition-all cursor-pointer"
              >
                Join
              </button>
            </form>
          </div>

        </div>

        <div className="border-t border-gray-100 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-gray-500">
          <div>
            © {currentYear} <strong>SorryBaba.com</strong>. All Rights Reserved. Designed primarily for lovers in Sri Lanka.
          </div>
          <div className="flex items-center gap-1.5 font-medium text-gray-500">
            Coded with <Heart size={12} className="text-brand-pink fill-brand-pink animate-pulse-custom" /> specifically to bring relationships back together.
          </div>
        </div>
      </div>

      {/* SEO Structured JSON-LD Schema Markup */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>

    </footer>
  );
};
