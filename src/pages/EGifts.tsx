/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { SAMPLE_PRODUCTS } from '../data';
import { Sparkles, ArrowRight, Heart, Music, Smartphone, User, FileText, Send, CheckCircle } from 'lucide-react';
import { SEO } from '../components/SEO';
import {
  trackProductView,
  trackAddToCart,
  trackAddToCartClick,
  trackEGiftView,
  trackPageView
} from '../lib/analytics';

export const EGifts: React.FC = () => {
  const { addToCart } = useApp();
  const navigate = useNavigate();

  // Selected E-Gift product
  const digitalProducts = SAMPLE_PRODUCTS.filter(p => p.isEGift);
  const [selectedProduct, setSelectedProduct] = useState(digitalProducts[0]);

  // Form states to construct template preview content
  const [yourName, setYourName] = useState('Sajith');
  const [partnerName, setPartnerName] = useState('Dilani');
  const [apologyMessage, setApologyMessage] = useState('I am incredibly sorry, Baba. I made a silly mistake, and I promise to listen to you more attentively. You mean the entire world to me. Let’s start together again? 💖');
  const [bgMusic, setBgMusic] = useState('soft-instrumental');
  const [livePreviewActive, setLivePreviewActive] = useState(false);

  // Status simulation message after adding customizing configurations
  const [customizeStatus, setCustomizeStatus] = useState<string | null>(null);

  useEffect(() => {
    trackPageView('/e-gifts');
    trackEGiftView(selectedProduct.id, selectedProduct.name);
  }, []);

  const handleTemplateChange = (productId: string) => {
    const matched = digitalProducts.find(p => p.id === productId);
    if (matched) {
      setSelectedProduct(matched);
      trackEGiftView(matched.id, matched.name);
      trackProductView(matched);
    }
  };

  const executeAddAndOrder = () => {
    // Inject the personalizations into specifications for shopping bag tracking
    const customizedSpecProduct = {
      ...selectedProduct,
      name: `${selectedProduct.name} (For ${partnerName})`,
      specifications: [
        { name: 'Recipient Name', value: partnerName },
        { name: 'Sender Name', value: yourName },
        { name: 'Apology Message', value: apologyMessage },
        { name: 'Aroma Music Option', value: bgMusic.replace('-', ' ') },
        ...selectedProduct.specifications
      ]
    };

    addToCart(customizedSpecProduct, 1, 'girlfriend');

    setCustomizeStatus('E-Gift configured successfully! Item added to your shopping bag.');
    
    // Core custom + recommended tracking
    trackAddToCart(selectedProduct, 1);
    trackAddToCartClick(selectedProduct.id, selectedProduct.name, 'egifts_customizer');

    setTimeout(() => {
      setCustomizeStatus(null);
      navigate('/cart');
    }, 1500);
  };

  return (
    <div className="space-y-12">
      <SEO 
        title="Interactive E-Gifts & Virtual Apology Cards | SorryBaba.com" 
        description="Send customized digital apology experiences, virtual cards, flower bouquets, and personalized soundtracks. Delivered directly to your partner via WhatsApp or email." 
      />
      
      {/* Page header */}
      <section className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs tracking-widest font-mono text-brand-purple font-extrabold bg-purple-100 px-3.5 py-1.5 rounded-full uppercase">
          Digital Customization Studio ⚡
        </span>
        <h1 className="font-display font-black text-3xl md:text-4xl text-gray-800 tracking-tight">
          Personalize Your Interactive E-Gift
        </h1>
        <p className="text-xs md:text-sm text-gray-500 font-medium leading-relaxed">
          Say sorry in under 30 minutes! Once purchased, we build your private interactive webpage with music, animations, and letters, then deliver the link via WhatsApp.
        </p>
      </section>

      {/* Main split-view dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Customize controller (8 columns) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 md:p-8 border border-brand-pink-soft/30 shadow-cute space-y-6">
          
          {/* Template Selection slider */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-gray-600 block uppercase tracking-wider">
              1. Select Digital Template Interface
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {digitalProducts.map((p) => {
                const isActive = p.id === selectedProduct.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => handleTemplateChange(p.id)}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between h-28 ${
                      isActive
                        ? 'border-brand-purple bg-purple-50/20 ring-2 ring-purple-100'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-2xl">
                      {p.id === 'e-gift-sorry-card' ? '✉️' : p.id === 'e-gift-flower-bouquet' ? '💐' : '📝'}
                    </span>
                    <div>
                      <h4 className="font-display font-extrabold text-[11px] text-gray-800 leading-tight">
                        {p.name.replace('Personalized ', '')}
                      </h4>
                      <span className="text-[10px] font-mono font-bold text-brand-purple">
                        LKR {p.price.toLocaleString()}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Persona forms input */}
          <div className="space-y-4">
            <label className="text-xs font-bold text-gray-600 block uppercase tracking-wider">
              2. Add Personal Touches & Letters
            </label>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5ClassName">
                <span className="text-[11px] font-bold text-gray-400 uppercase font-mono flex items-center gap-1">
                  <User size={12} />
                  <span>Your Name (Sender)</span>
                </span>
                <input
                  type="text"
                  value={yourName}
                  onChange={(e) => setYourName(e.target.value)}
                  placeholder="e.g. Sajith"
                  className="w-full text-xs font-semibold text-gray-700 placeholder-gray-400 bg-gray-50 border border-gray-200 focus:outline-none focus:border-brand-purple rounded-xl px-4 py-3"
                />
              </div>

              <div className="space-y-1.5ClassName">
                <span className="text-[11px] font-bold text-gray-400 uppercase font-mono flex items-center gap-1">
                  <User size={12} />
                  <span>Recipient's Name (Loved One)</span>
                </span>
                <input
                  type="text"
                  value={partnerName}
                  onChange={(e) => setPartnerName(e.target.value)}
                  placeholder="e.g. Dilani"
                  className="w-full text-xs font-semibold text-gray-700 placeholder-gray-400 bg-gray-50 border border-gray-200 focus:outline-none focus:border-brand-purple rounded-xl px-4 py-3"
                />
              </div>
            </div>

            <div className="space-y-1.5ClassName">
              <span className="text-[11px] font-bold text-gray-400 uppercase font-mono flex items-center gap-1">
                <FileText size={12} />
                <span>Your Apology Statement (Sinhal, English, etc.)</span>
              </span>
              <textarea
                value={apologyMessage}
                onChange={(e) => setApologyMessage(e.target.value)}
                placeholder="Write your heart out here... Apologize deeply."
                rows={4}
                className="w-full text-xs font-medium leading-relaxed text-gray-700 placeholder-gray-400 bg-gray-50 border border-gray-200 focus:outline-none focus:border-brand-purple rounded-xl px-4 py-3 resize-none"
              />
            </div>

            {/* Background Sound parameters */}
            <div className="space-y-1.5ClassName">
              <span className="text-[11px] font-bold text-gray-400 uppercase font-mono flex items-center gap-1">
                <Music size={12} />
                <span>Choose Ambient Instrumental Song</span>
              </span>
              <select
                value={bgMusic}
                onChange={(e) => setBgMusic(e.target.value)}
                className="w-full text-xs font-semibold text-gray-700 bg-gray-50 border border-gray-200 focus:outline-none focus:border-brand-purple rounded-xl px-4 py-3 appearance-none"
              >
                <option value="soft-instrumental">🎹 Soft Romantic Piano Instrumental</option>
                <option value="violin-soul">🎻 Sweet Violin Heartfelt Serenade</option>
                <option value="acoustic-love">🎸 Calm Acoustic Guitar Strumming</option>
                <option value="silent">🔕 No Music (Silent reflection)</option>
              </select>
            </div>
          </div>

          {/* Action trigger button */}
          <div className="pt-4 border-t border-gray-50 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => setLivePreviewActive(!livePreviewActive)}
              className="w-full sm:w-auto px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl transition-all cursor-pointer text-center"
            >
              {livePreviewActive ? 'Edit configurations' : 'Toggle Live Mobile Preview'}
            </button>

            <button
              onClick={executeAddAndOrder}
              disabled={!!customizeStatus}
              className="w-full sm:flex-1 py-3 bg-brand-purple hover:bg-brand-purple/95 disabled:bg-gray-200 text-white font-extrabold text-xs rounded-xl shadow-cute hover:shadow-cyan-200 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Add customized E-Gift to Bag & Checkout</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {customizeStatus && (
            <div className="p-3.5 bg-green-50 border border-green-200 text-green-700 rounded-xl text-xs font-bold leading-none flex items-center gap-2">
              <CheckCircle size={15} />
              <span>{customizeStatus}</span>
            </div>
          )}

        </div>

        {/* Right Side: Live smartphone iframe mockup (5 columns) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 justify-center text-xs font-semibold text-gray-500 pb-3 border-b border-gray-50 uppercase tracking-widest font-mono">
            <Smartphone size={16} className="text-brand-purple" />
            <span>Live Recipient View</span>
          </div>

          {/* The gorgeous mock smartphone */}
          <div className="border-[8px] border-gray-800 rounded-[36px] overflow-hidden aspect-[9/16] w-full max-w-[280px] mx-auto bg-[#FFF9FC] shadow-2xl relative flex flex-col justify-between p-6">
            
            {/* Top speaker notch */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-gray-800 rounded-b-xl shrink-0 z-20" />

            {/* Falling virtual assets animation simulator */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-10 select-none">
              <div className="absolute top-10 left-[10%] text-brand-pink/40 animate-float-slow text-lg">💖</div>
              <div className="absolute top-28 right-[15%] text-brand-pink/30 animate-pulse-custom text-xl">✨</div>
              <div className="absolute bottom-32 left-[20%] text-brand-pink/20 animate-wiggle text-2xl">💖</div>
              <div className="absolute bottom-16 right-[10%] text-yellow-300/40 animate-float-slow">🌸</div>
            </div>

            {/* Interactive Music status capsule */}
            <div className="p-2 py-1.5 bg-white/70 backdrop-blur-md rounded-2xl border border-brand-purple/20 flex items-center gap-2 text-[9px] font-semibold text-brand-purple absolute top-6 left-1/2 -translate-x-1/2 z-15 shadow-xs whitespace-nowrap">
              <div className="w-2 h-2 rounded-full bg-brand-purple animate-pulse" />
              <span>🎵 Music Playing: {bgMusic.replace('-', ' ')}</span>
            </div>

            {/* Template dynamic layout previews */}
            <div className="my-auto text-center space-y-4 relative z-10 pt-6">
              
              {/* Product customized icons visual */}
              <div className="w-20 h-20 rounded-full bg-white shadow-cute border-2 border-brand-purple/30 mx-auto flex items-center justify-center text-5xl">
                {selectedProduct.id === 'e-gift-sorry-card' ? '✉️' : selectedProduct.id === 'e-gift-flower-bouquet' ? '💐' : '📝'}
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono tracking-widest uppercase text-brand-purple font-extrabold">Opened Surprise!</span>
                <h4 className="font-display font-black text-lg text-gray-800 leading-tight">
                  Dear {partnerName}
                </h4>
              </div>

              <div className="bg-white/90 backdrop-blur-xs rounded-2xl p-4 border border-brand-pink-soft/30 shadow-xs text-left max-h-[160px] overflow-y-auto">
                <p className="text-[11px] leading-relaxed text-gray-600 font-medium italic select-none">
                  "{apologyMessage}"
                </p>
                <div className="text-[10px] text-right font-display font-bold text-brand-pink mt-3">
                  — From {yourName}
                </div>
              </div>

              {/* Heart animation bubble */}
              <div className="text-3xl text-center select-none animate-bounce">💖</div>

            </div>

            {/* Bottom device pill bar indicator */}
            <div className="w-24 h-1 bg-gray-300 rounded-full mx-auto mt-auto shrink-0 z-20" />

          </div>
          
          <div className="text-center text-[10px] text-gray-400 font-medium max-w-[240px] mx-auto leading-relaxed">
            *This matches exactly what they will view on their device when clicking the link you send.
          </div>

        </div>

      </div>

    </div>
  );
};
