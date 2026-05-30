/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { SAMPLE_PRODUCTS } from '../data';
import { Heart, Sparkles } from 'lucide-react';
import { trackEvent } from '../lib/analytics';

export const OtherGifts: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'women' | 'men'>('women');
  const { addToCart } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    trackEvent('page_view', { page_title: 'Other Apology Gifts', tab: activeTab });
  }, [activeTab]);

  const physicalItems = SAMPLE_PRODUCTS.filter(
    (p) => !p.isEGift && p.category === 'other' && p.subCategory === activeTab
  );

  const eGiftItems = SAMPLE_PRODUCTS.filter((p) => p.isEGift);

  // The FIRST product shown in every category must be: E-Gift
  const allFilteredItems = [...eGiftItems, ...physicalItems];

  const handleProductClick = (productId: string, isEGift: boolean) => {
    if (isEGift) {
      trackEvent('product_click', { product_id: productId, source: 'other_gifts_egift_redirect' });
      navigate('/e-gifts');
    } else {
      trackEvent('product_click', { product_id: productId, source: 'other_gifts_physical' });
      navigate(`/product/${productId}`);
    }
  };

  const renderProductSymbol = (imageName: string) => {
    switch (imageName) {
      case 'e-card': return '✉️';
      case 'virtual-flowers': return '💐';
      case 'love-letter': return '📝';
      case 'memory-frame': return '🖼️';
      case 'aromatherapy': return '🔮';
      default: return '🎁';
    }
  };

  const isWomen = activeTab === 'women';

  return (
    <div className="space-y-12">
      
      {/* Category Hero Block */}
      <section className={`text-center py-12 md:py-16 rounded-3xl border transition-all duration-300 relative overflow-hidden ${
        isWomen 
          ? 'bg-brand-pink-soft/20 border-brand-pink-soft/40' 
          : 'bg-brand-blue-soft/30 border-brand-blue-soft/40'
      }`}>
        {/* Floating background effects */}
        {isWomen ? (
          <div className="absolute top-5 left-10 text-brand-pink/30 animate-pulse-custom text-2xl">💖</div>
        ) : (
          <div className="absolute top-5 left-10 text-brand-blue/30 animate-wiggle text-2xl">✨</div>
        )}
        <div className="absolute bottom-5 right-10 text-purple-200 text-2xl animate-float-slow">🌸</div>

        <div className="max-w-xl mx-auto px-4 relative z-10 space-y-4">
          <span className={`text-[10px] uppercase font-mono tracking-widest font-extrabold px-3 py-1.5 rounded-full ${
            isWomen ? 'bg-brand-pink-soft text-brand-pink' : 'bg-brand-blue-soft text-brand-blue'
          }`}>
            Friends & Family Reconciliation 🌸
          </span>
          <h1 className="font-display font-black text-3xl md:text-4xl text-gray-800 tracking-tight">
            Universal Apology Presents
          </h1>
          <p className="text-xs md:text-sm text-gray-500 font-medium leading-relaxed">
            Rebuild connections beyond romantic partners. Show deep appreciation and make peace with siblings, parents, coworkers, and friends.
          </p>

          {/* Top selection Tabs */}
          <div className="inline-flex p-1 bg-white rounded-2xl border border-gray-100 shadow-sm max-w-xs mx-auto">
            <button
              onClick={() => setActiveTab('women')}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                isWomen
                  ? 'bg-brand-pink text-white shadow-cute'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Heart size={12} className={isWomen ? "fill-white text-white" : ""} />
              <span>For Women</span>
            </button>
            <button
              onClick={() => setActiveTab('men')}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                !isWomen
                  ? 'bg-brand-blue text-white shadow-blue-cute'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Sparkles size={12} />
              <span>For Men</span>
            </button>
          </div>
        </div>
      </section>

      {/* Grid of items */}
      <section className="space-y-6">
        <h3 className="font-display font-bold text-gray-800 text-lg flex items-center gap-2">
          <span>Available Apology Inventory ({allFilteredItems.length})</span>
          <span className="text-xs font-mono font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded-md">
            Friends & Family Section
          </span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {allFilteredItems.map((product) => {
            const cardBorder = product.isEGift 
              ? 'border-brand-purple/40 shadow-xs hover:border-brand-purple hover:shadow-[0_10px_30px_rgba(167,139,250,0.15)] bg-purple-50/5'
              : isWomen 
              ? 'border-brand-pink-soft hover:border-brand-pink hover:shadow-cute bg-white' 
              : 'border-brand-blue-soft hover:border-brand-blue hover:shadow-blue-cute bg-white';

            return (
              <div
                key={product.id}
                className={`group rounded-3xl p-6 border transition-all duration-300 flex flex-col justify-between ${cardBorder}`}
              >
                <div>
                  <div className="relative aspect-square w-full rounded-2xl bg-brand-bg/50 border border-gray-100 flex items-center justify-center text-6xl font-normal overflow-hidden mb-5 select-none hover:scale-[1.02] transform transition-transform">
                    <span>{renderProductSymbol(product.image)}</span>
                    <div className="absolute top-3 left-3 flex gap-1">
                      {product.isEGift ? (
                        <span className="text-[9px] font-mono uppercase bg-brand-purple text-white font-extrabold px-2 py-0.5 rounded-lg">Instant E-Gift First</span>
                      ) : (
                        <span className={`text-[9px] font-mono uppercase font-extrabold px-2 py-0.5 rounded-lg border ${
                          isWomen ? 'bg-brand-pink-soft text-brand-pink border-brand-pink-soft' : 'bg-brand-blue-soft text-brand-blue border-brand-blue-soft'
                        }`}>Physical Gift</span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-wider">
                        {product.isEGift ? 'Digital present option' : `Apology item • ${activeTab}`}
                      </span>
                      <span className="text-xs font-bold text-yellow-500 flex items-center gap-1">
                        ★ <span className="text-gray-600 font-mono text-[10px]">{product.rating}</span>
                      </span>
                    </div>

                    <h4 className="font-display font-extrabold text-gray-800 text-base leading-tight">
                      <button
                        onClick={() => handleProductClick(product.id, product.isEGift)}
                        className="text-left font-bold focus:none outline-none hover:text-brand-pink transition-colors cursor-pointer"
                      >
                        {product.name}
                      </button>
                    </h4>

                    <p className="text-[11px] text-gray-400 font-medium line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-50 mt-6 flex items-center justify-between gap-2">
                  <div className="flex flex-col">
                    {product.originalPrice && (
                      <span className="text-[10px] line-through text-gray-400 font-mono">
                        LKR {product.originalPrice.toLocaleString()}
                      </span>
                    )}
                    <span className="text-sm font-black text-gray-800 font-mono">
                      LKR {product.price.toLocaleString()}
                    </span>
                  </div>

                  {product.isEGift ? (
                    <button
                      onClick={() => handleProductClick(product.id, true)}
                      className="px-4 py-2 bg-brand-purple hover:bg-brand-purple/95 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm"
                    >
                      Customize E-Gift
                    </button>
                  ) : (
                    <button
                      onClick={() => addToCart(product, 1, activeTab)}
                      className={`px-4 py-2 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm ${
                        isWomen ? 'bg-brand-pink hover:bg-brand-pink/95' : 'bg-brand-blue hover:bg-brand-blue/95'
                      }`}
                    >
                      Add To Bag
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};
