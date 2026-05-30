/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { SAMPLE_PRODUCTS } from '../data';
import { Product } from '../types';
import { Filter, SlidersHorizontal, Search, Star, MessageSquareCode, Archive, ShoppingBag } from 'lucide-react';
import {
  trackProductClick,
  trackSelectItem,
  trackProductImageClick,
  trackProductSearchResultClick,
  trackFilterPriceUsed,
  trackFilterCategoryUsed,
  trackFilterEGiftUsed,
  trackFilterPopularUsed,
  trackFilterRomanticUsed,
  trackFilterApologyUsed,
  trackAddToCart,
  trackAddToCartClick,
  trackEGiftClick
} from '../lib/analytics';

export const AllProducts: React.FC = () => {
  const { searchQuery, setSearchQuery, addToCart } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  // Filter conditions
  const [selectedStyle, setSelectedStyle] = useState<'all' | 'physical' | 'e-gift'>('all');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [priceMax, setPriceMax] = useState<number>(6500); // Max possible LKR price
  const [sortBy, setSortBy] = useState<string>('popular');

  useEffect(() => {
    // Parse query string for search filters if navigated with search
    const params = new URLSearchParams(location.search);
    const searchParam = params.get('search');
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [location.search, setSearchQuery]);

  // Handle category-funnel redirect for digital products
  const handleEGiftRedirect = (productOrId: any) => {
    const product = typeof productOrId === 'string' ? SAMPLE_PRODUCTS.find(p => p.id === productOrId) : productOrId;
    if (product) {
      trackEGiftClick(product.id, product.name);
      trackProductClick(product, 'all_products_catalog_egift');
      trackSelectItem(product);
    }
    navigate('/e-gifts');
  };

  const handleProductClick = (product: any) => {
    if (searchQuery.trim()) {
      trackProductSearchResultClick(product, searchQuery);
    } else {
      trackProductClick(product, 'all_products_catalog');
    }
    trackSelectItem(product);
  };

  const handleProductImageClick = (product: any) => {
    trackProductImageClick(product);
    trackSelectItem(product);
  };

  // Tag options available
  const tagFilters = ['Romantic', 'Anniversary', 'Birthday', 'Apology', 'Popular', 'New'];

  // 1. Process match filters
  const filteredProducts = SAMPLE_PRODUCTS.filter((product) => {
    // Search query match
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      product.name.toLowerCase().includes(q) ||
      product.category.toLowerCase().includes(q) ||
      product.description.toLowerCase().includes(q) ||
      product.subCategory.toLowerCase().includes(q);

    // Style match (Physical vs E-Gift)
    const matchesStyle =
      selectedStyle === 'all' ||
      (selectedStyle === 'physical' && !product.isEGift) ||
      (selectedStyle === 'e-gift' && product.isEGift);

    // Tag filter match
    const matchesTag = selectedTag === 'all' || product.tags.includes(selectedTag);

    // Price index match
    const matchesPrice = product.price <= priceMax;

    return matchesSearch && matchesStyle && matchesTag && matchesPrice;
  });

  // 2. Perform sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'newest') return a.tags.includes('New') ? -1 : 1; // Prioritize tag New
    // Default or popular: rank based on rating * reviews count
    return b.rating * b.reviewsCount - a.rating * a.reviewsCount;
  });

  // Tracking on filter use
  const handleFilterUpdate = (type: string, value: any) => {
    if (type === 'price-slider') {
      trackFilterPriceUsed(Number(value));
    } else if (type === 'style') {
      trackFilterCategoryUsed(value);
      if (value === 'e-gift') {
        trackFilterEGiftUsed(true);
      } else {
        trackFilterEGiftUsed(false);
      }
    } else if (type === 'tag') {
      if (value === 'Romantic') {
        trackFilterRomanticUsed(true);
      } else if (value === 'Apology') {
        trackFilterApologyUsed(true);
      } else if (value === 'Popular') {
        trackFilterPopularUsed(true);
      }
      trackFilterCategoryUsed(value);
    }
  };

  const renderProductSymbol = (imageName: string) => {
    switch (imageName) {
      case 'e-card': return '✉️';
      case 'virtual-flowers': return '💐';
      case 'love-letter': return '📝';
      case 'teddy-bear': return '🧸';
      case 'rose-box': return '🌹';
      case 'memory-frame': return '🖼️';
      case 'magnetic-bracelets': return '🔗';
      case 'mugs-set': return '☕';
      case 'aromatherapy': return '🔮';
      default: return '🎁';
    }
  };

  return (
    <div className="space-y-10">
      
      {/* Catalog Header */}
      <section className="text-center max-w-xl mx-auto space-y-3">
        <h1 className="font-display font-black text-3xl md:text-4xl text-gray-800 tracking-tight">
          Explore All Apology Gifts
        </h1>
        <p className="text-xs md:text-sm text-gray-500 font-medium leading-relaxed">
          Search and narrow down the perfect customized apology present to repair your relationship. Filter by price ranges, tags, or delivery modes.
        </p>
      </section>

      {/* Main split control grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Sidebar Filters (3 columns) */}
        <div className="lg:col-span-3 bg-white rounded-3xl p-6 border border-gray-100 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-gray-50">
            <h4 className="font-display font-bold text-gray-800 text-sm flex items-center gap-1.5">
              <SlidersHorizontal size={16} className="text-brand-pink" />
              <span>Filters</span>
            </h4>
            
            <button
              onClick={() => {
                setSelectedStyle('all');
                setSelectedTag('all');
                setPriceMax(6500);
                setSearchQuery('');
              }}
              className="text-[10px] text-gray-400 hover:text-brand-pink font-bold uppercase transition-colors"
            >
              Reset All
            </button>
          </div>

          {/* Delivery Mode selector */}
          <div className="space-y-2.5">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest font-mono">Apology Form</span>
            <div className="flex flex-col gap-2 text-xs font-semibold">
              <button
                onClick={() => { setSelectedStyle('all'); handleFilterUpdate('style', 'all'); }}
                className={`w-full py-2.5 px-3.5 rounded-xl text-left transition-all flex items-center justify-between cursor-pointer ${
                  selectedStyle === 'all' ? 'bg-brand-pink-soft/30 text-brand-pink' : 'hover:bg-gray-50 text-gray-600'
                }`}
              >
                <span>All Presents</span>
                <span className="text-[10px] font-mono opacity-60">({SAMPLE_PRODUCTS.length})</span>
              </button>
              
              <button
                onClick={() => { setSelectedStyle('physical'); handleFilterUpdate('style', 'physical'); }}
                className={`w-full py-2.5 px-3.5 rounded-xl text-left transition-all flex items-center justify-between cursor-pointer ${
                  selectedStyle === 'physical' ? 'bg-brand-pink-soft/30 text-brand-pink' : 'hover:bg-gray-50 text-gray-600'
                }`}
              >
                <span>🚗 Physical Deliveries</span>
                <span className="text-[10px] font-mono opacity-60">({SAMPLE_PRODUCTS.filter(p => !p.isEGift).length})</span>
              </button>
              
              <button
                onClick={() => { setSelectedStyle('e-gift'); handleFilterUpdate('style', 'e-gift'); }}
                className={`w-full py-2.5 px-3.5 rounded-xl text-left transition-all flex items-center justify-between cursor-pointer ${
                  selectedStyle === 'e-gift' ? 'bg-brand-pink-soft/30 text-brand-pink' : 'hover:bg-gray-50 text-gray-600'
                }`}
              >
                <span>⚡ Instant E-Gifts</span>
                <span className="text-[10px] font-mono opacity-60">({SAMPLE_PRODUCTS.filter(p => p.isEGift).length})</span>
              </button>
            </div>
          </div>

          {/* Price Range max selector slider */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest font-mono">
              <span>Price Range</span>
              <span className="text-brand-pink text-xs font-black font-mono">LKR {priceMax.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="500"
              max="6500"
              step="100"
              value={priceMax}
              onChange={(e) => { setPriceMax(Number(e.target.value)); handleFilterUpdate('price-slider', e.target.value); }}
              className="w-full accent-brand-pink cursor-pointer h-1.5 bg-gray-100 rounded-lg"
            />
            <div className="flex justify-between text-[9px] text-gray-400 font-mono font-semibold">
              <span>LKR 500</span>
              <span>LKR 6,550</span>
            </div>
          </div>

          {/* Tags parameters filter */}
          <div className="space-y-2.5">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest font-mono">Apology Vibe</span>
            <div className="flex flex-wrap gap-1.5 pt-1">
              <button
                onClick={() => { setSelectedTag('all'); handleFilterUpdate('tag', 'all'); }}
                className={`px-3 py-1.5 text-[10px] font-bold rounded-lg uppercase tracking-wide border cursor-pointer ${
                  selectedTag === 'all'
                    ? 'bg-brand-pink border-brand-pink text-white shadow-sm'
                    : 'border-gray-200 hover:border-gray-300 text-gray-500'
                }`}
              >
                All vibes
              </button>
              
              {tagFilters.map((t) => {
                const isSelected = selectedTag === t;
                return (
                  <button
                    key={t}
                    onClick={() => { setSelectedTag(t); handleFilterUpdate('tag', t); }}
                    className={`px-3 py-1.5 text-[10px] font-bold rounded-lg uppercase tracking-wide border cursor-pointer ${
                      isSelected
                        ? 'bg-brand-pink border-brand-pink text-white shadow-sm'
                        : 'border-gray-200 hover:border-gray-300 text-gray-500'
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Product Display and Controls (9 columns) */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* Sorting and result details bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-xs">
            <span className="text-xs font-semibold text-gray-500">
              Showing <strong className="text-gray-800">{sortedProducts.length}</strong> matching relationships items
            </span>

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest font-mono shrink-0">Sort By</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-xs font-bold text-gray-700 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 cursor-pointer focus:outline-none focus:border-brand-pink focus:ring-1 focus:ring-brand-pink-soft"
              >
                <option value="popular">⭐ Most Popular Apologies</option>
                <option value="newest">📅 Newest Collections</option>
                <option value="price-asc">📈 Price: Low to High</option>
                <option value="price-desc">📉 Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Actual grid list */}
          {sortedProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-16 text-center border border-gray-100 shadow-xs space-y-5">
              <div className="text-6xl animate-bounce">😿</div>
              <div className="max-w-xs mx-auto space-y-2">
                <h3 className="font-display font-black text-gray-800 text-lg">No gifts match your parameters!</h3>
                <p className="text-xs text-gray-400 leading-relaxed font-semibold">
                  Try tweaking your search terms, modifying your slider price ranges, or resting filter values to locate relevant items.
                </p>
              </div>
              <button
                onClick={() => {
                  setSelectedStyle('all');
                  setSelectedTag('all');
                  setPriceMax(6500);
                  setSearchQuery('');
                }}
                className="px-6 py-2.5 bg-brand-pink text-white rounded-xl text-xs font-bold cursor-pointer"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
                <div
                  key={product.id}
                  className="group bg-white rounded-3xl p-6 border border-gray-100 hover:border-brand-pink-soft shadow-xs hover:shadow-cute transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
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
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] uppercase font-mono tracking-widest font-extrabold text-brand-purple">
                          For {product.subCategory}
                        </span>
                        <span className="text-xs font-bold text-yellow-500 flex items-center gap-1">
                          ★ <span className="text-gray-600 font-mono text-[10px]">{product.rating}</span>
                        </span>
                      </div>

                      <h3 className="font-display font-extrabold text-gray-800 text-sm leading-tight group-hover:text-brand-pink transition-colors">
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
                        onClick={() => handleEGiftRedirect(product)}
                        className="px-4 py-2 bg-brand-purple text-white hover:bg-brand-purple/95 rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer"
                      >
                        Customize
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          addToCart(product, 1);
                          trackAddToCart(product, 1);
                          trackAddToCartClick(product.id, product.name, 'all_products_catalog');
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
          )}

        </div>

      </div>

    </div>
  );
};
