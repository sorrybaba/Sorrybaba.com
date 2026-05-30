/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, ShoppingBag } from 'lucide-react';
import { trackEvent } from '../lib/analytics';

export const CartPage: React.FC = () => {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    cartSubtotal,
    cartTotalItems,
    cartShipping,
    cartGrandTotal
  } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    trackEvent('page_view', { page_title: 'Full Cart Page' });
  }, []);

  const handleCheckoutNav = () => {
    trackEvent('begin_checkout', { source: 'cart_page', items_count: cartTotalItems, subtotal: cartSubtotal });
    navigate('/checkout');
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

  if (cart.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 max-w-md mx-auto shadow-xs p-8 space-y-5">
        <span className="text-6xl animate-bounce">🎈</span>
        <div className="space-y-2">
          <h2 className="font-display font-black text-gray-800 text-lg">Your Greeting Bag is Empty!</h2>
          <p className="text-xs text-gray-400 font-semibold leading-relaxed max-w-[280px] mx-auto">
            Bring back your beautiful smiles today! Browse through our emotional digital cards or plush boxes to get started.
          </p>
        </div>
        <Link
          to="/all-products"
          className="inline-block px-6 py-3 bg-brand-pink text-white rounded-xl text-xs font-bold shadow-cute"
        >
          Browse All Apologies
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      
      {/* Title */}
      <h1 className="font-display font-black text-2xl md:text-3xl text-gray-800 tracking-tight flex items-center gap-2">
        <ShoppingBag size={24} className="text-brand-pink" />
        <span>Review Your Greeting Bag</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Cart Item Grid (8 columns) */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-gray-150 space-y-4">
          {cart.map((item) => (
            <div
              key={item.product.id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4 border-b border-gray-100 last:border-b-0 relative group"
            >
              {/* Product Info left */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-brand-bg flex items-center justify-center text-4xl shrink-0">
                  {renderProductSymbol(item.product.image)}
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-sm text-gray-800 leading-snug">
                    {item.product.name}
                  </h3>
                  <p className="text-[10px] text-brand-purple font-semibold mt-1">
                    {item.product.isEGift ? '⚡ Instant Email & WhatsApp Link Delivery' : '🚗 Physical Package Delivery'}
                  </p>
                  <span className="text-xs font-bold text-gray-400 font-mono mt-2 block sm:hidden">
                    LKR {item.product.price.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Quantity modify center-right */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50/50">
                  <button
                    onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                    className="p-2 py-1.5 text-gray-400 hover:text-brand-pink transition-colors cursor-pointer text-xs"
                    aria-label="Reduce"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="px-3 text-xs font-bold text-gray-700 font-mono">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                    className="p-2 py-1.5 text-gray-400 hover:text-brand-pink transition-colors cursor-pointer text-xs"
                    aria-label="Increase"
                  >
                    <Plus size={12} />
                  </button>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-xs font-black text-gray-800 font-mono min-w-[80px] text-right hidden sm:block">
                    LKR {(item.product.price * item.quantity).toLocaleString()}
                  </span>
                  
                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="p-2 text-gray-300 hover:text-red-500 rounded-xl hover:bg-red-50 transition-colors pointer cursor-pointer"
                    aria-label="Delete product option"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Order Summary sidebar (4 columns) */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-gray-150 space-y-6">
          <h4 className="font-display font-extrabold text-gray-800 text-sm pb-3 border-b border-gray-50 uppercase tracking-widest font-mono">
            Apology Order Breakdown
          </h4>

          <div className="space-y-3.5 text-xs font-bold">
            <div className="flex items-center justify-between text-gray-500">
              <span className="font-semibold">Subtotal</span>
              <span className="font-mono text-gray-800">LKR {cartSubtotal.toLocaleString()}</span>
            </div>
            
            <div className="flex items-center justify-between text-gray-500">
              <span className="font-semibold">Flat Shipping Delivery</span>
              <span className="font-mono text-gray-800">
                {cartShipping > 0 ? `LKR ${cartShipping.toLocaleString()}` : 'FREE (E-Gifts only)'}
              </span>
            </div>

            <div className="border-t border-gray-100 pt-3.5 flex items-center justify-between">
              <span className="font-display font-extrabold text-sm text-gray-800">Total Sum (LKR)</span>
              <span className="text-xl font-black text-brand-pink font-mono">
                LKR {cartGrandTotal.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={handleCheckoutNav}
              className="w-full py-4 bg-brand-pink hover:bg-brand-pink/95 text-white rounded-2xl text-xs font-black shadow-cute hover:shadow-pink-200 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={14} />
            </button>
            
            <Link
              to="/all-products"
              className="inline-block w-full text-center text-xs font-bold text-gray-400 hover:text-gray-600 transition-colors pt-4"
            >
              ← Choose More Presents
            </Link>
          </div>

          <div className="flex items-center gap-1.5 justify-center text-[10px] text-gray-400 font-semibold pt-1 border-t border-gray-50">
            <ShieldCheck size={14} className="text-brand-pink" />
            <span>Encrypted checkout. Handcrafted on demand.</span>
          </div>
        </div>

      </div>

    </div>
  );
};
