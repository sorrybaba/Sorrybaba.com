/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { initAnalytics, trackEvent, trackPageView } from './lib/analytics';
import { SITE_MODE } from './site-config';
import { ComingSoon } from './pages/ComingSoon';


// Page imports
import { Home } from './pages/Home';
import { WifeHusband } from './pages/WifeHusband';
import { GirlfriendBoyfriend } from './pages/GirlfriendBoyfriend';
import { OtherGifts } from './pages/OtherGifts';
import { EGifts } from './pages/EGifts';
import { AllProducts } from './pages/AllProducts';
import { ProductDetails } from './pages/ProductDetails';
import { CartPage } from './pages/CartPage';
import { Checkout } from './pages/Checkout';
import { Success } from './pages/Success';
import { ContactUs } from './pages/ContactUs';
import { FAQ } from './pages/FAQ';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsConditions } from './pages/TermsConditions';

// Reusable route tracking listener & scroll-to-top on route navigation
const RouteTracker: React.FC = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    // Automatic page view analytics trigger on route change
    trackPageView(pathname, search);
  }, [pathname, search]);

  return null;
};

export default function App() {
  const [isPreviewActive, setIsPreviewActive] = useState(() => {
    if (typeof window === 'undefined') return false;
    
    // Parse normal search parameters and hash component search parameters for HashRouter
    let searchStr = window.location.search || '';
    if (window.location.hash.includes('?')) {
      searchStr += (searchStr ? '&' : '?') + window.location.hash.split('?')[1];
    }
    
    const params = new URLSearchParams(searchStr);
    if (params.get('preview') === 'sorrybabaadmin') {
      localStorage.setItem('sorrybaba_preview_mode', 'true');
      return true;
    }
    return localStorage.getItem('sorrybaba_preview_mode') === 'true';
  });

  useEffect(() => {
    // Initialize secure GTM & GA4 tags on startup
    initAnalytics();
  }, []);

  useEffect(() => {
    const handleUrlCheck = () => {
      let searchStr = window.location.search || '';
      if (window.location.hash.includes('?')) {
        searchStr += (searchStr ? '&' : '?') + window.location.hash.split('?')[1];
      }
      const params = new URLSearchParams(searchStr);
      if (params.get('preview') === 'sorrybabaadmin') {
        localStorage.setItem('sorrybaba_preview_mode', 'true');
        setIsPreviewActive(true);
      }
    };

    // Listen to hash changes dynamically for secure reactive reload in bypass
    window.addEventListener('hashchange', handleUrlCheck);
    // Also perform check periodically
    const interval = setInterval(handleUrlCheck, 1500);

    return () => {
      window.removeEventListener('hashchange', handleUrlCheck);
      clearInterval(interval);
    };
  }, []);

  // Conditional Rendering based on Global Site Configuration & Admin status
  const showComingSoon = SITE_MODE === 'coming_soon' && !isPreviewActive;

  if (showComingSoon) {
    return (
      <AppProvider>
        <ComingSoon onBypass={() => setIsPreviewActive(true)} />
      </AppProvider>
    );
  }

  return (
    <AppProvider>
      <Router>
        <RouteTracker />
        <div className="min-h-screen bg-brand-bg flex flex-col justify-between relative">
          
          {/* Top navigation container */}
          <Navbar />

          {/* Primary Viewframe with margin limits */}
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/wife-husband-gifts" element={<WifeHusband />} />
              <Route path="/girlfriend-boyfriend-gifts" element={<GirlfriendBoyfriend />} />
              <Route path="/other-gifts" element={<OtherGifts />} />
              <Route path="/e-gifts" element={<EGifts />} />
              <Route path="/all-products" element={<AllProducts />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/success" element={<Success />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-conditions" element={<TermsConditions />} />
              
              {/* Fallback route back home */}
              <Route path="*" element={<Home />} />
            </Routes>
          </main>

          {/* Persistent items */}
          <CartDrawer />
          <WhatsAppButton />
          
          {/* Footer content */}
          <Footer />

          {/* Admin Preview Global Overlay Status Bar */}
          {isPreviewActive && (
            <div className="fixed bottom-4 left-4 z-[9999] bg-slate-900 border border-pink-500/30 text-white rounded-full py-2 px-4 flex items-center gap-3 backdrop-blur-md shadow-2xl text-xs font-semibold select-none">
              <div className="flex items-center gap-1.5 font-mono">
                <span className="inline-block w-2 h-2 rounded-full bg-pink-500 animate-pulse"></span>
                Admin Preview Active
              </div>
              <div className="w-[1px] h-3.5 bg-slate-700"></div>
              <button
                onClick={() => {
                  trackEvent('preview_mode_exit', { page_title: document.title, trigger: 'App Bypass Bar' });
                  localStorage.removeItem('sorrybaba_preview_mode');
                  // Wipe query parameters from address bar to safeguard aesthetics
                  if (window.history && window.history.replaceState) {
                    const cleanUrl = window.location.protocol + '//' + window.location.host + window.location.pathname + window.location.hash.split('?')[0];
                    window.history.replaceState({ path: cleanUrl }, '', cleanUrl);
                  }
                  setIsPreviewActive(false);
                }}
                onMouseEnter={() => {
                  trackEvent('button_hover', { button_name: 'Exit Preview Button', page_title: document.title });
                }}
                className="text-pink-400 hover:text-pink-300 transition-colors duration-150 underline underline-offset-2 cursor-pointer font-sans"
              >
                Exit Preview
              </button>
            </div>
          )}

        </div>
      </Router>
    </AppProvider>
  );
}
