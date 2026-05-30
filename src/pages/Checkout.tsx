/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Wallet, Landmark, PhoneCall, ShieldCheck, ArrowRight, ClipboardList } from 'lucide-react';
import {
  trackPageView,
  trackBeginCheckout,
  trackCheckoutStep1,
  trackCheckoutStep2,
  trackCheckoutReview,
  trackCheckoutSubmit,
  trackPaymentMethodCodSelected,
  trackPaymentMethodBankTransferSelected,
  trackPaymentMethodWhatsAppSelected,
  trackWhatsAppOrderStarted
} from '../lib/analytics';

export const Checkout: React.FC = () => {
  const { cart, cartSubtotal, cartShipping, cartGrandTotal, clearCart } = useApp();
  const navigate = useNavigate();

  // Form states matching specifications
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsApp, setWhatsApp] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('Western');
  const [giftMessage, setGiftMessage] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bank' | 'whatsapp'>('whatsapp');

  useEffect(() => {
    trackPageView('/checkout');
    if (cart.length === 0) {
      navigate('/cart');
    } else {
      trackBeginCheckout(cartGrandTotal, cart.length);
      trackCheckoutStep1(cartGrandTotal, cart.length);
    }
  }, [cart, navigate]);

  // Track payment method selection change
  useEffect(() => {
    if (cart.length > 0) {
      if (paymentMethod === 'cod') {
        trackPaymentMethodCodSelected(cartGrandTotal, cart.length);
      } else if (paymentMethod === 'bank') {
        trackPaymentMethodBankTransferSelected(cartGrandTotal, cart.length);
      } else if (paymentMethod === 'whatsapp') {
        trackPaymentMethodWhatsAppSelected(cartGrandTotal, cart.length);
      }
      trackCheckoutReview(city, paymentMethod, cartGrandTotal, cart.length);
    }
  }, [paymentMethod]);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    // Check basic details constraints
    if (!fullName || !phone || !whatsApp || !address) {
      alert('Please fill out all mandatory fields (Name, Phone, WhatsApp, and Address) to place your order.');
      return;
    }

    // Capture date matching specifications
    const formattedDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    // Match products text summary string
    const productsSummaryList = cart
      .map((item) => {
        const customSpecs = item.product.specifications
          .filter((s) => ['Recipient Name', 'Sender Name'].includes(s.name))
          .map((s) => `(${s.name}: ${s.value})`)
          .join(' ');
        return `- ${item.product.name} x ${item.quantity} [LKR ${(item.product.price * item.quantity).toLocaleString()}] ${customSpecs}`;
      })
      .join('\n');

    // Craft WhatsApp direct formatted text matching specifications
    const whatsAppMessageText = `NEW ORDER - SorryBaba.com

Customer:
${fullName}

Phone:
${phone}

WhatsApp:
${whatsApp}

Address:
${address}, ${city}, ${province} (Email: ${email || 'N/A'})

Products:
${productsSummaryList}

Gift Message:
${giftMessage || 'N/A'}

Total:
LKR ${cartGrandTotal.toLocaleString()}

Date:
${formattedDate}

Special Notes:
${specialNotes || 'None'}

Payment Preferred:
${paymentMethod.toUpperCase()}`;

    // Track checkout submission
    trackCheckoutSubmit(city || 'General', paymentMethod, cartGrandTotal, cart.length);
    trackWhatsAppOrderStarted(cartGrandTotal, cart.length, paymentMethod);

    // Formulate final URL block
    const whatsAppEncodedUrl = `https://wa.me/94776826937?text=${encodeURIComponent(whatsAppMessageText)}`;

    // Clear cart context to reset variables
    clearCart();

    // Trigger open and navigate inside browser frames
    window.open(whatsAppEncodedUrl, '_blank');
    navigate('/success');
  };

  return (
    <div className="space-y-8">
      
      {/* Checkout Title header */}
      <div className="space-y-1">
        <h1 className="font-display font-black text-2xl md:text-3xl text-gray-800 tracking-tight flex items-center gap-2">
          <span>Finalize Reconnection Request</span>
        </h1>
        <p className="text-xs text-gray-400 font-medium leading-relaxed">
          Fill out delivery and personalized letters. Submitted orders are coordinated directly on WhatsApp instantly to ensure 100% manual validation.
        </p>
      </div>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Forms layout (8 columns) */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 md:p-8 border border-gray-150 space-y-6">
          <h3 className="font-display font-bold text-gray-800 text-sm pb-3 border-b border-gray-50 flex items-center gap-1.5 uppercase font-mono tracking-widest text-brand-pink">
            <ClipboardList size={16} />
            <span>Shipping & Recipient details</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs font-semibold">
            {/* Full name input */}
            <div className="space-y-1.5ClassName">
              <span className="text-gray-500 font-serif">Customer Full Name *</span>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Sajith Kularatne"
                className="w-full text-xs font-semibold text-gray-700 placeholder-gray-400 bg-gray-50 border border-gray-200 focus:outline-none focus:border-brand-pink rounded-xl px-4 py-3"
              />
            </div>

            {/* Email input */}
            <div className="space-y-1.5ClassName">
              <span className="text-gray-500 font-serif">Email Address *</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. sajith.k@gmail.com"
                className="w-full text-xs font-semibold text-gray-700 placeholder-gray-400 bg-gray-50 border border-gray-200 focus:outline-none focus:border-brand-pink rounded-xl px-4 py-3"
              />
            </div>

            {/* Phone Number input */}
            <div className="space-y-1.5ClassName">
              <span className="text-gray-500 font-serif">Active Phone Number *</span>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. +94771234567"
                className="w-full text-xs font-semibold text-gray-700 placeholder-gray-400 bg-gray-50 border border-gray-200 focus:outline-none focus:border-brand-pink rounded-xl px-4 py-3"
              />
            </div>

            {/* WhatsApp input */}
            <div className="space-y-1.5ClassName">
              <span className="text-gray-500 font-serif">Active WhatsApp Number *</span>
              <input
                type="tel"
                required
                value={whatsApp}
                onChange={(e) => setWhatsApp(e.target.value)}
                placeholder="e.g. +94776826937"
                className="w-full text-xs font-semibold text-gray-700 placeholder-gray-400 bg-gray-50 border border-gray-200 focus:outline-none focus:border-brand-pink rounded-xl px-4 py-3"
              />
            </div>
          </div>

          <div className="space-y-5 text-xs font-semibold">
            {/* Address input */}
            <div className="space-y-1.5ClassName">
              <span className="text-gray-500 font-serif">Postal Home Address *</span>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Apartment/Street, Galle Road"
                className="w-full text-xs font-semibold text-gray-700 placeholder-gray-400 bg-gray-50 border border-gray-200 focus:outline-none focus:border-brand-pink rounded-xl px-4 py-3"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* City input */}
              <div className="space-y-1.5ClassName">
                <span className="text-gray-500 font-serif">City *</span>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  onBlur={() => trackCheckoutStep2(city, cartGrandTotal, cart.length)}
                  placeholder="e.g. Colombo / Kandy"
                  className="w-full text-xs font-semibold text-gray-700 placeholder-gray-400 bg-gray-50 border border-gray-200 focus:outline-none focus:border-brand-pink rounded-xl px-4 py-3"
                />
              </div>

              {/* Province dropdown select */}
              <div className="space-y-1.5ClassName">
                <span className="text-gray-500 font-serif">Province *</span>
                <select
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  className="w-full text-xs font-semibold text-gray-700 bg-gray-50 border border-gray-200 focus:outline-none focus:border-brand-pink rounded-xl px-4 py-3 appearance-none cursor-pointer"
                >
                  <option value="Western">Western Province</option>
                  <option value="Central">Central Province</option>
                  <option value="Southern">Southern Province</option>
                  <option value="Northern">Northern Province</option>
                  <option value="Eastern">Eastern Province</option>
                  <option value="North West">North Western Province</option>
                  <option value="North Central">North Central Province</option>
                  <option value="Uva">Uva Province</option>
                  <option value="Sabaragamuwa">Sabaragamuwa Province</option>
                </select>
              </div>
            </div>

            {/* Personalized greeting note scroll text */}
            <div className="space-y-1.5ClassName pt-2">
              <span className="text-brand-pink font-extrabold flex items-center gap-1">
                <span>💌 Personalized Apology Card Letter / Gift Message *</span>
              </span>
              <textarea
                required
                value={giftMessage}
                onChange={(e) => setGiftMessage(e.target.value)}
                placeholder="My darling, I am sorry. I hope this cute gift reminds you how much I adore you..."
                rows={4}
                className="w-full text-xs font-medium leading-relaxed text-gray-700 placeholder-gray-400 bg-gray-50 border border-gray-200 focus:outline-none focus:border-brand-pink rounded-xl px-4 py-3 resize-none"
              />
            </div>

            {/* Special notes */}
            <div className="space-y-1.5ClassName">
              <span className="text-gray-500 font-serif">Special courier notes / Custom timings requests</span>
              <textarea
                value={specialNotes}
                onChange={(e) => setSpecialNotes(e.target.value)}
                placeholder="e.g. Please deliver after 5:00 PM if physical."
                rows={2}
                className="w-full text-xs font-medium leading-relaxed text-gray-700 placeholder-gray-400 bg-gray-50 border border-gray-200 focus:outline-none focus:border-brand-pink rounded-xl px-4 py-3 resize-none"
              />
            </div>
          </div>

        </div>

        {/* Payment and live order summary sidebar (4 columns) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Order items review card */}
          <div className="bg-white rounded-3xl p-6 border border-gray-150 space-y-4">
            <h4 className="font-display font-extrabold text-gray-800 text-sm pb-3 border-b border-gray-50 uppercase tracking-widest font-mono">
              Review Bag Sum
            </h4>
            
            <div className="space-y-3.5 max-h-[160px] overflow-y-auto">
              {cart.map((item) => (
                <div key={item.product.id} className="flex justify-between items-center text-xs text-gray-500 gap-1 font-semibold">
                  <span className="truncate flex-1 pr-2">{item.product.name} x {item.quantity}</span>
                  <span className="font-mono text-gray-800 shrink-0">LKR {(item.product.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-3.5 space-y-2 text-xs font-bold">
              <div className="flex items-center justify-between text-gray-500">
                <span>Shipping fee</span>
                <span className="font-mono text-gray-800">
                  {cartShipping > 0 ? `LKR ${cartShipping.toLocaleString()}` : 'FREE (E-Gifts only)'}
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-gray-50 pt-2 text-sm text-gray-800">
                <span>Grand Total</span>
                <span className="text-base font-black text-brand-pink font-mono">
                  LKR {cartGrandTotal.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Method Selector section */}
          <div className="bg-white rounded-3xl p-6 border border-gray-150 space-y-4">
            <h4 className="font-display font-extrabold text-gray-800 text-sm pb-2 border-b border-gray-50 uppercase tracking-widest font-mono">
              Select Payment Method
            </h4>

            {/* Methods options */}
            <div className="space-y-2 text-xs font-semibold">
              <label className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                paymentMethod === 'whatsapp' ? 'border-brand-pink bg-brand-pink-soft/10 text-brand-pink' : 'border-gray-100 hover:bg-gray-50 text-gray-600'
              }`}>
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'whatsapp'}
                    onChange={() => setPaymentMethod('whatsapp')}
                    className="accent-brand-pink"
                  />
                  <span>Submit order via WhatsApp</span>
                </div>
                <PhoneCall size={15} />
              </label>

              <label className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                paymentMethod === 'cod' ? 'border-brand-pink bg-brand-pink-soft/10 text-brand-pink' : 'border-gray-100 hover:bg-gray-50 text-gray-600'
              }`}>
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="accent-brand-pink"
                  />
                  <span>Cash on Delivery</span>
                </div>
                <Wallet size={15} />
              </label>

              <label className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                paymentMethod === 'bank' ? 'border-brand-pink bg-brand-pink-soft/10 text-brand-pink' : 'border-gray-110 hover:bg-gray-50 text-gray-600'
              }`}>
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'bank'}
                    onChange={() => setPaymentMethod('bank')}
                    className="accent-brand-pink"
                  />
                  <span>Bank Capital Transfer</span>
                </div>
                <Landmark size={15} />
              </label>
            </div>

            {/* Primary Submit trigger */}
            <button
              type="submit"
              className="w-full py-4 bg-brand-pink text-white font-extrabold text-xs rounded-2xl shadow-cute hover:bg-brand-pink/95 transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer mt-4"
            >
              <span>Submit Apology Order</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="text-[10px] text-gray-400 font-semibold text-center flex items-center gap-1.5 justify-center">
            <ShieldCheck size={14} className="text-brand-pink shrink-0" />
            <span>Secure Checkout coordinated over WhatsApp.</span>
          </div>

        </div>

      </form>

    </div>
  );
};
