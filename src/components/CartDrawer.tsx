/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { X, Plus, Minus, Trash2, ArrowRight, ShieldCheck, ShoppingBag } from 'lucide-react';
import { trackEvent } from '../lib/analytics';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    toggleCartDrawer,
    updateCartQuantity,
    removeFromCart,
    cartSubtotal,
    cartTotalItems,
  } = useApp();
  const navigate = useNavigate();

  // Prevent background scrolling when cart drawer is active
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  const handleCheckoutNav = () => {
    trackEvent('begin_checkout', { source: 'cart_drawer', items_count: cartTotalItems, subtotal: cartSubtotal });
    toggleCartDrawer(false);
    navigate('/checkout');
  };

  const handleViewCartNav = () => {
    toggleCartDrawer(false);
    navigate('/cart');
  };

  // Helper inside the cart to render product visual summaries
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
    <div className="fixed inset-0 z-50 overflow-hidden" id="cart-drawer-overlay">
      {/* Background overlay backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={() => toggleCartDrawer(false)}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-cute flex flex-col h-full rounded-l-3xl overflow-hidden border-l border-brand-pink-soft/30">
          
          {/* Header area */}
          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-brand-bg">
            <div className="flex items-center gap-2">
              <span className="p-2 bg-brand-pink-soft/50 text-brand-pink rounded-xl"><ShoppingBag size={18} /></span>
              <h2 className="font-display font-bold text-gray-800 text-lg">Your Greeting Bag</h2>
              <span className="text-xs bg-brand-pink text-white font-bold h-5 px-1.5 rounded-full flex items-center justify-center">
                {cartTotalItems}
              </span>
            </div>
            <button
              onClick={() => toggleCartDrawer(false)}
              className="p-1 px-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors focus:none outline-none cursor-pointer text-xs font-semibold"
            >
              Close
            </button>
          </div>

          {/* Cart Content items lists */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                <div className="text-5xl animate-bounce">🧸</div>
                <div className="space-y-1">
                  <h3 className="font-display font-extrabold text-gray-800 text-base">Your Bag is Empty!</h3>
                  <p className="text-xs text-gray-400 max-w-[240px] leading-relaxed mx-auto">
                    Take a look around at our cute physical and digital e-gifts & tell them sorry!
                  </p>
                </div>
                <button
                  onClick={() => toggleCartDrawer(false)}
                  className="px-6 py-2.5 bg-brand-pink text-white rounded-2xl text-xs font-bold shadow-cute hover:bg-brand-pink/95 transition-all text-center cursor-pointer"
                >
                  Start Exploring
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-center gap-4 py-3 border-b border-gray-50 last:border-0 relative group"
                >
                  {/* Miniature cute representation */}
                  <div className="w-16 h-16 rounded-2xl bg-brand-bg border border-brand-pink-soft/20 flex items-center justify-center text-3xl font-normal text-center select-none shadow-sm shrink-0">
                    {renderProductSymbol(item.product.image)}
                  </div>

                  {/* Title and details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-display font-bold text-sm text-gray-800 truncate leading-tight">
                      {item.product.name}
                    </h4>
                    <p className="text-[10px] text-brand-pink font-semibold mt-1 inline-flex items-center gap-1">
                      {item.product.isEGift ? '⚡ Instant E-Gift Delivery' : '🚗 Physical Package Delivery'}
                    </p>
                    
                    {/* Live item quantity modifiers */}
                    <div className="flex items-center justify-between mt-2.5">
                      <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50/50">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-1 text-gray-400 hover:text-brand-pink transition-colors cursor-pointer text-xs"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-2 text-xs font-bold text-gray-700 font-mono">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-1 text-gray-400 hover:text-brand-pink transition-colors cursor-pointer text-xs"
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      {/* Line Subtotal */}
                      <span className="text-xs font-bold text-gray-800 font-mono">
                        LKR {(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="absolute top-2 right-0 p-1.5 text-gray-300 hover:text-red-500 rounded-lg hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                    aria-label="Delete item option"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer controls */}
          {cart.length > 0 && (
            <div className="px-6 py-6 border-t border-gray-100 bg-gray-50/50 space-y-4">
              {/* Pricing overview */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-gray-500">
                  <span>Bag Subtotal</span>
                  <span className="font-mono text-gray-700 font-bold">LKR {cartSubtotal.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-xs font-semibold text-gray-500">
                  <span>Estimated Delivery</span>
                  <span className="font-mono text-green-500 font-medium">
                    {cart.some(item => !item.product.isEGift) ? 'Flat LKR 350 (Paid at Checkout)' : 'FREE Instant Dispatch'}
                  </span>
                </div>
                
                {/* Total */}
                <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
                  <span className="font-display font-extrabold text-sm text-gray-800">Total Sum</span>
                  <span className="text-lg font-black text-brand-pink font-mono">
                    LKR {cartSubtotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Navigation paths */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={handleCheckoutNav}
                  className="w-full py-3 px-4 bg-brand-pink text-white rounded-2xl text-xs font-extrabold shadow-cute hover:bg-brand-pink/95 transition-all flex items-center justify-center gap-1.5 cursor-pointer hover:shadow-cute-hover"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight size={14} />
                </button>
                
                <div className="grid grid-cols-2 gap-2 text-center text-xs font-bold pt-1">
                  <button
                    onClick={handleViewCartNav}
                    className="py-2.5 px-3 border border-gray-200 bg-white text-gray-600 rounded-xl hover:bg-gray-100 hover:text-gray-800 transition-all cursor-pointer"
                  >
                    View Full Cart
                  </button>
                  <button
                    onClick={() => toggleCartDrawer(false)}
                    className="py-2.5 px-3 border border-brand-pink-soft text-brand-pink bg-brand-pink-soft/10 rounded-xl hover:bg-brand-pink-soft/30 transition-all cursor-pointer"
                  >
                    Keep Shopping
                  </button>
                </div>
              </div>

              {/* Safety notice info */}
              <div className="flex items-center gap-1.5 justify-center text-[10px] text-gray-400 pt-1">
                <ShieldCheck size={12} className="text-brand-pink" />
                <span>Secure checkouts, 100% emotional satisfaction.</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
