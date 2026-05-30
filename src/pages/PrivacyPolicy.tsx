/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { ShieldCheck, Eye, Lock, FileKey } from 'lucide-react';
import { trackPageView } from '../lib/analytics';

export const PrivacyPolicy: React.FC = () => {
  useEffect(() => {
    trackPageView('/privacy-policy');
  }, []);

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16">
      
      {/* Title */}
      <div className="text-center space-y-2">
        <h1 className="font-display font-black text-2xl md:text-3xl text-gray-800 tracking-tight flex items-center justify-center gap-2">
          <ShieldCheck className="text-brand-pink" size={24} />
          <span>Privacy Policy & Security Guarantee</span>
        </h1>
        <p className="text-xs text-gray-400 font-mono">Last updated: May 30, 2026</p>
      </div>

      <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-150 space-y-6 text-xs text-gray-600 leading-relaxed font-semibold">
        
        <p>
          At <strong>SorryBaba.com</strong>, we recognize that saying sorry or sending apology letters often involves deeply personal feelings, sensitive details, private couple photos, and intimate statements. We are dedicated to maintaining the absolute confidentiality and security of every piece of data you trust us with.
        </p>

        {/* Highlight components */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 bg-brand-bg rounded-2xl border border-brand-pink-soft/10 text-center space-y-2">
            <div className="mx-auto w-8 h-8 rounded-full bg-white flex items-center justify-center text-brand-pink shadow-xs">
              <Eye size={16} />
            </div>
            <h4 className="text-gray-800 font-display font-bold text-xs">Private URL links</h4>
            <p className="text-[10px] text-gray-400 mt-0.5 leading-normal">Your customized digital E-gifts are hidden from search engines.</p>
          </div>

          <div className="p-4 bg-brand-bg rounded-2xl border border-brand-pink-soft/10 text-center space-y-2">
            <div className="mx-auto w-8 h-8 rounded-full bg-white flex items-center justify-center text-brand-pink shadow-xs">
              <Lock size={16} />
            </div>
            <h4 className="text-gray-800 font-display font-bold text-xs">No Mock Leakage</h4>
            <p className="text-[10px] text-gray-400 mt-0.5 leading-normal">We never share your draft letters or email logs with third parties.</p>
          </div>

          <div className="p-4 bg-brand-bg rounded-2xl border border-brand-pink-soft/10 text-center space-y-2">
            <div className="mx-auto w-8 h-8 rounded-full bg-white flex items-center justify-center text-brand-pink shadow-xs">
              <FileKey size={16} />
            </div>
            <h4 className="text-gray-800 font-display font-bold text-xs">Secure Archival</h4>
            <p className="text-[10px] text-gray-400 mt-0.5 leading-normal">Images uploaded for memory frames are deleted post design.</p>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-gray-50">
          <h3 className="font-display font-bold text-sm text-gray-800 uppercase tracking-widest font-mono">1. Information Collection</h3>
          <p>
            When placing an order or customizing an interactive card, we collect your name, email, phone number, WhatsApp identifier, mailing delivery address, and custom apology content. This data is collected solely to build your digital page or ship physical plush bears.
          </p>

          <h3 className="font-display font-bold text-sm text-gray-800 uppercase tracking-widest font-mono">2. Secure Hosting Links</h3>
          <p>
            Each customized e-greeting, digital flower bouquet, or photo slideshow runs on a hidden, randomly hash-generated URL (e.g., sorrybaba.com/egift/ax897f2). These pages are unindexed by design, meaning Google, Bing, and other crawlers cannot read or list them publicly. Only people you share the unique link with can view them.
          </p>

          <h3 className="font-display font-bold text-sm text-gray-800 uppercase tracking-widest font-mono">3. Media Assets Deletion</h3>
          <p>
            Any couple layout photographs you upload or share with our WhatsApp concierge for custom framing are securely processed by our layout artists. To protect your privacy, these photographs are permanently deleted from our local work server databases within 7 days after shipment confirmation.
          </p>

          <h3 className="font-display font-bold text-sm text-gray-800 uppercase tracking-widest font-mono">4. Rights to Remove</h3>
          <p>
            Want to delete a private interactive card or love letter page permanently? No problem! Simply write to us at <strong>sorrybabaofficial@gmail.com</strong> mentioning your order ID, and we will take down your digital materials immediately.
          </p>
        </div>

      </div>

    </div>
  );
};
