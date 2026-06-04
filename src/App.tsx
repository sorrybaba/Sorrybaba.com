/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { initAnalytics, trackEvent, trackPageView } from './lib/analytics';
import { SHOW_COMING_SOON, SITE_MODE } from './site-config';
import { safeStorage } from './lib/storage';

// Page imports using React.lazy for splitting bundles & tree-shaking
const Home = React.lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const ComingSoon = React.lazy(() => import('./pages/ComingSoon').then(m => ({ default: m.ComingSoon })));
const WifeHusband = React.lazy(() => import('./pages/WifeHusband').then(m => ({ default: m.WifeHusband })));
const GirlfriendBoyfriend = React.lazy(() => import('./pages/GirlfriendBoyfriend').then(m => ({ default: m.GirlfriendBoyfriend })));
const OtherGifts = React.lazy(() => import('./pages/OtherGifts').then(m => ({ default: m.OtherGifts })));
const EGifts = React.lazy(() => import('./pages/EGifts').then(m => ({ default: m.EGifts })));
const AllProducts = React.lazy(() => import('./pages/AllProducts').then(m => ({ default: m.AllProducts })));
const ProductDetails = React.lazy(() => import('./pages/ProductDetails').then(m => ({ default: m.ProductDetails })));
const CartPage = React.lazy(() => import('./pages/CartPage').then(m => ({ default: m.CartPage })));
const Checkout = React.lazy(() => import('./pages/Checkout').then(m => ({ default: m.Checkout })));
const Success = React.lazy(() => import('./pages/Success').then(m => ({ default: m.Success })));
const ContactUs = React.lazy(() => import('./pages/ContactUs').then(m => ({ default: m.ContactUs })));
const FAQ = React.lazy(() => import('./pages/FAQ').then(m => ({ default: m.FAQ })));
const PrivacyPolicy = React.lazy(() => import('./pages/PrivacyPolicy').then(m => ({ default: m.PrivacyPolicy })));
const TermsConditions = React.lazy(() => import('./pages/TermsConditions').then(m => ({ default: m.TermsConditions })));
const About = React.lazy(() => import('./pages/About').then(m => ({ default: m.About })));
const HowItWorks = React.lazy(() => import('./pages/HowItWorks').then(m => ({ default: m.HowItWorks })));
const Blog = React.lazy(() => import('./pages/Blog').then(m => ({ default: m.Blog })));
const BlogPost = React.lazy(() => import('./pages/BlogPost').then(m => ({ default: m.BlogPost })));
const RefundPolicy = React.lazy(() => import('./pages/RefundPolicy').then(m => ({ default: m.RefundPolicy })));
const CookiePolicy = React.lazy(() => import('./pages/CookiePolicy').then(m => ({ default: m.CookiePolicy })));
const Collections = React.lazy(() => import('./pages/Collections').then(m => ({ default: m.Collections })));
const AccountPage = React.lazy(() => import('./pages/AccountPage').then(m => ({ default: m.AccountPage })));
const MarketingPages = React.lazy(() => import('./pages/MarketingPages').then(m => ({ default: m.MarketingPages })));
const PaymentPage = React.lazy(() => import('./pages/PaymentPage').then(m => ({ default: m.PaymentPage })));
const ComingSoonAnalyticsDashboard = React.lazy(() => import('./pages/ComingSoonAnalytics'));

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

