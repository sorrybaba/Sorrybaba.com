import React, { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Landmark, Wallet, PhoneCall, ArrowRight, ShieldCheck, ClipboardCheck } from 'lucide-react';
import { trackPageView, trackEvent, trackWhatsAppOrderSent, trackWhatsAppOrderMessageGenerated } from '../lib/analytics';

export const PaymentPage: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const order = state?.order || {
    fullName: "Sajith Kularatne",
    phone: "+94 776 826 937",
    whatsApp: "+94 776 826 937",
    address: "Apartment 4B, Galle Road",
    city: "Colombo 3",
    province: "Western",
    email: "sajith@gmail.com",
    giftMessage: "I am sorry, my love.",
    grandTotal: "LKR 4,850",
    paymentMethod: "bank",
    productsSummary: "- Cute Apology Teddy Bear + Custom Printed Card x 1"
  };

  useEffect(() => {
    trackPageView('/checkout/payment');
  }, []);

  const handleTransmitWhatsApp = () => {
    // Generate WhatsApp direct text
    const whatsAppMessageText = `CONFIRMED TRANSACTION - SorryBaba.com

Customer:
${order.fullName}

Phone:
${order.phone}

WhatsApp:
${order.whatsApp}

Address:
${order.address}, ${order.city}, ${order.province} (${order.email || 'N/A'})

Products:
${order.productsSummary}

Gift Message:
${order.giftMessage || 'N/A'}

Total:
${order.grandTotal}

Payment Method Selected:
${(order.paymentMethod || 'whatsapp').toUpperCase()}`;

    // Analytics hooks
    trackEvent('payment_method_selected', {
      payment_method: order.paymentMethod,
      order_total: order.grandTotal
    });
    trackWhatsAppOrderMessageGenerated(parseFloat(order.grandTotal.replace(/[^\d.]/g, '')) || 0, 1);
    trackWhatsAppOrderSent(parseFloat(order.grandTotal.replace(/[^\d.]/g, '')) || 0, 1, order.paymentMethod);
    trackEvent('order_completed', {
      payment_method: order.paymentMethod,
      revenue: parseFloat(order.grandTotal.replace(/[^\d.]/g, '')) || 0
    });

    const whatsAppEncodedUrl = `https://wa.me/94776826937?text=${encodeURIComponent(whatsAppMessageText)}`;
    
    // Open WhatsApp in new tab and push route safely
    window.open(whatsAppEncodedUrl, '_blank');
    navigate('/checkout/success');
  };

  return (
    <div className="max-w-2xl mx-auto py-4 font-sans selection:bg-brand-pink-soft selection:text-brand-pink text-gray-700">
      
      {/* Title */}
      <section className="text-center space-y-2 mb-8">
        <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-brand-pink bg-brand-pink-soft/20 px-3 py-1 rounded-full">
          Transaction Processing
        </span>
        <h1 className="font-display font-black text-2xl md:text-3xl text-gray-800 tracking-tight">
          Complete Your Apology Payment
        </h1>
        <p className="text-xs text-gray-400 font-semibold max-w-sm mx-auto">
          Please complete your transfer below, then click "Transmit Order Invoice" to send your details directly to our WhatsApp concierge.
        </p>
      </section>

      {/* Main card box */}
      <div className="bg-white border rounded-3xl p-6 md:p-8 space-y-6 shadow-xs">
        
        {/* Order review details mini segment */}
        <div className="p-4 bg-slate-50 border rounded-2xl space-y-2.5 text-xs font-semibold">
          <div className="flex justify-between items-center text-[10px] font-mono text-gray-400 uppercase font-bold">
            <span>Customer Invoice Recipient</span>
            <span className="text-brand-pink">Invoice #SB-{Math.floor(1000 + Math.random() * 9000)}</span>
          </div>
          <h4 className="text-gray-800 font-bold">{order.fullName}</h4>
          <p className="text-[11px] text-gray-500 font-medium leading-relaxed font-mono">
            {order.address}, {order.city} • {order.phone}
          </p>
          <div className="border-t pt-2.5 flex justify-between items-center bg-transparent mt-2">
            <span className="text-[11px] text-gray-500">Order Amount Due:</span>
            <span className="text-base font-mono font-black text-brand-pink">{order.grandTotal}</span>
          </div>
        </div>

        {/* Dynamic Payment methods text instructions */}
        {order.paymentMethod === 'bank' && (
          <div className="space-y-4 pt-2">
            <h3 className="font-display font-black text-sm text-gray-800 uppercase font-mono tracking-widest text-brand-purple flex items-center gap-1.5">
              <Landmark size={18} />
              <span>Commercial Bank Account transfer</span>
            </h3>
            <p className="text-xs text-gray-500 font-medium leading-relaxed">
              Please transfer your grand total amount directly into our official Commercial Bank Sri Lanka account. Note down or take a screenshot of your payment receipt as verification!
            </p>

            {/* Bank account credentials card box */}
            <div className="p-5 border border-purple-50 bg-purple-50/20 rounded-2xl space-y-3.5 text-xs font-semibold">
              <div className="grid grid-cols-2 gap-y-3">
                <div className="space-y-0.5">
                  <span className="text-[9px] uppercase font-mono text-gray-400 block font-bold">Bank Name</span>
                  <span className="text-gray-700 font-bold">Commercial Bank of Ceylon</span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[9px] uppercase font-mono text-gray-400 block font-bold">Branch Office</span>
                  <span className="text-gray-700 font-bold">Kollupitiya Branch, Colombo</span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[9px] uppercase font-mono text-gray-400 block font-bold">Account Number</span>
                  <span className="text-gray-800 font-bold font-mono">8011245902</span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[9px] uppercase font-mono text-gray-400 block font-bold">Account Holder</span>
                  <span className="text-gray-800 font-semibold font-serif">SorryBaba Gifting INC</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {order.paymentMethod === 'cod' && (
          <div className="space-y-4 pt-2">
            <h3 className="font-display font-black text-sm text-gray-800 uppercase font-mono tracking-widest text-brand-pink flex items-center gap-1.5">
              <Wallet size={18} />
              <span>Cash on Delivery (COD)</span>
            </h3>
            <p className="text-xs text-gray-500 font-medium leading-relaxed">
              Our courier team will collect the order invoice total when delivering the hand-wrapped physical package directly to your recipient doorsteps.
            </p>
            <div className="p-4 border rounded-2xl bg-slate-50/40 text-[11px] text-gray-400 font-semibold leading-relaxed">
              ⚠️ Note: Digital E-Gifts do not support COD. If physical reconciliation fails, our WhatsApp manager will request custom adjustments live.
            </div>
          </div>
        )}

        {order.paymentMethod === 'whatsapp' && (
          <div className="space-y-4 pt-2">
            <h3 className="font-display font-black text-sm text-gray-800 uppercase font-mono tracking-widest text-emerald-600 flex items-center gap-1.5">
              <PhoneCall size={18} />
              <span>WhatsApp Direct Checkout</span>
            </h3>
            <p className="text-xs text-gray-500 font-medium leading-relaxed">
              No direct payment is needed right now! Our support manager will manually check your card layout text, offer payment gateways, and start processing.
            </p>
          </div>
        )}

        {/* Action button bar */}
        <div className="pt-4 border-t border-gray-50 mt-4 space-y-3">
          <button
            onClick={handleTransmitWhatsApp}
            className="w-full py-4 bg-brand-pink hover:bg-brand-pink-soft/80 hover:text-brand-pink text-white font-extrabold text-xs rounded-2xl shadow-cute transition-style cursor-pointer text-center flex items-center justify-center gap-1.5 uppercase tracking-wide"
          >
            <span>Transmit Confirmed Invoice Over WhatsApp</span>
            <ArrowRight size={13} />
          </button>

          <Link
            to="/cart"
            className="text-[10px] text-gray-400 font-bold uppercase hover:underline text-center block"
          >
            Cancel and Return to Bag
          </Link>
        </div>

      </div>

      <div className="text-[10px] text-gray-400 font-semibold text-center flex items-center gap-1.5 justify-center mt-6">
        <ShieldCheck size={14} className="text-brand-pink shrink-0" />
        <span>Your connection is 100% private. SorryBaba encryption active.</span>
      </div>

    </div>
  );
};
