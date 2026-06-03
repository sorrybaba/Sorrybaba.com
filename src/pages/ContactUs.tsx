/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Mail, Clock, Phone, MapPin, Send, HelpCircle } from 'lucide-react';
import { SEO } from '../components/SEO';
import {
  trackPageView,
  trackContactFormSubmit,
  trackWhatsAppSupportClick
} from '../lib/analytics';

export const ContactUs: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    trackPageView('/contact-us');
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    // Track contact submission
    trackContactFormSubmit(name, email);
    setSubmitted(true);

    setTimeout(() => {
      setName('');
      setEmail('');
      setMessage('');
      setSubmitted(false);
      alert('Your message has been sent to our customer care team. We will write or WhatsApp you shortly!');
    }, 1000);
  };

  return (
    <div className="space-y-12 pb-16">
      <SEO 
        title="Contact Us & Live Support Concierge | SorryBaba.com" 
        description="Connect with our 24/7 Live Support Concierge. Ask questions about custom items, custom schedules, and delivery logistics, or get custom letter recommendations." 
      />
      
      {/* Page header */}
      <section className="text-center max-w-xl mx-auto space-y-3">
        <h1 className="font-display font-black text-3xl md:text-4xl text-gray-800 tracking-tight">
          Help & Customer Support Center
        </h1>
        <p className="text-xs md:text-sm text-gray-500 font-medium leading-relaxed">
          Need help customizing your apology letters or selecting physical packages? Drop us a line of code, send us an email, or message on WhatsApp for 24/7 assistance.
        </p>
      </section>

      {/* Grid split content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Contact Form & Map (7 columns) */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Main Contact Form card */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-150 shadow-xs space-y-5">
            <h3 className="font-display font-bold text-gray-800 text-sm pb-2 border-b border-gray-50 uppercase tracking-widest font-mono text-brand-pink">
              Send an Enquiry
            </h3>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs font-semibold">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5ClassName">
                  <span className="text-gray-500 font-serif">Your Name *</span>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ruwan Silva"
                    className="w-full text-xs font-semibold text-gray-700 placeholder-gray-400 bg-gray-50 border border-gray-200 focus:outline-none focus:border-brand-pink rounded-xl px-4 py-3"
                  />
                </div>

                <div className="space-y-1.5ClassName">
                  <span className="text-gray-500 font-serif">Your Email Address *</span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. ruwan@gmail.com"
                    className="w-full text-xs font-semibold text-gray-700 placeholder-gray-400 bg-gray-50 border border-gray-200 focus:outline-none focus:border-brand-pink rounded-xl px-4 py-3"
                  />
                </div>
              </div>

              <div className="space-y-1.5ClassName">
                <span className="text-gray-500 font-serif">Detailed Message *</span>
                <textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us what you would like help with..."
                  rows={4}
                  className="w-full text-xs font-medium leading-relaxed text-gray-700 placeholder-gray-400 bg-gray-50 border border-gray-200 focus:outline-none focus:border-brand-pink rounded-xl px-4 py-3 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitted}
                className="w-full py-3.5 bg-brand-pink hover:bg-brand-pink/95 disabled:bg-gray-200 text-white font-extrabold text-xs rounded-xl shadow-cute transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Submit Message</span>
                <Send size={13} />
              </button>
            </form>
          </div>

          {/* Map Placeholder box */}
          <div className="bg-white rounded-3xl p-6 border border-gray-150 h-64 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-0 bg-brand-bg opacity-35" />
            
            {/* Grid pattern mock background */}
            <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#FFD6E7_1px,transparent_1px),linear-gradient(to_bottom,#FFD6E7_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-30" />

            <div className="relative z-10 space-y-1">
              <span className="text-[10px] uppercase font-mono tracking-widest font-extrabold text-brand-purple bg-purple-50 px-2.5 py-1 rounded-lg">Our physical hub map</span>
              <h4 className="font-display font-black text-gray-800 text-sm">SorryBaba.com Headquarters</h4>
            </div>

            <div className="flex items-center gap-3 relative z-10 p-4 bg-white rounded-2xl border border-gray-150 shadow-xs max-w-sm">
              <div className="p-2.5 bg-brand-pink-soft text-brand-pink rounded-xl">
                <MapPin size={18} />
              </div>
              <div className="text-[11px] font-medium leading-snug text-gray-500">
                <strong className="text-gray-800">45 Galle Road, Colombo 03</strong> <br />
                Western Province, Sri Lanka.
              </div>
            </div>
          </div>

        </div>

        {/* Support coordinates sidebar (5 columns) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-150 shadow-xs space-y-6">
            <h3 className="font-display font-bold text-gray-800 text-sm pb-2 border-b border-gray-50 uppercase tracking-widest font-mono text-brand-purple">
              Support Coordinates
            </h3>

            <div className="space-y-4 font-semibold text-xs text-gray-500">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-green-100 text-green-500 rounded-xl shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <h4 className="font-display font-bold text-gray-800 text-xs">WhatsApp Concierge Hotlines</h4>
                  <a
                    href="https://wa.me/94776826937"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackWhatsAppSupportClick()}
                    className="text-xs text-brand-pink block mt-0.5 hover:underline"
                  >
                    +94 77 682 6937
                  </a>
                  <span className="text-[10px] text-gray-400 font-medium font-serif leading-tight">Text lines are active 24/7. Call back support provided on request.</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-brand-pink-soft/40 text-brand-pink rounded-xl shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <h4 className="font-display font-bold text-gray-800 text-xs">Apology Support Email</h4>
                  <a href="mailto:sorrybabaofficial@gmail.com" className="text-xs text-brand-pink block mt-0.5 hover:underline">sorrybabaofficial@gmail.com</a>
                  <span className="text-[10px] text-gray-400 font-medium font-mono leading-none">Responses within 2-4 hours.</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-brand-blue-soft text-brand-blue rounded-xl shrink-0">
                  <Clock size={18} />
                </div>
                <div>
                  <h4 className="font-display font-bold text-gray-800 text-xs">Core operating hours</h4>
                  <p className="text-[11px] text-gray-400 font-medium mt-0.5 leading-snug">
                    Monday to Saturday: 8:00 AM - 10:00 PM <br />
                    Sundays (E-Gift dispatches only): 9:00 AM - 6:00 PM
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
