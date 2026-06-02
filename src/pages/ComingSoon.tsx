/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { trackEvent } from '../lib/analytics';
import { saveWaitingListEntry } from '../lib/waitingList';
import { Sparkles, Heart, MessageCircle, Instagram, Facebook, Share2, ArrowRight, Music, AlertCircle } from 'lucide-react';
import { safeStorage } from '../lib/storage';

interface ComingSoonProps {
  onBypass: () => void;
}

export const ComingSoon: React.FC<ComingSoonProps> = ({ onBypass }) => {
  // 1. Countdown Setup
  const targetDate = new Date('2026-07-15T00:00:00.000Z');
  const [timeLeft, setTimeLeft] = useState({ days: 42, hours: 14, minutes: 23, seconds: 45 });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        // Fallback exciting loop if date has passed
        setTimeLeft({ days: 42, hours: 8, minutes: 19, seconds: 30 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // 2. Local State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [visitorLocation, setVisitorLocation] = useState({ country: 'Sri Lanka', city: 'Colombo' });

  // 3. User agent & visitor profiling helpers
  const getDeviceType = () => {
    if (typeof window === 'undefined') return 'Desktop';
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return 'Tablet';
    }
    if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
      return 'Mobile';
    }
    return 'Desktop';
  };

  const getBrowser = () => {
    if (typeof window === 'undefined') return 'Unknown';
    const ua = navigator.userAgent;
    if (ua.includes('Chrome') && !ua.includes('Chromium')) return 'Chrome';
    if (ua.includes('Safari') && !ua.includes('Chrome')) return 'Safari';
    if (ua.includes('Firefox')) return 'Firefox';
    if (ua.includes('Edge')) return 'Edge';
    return 'Other';
  };

  const getTrafficSource = () => {
    if (typeof window === 'undefined') return 'Direct';
    const params = new URLSearchParams(window.location.search);
    const source = params.get('utm_source') || params.get('ref') || params.get('source');
    if (source) return source;
    const referrer = document.referrer;
    if (!referrer) return 'Direct';
    if (referrer.includes('facebook.com')) return 'Facebook';
    if (referrer.includes('instagram.com')) return 'Instagram';
    if (referrer.includes('google.com')) return 'Google Search';
    if (referrer.includes('wa.me') || referrer.includes('whatsapp.com')) return 'WhatsApp';
    return 'Referral';
  };

  // 4. Geolocation fetch
  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        if (data && data.country_name) {
          setVisitorLocation({
            country: data.country_name,
            city: data.city || 'Colombo'
          });
        }
      })
      .catch(() => {
        // Fallback silently to Colombo, SL defaults initialized in state
      });
  }, []);

  // 5. Scroll tracking Depth
  useEffect(() => {
    const trackedDepths = { d25: false, d50: false, d75: false, d90: false };
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const scrollPercent = (scrollTop / docHeight) * 100;

      if (scrollPercent >= 25 && !trackedDepths.d25) {
        trackedDepths.d25 = true;
        trackEvent('scroll_25', { page_title: document.title, percent: 25, path: window.location.pathname });
      }
      if (scrollPercent >= 50 && !trackedDepths.d50) {
        trackedDepths.d50 = true;
        trackEvent('scroll_50', { page_title: document.title, percent: 50, path: window.location.pathname });
      }
      if (scrollPercent >= 75 && !trackedDepths.d75) {
        trackedDepths.d75 = true;
        trackEvent('scroll_75', { page_title: document.title, percent: 75, path: window.location.pathname });
      }
      if (scrollPercent >= 90 && !trackedDepths.d90) {
        trackedDepths.d90 = true;
        trackEvent('scroll_90', { page_title: document.title, percent: 90, path: window.location.pathname });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 6. Metadata, Schema injection, and Engagement session heartbeat
  useEffect(() => {
    // Schema Scripts Injection
    const script1 = document.createElement('script');
    script1.type = 'application/ld+json';
    script1.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "SorryBaba",
      "url": "https://sorrybaba.com"
    });
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.type = 'application/ld+json';
    script2.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "SorryBaba",
      "url": "https://sorrybaba.com",
      "logo": "https://sorrybaba.com/logo.png"
    });
    document.head.appendChild(script2);

    // Dynamic SEO Metas
    document.title = "SorryBaba | Coming Soon";
    
    const metaDescTag = document.querySelector('meta[name="description"]');
    const oldMetaDesc = metaDescTag ? metaDescTag.getAttribute('content') : '';
    if (metaDescTag) {
      metaDescTag.setAttribute('content', 'SorryBaba is preparing a unique platform for apology gifts, romantic surprises, meaningful connections and relationship recovery experiences.');
    }

    // GTM View Tracker Trigger
    trackEvent('countdown_view', {
      page_title: "SorryBaba | Coming Soon",
      page_location: window.location.href,
      page_path: window.location.pathname,
      device_type: getDeviceType(),
      browser: getBrowser(),
      referrer: document.referrer || 'Direct'
    });

    // Handle Visitor Types
    const visited = safeStorage.getItem('sorrybaba_visited_before');
    const visitorTypeStr = visited ? 'returning_visitor' : 'new_visitor';
    if (!visited) {
      safeStorage.setItem('sorrybaba_visited_before', 'true');
    }
    trackEvent(visitorTypeStr, {
      visitor_type: visitorTypeStr,
      page_title: "SorryBaba | Coming Soon",
      country: visitorLocation.country,
      city: visitorLocation.city,
    });

    // Pulse Timer
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
      trackEvent('engagement_time', {
        duration_seconds: elapsedSeconds,
        visitor_type: visitorTypeStr,
        page_title: "SorryBaba | Coming Soon"
      });
      trackEvent('session_duration', {
        duration_seconds: elapsedSeconds,
        visitor_type: visitorTypeStr
      });
    }, 15000);

    return () => {
      document.head.removeChild(script1);
      document.head.removeChild(script2);
      if (metaDescTag && oldMetaDesc) {
        metaDescTag.setAttribute('content', oldMetaDesc);
      }
      clearInterval(interval);
    };
  }, [visitorLocation.country, visitorLocation.city]);

  // 7. Input focus tracks
  const handleNameFocus = () => {
    trackEvent('name_field_focus', {
      page_title: document.title,
      field: 'name',
      device_type: getDeviceType()
    });
  };

  const handleEmailFocus = () => {
    trackEvent('email_field_focus', {
      page_title: document.title,
      field: 'email',
      device_type: getDeviceType()
    });
  };

  // 8. Custom hover tracking
  const handleElementHover = (elementName: string) => {
    trackEvent('button_hover', {
      button_name: elementName,
      page_title: document.title,
      device_type: getDeviceType()
    });
  };

  // 9. Core form submission logic
  const handleNotifyMeClick = () => {
    trackEvent('notify_me_click', {
      button_name: 'Notify Me',
      page_title: document.title,
      device_type: getDeviceType()
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim()) {
      setErrorMessage('Please state your name ❤️');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address 💌');
      return;
    }

    setLoading(true);
    
    // Save locally & trigger developer integration bridges
    const registrationDetails = {
      name: name.trim(),
      email: email.trim(),
      country: visitorLocation.country,
      source: getTrafficSource(),
      device: getDeviceType(),
      browser: getBrowser(),
    };

    const isSuccess = await saveWaitingListEntry(registrationDetails);

    setLoading(false);

    if (isSuccess) {
      setFormSubmitted(true);
      
      // GA4 / GTM events
      trackEvent('notify_me_submit', {
        form_name: 'waiting_list',
        page_title: document.title,
        visitor_type: safeStorage.getItem('sorrybaba_visited_before') ? 'returning_visitor' : 'new_visitor',
        country: visitorLocation.country,
        city: visitorLocation.city,
        referrer: document.referrer || 'Direct',
        traffic_source: getTrafficSource(),
        device_type: getDeviceType(),
        browser: getBrowser(),
      });
    } else {
      setErrorMessage('Something went wrong. Please try again! 🙏');
    }
  };

  // 10. Social media clicks telemetry
  const handleSocialClick = (platform: string, url: string) => {
    // Platform-specific event tracking
    trackEvent(`${platform.toLowerCase()}_click`, {
      social_platform: platform,
      button_name: `${platform} Link`,
      page_title: document.title,
    });

    // Global social click tracking
    trackEvent('social_click', {
      social_platform: platform,
      button_name: `${platform} Link`,
      page_title: document.title,
      device_type: getDeviceType(),
      visitor_type: safeStorage.getItem('sorrybaba_visited_before') ? 'returning_visitor' : 'new_visitor'
    });

    window.open(url, '_blank');
  };

  // 11. Animated Assets background generator
  const floatingHeartsArray = useRef(
    Array.from({ length: 15 }).map((_, i) => ({
      left: `${5 + Math.random() * 90}%`,
      delay: `${Math.random() * 8}s`,
      duration: `${10 + Math.random() * 15}s`,
      size: `${12 + Math.random() * 24}px`,
      opacity: 0.15 + Math.random() * 0.3,
    }))
  );

  const floatingStarsArray = useRef(
    Array.from({ length: 25 }).map((_, i) => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${3 + Math.random() * 5}px`,
      delay: `${Math.random() * 10}s`,
      duration: `${4 + Math.random() * 8}s`,
      opacity: 0.2 + Math.random() * 0.4,
    }))
  );

  return (
    <div className="relative min-h-screen bg-slate-950 text-gray-100 flex flex-col justify-between overflow-hidden font-sans select-none">
      
      {/* 1. ANIMATED LUXURY BACKGROUNDS */}
      {/* Deep purple radial glow, pink bottom haze */}
      <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(155,102,255,0.08)_0%,transparent_60%] pointer-events-none z-0"></div>
      <div className="absolute bottom-0 inset-x-0 h-96 bg-gradient-to-t from-pink-950/20 via-pink-950/5 to-transparent pointer-events-none z-0"></div>
      
      {/* Starry Drift Background Panel */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-60 cs-animate-drift">
        {floatingStarsArray.current.map((star, idx) => (
          <div
            key={idx}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              animationDelay: star.delay,
              animationDuration: star.duration,
              opacity: star.opacity,
            }}
          ></div>
        ))}
      </div>

      {/* Floating Hearts Animation Layer */}
      <div className="absolute inset-x-0 bottom-0 top-0 overflow-hidden pointer-events-none z-0">
        {floatingHeartsArray.current.map((heart, idx) => (
          <div
            key={idx}
            className="absolute cs-animate-float bottom-[-50px] text-pink-500/20"
            style={{
              left: heart.left,
              animationDelay: heart.delay,
              '--duration': heart.duration,
              fontSize: heart.size,
              opacity: heart.opacity,
            } as React.CSSProperties}
          >
            ❤️
          </div>
        ))}
      </div>

      {/* 2. ADMIN PREVIEW BAR */}
      {/* Discreet secret indicator allowing admin testing bypass */}
      <div className="relative z-50 text-right p-4">
        <button
          onClick={() => {
            trackEvent('preview_mode_access', { page_title: document.title, trigger: 'ComingSoon Button' });
            safeStorage.setItem('sorrybaba_preview_mode', 'true');
            onBypass();
          }}
          onMouseEnter={() => handleElementHover('Admin Preview Secret Option')}
          className="text-slate-700 hover:text-pink-500/50 transition-colors duration-300 text-xs font-mono cursor-pointer"
          title="Secret Bypass"
        >
          ●
        </button>
      </div>

      {/* 3. CORE DISPLAY MAIN CONTENT AREA */}
      <main className="relative z-10 flex-1 max-w-4xl w-full mx-auto px-4 md:px-8 py-12 flex flex-col justify-center items-center text-center">
        
        {/* Animated Pink / Blue Neon Floating sparkles */}
        <div className="relative mb-6">
          <div className="absolute -top-6 -left-6 text-pink-500 animate-pulse-custom opacity-70">
            <Sparkles size={28} className="filter drop-shadow-[0_0_10px_rgba(255,26,117,0.7)]" />
          </div>
          <div className="absolute -bottom-4 -right-8 text-brand-blue animate-bounce opacity-50">
            <Heart size={20} className="filter drop-shadow-[0_0_8px_rgba(0,178,255,0.6)] fill-brand-blue" />
          </div>

          {/* Glowing Brand Wrapper (Logo Click Analytics included) */}
          <div
            onClick={() => {
              trackEvent('logo_click', { button_name: 'Logo Text', page_title: document.title });
            }}
            onMouseEnter={() => handleElementHover('Logo Brand Name')}
            className="text-4xl md:text-5xl font-display font-extrabold tracking-tight cursor-pointer hover:scale-105 transition-transform duration-300 bg-gradient-to-r from-pink-500 via-brand-purple to-pink-500 bg-300% animate-float-slow text-transparent bg-clip-text filter drop-shadow-[0_4px_12px_rgba(255,26,117,0.4)]"
          >
            SorryBaba
          </div>
        </div>

        {/* Premium Romantic Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-tight mb-4 text-white max-w-3xl filter drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
          Something Special is <br className="sm:hidden" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-400">
            Coming Soon ❤️
          </span>
        </h1>

        {/* Informational Subtitle */}
        <p className="text-base sm:text-lg text-slate-400 max-w-2xl px-2 leading-relaxed mb-10">
          We are creating a unique platform to help people reconnect, apologize, surprise loved ones and celebrate meaningful relationships.
        </p>

        {/* PREMIUM COUNTDOWN PANEL */}
        <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-xl w-full mb-12 relative">
          
          {/* Subtle Outer Glowing Outline Frame */}
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-pink-500/10 to-brand-purple/10 blur-xl opacity-75"></div>
          
          {[
            { value: timeLeft.days, label: 'Days' },
            { value: timeLeft.hours, label: 'Hours' },
            { value: timeLeft.minutes, label: 'Minutes' },
            { value: timeLeft.seconds, label: 'Seconds' }
          ].map((item, idx) => (
            <div
              key={idx}
              className="relative rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-md p-3 sm:p-5 flex flex-col justify-center items-center shadow-2xl overflow-hidden"
            >
              {/* Internal Soft Highlight */}
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-pink-500/30 to-transparent"></div>
              
              <div className="text-2xl sm:text-4xl font-mono font-bold text-white tracking-widest tabular-nums animate-pulse-custom">
                {String(item.value).padStart(2, '0')}
              </div>
              <div className="text-[10px] sm:text-xs font-medium text-slate-500 mt-1 uppercase tracking-wider">
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* EMAIL WAITING LIST CONTAINER */}
        <div className="w-full max-w-md relative z-20">
          
          {!formSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="text-xs font-semibold text-slate-400 tracking-wider uppercase mb-1 flex items-center justify-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-pink-500 animate-ping"></span>
                Join our exclusive VIP waiting list
              </div>

              <div className="grid grid-cols-1 gap-2.5 relative">
                
                {/* Name Input */}
                <input
                  type="text"
                  placeholder="Your Name ❤️"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={handleNameFocus}
                  maxLength={50}
                  className="w-full bg-slate-900/40 border border-slate-850 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 rounded-xl px-4 py-3 text-sm text-center text-white placeholder-slate-600 transition-all duration-300 backdrop-blur-sm outline-none shadow-inner"
                />

                {/* Email Input */}
                <input
                  type="email"
                  placeholder="💌 Enter your email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={handleEmailFocus}
                  maxLength={100}
                  className="w-full bg-slate-900/40 border border-slate-850 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 rounded-xl px-4 py-3 text-sm text-center text-white placeholder-slate-600 transition-all duration-300 backdrop-blur-sm outline-none shadow-inner"
                />
              </div>

              {/* Action Trigger Submit */}
              <button
                type="submit"
                disabled={loading}
                onClick={handleNotifyMeClick}
                onMouseEnter={() => handleElementHover('Notify Me Button')}
                className="w-full bg-gradient-to-r from-pink-600 to-indigo-600 hover:from-pink-500 hover:to-indigo-500 text-white font-semibold text-sm transition-all duration-300 py-3 rounded-xl shadow-cute-hover flex justify-center items-center gap-2 border border-pink-400/20 active:scale-98 cursor-pointer relative overflow-hidden"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Adding you to secret circle...
                  </>
                ) : (
                  <>
                    Notify Me
                    <ArrowRight size={16} />
                  </>
                )}
              </button>

              {/* Soft feedback error banner */}
              {errorMessage && (
                <div className="flex items-center gap-1.5 text-xs text-pink-400 justify-center">
                  <AlertCircle size={14} />
                  <span>{errorMessage}</span>
                </div>
              )}

              <p className="text-[11px] text-slate-500">
                🚀 No spam. Be the first to claim exclusive launch coupons and free apologies.
              </p>

            </form>
          ) : (
            /* Premium Success Dialog response */
            <div className="bg-slate-900/50 border border-pink-500/20 rounded-2xl p-6 shadow-2xl backdrop-blur-md relative overflow-hidden text-center cs-animate-fade-in-up">
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-pink-500 to-violet-500"></div>
              
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-pink-500/10 text-pink-500 mb-4 animate-bounce">
                <Heart size={24} className="fill-pink-500" />
              </div>
              
              <h3 className="text-lg font-bold text-white mb-2">You're on the list! 🎉</h3>
              <p className="text-xs text-slate-400 mb-4 max-w-sm mx-auto">
                Thank you for joining, <strong>{name}</strong>. We are saving your token and will mail you once our luxury present catalog is live! 💖
              </p>

              <button
                type="button"
                onClick={() => {
                  setFormSubmitted(false);
                  setName('');
                  setEmail('');
                }}
                onMouseEnter={() => handleElementHover('Register Another Email Button')}
                className="text-xs text-pink-400 hover:text-pink-300 underline underline-offset-4 cursor-pointer"
              >
                Register another email address
              </button>
            </div>
          )}
        </div>

      </main>

      {/* 4. SOCIAL ACCENTS & NETWORKS */}
      <footer className="relative z-10 w-full max-w-md mx-auto px-4 pb-8 flex flex-col items-center text-center">
        
        {/* Connect Headline */}
        <div className="text-slate-500 text-[11px] uppercase tracking-widest font-bold mb-4">
          Connect with us
        </div>

        {/* Social Bar (Includes custom click parameters + platform tagging) */}
        <div className="flex justify-center gap-5 mb-6">
          {[
            {
              platform: 'WhatsApp',
              url: 'https://wa.me/94776826937?text=Hi%20SorryBaba,%20I%20would%20like%20to%20know%20more%20about%20your%20upcoming%20luxury%20reconciliation%20present%20launch!',
              icon: <MessageCircle size={20} />,
              colorClass: 'text-emerald-400 hover:text-emerald-300 hover:scale-110'
            },
            {
              platform: 'Instagram',
              url: 'https://instagram.com/sorrybabaofficial',
              icon: <Instagram size={20} />,
              colorClass: 'text-pink-400 hover:text-pink-300 hover:scale-110'
            },
            {
              platform: 'Facebook',
              url: 'https://facebook.com/sorrybabaofficial',
              icon: <Facebook size={20} />,
              colorClass: 'text-blue-400 hover:text-blue-300 hover:scale-110'
            },
            {
              platform: 'TikTok',
              url: 'https://tiktok.com/@sorrybabaofficial',
              icon: <span className="font-sans font-bold text-sm tracking-tight">🎶</span>,
              colorClass: 'text-teal-400 hover:text-teal-300 hover:scale-110'
            }
          ].map((soc, idx) => (
            <button
              key={idx}
              onClick={() => handleSocialClick(soc.platform, soc.url)}
              onMouseEnter={() => handleElementHover(`${soc.platform} Icon Link`)}
              className={`p-2.5 rounded-full bg-slate-900/60 border border-slate-850 transition-all duration-300 cursor-pointer flex items-center justify-center filter ${soc.colorClass}`}
              title={soc.platform}
            >
              {soc.icon}
            </button>
          ))}
        </div>

        {/* Legal brand disclaimer footer */}
        <div className="text-slate-600 text-xs font-mono select-text selection:bg-pink-500/20 selection:text-pink-300">
          © SorryBaba 2026
        </div>

      </footer>

    </div>
  );
};
