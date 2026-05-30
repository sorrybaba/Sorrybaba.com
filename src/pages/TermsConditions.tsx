/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { ShieldAlert, BookOpen, Truck, Hammer } from 'lucide-react';
import { trackEvent } from '../lib/analytics';

export const TermsConditions: React.FC = () => {
  useEffect(() => {
    trackEvent('page_view', { page_title: 'Terms and Conditions Page' });
  }, []);

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16">
      
      {/* Title */}
      <div className="text-center space-y-2">
        <h1 className="font-display font-black text-2xl md:text-3xl text-gray-800 tracking-tight flex items-center justify-center gap-2">
          <BookOpen className="text-brand-pink" size={24} />
          <span>Terms and Conditions</span>
        </h1>
        <p className="text-xs text-gray-400 font-mono">Last updated: May 30, 2026</p>
      </div>

      <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-150 space-y-6 text-xs text-gray-600 leading-relaxed font-semibold">
        
        <p>
          Welcome to <strong>SorryBaba.com</strong>. By accessing our platform, configuring customized digital cards, or placing visual orders for home packages, you agree to comply with and be bound by the following governing terms of service.
        </p>

        {/* Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 bg-brand-bg rounded-2xl border border-brand-pink-soft/10 text-center space-y-1.5">
            <div className="mx-auto w-8 h-8 rounded-full bg-white flex items-center justify-center text-brand-pink shadow-xs">
              <ShieldAlert size={16} />
            </div>
            <h4 className="text-gray-800 font-display font-bold text-xs">Lawful Communication</h4>
            <p className="text-[10px] text-gray-400 mt-0.5 leading-normal">No abusive, threatening, or illegal statements of harassment.</p>
          </div>

          <div className="p-4 bg-brand-bg rounded-2xl border border-brand-pink-soft/10 text-center space-y-1.5">
            <div className="mx-auto w-8 h-8 rounded-full bg-white flex items-center justify-center text-brand-pink shadow-xs">
              <Hammer size={16} />
            </div>
            <h4 className="text-gray-800 font-display font-bold text-xs">On-Demand Crafts</h4>
            <p className="text-[10px] text-gray-400 mt-0.5 leading-normal">Our team designs customized frame pieces on placement.</p>
          </div>

          <div className="p-4 bg-brand-bg rounded-2xl border border-brand-pink-soft/10 text-center space-y-1.5">
            <div className="mx-auto w-8 h-8 rounded-full bg-white flex items-center justify-center text-brand-pink shadow-xs">
              <Truck size={16} />
            </div>
            <h4 className="text-gray-800 font-display font-bold text-xs">Couriers Policy</h4>
            <p className="text-[10px] text-gray-400 mt-0.5 leading-normal">Physical gifts require 1-3 business days across Sri Lanka.</p>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-gray-50">
          <h3 className="font-display font-bold text-sm text-gray-800 uppercase tracking-widest font-mono">1. Proper Content Conduct</h3>
          <p>
            SorryBaba.com is built as an emotional reconciliation platform intended to spread peace, cute apologies, and repair relationship bonds. You are strictly forbidden from placing orders with messages containing hate speech, obscenities, threats of physical force, cyberstalking, or any format of illegal harassment. We reserve the right to cancel orders and refund payments immediately if your customization contents violate these standards.
          </p>

          <h3 className="font-display font-bold text-sm text-gray-800 uppercase tracking-widest font-mono">2. Customized Design Intellectual Property</h3>
          <p>
            Our web vectors, logo mascot, custom code animations, and dynamic structural pages are the exclusive property of SorryBaba.com. Copying, rebuilding, or scraping our assets is strictly prohibited.
          </p>

          <h3 className="font-display font-bold text-sm text-gray-800 uppercase tracking-widest font-mono">3. Dispatch & Couriers Limitation</h3>
          <p>
            We coordinate delivery with high-grade island-wide courier partners (such as Domex and Pronto). While we strive to meet all estimated shipping times (1-2 days Colombo, 2-3 days outstation), we are not liable for slight delays caused by courier routing discrepancies, extreme weather patterns, or local public holidays.
          </p>

          <h3 className="font-display font-bold text-sm text-gray-800 uppercase tracking-widest font-mono">4. Refunds and Cancellation</h3>
          <p>
            Since our products (digital e-gifts, handwritten calligraphy scrolls, and engraved acrylic glowing blocks) are customized on request, we do not support cancellation once our design work begins. For physical gifts damaged during courier shipment, we provide full, complimentary brand-new replacements.
          </p>
        </div>

      </div>

    </div>
  );
};
