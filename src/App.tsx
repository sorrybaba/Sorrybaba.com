/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { initAnalytics, trackEvent, trackPageView } from './lib/analytics';

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
  useEffect(() => {
    // Initialize secure GTM & GA4 tags on startup
    initAnalytics();
  }, []);

  return (
    <AppProvider>
      <Router>
        <RouteTracker />
        <div className="min-h-screen bg-brand-bg flex flex-col justify-between">
          
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

        </div>
      </Router>
    </AppProvider>
  );
}
