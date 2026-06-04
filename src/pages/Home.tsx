/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { StoryAnimation } from '../components/StoryAnimation';
import { CategoryCards } from '../components/CategoryCards';
import { SAMPLE_PRODUCTS } from '../data';
import { useApp } from '../context/AppContext';
import { Heart, Sparkles, Send, ShieldAlert, BadgeCheck, MessageCircleHeart } from 'lucide-react';
import { SEO } from '../components/SEO';
import {
  trackProductClick,
  trackSelectItem,
  trackProductImageClick,
  trackSendGiftCtaClick,
  trackExploreEGiftsCtaClick,
  trackAddToCart,
  trackAddToCartClick,
  trackEGiftClick
} from '../lib/analytics';

// High performance scroll intersection wrapper for below-fold lazy loading
const LazySection: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { rootMargin: '200px' });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="min-h-[120px]">
      {isVisible ? children : null}
    </div>
  );
};

export const Home: React.FC = () => {
  const { addToCart } = useApp();
  const navigate = useNavigate();

  // Filter 3 popular products for home curation
  const featuredProducts = SAMPLE_PRODUCTS.filter(p => p.tags.includes('Popular')).slice(0, 3);

  const handleProductClick = (product: any) => {
    trackProductClick(product, 'home_featured');
    trackSelectItem(product);
  };

  const handleProductImageClick = (product: any) => {
    trackProductImageClick(product);
    trackSelectItem(product);
  };

  const handleEGiftRedirect = (productOrId: any) => {
    let product = typeof productOrId === 'string' ? SAMPLE_PRODUCTS.find(p => p.id === productOrId) : productOrId;
    if (!product) {
      product = { id: 'e-gift-sorry-card', name: 'Digital Regret Sorry Card', category: 'e-gift', price: 900 };
    }
    trackEGiftClick(product.id, product.name);
    trackProductClick(product, 'home_featured_egift');
    trackSelectItem(product);
    navigate('/e-gifts');
  };

  // Helper inside the product cards to render visual bullet symbols
  const renderProductSymbol = (imageName: string) => {
    switch (imageName) {
      case 'e-card': return '✉️';
      case 'virtual-flowers': return '💐';
      case 'love-letter': return '📝';
      case 'teddy-bear': return '🧸';
      case 'rose-box': return '🌹';
      case 'memory-frame': return '🖼️';
      default: return '🎁';
    }
  };

  return (
    <div className="space-y-16">
      <SEO 
        title="SorryBaba.com | Cute Apology Gifts, Romantic Gifts & Reconciliation Presents" 
        description="Shop apology gifts, romantic gifts, reconciliation presents, custom keepsakes, surprise gift boxes and heartfelt apology cards from SorryBaba.com." 
      />
      
      {/* 1. EMOTIONAL HERO SECTION */}
      <section className="relative overflow-hidden pt-12 md:pt-20 pb-16 bg-gradient-to-b from-brand-pink-soft/20 via-white to-brand-bg/50">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Hero Left Content */}
            <div className="space-y-6 text-center lg:text-left relative z-10">
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-brand-pink-soft/60 text-brand-pink border border-brand-pink-soft animate-bounce">
                <Heart size={12} className="fill-brand-pink text-brand-pink" />
                <span>Let’s Bring You Back Together</span>
              </span>
              
              <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-gray-800 tracking-tight leading-none">
                Made a Mistake? <br />
                <span className="text-gradient-pink">Send Love</span>, Not Excuses.
              </h1>
              
              <p className="text-base md:text-lg text-gray-500 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
                Choose a thoughtful gift and rebuild your connection today. We weave your regret into deep, sweet romantic physical items or high-fidelity instant digital e-gifts.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-2">
                <Link
                  to="/all-products"
                  onClick={() => trackSendGiftCtaClick()}
                  className="w-full sm:w-auto px-8 py-4 bg-brand-pink-text text-white font-extrabold text-sm rounded-2xl shadow-cute hover:bg-brand-pink-text/95 transition-all text-center flex items-center justify-center gap-2 hover:-translate-y-0.5"
                >
                  <span>Send A Gift</span>
                  <Send size={15} />
                </Link>
                
                {/* Specific Funnel Entry to E-Gifts */}
                <button
                  onClick={() => {
                    trackExploreEGiftsCtaClick();
                    handleEGiftRedirect('e-gift-sorry-card');
                  }}
                  className="w-full sm:w-auto px-8 py-4 bg-white border-2 border-brand-pink-soft text-brand-pink-text font-extrabold text-sm rounded-2xl shadow-sm hover:bg-brand-pink-soft/10 transition-all text-center flex items-center justify-center gap-2 hover:-translate-y-0.5"
                >
                  <Sparkles size={15} />
                  <span>Explore E-Gifts</span>
                </button>
              </div>

              {/* Heart Warming trust note snippet */}
              <div className="pt-6 flex items-center gap-2 justify-center lg:justify-start text-xs text-gray-500 font-mono">
                <BadgeCheck size={16} className="text-brand-pink-text" />
                <span>12,400+ Sri Lankan relationships mended since 2024</span>
              </div>
            </div>

            {/* Hero Right: Coded Animation Scene Centerpiece */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-pink-soft/30 to-brand-blue-soft/30 rounded-3xl filter blur-3xl opacity-40 -z-10 transform scale-110" />
              <StoryAnimation />
            </div>

          </div>
        </div>
      </section>

      {/* 2. CATEGORIES GRID */}
      <LazySection>
        <CategoryCards />
      </LazySection>

      {/* 3. POPULAR PRODUCTS CURATION SECTION */}
      <LazySection>
        <section className="py-12 bg-white rounded-3xl border border-brand-pink-soft/10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-gray-50">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-mono tracking-wider font-extrabold text-brand-pink">Trending Apologies</span>
              <h2 className="font-display font-bold text-2xl md:text-3xl text-gray-800 tracking-tight">
                Best-Selling Ways to Say "Please Forgive Me"
              </h2>
            </div>
            <Link to="/all-products" className="text-xs font-bold text-brand-pink hover:text-brand-pink/90 transition-colors mt-2 md:mt-0 flex items-center gap-1">
              <span>View all apology catalog</span>
              <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-3xl p-6 border border-gray-100 hover:border-brand-pink-soft/60 shadow-xs hover:shadow-cute transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Product badge */}
                  <div
                    onClick={() => handleProductImageClick(product)}
                    className="relative aspect-square w-full rounded-2xl bg-brand-bg/60 border border-brand-pink-soft/10 mb-5 flex items-center justify-center text-6xl font-normal overflow-hidden group-hover:scale-[1.02] transform transition-transform select-none cursor-pointer"
                  >
                    <span className="filter drop-shadow-md select-none">{renderProductSymbol(product.image)}</span>
                    <div className="absolute top-3 left-3 flex gap-1">
                      {product.isEGift ? (
                        <span className="text-[9px] font-mono uppercase bg-brand-blue-soft text-brand-blue font-extrabold px-2 py-0.5 rounded-lg border border-brand-blue-soft">E-Gift</span>
                      ) : (
                        <span className="text-[9px] font-mono uppercase bg-brand-pink-soft text-brand-pink font-extrabold px-2 py-0.5 rounded-lg border border-brand-pink-soft">Physical</span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[9px] uppercase font-mono tracking-widest font-bold text-brand-purple">
                        Category • {product.category.replace('-', ' & ')}
                      </span>
                      <span className="text-xs font-bold text-yellow-500 flex items-center gap-1">
                        ★ <span className="text-gray-600 font-mono text-[10px]">{product.rating}</span>
                      </span>
                    </div>
                    
                    <h3 className="font-display font-extrabold text-gray-800 text-base leading-tight group-hover:text-brand-pink transition-colors">
                      {product.isEGift ? (
                        <button onClick={() => handleEGiftRedirect(product)} className="text-left font-bold focus:none outline-none cursor-pointer">
                          {product.name}
                        </button>
                      ) : (
                        <Link to={`/product/${product.id}`} onClick={() => handleProductClick(product)} className="font-bold">
                          {product.name}
                        </Link>
                      )}
                    </h3>
                    
                    <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed">
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
                    <span className="text-base font-black text-gray-800 font-mono">
                      LKR {product.price.toLocaleString()}
                    </span>
                  </div>

                  {product.isEGift ? (
                    <button
                      onClick={() => handleEGiftRedirect(product)}
                      className="px-4 py-2 bg-brand-blue text-white hover:bg-brand-blue/95 rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer"
                    >
                      Customize E-Gift
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        addToCart(product, 1);
                        trackAddToCart(product, 1);
                        trackAddToCartClick(product.id, product.name, 'home_featured');
                      }}
                      className="px-4 py-2 bg-brand-pink text-white hover:bg-brand-pink/95 rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer"
                    >
                      Add To Bag
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </LazySection>

      {/* 4. EMOTIONAL REHAB HABITS STATS */}
      <LazySection>
        <section className="py-12 bg-gradient-to-r from-brand-pink-soft/10 via-white to-brand-blue-soft/10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 rounded-3xl border border-brand-pink-soft/10 text-center space-y-6">
          <div className="max-w-xl mx-auto">
            <h2 className="font-display font-black text-2xl text-gray-800">Communication is hard. Say Sorry nicely.</h2>
            <p className="text-xs text-gray-500 mt-2 font-medium">
              Arguments happen. However, avoiding communications after a fight is a relationship breaker. Reach out, break the silence, and tell them "My world is incomplete without you".
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-4 text-center">
            <div className="p-5 bg-white rounded-2xl shadow-xs border border-gray-100">
              <div className="text-2xl font-black text-brand-pink font-mono">92%</div>
              <div className="text-[10px] text-gray-500 font-bold mt-1 font-mono uppercase tracking-wider">Couples Reconnected</div>
            </div>
            <div className="p-5 bg-white rounded-2xl shadow-xs border border-gray-100">
              <div className="text-2xl font-black text-brand-blue font-mono">&lt;30m</div>
              <div className="text-[10px] text-gray-500 font-bold mt-1 font-mono uppercase tracking-wider">E-Gift Speed</div>
            </div>
            <div className="p-5 bg-white rounded-2xl shadow-xs border border-gray-100">
              <div className="text-2xl font-black text-brand-purple font-mono">1/2d</div>
              <div className="text-[10px] text-gray-500 font-bold mt-1 font-mono uppercase tracking-wider">Island Delivery</div>
            </div>
            <div className="p-5 bg-white rounded-2xl shadow-xs border border-gray-100">
              <div className="text-2xl font-black text-green-500 font-mono">24/7</div>
              <div className="text-[10px] text-gray-500 font-bold mt-1 font-mono uppercase tracking-wider">WA Concierge Support</div>
            </div>
          </div>
        </section>
      </LazySection>

    </div>
  );
};