// Layout wrap containing custom standalone routing views
const AppLayout: React.FC<{ isPreviewActive: boolean; setIsPreviewActive: (val: boolean) => void }> = ({ isPreviewActive, setIsPreviewActive }) => {
  const { pathname } = useLocation();
  const normalizedPath = pathname.toLowerCase().replace(/\/$/, "");
  const isComingSoonPage = normalizedPath === '/coming-soon' || normalizedPath === '/coming-soon/analytics' || (pathname === '/' && SITE_MODE === 'coming_soon' && !isPreviewActive);
  const showGlobalLayout = !isComingSoonPage;

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col justify-between relative">
      
      {/* Top navigation container */}
      {showGlobalLayout && <Navbar />}

      {/* Primary Viewframe with margin limits */}
      <main className={showGlobalLayout ? "flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12" : "flex-1 w-full"}>
        <React.Suspense fallback={
          <div className="min-h-[60vh] flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-brand-pink border-t-transparent rounded-full animate-spin"></div>
          </div>
        }>
          <Routes>
          <Route path="/" element={
            SITE_MODE === 'coming_soon' && !isPreviewActive ? (
              <ComingSoon onBypass={() => setIsPreviewActive(true)} />
            ) : (
              <Home />
            )
          } />
          <Route path="/coming-soon" element={<ComingSoon onBypass={() => setIsPreviewActive(true)} />} />
          <Route path="/coming-soon/" element={<ComingSoon onBypass={() => setIsPreviewActive(true)} />} />
          <Route path="/coming-soon/analytics" element={<ComingSoonAnalyticsDashboard />} />
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

          {/* New Expanded Public Pages */}
          <Route path="/about" element={<About />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/legal/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/legal/terms-and-conditions" element={<TermsConditions />} />
          <Route path="/legal/refund-policy" element={<RefundPolicy />} />
          <Route path="/legal/cookie-policy" element={<CookiePolicy />} />

          {/* Expanded Product & Collections Routing */}
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/apology-gifts" element={<WifeHusband />} />
          <Route path="/products/surprise-gifts" element={<GirlfriendBoyfriend />} />
          <Route path="/products/romantic-gifts" element={<OtherGifts />} />
          <Route path="/products/friendship-gifts" element={<EGifts />} />
          <Route path="/products/custom-gifts" element={<AllProducts />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/collections/:slug" element={<Collections />} />

          {/* checkout expansion paths */}
          <Route path="/checkout/payment" element={<PaymentPage />} />
          <Route path="/checkout/success" element={<Success />} />

          {/* Account dynamic layout tabs */}
          <Route path="/account" element={<AccountPage />} />
          <Route path="/account/orders" element={<AccountPage />} />
          <Route path="/account/profile" element={<AccountPage />} />
          <Route path="/account/wishlist" element={<AccountPage />} />
          <Route path="/account/settings" element={<AccountPage />} />

          {/* Marketing Campaign URLs */}
          <Route path="/waitlist" element={<MarketingPages />} />
          <Route path="/launch-notification" element={<MarketingPages />} />
          <Route path="/special-offers" element={<MarketingPages />} />
          <Route path="/referral-program" element={<MarketingPages />} />

          {/* Multilingual Structure Expansion Placeholder Wrapper (si/en/ta) */}
          <Route path="/:lang" element={<Home />} />
          <Route path="/:lang/about" element={<About />} />
          <Route path="/:lang/how-it-works" element={<HowItWorks />} />
          <Route path="/:lang/contact" element={<ContactUs />} />
          <Route path="/:lang/contact-us" element={<ContactUs />} />
          <Route path="/:lang/faq" element={<FAQ />} />
          <Route path="/:lang/blog" element={<Blog />} />
          <Route path="/:lang/blog/:slug" element={<BlogPost />} />
          <Route path="/:lang/legal/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/:lang/legal/terms-and-conditions" element={<TermsConditions />} />
          <Route path="/:lang/legal/refund-policy" element={<RefundPolicy />} />
          <Route path="/:lang/legal/cookie-policy" element={<CookiePolicy />} />
          <Route path="/:lang/products" element={<AllProducts />} />
          <Route path="/:lang/products/apology-gifts" element={<WifeHusband />} />
          <Route path="/:lang/products/surprise-gifts" element={<GirlfriendBoyfriend />} />
          <Route path="/:lang/products/romantic-gifts" element={<OtherGifts />} />
          <Route path="/:lang/products/friendship-gifts" element={<EGifts />} />
          <Route path="/:lang/products/custom-gifts" element={<AllProducts />} />
          <Route path="/:lang/products/:id" element={<ProductDetails />} />
          <Route path="/:lang/collections" element={<Collections />} />
          <Route path="/:lang/collections/:slug" element={<Collections />} />
          <Route path="/:lang/checkout" element={<Checkout />} />
          <Route path="/:lang/checkout/payment" element={<PaymentPage />} />
          <Route path="/:lang/checkout/success" element={<Success />} />
          <Route path="/:lang/success" element={<Success />} />
          <Route path="/:lang/account" element={<AccountPage />} />
          <Route path="/:lang/account/orders" element={<AccountPage />} />
          <Route path="/:lang/account/profile" element={<AccountPage />} />
          <Route path="/:lang/account/wishlist" element={<AccountPage />} />
          <Route path="/:lang/account/settings" element={<AccountPage />} />
          <Route path="/:lang/waitlist" element={<MarketingPages />} />
          <Route path="/:lang/launch-notification" element={<MarketingPages />} />
          <Route path="/:lang/special-offers" element={<MarketingPages />} />
          <Route path="/:lang/referral-program" element={<MarketingPages />} />
          
          {/* Fallback route */}
          <Route path="*" element={<Home />} />
        </Routes>
        </React.Suspense>
      </main>

      {/* Persistent items */}
      {showGlobalLayout && <CartDrawer />}
      {showGlobalLayout && <WhatsAppButton />}
      
      {/* Footer content */}
      {showGlobalLayout && <Footer />}

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
              safeStorage.removeItem('sorrybaba_preview_mode');
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
  );
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
      safeStorage.setItem('sorrybaba_preview_mode', 'true');
      return true;
    }
    return safeStorage.getItem('sorrybaba_preview_mode') === 'true';
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
        safeStorage.setItem('sorrybaba_preview_mode', 'true');
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

  return (
    <AppProvider>
      <Router>
        <RouteTracker />
        <AppLayout isPreviewActive={isPreviewActive} setIsPreviewActive={setIsPreviewActive} />
      </Router>
    </AppProvider>
  );
}
