import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Mail, Gift, ArrowRight, Share2, Sparkles, Send, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { SEO } from '../components/SEO';
import { trackPageView, trackEvent } from '../lib/analytics';

export const MarketingPages: React.FC = () => {
  const { pathname } = useLocation();
  const [emailInput, setEmailInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Identify active page context
  let pageCtx = 'waitlist';
  if (pathname.includes('/launch-notification')) pageCtx = 'launch';
  else if (pathname.includes('/special-offers')) pageCtx = 'offers';
  else if (pathname.includes('/referral-program')) pageCtx = 'referral';

  useEffect(() => {
    trackPageView(pathname);
    // Reset submission states when switching paths
    setFormSubmitted(false);
    setEmailInput('');
    setNameInput('');
  }, [pathname]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setFormSubmitted(true);

      // Track analytics events correctly
      trackEvent('form_submission', {
        marketing_context: pageCtx,
        email: emailInput,
        name: nameInput
      });

      if (pageCtx === 'waitlist') {
        trackEvent('waitlist_signup', { email: emailInput, name: nameInput });
      }
    }, 850);
  };

  let seoTitle = "Join Waiting List | SorryBaba.com";
  let seoDescription = "Secure your early access privileges, free delivery coupons, and custom romantic guides.";

  if (pageCtx === 'launch') {
    seoTitle = "Launch Notification Registry | SorryBaba.com";
    seoDescription = "Sign up to receive instant alerts and exclusive promotional discount packages when SorryBaba begins active dispatches.";
  } else if (pageCtx === 'offers') {
    seoTitle = "Exclusive Relationship Guides & Special Offers | SorryBaba.com";
    seoDescription = "Claim custom coupons, seasonal relationship mending blueprints, and premium secret guides.";
  } else if (pageCtx === 'referral') {
    seoTitle = "SorryBaba Referral Program | Invite & Earn Discovers";
    seoDescription = "Spread the harmony! Share SorryBaba with your friends, mending relationships together, and unlock complimentary surprise frames.";
  }

  return (
    <div className="max-w-xl mx-auto py-8 font-sans selection:bg-brand-pink-soft selection:text-brand-pink">
      <SEO title={seoTitle} description={seoDescription} />
      
      {/* 1. MARKETING CONTEXT: WAITLIST */}
      {pageCtx === 'waitlist' && (
        <div className="bg-white rounded-3xl p-6 md:p-10 border border-gray-150 space-y-6 shadow-xs text-center">
          <span className="text-5xl select-none">🎈</span>
          <div className="space-y-2">
            <h1 className="font-display font-black text-2xl md:text-3xl text-gray-800 tracking-tight leading-none">
              Join the SorryBaba Waitlist
            </h1>
            <p className="text-xs text-gray-400 font-semibold leading-relaxed">
              We are expanding our physical courier network. Enter your email to secure early access privileges, free delivery coupons, and custom romantic guides.
            </p>
          </div>

          {!formSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs text-left">
              <div className="space-y-1.5ClassName">
                <label className="text-[10px] font-mono text-gray-400 font-bold uppercase tracking-wider block">Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Sajith Kularatne"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="w-full bg-slate-50 border p-3 rounded-xl text-gray-800 outline-none focus:border-brand-pink transition-all font-semibold"
                />
              </div>

              <div className="space-y-1.5ClassName">
                <label className="text-[10px] font-mono text-gray-400 font-bold uppercase tracking-wider block">Email Address</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <Mail size={15} />
                  </span>
                  <input
                    type="email"
                    required
                    placeholder="sajith@gmail.com"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="w-full bg-slate-50 border p-3 pl-10 rounded-xl text-gray-800 outline-none focus:border-brand-pink transition-all font-semibold"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-brand-pink hover:bg-brand-pink-soft/90 hover:text-brand-pink text-white text-xs font-black rounded-xl shadow-cute transition-all cursor-pointer text-center flex items-center justify-center gap-1.5 uppercase tracking-wide"
              >
                {loading ? 'Securing Spot...' : 'Secure My Priority Waitlist Spot'}
                <Sparkles size={13} />
              </button>
            </form>
          ) : (
            <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100 text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-emerald-500 mx-auto shadow-xs">
                <CheckCircle2 size={20} />
              </div>
              <h3 className="font-display font-black text-emerald-800 text-sm">Welcome to SorryBaba Family!</h3>
              <p className="text-[10px] text-emerald-600 font-medium leading-relaxed max-w-xs mx-auto">
                Thank you, your waitlist priority number has been secured. We have sent a confirmation details link to <strong>{emailInput}</strong>.
              </p>
            </div>
          )}
        </div>
      )}

      {/* 2. MARKETING CONTEXT: LAUNCH NOTIFICATION */}
      {pageCtx === 'launch' && (
        <div className="bg-white rounded-3xl p-6 md:p-10 border border-gray-150 space-y-6 shadow-xs text-center">
          <span className="text-5xl select-none">🚀</span>
          <div className="space-y-2">
            <h1 className="font-display font-black text-2xl md:text-3xl text-gray-800 tracking-tight leading-none">
              Launch Notification Alert
            </h1>
            <p className="text-xs text-gray-400 font-semibold leading-relaxed">
              Want to see our active website launch live? Register below, and receive instant SMS or email notifications the minute our direct e-commerce site opens fully.
            </p>
          </div>

          {!formSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs text-left">
              <div className="space-y-1.5ClassName">
                <label className="text-[10px] font-mono text-gray-400 font-bold uppercase tracking-wider block">Your Email</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <Mail size={15} />
                  </span>
                  <input
                    type="email"
                    required
                    placeholder="sajith@gmail.com"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="w-full bg-slate-50 border p-3 pl-10 rounded-xl text-gray-800 outline-none focus:border-brand-pink transition-all font-semibold"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-brand-pink hover:bg-brand-pink-soft/90 hover:text-brand-pink text-white text-xs font-black rounded-xl shadow-cute transition-all cursor-pointer text-center flex items-center justify-center gap-1.5 uppercase tracking-wide"
              >
                {loading ? 'Subscribing...' : 'Alert Me on Website Launch'}
                <Send size={13} />
              </button>
            </form>
          ) : (
            <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100 text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-emerald-500 mx-auto shadow-xs">
                <CheckCircle2 size={20} />
              </div>
              <h3 className="font-display font-bold text-emerald-800 text-xs">Launch Subscription Active!</h3>
              <p className="text-[10px] text-emerald-600 font-medium leading-relaxed max-w-xs mx-auto">
                Excellent! You will be among the first very few to receive our notification keys when SorryBaba goes live.
              </p>
            </div>
          )}
        </div>
      )}

      {/* 3. MARKETING CONTEXT: SPECIAL OFFERS */}
      {pageCtx === 'offers' && (
        <div className="space-y-6">
          <section className="text-center space-y-2">
            <span className="text-4xl select-none">🏷️</span>
            <h1 className="font-display font-black text-2xl md:text-3xl text-gray-800 tracking-tight leading-none">
              Special Offers & Deals
            </h1>
            <p className="text-xs text-gray-400 font-semibold leading-relaxed">
              Restore your relationship connections at incredibly attractive pricing intervals.
            </p>
          </section>

          <div className="bg-white rounded-3xl p-6 border border-gray-150 space-y-5 text-xs font-semibold">
            {/* Promo card 1 */}
            <div className="p-4 border-l-4 border-brand-pink bg-rose-50/20 rounded-r-2xl space-y-2">
              <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                <span className="text-brand-pink uppercase tracking-widest">Active Offer</span>
                <span className="text-gray-400">EXP: June 30</span>
              </div>
              <h3 className="text-gray-800 font-bold text-sm">Say Sorry For Less (10% Off Digital)</h3>
              <p className="text-[10px] text-gray-500 font-medium leading-normal">Use code <strong className="font-mono text-brand-pink text-xs uppercase px-1.5 py-0.5 bg-brand-pink-soft/10 rounded-lg">SORRY10</strong> coordinates checkout on WhatsApp for 10% off any interactive digital E-gifts or letters.</p>
            </div>

            {/* Promo card 2 */}
            <div className="p-4 border-l-4 border-brand-purple bg-purple-50/20 rounded-r-2xl space-y-2">
              <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                <span className="text-brand-purple uppercase tracking-widest">Freebie Package</span>
                <span className="text-gray-400">No Code Required</span>
              </div>
              <h3 className="text-gray-800 font-bold text-sm">Complementary Vanilla Scenting</h3>
              <p className="text-[10px] text-gray-500 font-medium leading-normal">For the next few weeks, every physical apology package is automatically sprayed with premium natural vanilla essential calm perfume block.</p>
            </div>

            <Link
              to="/products"
              className="w-full py-3 bg-brand-pink hover:bg-brand-pink-soft/90 hover:text-brand-pink text-white text-xs font-black rounded-xl shadow-cute transition-style cursor-pointer text-center flex items-center justify-center gap-1.5"
            >
              <span>Explore Apology catalog</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      )}

      {/* 4. MARKETING CONTEXT: REFERRAL PROGRAM */}
      {pageCtx === 'referral' && (
        <div className="bg-white rounded-3xl p-6 md:p-10 border border-gray-150 space-y-6 shadow-xs text-center">
          <span className="text-5xl select-none">👥</span>
          <div className="space-y-2">
            <h1 className="font-display font-black text-2xl md:text-3xl text-gray-800 tracking-tight leading-none">
              SorryBaba Referral Program
            </h1>
            <p className="text-xs text-gray-400 font-semibold leading-relaxed">
              Help friends repair their bonds. Give LKR 500, get LKR 500 when they finalize their first sorry package.
            </p>
          </div>

          <div className="p-5 border rounded-2xl bg-slate-50/40 text-xs font-semibold text-left space-y-3.5">
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-brand-pink-soft text-brand-pink font-mono font-black text-xs flex items-center justify-center shrink-0">1</div>
              <div className="space-y-0.5">
                <h4 className="text-gray-800 font-bold">Copy Your Inviter Link</h4>
                <p className="text-[10px] text-gray-400 font-medium leading-normal">Your custom inviter reference code is available on your Account tab profile.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-brand-purple-soft text-brand-purple font-mono font-black text-xs flex items-center justify-center shrink-0">2</div>
              <div className="space-y-0.5">
                <h4 className="text-gray-800 font-bold">They Receive discount</h4>
                <p className="text-[10px] text-gray-400 font-medium leading-normal">Your invited friend immediately logs a complimentary LKR 500 price deductions on physical items.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-brand-blue-soft text-brand-blue font-mono font-black text-xs flex items-center justify-center shrink-0">3</div>
              <div className="space-y-0.5">
                <h4 className="text-gray-800 font-bold">You Earn LKR 500 Credits</h4>
                <p className="text-[10px] text-gray-400 font-medium leading-normal">Once they check out over WhatsApp, we automatically post credentials to credit you LKR 500 coupon limits.</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              navigator.clipboard?.writeText('https://sorrybaba.com/waitlist?ref=user-referral-code');
              trackEvent('referral_link_copied');
              alert('Demo link copied to clipboard!');
            }}
            className="w-full py-3 bg-brand-pink hover:bg-brand-pink-soft/90 hover:text-brand-pink text-white text-xs font-black rounded-xl shadow-cute transition-style cursor-pointer text-center flex items-center justify-center gap-1.5 uppercase tracking-wide"
          >
            <span>Copy Inviter Link</span>
            <Share2 size={13} />
          </button>
        </div>
      )}

      {/* Footer Security */}
      <p className="text-[10px] text-gray-400 font-semibold text-center flex items-center gap-1 justify-center mt-6">
        <ShieldCheck size={14} className="text-brand-pink shrink-0" />
        <span>Your data belongs 100% to you. We never sell contact leads.</span>
      </p>

    </div>
  );
};
