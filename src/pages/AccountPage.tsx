import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { User, ClipboardList, Heart, Settings, LayoutDashboard, ShieldCheck, Mail, Key, Sparkles, MapPin, Smile } from 'lucide-react';
import { SEO } from '../components/SEO';
import { trackPageView } from '../lib/analytics';

export const AccountPage: React.FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Determine active tab based on route subpath
  let activeTab = 'dashboard';
  if (pathname.includes('/orders')) activeTab = 'orders';
  else if (pathname.includes('/profile')) activeTab = 'profile';
  else if (pathname.includes('/wishlist')) activeTab = 'wishlist';
  else if (pathname.includes('/settings')) activeTab = 'settings';

  useEffect(() => {
    trackPageView(pathname);
  }, [pathname]);

  // Seed some beautiful account visual states
  const ordersSeed = [
    {
      id: "SB-2026-8942",
      date: "May 25, 2026",
      status: "Delivered",
      total: "LKR 4,850",
      item: "Cute Apology Teddy Bear + Custom Printed Card",
      icon: "🧸"
    },
    {
      id: "SB-2026-6124",
      date: "May 10, 2026",
      status: "Fulfilled (Digital)",
      total: "LKR 800",
      item: "Virtual Flower Bouquet & Letter URL Link",
      icon: "💐"
    }
  ];

  const wishlistSeed = [
    {
      id: "physical-memory-frame",
      name: "Couple Memory Custom Glowing Frame",
      price: "LKR 5,000",
      icon: "🖼️"
    },
    {
      id: "e-gift-love-letter",
      name: "Personalized Love Letter & Memories",
      price: "LKR 1,200",
      icon: "📝"
    }
  ];

  return (
    <div className="max-w-5xl mx-auto py-4 font-sans selection:bg-brand-pink-soft selection:text-brand-pink">
      <SEO 
        title="My Account Dashboard | SorryBaba.com" 
        description="Access and track your relationship gift orders, pending customized greeting letters, historical purchases, and recipient address setups." 
      />
      
      {/* Title */}
      <section className="space-y-2 pb-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono font-black text-brand-purple uppercase bg-purple-50 px-2.5 py-1 rounded-lg">
            User Center
          </span>
          <h1 className="font-display font-black text-2xl md:text-3xl text-gray-800 tracking-tight leading-tight">
            My Account Dashboard
          </h1>
          <p className="text-xs text-gray-400 font-medium font-semibold">
            Manage your relationship gift histories, track courier dispatches, and edit address credentials.
          </p>
        </div>

        {/* Hello badge */}
        <div className="bg-white border rounded-2xl py-2 px-4 flex items-center gap-2.5 max-w-fit shadow-xs">
          <span className="text-xl">👋</span>
          <div className="text-[10px] font-bold text-gray-600">
            <span className="block text-gray-400 uppercase font-mono tracking-wider">Logged in as</span>
            <strong>Sajith Kularatne</strong>
          </div>
        </div>
      </section>

      {/* Main split dashboard layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
        
        {/* Navigation Sidebar (3 columns) */}
        <div className="lg:col-span-3 space-y-2 bg-white rounded-3xl p-5 border shadow-xs h-fit">
          <button
            onClick={() => navigate('/account')}
            className={`w-full py-2.5 px-3.5 rounded-xl text-left text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'dashboard' ? 'bg-brand-pink text-white shadow-sm' : 'hover:bg-gray-50 text-gray-500'
            }`}
          >
            <LayoutDashboard size={15} />
            <span>Overview</span>
          </button>
          
          <button
            onClick={() => navigate('/account/orders')}
            className={`w-full py-2.5 px-3.5 rounded-xl text-left text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'orders' ? 'bg-brand-pink text-white shadow-sm' : 'hover:bg-gray-50 text-gray-500'
            }`}
          >
            <ClipboardList size={15} />
            <span>Order History</span>
            <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-md ml-auto ${activeTab === 'orders' ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-400'}`}>
              {ordersSeed.length}
            </span>
          </button>

          <button
            onClick={() => navigate('/account/profile')}
            className={`w-full py-2.5 px-3.5 rounded-xl text-left text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'profile' ? 'bg-brand-pink text-white shadow-sm' : 'hover:bg-gray-50 text-gray-500'
            }`}
          >
            <User size={15} />
            <span>Profile Details</span>
          </button>

          <button
            onClick={() => navigate('/account/wishlist')}
            className={`w-full py-2.5 px-3.5 rounded-xl text-left text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'wishlist' ? 'bg-brand-pink text-white shadow-sm' : 'hover:bg-gray-50 text-gray-500'
            }`}
          >
            <Heart size={15} />
            <span>Saved Wishlist</span>
            <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-md ml-auto ${activeTab === 'wishlist' ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-400'}`}>
              {wishlistSeed.length}
            </span>
          </button>

          <button
            onClick={() => navigate('/account/settings')}
            className={`w-full py-2.5 px-3.5 rounded-xl text-left text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'settings' ? 'bg-brand-pink text-white shadow-sm' : 'hover:bg-gray-50 text-gray-500'
            }`}
          >
            <Settings size={15} />
            <span>Preferences</span>
          </button>
        </div>

        {/* Content Section (9 columns) */}
        <div className="lg:col-span-9 bg-white border rounded-3xl p-6 md:p-8 shadow-xs min-h-[360px] flex flex-col justify-between">
          
          {/* TAB 1: OVERVIEW DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="space-y-1.5 border-b pb-4">
                <h3 className="font-display font-black text-gray-800 text-base flex items-center gap-1.5">
                  <Smile className="text-brand-pink" size={18} />
                  <span>Welcome Back, Sajith!</span>
                </h3>
                <p className="text-xs text-gray-400 font-semibold leading-relaxed">
                  Everything in your dashboard is customized to streamline high-quality apologies. Review your past success rates, track shipping dispatches, or finalize active templates.
                </p>
              </div>

              {/* Conversion/success Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-brand-bg rounded-2xl border border-brand-pink/5 text-center space-y-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block font-bold">Total Apologies</span>
                  <span className="text-2xl font-mono font-black text-gray-800">2</span>
                </div>
                <div className="p-4 bg-brand-bg rounded-2xl border border-brand-pink/5 text-center space-y-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#FF1A75] block font-bold">Reconciliations</span>
                  <span className="text-2xl font-mono font-black text-brand-pink">2 / 2</span>
                </div>
                <div className="p-4 bg-brand-bg rounded-2xl border border-brand-pink/5 text-center space-y-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-brand-purple block font-bold">Success Rate</span>
                  <span className="text-2xl font-mono font-black text-brand-purple">100%</span>
                </div>
              </div>

              {/* Order Status highlights card */}
              <div className="p-4 border rounded-2xl space-y-2 bg-slate-50/50">
                <div className="flex items-center justify-between text-[10px] uppercase font-mono text-gray-400 font-bold">
                  <span>Courier Dispatch Watch</span>
                  <span className="text-emerald-500">Delivered</span>
                </div>
                <h4 className="text-xs text-gray-800 font-bold">Order SB-2026-8942</h4>
                <p className="text-[11px] text-gray-500 font-semibold font-serif">Scented Apology Teddy Bear was hand-delivered to Galle Road, Colombo 3 on May 26, 2026.</p>
              </div>
            </div>
          )}

          {/* TAB 2: REGISTERED ORDERS list */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div className="space-y-1 border-b pb-4">
                <h3 className="font-display font-black text-gray-800 text-base">Your Apology Ledger</h3>
                <p className="text-xs text-gray-400 font-semibold leading-relaxed">
                  Track and inspect invoices, message scripts, and courier timings for your present dispatches.
                </p>
              </div>

              <div className="space-y-4">
                {ordersSeed.map((ord, idx) => (
                  <div key={idx} className="border border-gray-150 p-4 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-brand-pink-soft transition-colors text-xs font-semibold">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl select-none" role="img">{ord.icon}</span>
                      <div className="space-y-1">
                        <h4 className="text-gray-800 font-bold">{ord.item}</h4>
                        <span className="text-[10px] text-gray-400 block font-mono">Invoice Date: {ord.date} • Order Code: {ord.id}</span>
                      </div>
                    </div>

                    <div className="sm:text-right font-mono self-stretch sm:self-auto flex sm:flex-col justify-between items-center sm:items-end border-t sm:border-0 pt-2 sm:pt-0">
                      <span className="text-gray-800 font-bold">{ord.total}</span>
                      <span className="text-[9px] font-mono bg-emerald-50 text-emerald-600 border border-emerald-100 px-2 py-0.5 rounded-lg font-bold block mt-1 uppercase tracking-wider">{ord.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: USER PROFILE */}
          {activeTab === 'profile' && (
            <div className="space-y-6 text-xs font-semibold">
              <div className="space-y-1 border-b pb-4">
                <h3 className="font-display font-black text-gray-800 text-base">Profile Specifications</h3>
                <p className="text-xs text-gray-400 font-semibold leading-relaxed">
                  Edit or verify your delivery address parameters and contact coordinates.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5ClassName">
                  <span className="text-gray-400 font-mono text-[9px] uppercase tracking-wider block font-bold">Connected Email</span>
                  <div className="w-full bg-gray-50 border p-3 rounded-xl text-gray-600 flex items-center gap-2">
                    <Mail size={14} className="text-brand-pink" />
                    <span>sajith.k@gmail.com</span>
                  </div>
                </div>

                <div className="space-y-1.5ClassName">
                  <span className="text-gray-400 font-mono text-[9px] uppercase tracking-wider block font-bold">Contact WhatsApp</span>
                  <div className="w-full bg-gray-50 border p-3 rounded-xl text-gray-600 flex items-center gap-2">
                    <Smile size={14} className="text-emerald-500" />
                    <span>+94 77 123 4567</span>
                  </div>
                </div>

                <div className="space-y-1.5ClassName sm:col-span-2">
                  <span className="text-gray-400 font-mono text-[9px] uppercase tracking-wider block font-bold">Default Home Address</span>
                  <div className="w-full bg-gray-50 border p-3 rounded-xl text-gray-600 flex items-center gap-2">
                    <MapPin size={14} className="text-brand-purple" />
                    <span>Apartment 4B, Galle Road, Colombo 3, Western Province</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: WISHLIST SAVED */}
          {activeTab === 'wishlist' && (
            <div className="space-y-6">
              <div className="space-y-1 border-b pb-4">
                <h3 className="font-display font-black text-gray-800 text-base">Your Wishlist Selection</h3>
                <p className="text-xs text-gray-400 font-semibold leading-relaxed">
                  Curate potential items you would like to coordinate or order for upcoming special dates (anniversaries, birthdays).
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {wishlistSeed.map((wish, idx) => (
                  <div key={idx} className="border border-gray-150 p-4 rounded-2xl flex items-center gap-3 bg-slate-50/20 text-xs font-semibold">
                    <span className="text-3xl select-none" role="img">{wish.icon}</span>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-gray-800 font-bold truncate">{wish.name}</h4>
                      <span className="text-[10px] font-mono text-brand-pink font-black block mt-0.5">{wish.price}</span>
                      <Link to={wish.id.startsWith('e-gift') ? '/e-gifts' : `/product/${wish.id}`} className="text-[9px] uppercase text-brand-purple hover:underline font-extrabold mt-1 ml-auto block">Configure</Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: PREFERENCES PRESETS */}
          {activeTab === 'settings' && (
            <div className="space-y-6 text-xs font-semibold">
              <div className="space-y-1 border-b pb-4">
                <h3 className="font-display font-black text-gray-800 text-base">Platform Preferences</h3>
                <p className="text-xs text-gray-400 font-semibold leading-relaxed">
                  Setup security layers, toggle email notifications, or adjust device parameters.
                </p>
              </div>

              <div className="space-y-3.5">
                <label className="flex items-center justify-between p-3.5 bg-gray-50 border rounded-xl cursor-pointer">
                  <div className="space-y-0.5">
                    <span className="text-gray-800 font-bold">Email Order Alerts</span>
                    <p className="text-[10px] text-gray-400 leading-normal">Confirm custom invoice notifications via email layout digests.</p>
                  </div>
                  <input type="checkbox" defaultChecked className="accent-brand-pink w-4 h-4 cursor-pointer" />
                </label>

                <label className="flex items-center justify-between p-3.5 bg-gray-50 border rounded-xl cursor-pointer">
                  <div className="space-y-0.5">
                    <span className="text-gray-800 font-bold">GTM Converter Tracker</span>
                    <p className="text-[10px] text-gray-400 leading-normal">Enable active measurement of page navigation transitions inside browser frames.</p>
                  </div>
                  <input type="checkbox" defaultChecked className="accent-brand-pink w-4 h-4 cursor-pointer" />
                </label>
              </div>
            </div>
          )}

          {/* Footer security badge */}
          <div className="border-t border-gray-50 pt-5 mt-8 text-[10px] text-gray-400 font-semibold text-center flex items-center gap-1.5 justify-center">
            <ShieldCheck size={14} className="text-brand-pink shrink-0" />
            <span>Encrypted connection. SorryBaba values your data privacy.</span>
          </div>

        </div>

      </div>

    </div>
  );
};
