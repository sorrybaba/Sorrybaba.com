import React, { useEffect } from 'react';
import { ShieldCheck, Info, Sparkles, CheckCircle2 } from 'lucide-react';
import { trackPageView } from '../lib/analytics';
import { SEO } from '../components/SEO';

export const CookiePolicy: React.FC = () => {
  useEffect(() => {
    trackPageView('/legal/cookie-policy');
  }, []);

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16 font-sans selection:bg-brand-pink-soft selection:text-brand-pink">
      <SEO 
        title="Cookie & Client Storage Policy | SorryBaba.com" 
        description="Review how SorryBaba uses state containers, cookies, local database indices, and session tracking logs to support anonymous cart persistence safely." 
      />
      
      {/* Title */}
      <div className="text-center space-y-2">
        <h1 className="font-display font-black text-2xl md:text-3xl text-gray-800 tracking-tight flex items-center justify-center gap-2">
          <ShieldCheck className="text-brand-pink" size={24} />
          <span>Cookie & Client Storage Policy</span>
        </h1>
        <p className="text-xs text-gray-400 font-mono">Last updated: May 30, 2026</p>
      </div>

      <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-150 space-y-6 text-xs text-gray-600 leading-relaxed font-semibold">
        
        <p>
          At <strong>SorryBaba.com</strong>, we believe in radical transparency regarding how we store your information. This Cookie Policy explains how our web application uses local storage, session storage, and cookies to deliver a responsive, personal, and smooth cart and ordering experience.
        </p>

        {/* Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 bg-brand-bg rounded-2xl border border-brand-pink-soft/10 text-center space-y-2">
            <div className="mx-auto w-8 h-8 rounded-full bg-white flex items-center justify-center text-brand-pink shadow-xs">
              <Sparkles size={16} />
            </div>
            <h2 className="text-gray-800 font-display font-bold text-xs">Essential Cart Storage</h2>
            <p className="text-[10px] text-gray-400 mt-0.5 leading-normal">We use client cookies to hold items in your shopping back so they are not wiped when you refresh.</p>
          </div>

          <div className="p-4 bg-brand-bg rounded-2xl border border-brand-pink-soft/10 text-center space-y-2">
            <div className="mx-auto w-8 h-8 rounded-full bg-white flex items-center justify-center text-brand-pink shadow-xs">
              <Info size={16} />
            </div>
            <h2 className="text-gray-800 font-display font-bold text-xs">Private Analytics</h2>
            <p className="text-[10px] text-gray-400 mt-0.5 leading-normal">Anonymous GA4 sessions tracking helps us measure conversion and optimize layout performance.</p>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-gray-50">
          <h2 className="font-display font-bold text-sm text-gray-800 uppercase tracking-widest font-mono">1. What are cookies and local storage?</h2>
          <p>
            Cookies are short fragments of text saved inside your client browser. LocalStorage and SessionStorage are modern web standards that allow web pages to securely cache non-sensitive data directly inside your computer. SorryBaba relies primarily on LocalStorage to provide instantaneous UI responsiveness without taxing database pipelines.
          </p>

          <h2 className="font-display font-bold text-sm text-gray-800 uppercase tracking-widest font-mono">2. Essential Cart & Session Storage</h2>
          <p>
            Our context systems save your standard shopping bag products (`sorrybaba_cart_v2`) and local bypass preview choices (`sorrybaba_preview_mode`) securely in local memory. This ensures you can exit our window, review pricing details, and return with your customized letter draft intact.
          </p>

          <h2 className="font-display font-bold text-sm text-gray-800 uppercase tracking-widest font-mono">3. Anonymous Performance Metrics</h2>
          <p>
            We deploy secure third-party tracking cookies via Google Analytics 4 (GA4) and Google Tag Manager (GTM). These cookies record basic metrics: which categories are clicked most (e.g. wife apology gifts vs husband gifts), view frequencies, and checkout starts. This collection does not link to your personalized text and remains entirely anonymous.
          </p>

          <h2 className="font-display font-bold text-sm text-gray-800 uppercase tracking-widest font-mono">4. Controlling Storage Variables</h2>
          <p>
            You can clear all cookie parameters or client storage properties anytime by opening your browser Settings, selecting "Clear Browsing Data", and choosing "Cookies and site data". Doing so will reset your active shopping cart to zero.
          </p>
        </div>

      </div>

    </div>
  );
};
