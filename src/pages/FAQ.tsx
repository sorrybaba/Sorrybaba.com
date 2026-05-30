/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { FAQ_ITEMS } from '../data';
import { HelpCircle, ChevronRight, MessageSquareHeart } from 'lucide-react';
import { trackEvent } from '../lib/analytics';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First open by default

  useEffect(() => {
    trackEvent('page_view', { page_title: 'FAQ Page' });
  }, []);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
    trackEvent('faq_click', { index });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-12 pb-16">
      
      {/* FAQ Headings */}
      <section className="text-center space-y-3">
        <span className="text-xs font-mono font-black uppercase bg-brand-pink-soft text-brand-pink px-3.5 py-1.5 rounded-full">
          Relations Knowledge Center 🌸
        </span>
        <h1 className="font-display font-black text-3xl text-gray-800 tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-xs md:text-sm text-gray-500 font-medium leading-relaxed">
          Unsure about delivery rates, custom letters, or payment options? Look through our quick guides or message support on WhatsApp anytime.
        </p>
      </section>

      {/* Accordion List optimized for mobile touch targets */}
      <section className="bg-white rounded-3xl p-6 md:p-8 border border-gray-150 shadow-xs space-y-4">
        {FAQ_ITEMS.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="border-b border-gray-100 last:border-0 pb-4 last:pb-0 pt-2 first:pt-0"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full text-left py-2.5 flex items-start justify-between gap-4 font-display font-bold text-gray-800 hover:text-brand-pink transition-colors cursor-pointer text-sm md:text-base focus:outline-none"
              >
                <span className="flex items-start gap-3">
                  <span className="text-brand-pink mt-0.5 shrink-0"><HelpCircle size={18} /></span>
                  <span>{item.question}</span>
                </span>
                <span className={`transform transition-transform shrink-0 mt-1 text-gray-400 ${isOpen ? 'rotate-90 text-brand-pink' : ''}`}>
                  <ChevronRight size={16} />
                </span>
              </button>

              {isOpen && (
                <div className="pt-3 pl-8 text-xs md:text-sm text-gray-500 leading-relaxed font-semibold transition-all">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </section>

      {/* Helpful communication advice box */}
      <section className="bg-brand-bg rounded-3xl p-6 border border-brand-pink-soft/20 flex flex-col sm:flex-row items-center gap-5 justify-between">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="p-4 bg-purple-100 text-brand-purple rounded-2xl text-2xl"><MessageSquareHeart size={20} /></div>
          <div>
            <h4 className="font-display font-bold text-gray-800 text-sm">Still have questions about custom dispatches?</h4>
            <p className="text-xs text-gray-500 mt-0.5 font-medium leading-relaxed">Let our concierge assist you. Connect with us on WhatsApp for lightning-fast consultation.</p>
          </div>
        </div>
        <button
          onClick={() => window.open('https://wa.me/94776826937?text=Hi%20SorryBaba,%20I%20have%20an%20enquiry%20from%20your%20FAQ%20page.', '_blank')}
          className="px-6 py-2.5 bg-brand-pink text-white rounded-xl text-xs font-bold shadow-sm cursor-pointer hover:bg-brand-pink/90 transition-all shrink-0"
        >
          WhatsApp Support
        </button>
      </section>

    </div>
  );
};
