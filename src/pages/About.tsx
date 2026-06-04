import React, { useEffect } from 'react';
import { Heart, Sparkles, ShieldCheck, Award, MessageCircle, ArrowRight } from 'lucide-react';
import { trackPageView } from '../lib/analytics';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

export const About: React.FC = () => {
  useEffect(() => {
    trackPageView('/about');
  }, []);

  return (
    <div className="space-y-16 py-4 md:py-8 font-sans selection:bg-brand-pink-soft selection:text-brand-pink">
      <SEO 
        title="About Us | SorryBaba.com - Our Journey in Mending Relationships" 
        description="Discover the story behind SorryBaba. We are on a mission to restore connections, bridge silences, and help couples express heartfelt regret through thoughtful presents and apology cards." 
      />
      {/* Decorative Hero Section */}
      <section className="text-center max-w-2xl mx-auto space-y-4">
        <span className="text-[10px] font-mono font-bold tracking-widest text-brand-pink uppercase bg-brand-pink-soft/20 px-3 py-1 rounded-full">
          Our Story
        </span>
        <h1 className="font-display font-black text-3xl md:text-5xl text-gray-800 tracking-tight leading-tight">
          Restoring Connections, <br />
          <span className="text-brand-pink">One Sweet Apology At A Time</span>
        </h1>
        <p className="text-xs md:text-sm text-gray-500 font-medium leading-relaxed max-w-lg mx-auto">
          SorryBaba is a romantic reconciliation and gift platform designed to melt heartaches, dissolve marital silences, and help partners express profound regret through exquisite curated gifts and interactive custom digital surprises.
        </p>
      </section>

      {/* Grid: Conceptual Values */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
        <div className="space-y-6">
          <h2 className="font-display font-extrabold text-2xl text-gray-800 tracking-tight">
            Why SorryBaba?
          </h2>
          <p className="text-xs text-gray-500 font-medium leading-relaxed">
            Conflicts are natural in any relationship, but the way we reconcile matters. Often, words alone fail to convey the depth of our remorse. That is why we built SorryBaba—to deliver hand-wrapped sincerity directly to your loved one's doorstep.
          </p>
          <p className="text-xs text-gray-500 font-medium leading-relaxed">
            From luxury wax-sealed apology scrolls and custom glowing memory frames to interactive apology websites with custom music, we ensure every element of your gesture is crafted with heart and psychological precision.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-white border border-gray-100 rounded-2xl space-y-1.5 shadow-xs">
              <ShieldCheck className="text-brand-pink" size={18} />
              <h4 className="font-bold text-xs text-gray-800">100% Secure</h4>
              <p className="text-[10px] text-gray-400 font-medium">Private messages are kept fully encrypted.</p>
            </div>
            <div className="p-4 bg-white border border-gray-100 rounded-2xl space-y-1.5 shadow-xs">
              <Sparkles className="text-brand-purple" size={18} />
              <h4 className="font-bold text-xs text-gray-800">Personalized</h4>
              <p className="text-[10px] text-gray-400 font-medium">Every card is designed dynamically for you.</p>
            </div>
          </div>
        </div>

        {/* Visual Showcase Card */}
        <div className="bg-gradient-to-tr from-rose-50 to-indigo-50 border border-brand-pink-soft/10 p-8 rounded-3xl text-center space-y-6 relative overflow-hidden flex flex-col justify-center items-center h-80 min-h-[320px]">
          <span className="text-6xl animate-pulse">💝</span>
          <div className="space-y-1 max-w-xs">
            <h3 className="font-display font-black text-gray-800 text-sm">
              Scented Signature Present Boxes
            </h3>
            <p className="text-[10px] text-gray-500 font-semibold leading-relaxed">
              Every physical apology gift lands in a vanilla-scented pink box layered with premium silk wraps, hand-signed envelopes, and beautiful custom ribbon ties.
            </p>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-[10px] text-brand-pink font-extrabold uppercase tracking-wider hover:underline"
          >
            <span>Explore catalog</span>
            <ArrowRight size={12} />
          </Link>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-white border border-gray-100 rounded-3xl p-8 max-w-5xl mx-auto space-y-6">
        <div className="text-center">
          <h3 className="font-display font-extrabold text-sm text-gray-800 tracking-wider uppercase font-mono">Our Quality Commitments</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="space-y-2 flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-brand-pink-soft/30 text-brand-pink flex items-center justify-center">
              <Heart size={18} />
            </div>
            <h4 className="font-bold text-xs text-gray-800">Designed with Emotion</h4>
            <p className="text-[10px] text-gray-400 font-medium max-w-[200px]">Colors and layouts centered strictly around empathy and psychological relief.</p>
          </div>
          <div className="space-y-2 flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-brand-blue-soft text-brand-blue flex items-center justify-center">
              <Award size={18} />
            </div>
            <h4 className="font-bold text-xs text-gray-800">Concierge Verification</h4>
            <p className="text-[10px] text-gray-400 font-medium max-w-[200px]">Our dedicated 24/7 team reviews spelling and custom graphics for a premium result.</p>
          </div>
          <div className="space-y-2 flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-green-50 text-emerald-600 flex items-center justify-center">
              <MessageCircle size={18} />
            </div>
            <h4 className="font-bold text-xs text-gray-800">WhatsApp Coordination</h4>
            <p className="text-[10px] text-gray-400 font-medium max-w-[200px]">Instant chat updates to adjust customized gift parameters before shipout.</p>
          </div>
        </div>
      </section>
    </div>
  );
};
