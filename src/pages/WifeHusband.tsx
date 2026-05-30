/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { SAMPLE_PRODUCTS } from '../data';
import { Heart, Sparkles, AlertCircle, ShoppingBag } from 'lucide-react';
import {
  trackProductClick,
  trackSelectItem,
  trackProductImageClick,
  trackAddToCart,
  trackAddToCartClick,
  trackEGiftClick,
  trackWifeSelected,
  trackHusbandSelected,
  trackWhatsAppSupportClick
} from '../lib/analytics';

export const WifeHusband: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTabParam = searchParams.get('tab');
  const activeTab = activeTabParam === 'husband' ? 'husband' : 'wife';
  
  const setActiveTab = (tab: 'wife' | 'husband') => {
    setSearchParams({ tab });
  };

  const { addToCart } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (activeTab === 'wife') {
      trackWifeSelected();
    } else {
      trackHusbandSelected();
    }
  }, [activeTab]);

  // Filter products: Physical ones matching the subcategory AND prepend E-Gifts!
  const physicalItems = SAMPLE_PRODUCTS.filter(
    (p) => !p.isEGift && p.category === 'wife-husband' && p.subCategory === activeTab
  );

  // Grab the primary E-Gift item
  const eGiftItems = SAMPLE_PRODUCTS.filter((p) => p.isEGift);

  // The FIRST product shown in every category must be: E-Gift
  const allFilteredItems = [...eGiftItems, ...physicalItems];

  const handleProductClick = (product: any) => {
    if (product.isEGift) {
      trackEGiftClick(product.id, product.name);
      trackProductClick(product, `wife_husband_${activeTab}_egift_redirect`);
      trackSelectItem(product);
      navigate('/e-gifts');
    } else {
      trackProductClick(product, `wife_husband_${activeTab}_physical`);
      trackSelectItem(product);
      navigate(`/product/${product.id}`);
    }
  };

  const handleProductImageClick = (product: any) => {
    trackProductImageClick(product);
    trackSelectItem(product);
  };

  const renderProductSymbol = (imageName: string) => {
    switch (imageName) {
      case 'e-card': return '✉️';
      case 'virtual-flowers': return '💐';
      case 'love-letter': return '📝';
      case 'teddy-bear': return '🧸';
      case 'mugs-set': return '☕';
      default: return '🎁';
    }
  };

  const isWife = activeTab === 'wife';

  return (
    <div className="space-y-12">
      
      {/* Category Hero Block */}
      <section className={`text-center py-12 md:py-16 rounded-3xl border transition-all duration-300 relative overflow-hidden ${
        isWife 
          ? 'bg-brand-pink-soft/20 border-brand-pink-soft/40' 
          : 'bg-brand-blue-soft/30 border-brand-blue-soft/40'
      }`}>
        {/* Floating background effects */}
        {isWife ? (
          <div className="absolute top-5 left-10 text-brand-pink/30 animate-pulse-custom text-2xl">💖</div>
        ) : (
          <div className="absolute top-5 left-10 text-brand-blue/30 animate-wiggle text-2xl">✨</div>
        )}
        <div className="absolute bottom-5 right-10 text-purple-200 text-2xl animate-float-slow">🌸</div>

        <div className="max-w-xl mx-auto px-4 relative z-10 space-y-4">
          <span className={`text-[10px] uppercase font-mono tracking-widest font-extrabold px-3 py-1.5 rounded-full ${
            isWife ? 'bg-brand-pink-soft text-brand-pink' : 'bg-brand-blue-soft text-brand-blue'
          }`}>
            Marriage & Vows Safe-Zone 💍
          </span>
          <h1 className="font-display font-black text-3xl md:text-4xl text-gray-800 tracking-tight">
            Wife & Husband Apology Gifts
          </h1>
          <p className="text-xs md:text-sm text-gray-500 font-medium leading-relaxed">
            Take a deep breath. Re-ignite your commitment and dissolve marital silences with these handpicked cozy apologetic presents.
          </p>

          {/* Top selection Tabs */}
          <div className="inline-flex p-1 bg-white rounded-2xl border border-gray-100 shadow-sm max-w-xs mx-auto">
            <button
              onClick={() => setActiveTab('wife')}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                isWife
                  ? 'bg-brand-pink text-white shadow-cute'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Heart size={12} className={isWife ? "fill-white text-white" : ""} />
              <span>For Wife</span>
            </button>
            <button
              onClick={() => setActiveTab('husband')}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                !isWife
                  ? 'bg-brand-blue text-white shadow-blue-cute'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Sparkles size={12} />
              <span>For Husband</span>
            </button>
          </div>
        </div>
      </section>

      {/* Grid of items */}
      <section className="space-y-6">
        <h3 className="font-display font-bold text-gray-800 text-lg flex items-center gap-2">
          <span>Available Apology Inventory ({allFilteredItems.length})</span>
          <span className="text-xs font-mono font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded-md">
            Wife & Husband Section
          </span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {allFilteredItems.map((product) => {
            const cardBorder = product.isEGift 
              ? 'border-brand-purple/40 shadow-xs hover:border-brand-purple hover:shadow-[0_10px_30px_rgba(167,139,250,0.15)] bg-purple-50/5'
              : isWife 
              ? 'border-brand-pink-soft hover:border-brand-pink hover:shadow-cute bg-white' 
              : 'border-brand-blue-soft hover:border-brand-blue hover:shadow-blue-cute bg-white';

            return (
              <div
                key={product.id}
                className={`group rounded-3xl p-6 border transition-all duration-300 flex flex-col justify-between ${cardBorder}`}
              >
                <div>
                  <div
                    onClick={() => handleProductImageClick(product)}
                    className="relative aspect-square w-full rounded-2xl bg-brand-bg/50 border border-gray-100 flex items-center justify-center text-6xl font-normal overflow-hidden mb-5 select-none hover:scale-[1.02] transform transition-transform cursor-pointer"
                  >
                    <span>{renderProductSymbol(product.image)}</span>
                    <div className="absolute top-3 left-3 flex gap-1">
                      {product.isEGift ? (
                        <span className="text-[9px] font-mono uppercase bg-brand-purple text-white font-extrabold px-2 py-0.5 rounded-lg">Instant E-Gift First</span>
                      ) : (
                        <span className={`text-[9px] font-mono uppercase font-extrabold px-2 py-0.5 rounded-lg border ${
                          isWife ? 'bg-brand-pink-soft text-brand-pink border-brand-pink-soft' : 'bg-brand-blue-soft text-brand-blue border-brand-blue-soft'
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
                        onClick={() => handleProductClick(product)}
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
                      onClick={() => handleProductClick(product)}
                      className="px-4 py-2 bg-brand-purple hover:bg-brand-purple/95 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm"
                    >
                      Customize E-Gift
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        addToCart(product, 1, activeTab);
                        trackAddToCart(product, 1);
                        trackAddToCartClick(product.id, product.name, `wife_husband_${activeTab}_page`);
                      }}
                      className={`px-4 py-2 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm ${
                        isWife ? 'bg-brand-pink hover:bg-brand-pink/95' : 'bg-brand-blue hover:bg-brand-blue/95'
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

      {/* Helpful communication tool banner card */}
      <section className="bg-brand-bg rounded-3xl p-6 border border-brand-pink-soft/20 flex flex-col sm:flex-row items-center gap-5 justify-between">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="p-4 bg-brand-pink-soft/50 text-brand-pink rounded-2xl text-2xl">💍</div>
          <div>
            <h4 className="font-display font-bold text-gray-800 text-sm">Need a specialized handwritten apology scroll?</h4>
            <p className="text-xs text-gray-500 mt-0.5 font-medium leading-relaxed">Let our calligraphy artists handle typing beautiful letters wrapped with deep scents for your husband or wife. Coordinate over WhatsApp.</p>
          </div>
        </div>
        <button
          onClick={() => {
            trackWhatsAppSupportClick();
            window.open('https://wa.me/94776826937?text=Hi%20SorryBaba,%20I%20want%20to%20add%20a%20handwritten%20apology%20scroll%20to%20my%20wife/husband%20gift.', '_blank');
          }}
          className="px-6 py-2.5 bg-brand-pink text-white rounded-xl text-xs font-semibold shadow-sm cursor-pointer hover:bg-brand-pink/90 transition-all shrink-0"
        >
          Request Scroll
        </button>
      </section>

    </div>
  );
};
