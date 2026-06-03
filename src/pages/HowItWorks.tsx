import React, { useEffect } from 'react';
import { Gift, FileText, ArrowRight, RefreshCw, Send, CheckCircle2 } from 'lucide-react';
import { trackPageView } from '../lib/analytics';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

export const HowItWorks: React.FC = () => {
  useEffect(() => {
    trackPageView('/how-it-works');
  }, []);

  const steps = [
    {
      num: '01',
      title: 'Select Your Apology Vibe',
      icon: <Gift className="text-brand-pink" size={24} />,
      desc: 'Browse our specialized catalog and select either an Instant Digital E-Gift (Delivered via WhatsApp / Email under 30 mins) or a stunning Physical Present (Apology plushes, custom glowing LED memory blocks, velvet rose boxes).',
    },
    {
      num: '02',
      title: 'Personalize Your Apology Note',
      icon: <FileText className="text-brand-purple" size={24} />,
      desc: 'Fill out your recipient’s name and write your sincere apology card letter onto our checkout forms. For digital gifts, you can also select active soundtrack backing and slide photo parameters.',
    },
    {
      num: '03',
      title: 'Direct WhatsApp Concierge Check',
      icon: <RefreshCw className="text-brand-blue" size={24} />,
      desc: 'As soon as you checkout, we format your exact order parameters and open our WhatsApp support link instantly. You double-check text formatting, make easy bank transfer / COD payments, and customize elements live.',
    },
    {
      num: '04',
      title: 'Sincere & Hand-Wrapped Delivery',
      icon: <Send className="text-emerald-500" size={24} />,
      desc: 'Our delivery team sends out beautiful scented boxes packed with premium wrapping tissue across Sri Lanka provinces. Digital links are securely generated and hosted on a private URL to melt heartaches instantly.',
    },
  ];

  return (
    <div className="space-y-16 py-4 md:py-8 font-sans selection:bg-brand-pink-soft selection:text-brand-pink">
      <SEO 
        title="How It Works | SorryBaba.com - Interactive Reconciliation Flow" 
        description="Understand our seamless apology fulfillment system. Send instant digital e-gifts, premium custom physical keepsakes, and personalized messages designed specifically to ask for forgiveness." 
      />
      {/* Decorative Title Header */}
      <section className="text-center max-w-xl mx-auto space-y-4">
        <span className="text-[10px] font-mono font-bold tracking-widest text-[#FF1A75] uppercase bg-brand-pink-soft/20 px-3 py-1 rounded-full">
          Step-by-Step Overview
        </span>
        <h1 className="font-display font-black text-3xl md:text-5xl text-gray-800 tracking-tight leading-tight">
          How SorryBaba <span className="text-brand-pink">Works</span>
        </h1>
        <p className="text-xs md:text-sm text-gray-500 font-medium leading-relaxed">
          Saying sorry can feel stressful, but our systematic reconciliation flow keeps everything beautifully coordinated, private, and exceptionally premium.
        </p>
      </section>

      {/* Visual Timeline Cards list */}
      <section className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 relative">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="group bg-white p-6 md:p-8 rounded-3xl border border-gray-150 relative space-y-4 shadow-xs hover:border-brand-pink-soft hover:shadow-cute transition-all duration-350"
          >
            <div className="flex justify-between items-start">
              <div className="p-3 bg-brand-bg rounded-2xl group-hover:bg-brand-pink-soft/10 transition-colors">
                {step.icon}
              </div>
              <span className="font-mono font-black text-4xl md:text-5xl text-gray-100 select-none group-hover:text-brand-pink-soft/20 transition-colors">
                {step.num}
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="font-display font-extrabold text-[#1E293B] text-base group-hover:text-brand-pink transition-colors">
                {step.title}
              </h3>
              <p className="text-xs text-gray-500 font-medium leading-relaxed font-sans">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* Frequently Asked Callout summary */}
      <section className="bg-gradient-to-br from-indigo-50/50 to-[#FFF0F6]/50 border border-brand-pink-soft/10 rounded-3xl p-8 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="font-display font-bold text-gray-800 text-sm flex items-center gap-2 justify-center md:justify-start">
            <CheckCircle2 size={16} className="text-brand-pink" />
            <span>Ready to Say Sorry the Sweet Way?</span>
          </h3>
          <p className="text-[11px] text-gray-500 font-medium leading-relaxed max-w-md">
            All custom designs are verified and overseen manually by a relationship-care specialist to make sure your present looks flawless and melts heartaches safely.
          </p>
        </div>
        <Link
          to="/products"
          className="px-6 py-3 bg-brand-pink hover:bg-brand-pink-soft/90 hover:text-brand-pink text-white font-extrabold text-xs rounded-xl shadow-cute transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5"
        >
          <span>Find the perfect Gift</span>
          <ArrowRight size={13} />
        </Link>
      </section>
    </div>
  );
};
