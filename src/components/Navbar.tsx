/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Search, Heart, ShoppingBag, Menu, X } from 'lucide-react';
import { SAMPLE_PRODUCTS } from '../data';
import { trackSearchUsed, trackSearchButtonClick } from '../lib/analytics';

export const Navbar: React.FC = () => {
  const { cartTotalItems, searchQuery, setSearchQuery, toggleCartDrawer } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const resultsCount = SAMPLE_PRODUCTS.filter((product) => {
        const q = searchQuery.toLowerCase().trim();
        return !q ||
          product.name.toLowerCase().includes(q) ||
          product.category.toLowerCase().includes(q) ||
          product.description.toLowerCase().includes(q) ||
          product.subCategory.toLowerCase().includes(q);
      }).length;

      // Track search parameters
      trackSearchUsed(searchQuery, resultsCount);
      trackSearchButtonClick(searchQuery);

      navigate(`/all-products?search=${encodeURIComponent(searchQuery)}`);
      setMobileMenuOpen(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-brand-pink-soft/30 shadow-[0_2px_15px_rgba(255,95,162,0.05)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 gap-4">
          
          {/* Logo Brand Mascot */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group" onClick={closeMobileMenu}>
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border border-brand-pink-soft bg-brand-pink-soft/20 flex items-center justify-center group-hover:scale-105 transition-transform">
              <img src="/logo.svg" alt="SorryBaba mascot face" className="w-full h-full" referrerPolicy="no-referrer" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-xl md:text-2xl font-extrabold tracking-tight text-brand-pink group-hover:text-brand-pink/90 transition-colors">
                Sorry<span className="text-brand-purple">Baba</span><span className="text-brand-blue">.com</span>
              </span>
              <span className="text-[9px] md:text-[10px] uppercase tracking-wider font-mono text-gray-400 font-semibold leading-none -mt-0.5">
                Say sorry • Send love
              </span>
            </div>
          </Link>

          {/* Core Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-gray-700">
            <Link to="/" className="hover:text-brand-pink transition-colors">Home</Link>
            <Link to="/wife-husband-gifts" className="hover:text-brand-pink transition-colors">Wife & Husband</Link>
            <Link to="/girlfriend-boyfriend-gifts" className="hover:text-brand-pink transition-colors">Girlfriend & Boyfriend</Link>
            <Link to="/collections" className="hover:text-brand-pink transition-colors">Collections</Link>
            <Link to="/blog" className="hover:text-brand-pink transition-colors text-gray-650 font-medium">Blog</Link>
            <Link to="/faq" className="hover:text-brand-pink transition-colors text-gray-500 font-normal">FAQ</Link>
          </nav>

          {/* Search Bar Container */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex relative flex-1 max-w-sm">
            <div className={`relative w-full rounded-2xl border transition-all ${
              searchFocused ? 'border-brand-pink ring-2 ring-brand-pink-soft bg-white' : 'border-gray-200 bg-gray-50/50'
            }`}>
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 pointer-events-none">
                <Search size={18} />
              </span>
              <input
                type="text"
                placeholder="Search gifts, categories, or keywords..."
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                className="w-full py-2.5 pl-10 pr-4 text-xs font-medium text-gray-700 placeholder-gray-400 bg-transparent rounded-2xl focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </form>

          {/* Right Action Hub */}
          <div className="flex items-center gap-2 md:gap-4 shrink-0">
            {/* Quick Contact Button */}
            <Link
              to="/contact-us"
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold rounded-2xl text-brand-pink bg-brand-pink-soft/30 hover:bg-brand-pink-soft/50 transition-all border border-brand-pink-soft/40"
            >
              Contact Us
            </Link>

            {/* Shopping Bag Trigger */}
            <button
              onClick={() => toggleCartDrawer(true)}
              className="relative p-2.5 rounded-2xl border border-brand-pink-soft/40 bg-brand-pink-soft/10 text-brand-pink hover:bg-brand-pink-soft/30 transition-all focus:outline-none"
              aria-label="Open Cart"
              id="cart-trigger-btn"
            >
              <ShoppingBag size={20} className="shake-hover" />
              {cartTotalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-pink text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center border-2 border-white animate-pulse-custom">
                  {cartTotalItems}
                </span>
              )}
            </button>

            {/* Responsive Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-2xl text-gray-600 hover:bg-gray-100 transition-all lg:hidden focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </div>

      {/* MOBILE SHEETS */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-16 left-0 w-full bg-white border-b border-gray-100 shadow-xl transition-all duration-300 z-50">
          <div className="px-4 py-6 space-y-4">
            
            {/* Mobile Search input */}
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 pointer-events-none">
                <Search size={18} />
              </span>
              <input
                type="text"
                placeholder="Search apology items..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full py-2.5 pl-10 pr-10 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-brand-pink focus:ring-2 focus:ring-brand-pink-soft"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400"
                >
                  <X size={16} />
                </button>
              )}
            </form>

            {/* Mobile Links */}
            <nav className="flex flex-col gap-3 font-semibold text-gray-700 text-sm">
              <Link to="/" className="p-2.5 rounded-xl hover:bg-brand-pink-soft/20 hover:text-brand-pink transition-all" onClick={closeMobileMenu}>Home</Link>
              <Link to="/wife-husband-gifts" className="p-2.5 rounded-xl hover:bg-brand-pink-soft/20 hover:text-brand-pink transition-all" onClick={closeMobileMenu}>Wife & Husband Gifts</Link>
              <Link to="/girlfriend-boyfriend-gifts" className="p-2.5 rounded-xl hover:bg-brand-pink-soft/20 hover:text-brand-pink transition-all" onClick={closeMobileMenu}>Girlfriend & Boyfriend Gifts</Link>
              <Link to="/collections" className="p-2.5 rounded-xl hover:bg-brand-pink-soft/20 hover:text-brand-pink transition-all" onClick={closeMobileMenu}>Curated Collections</Link>
              <Link to="/blog" className="p-2.5 rounded-xl hover:bg-brand-pink-soft/20 hover:text-brand-pink transition-all" onClick={closeMobileMenu}>Relationship Blog</Link>
              <Link to="/faq" className="p-2.5 rounded-xl hover:bg-brand-pink-soft/20 text-gray-500 font-normal transition-all" onClick={closeMobileMenu}>Frequently Asked Questions (FAQ)</Link>
              <Link to="/contact-us" className="p-2.5 rounded-xl hover:bg-brand-pink-soft/20 text-gray-500 font-normal transition-all" onClick={closeMobileMenu}>Contact Support</Link>
            </nav>
            
          </div>
        </div>
      )}
    </header>
  );
};
