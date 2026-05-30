/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, BadgeCheck, PhoneCall, HelpCircle } from 'lucide-react';
import { trackEvent } from '../lib/analytics';

export const Success: React.FC = () => {
  useEffect(() => {
    trackEvent('order_success', { page_title: 'Order Completed Successfully' });
  }, []);

  return (
    <div className="max-w-md mx-auto text-center py-12 md:py-16 space-y-8 bg-white border border-brand-pink-soft/30 rounded-3xl p-8 shadow-cute">
      
      {/* Mascot circular bouncing visual */}
      <div className="w-24 h-24 rounded-full overflow-hidden border border-brand-pink-soft bg-brand-pink-soft/20 flex items-center justify-center mx-auto animate-bounce shadow-md">
        <img src="/logo.svg" alt="SorryBaba mascot logo face" className="w-full h-full" referrerPolicy="no-referrer" />
      </div>

      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 rounded-lg text-xs font-bold border border-green-100">
          <BadgeCheck size={14} />
          <span>Apology Request Initiated!</span>
        </div>
        
        <h1 className="font-display font-black text-2xl md:text-3xl text-gray-800 tracking-tight">
          Thank you, Baba!
        </h1>
        
        <p className="text-xs text-gray-400 font-semibold leading-relaxed max-w-[280px] mx-auto">
          We have registered your apology details. If you did not get redirected, please click the button below to message our concierge team directly.
        </p>
      </div>

      {/* Guide steps box */}
      <div className="p-4 bg-brand-bg rounded-2xl border border-brand-pink-soft/10 text-left space-y-3 font-medium text-xs text-gray-500 leading-relaxed">
        <h4 className="font-bold text-gray-800 text-xs">What happens next?</h4>
        <ul className="space-y-2 list-decimal list-inside pl-1 text-[11px]">
          <li>Our concierge team checks your handwritten message or interactive E-gift configurations.</li>
          <li>For physical gifts, we prepare and dispatch within 24 hours.</li>
          <li>For digital cards, we compile and deliver your custom webpage address via WhatsApp in under 30 minutes!</li>
        </ul>
      </div>

      {/* Control paths */}
      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href="https://wa.me/94776826937?text=Hi%20SorryBaba,%20I%20just%20placed%20an%20order%20and%20want%20to%20confirm%20my%20details."
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-3 bg-green-500 hover:bg-green-600 font-extrabold text-xs text-white rounded-xl shadow-sm transition-colors text-center flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <PhoneCall size={14} />
          <span>Confirm on WhatsApp</span>
        </a>

        <Link
          to="/"
          className="flex-1 py-3 border border-brand-pink-soft text-brand-pink bg-brand-pink-soft/15 font-bold text-xs rounded-xl shadow-xs transition-all text-center cursor-pointer"
        >
          Return Home
        </Link>
      </div>

    </div>
  );
};
