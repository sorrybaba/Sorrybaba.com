import React, { useEffect } from 'react';
import { RefreshCcw, Landmark, Truck, ShieldCheck } from 'lucide-react';
import { trackPageView } from '../lib/analytics';
import { SEO } from '../components/SEO';

export const RefundPolicy: React.FC = () => {
  useEffect(() => {
    trackPageView('/legal/refund-policy');
  }, []);

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16 font-sans selection:bg-brand-pink-soft selection:text-brand-pink">
      <SEO 
        title="Refund & Cancellation Policy | SorryBaba.com" 
        description="Learn about our fair refund terms, cancellation rules under custom schedules, physical delivery adjustments, and quality assurance guidelines." 
      />
      
      {/* Title */}
      <div className="text-center space-y-2">
        <h1 className="font-display font-black text-2xl md:text-3xl text-gray-800 tracking-tight flex items-center justify-center gap-2">
          <RefreshCcw className="text-brand-pink" size={24} />
          <span>Refund & Cancellation Policy</span>
        </h1>
        <p className="text-xs text-gray-400 font-mono">Last updated: May 30, 2026</p>
      </div>

      <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-150 space-y-6 text-xs text-gray-600 leading-relaxed font-semibold">
        
        <p>
          At <strong>SorryBaba.com</strong>, we hold relationship reconciliation close to our hearts. We want your gesture of sincere apology to feel absolutely flawless. Because of the custom personalized nature of relationship presents, we maintain clear, fair guidelines regarding refunds and order adjustments.
        </p>

        {/* Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 bg-brand-bg rounded-2xl border border-brand-pink-soft/10 text-center space-y-2">
            <div className="mx-auto w-8 h-8 rounded-full bg-white flex items-center justify-center text-brand-pink shadow-xs">
              <Landmark size={16} />
            </div>
            <h4 className="text-gray-800 font-display font-bold text-xs">Easy Adjustments</h4>
            <p className="text-[10px] text-gray-400 mt-0.5 leading-normal">Change text errors or details freely over our WhatsApp concierge before shipout.</p>
          </div>

          <div className="p-4 bg-brand-bg rounded-2xl border border-brand-pink-soft/10 text-center space-y-2">
            <div className="mx-auto w-8 h-8 rounded-full bg-white flex items-center justify-center text-brand-pink shadow-xs">
              <RefreshCcw size={16} />
            </div>
            <h4 className="text-gray-800 font-display font-bold text-xs">Digital Redesigns</h4>
            <p className="text-[10px] text-gray-400 mt-0.5 leading-normal">If a digital card has spelling errors, we redesign and resend in under 15 mins.</p>
          </div>

          <div className="p-4 bg-brand-bg rounded-2xl border border-brand-pink-soft/10 text-center space-y-2">
            <div className="mx-auto w-8 h-8 rounded-full bg-white flex items-center justify-center text-brand-pink shadow-xs">
              <Truck size={16} />
            </div>
            <h4 className="text-gray-800 font-display font-bold text-xs">Courier Damage</h4>
            <p className="text-[10px] text-gray-400 mt-0.5 leading-normal">If physical packages get damaged during courier transport, we reship free.</p>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-gray-50">
          <h3 className="font-display font-bold text-sm text-gray-800 uppercase tracking-widest font-mono">1. Custom Physical Products</h3>
          <p>
            Any physical products that undergo personalized engraving (such as Glowing Couple Photo Blocks) or specific embroidery are crafted exclusively for your order. We do not accept standard returns for customized products. However, if the wood base or acrylic slab reaches you with scratching or layout defects, we will dispatch a replacement block immediately.
          </p>

          <h3 className="font-display font-bold text-sm text-gray-800 uppercase tracking-widest font-mono">2. Electronic Digital E-Gifts</h3>
          <p>
            For digital e-cards, virtual flower bouquets, and digital memory love letters, we initiate manual design work as soon as your checkout completes. Due to the rapid creation process (deliveries within 30 minutes), digital order cancellations are only supported before layout work commences. If any spelling, names, or image links are incorrect, our designer edits them live to ensure your partner reads an immaculate message.
          </p>

          <h3 className="font-display font-bold text-sm text-gray-800 uppercase tracking-widest font-mono">3. Cancellations & Timeline Change</h3>
          <p>
            If you wish to change a courier delivery date or hold a shipment, please alert our WhatsApp coordinator at +94 776 826 937. As long as your present box has not departed our dispatch center in Colombo, we can adjust addresses, delay shipout timelines, or cancel physical products for a full bank-refund.
          </p>

          <h3 className="font-display font-bold text-sm text-gray-800 uppercase tracking-widest font-mono">4. Relationship Outcome Disclaimer</h3>
          <p>
            While our packages are carefully designed based on emotional psychological principles to restore communication, SorryBaba.com cannot guarantee specific romantic outcomes or active forgiveness after delivery. We do not provide refunds or returns due to negative or indifferent relationship reconciliations.
          </p>
        </div>

      </div>

    </div>
  );
};
