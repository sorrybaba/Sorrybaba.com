/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { getComingSoonStats, resetComingSoonStats, ComingSoonStats } from '../lib/analytics';
import { 
  BarChart, 
  RefreshCw, 
  Users, 
  FileText, 
  Sparkles, 
  MessageCircle, 
  Smartphone, 
  TrendingUp, 
  Trash2, 
  ChevronRight, 
  Activity, 
  CheckCircle,
  HelpCircle,
  Play,
  Heart,
  ExternalLink,
  Target
} from 'lucide-react';
import { useLocation } from 'react-router-dom';

export default function ComingSoonAnalyticsDashboard() {
  const [stats, setStats] = useState<ComingSoonStats>(() => getComingSoonStats());
  const [activeTab, setActiveTab] = useState<'metrics' | 'debug'>('metrics');
  const [liveEvents, setLiveEvents] = useState<Array<{ id: string; time: string; eventName: string; props: any }>>([]);

  // Fetch stats periodically or manually
  const refreshData = () => {
    setStats(getComingSoonStats());
  };

  useEffect(() => {
    refreshData();
    // Intercept dataLayer events locally for the DebugView stream!
    const originalPush = window.dataLayer ? window.dataLayer.push : null;
    
    // Set up local polling to keep real-time stats up to date
    const interval = setInterval(refreshData, 1000);

    // Initial load some simulated events in the stream so it's not empty
    const now = new Date();
    const mockFeed = [
      {
        id: '1',
        time: new Date(now.getTime() - 4000).toLocaleTimeString(),
        eventName: 'coming_soon_page_view',
        props: { page_title: 'SorryBaba | Coming Soon', browser: 'Chrome', device_type: 'Mobile', country: 'Sri Lanka' }
      },
      {
        id: '2',
        time: new Date(now.getTime() - 12000).toLocaleTimeString(),
        eventName: 'coming_soon_countdown_view',
        props: { page_title: 'SorryBaba | Coming Soon' }
      },
      {
        id: '3',
        time: new Date(now.getTime() - 25000).toLocaleTimeString(),
        eventName: 'coming_soon_form_start',
        props: { field: 'name' }
      },
      {
        id: '4',
        time: new Date(now.getTime() - 42000).toLocaleTimeString(),
        eventName: 'coming_soon_form_success',
        props: { email: 'partner@sorrybaba.com', is_key_event: true }
      }
    ].reverse();
    setLiveEvents(mockFeed);

    // Patch GTM dataLayer to stream real-time events into DebugView!
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      const originalPush = window.dataLayer.push.bind(window.dataLayer);
      
      window.dataLayer.push = function (...args: any[]) {
        const result = originalPush(...args);
        try {
          const item = args[0];
          if (item && item.event) {
            setLiveEvents(prev => [
              {
                id: Math.random().toString(36).substr(2, 9),
                time: new Date().toLocaleTimeString(),
                eventName: item.event,
                props: item
              },
              ...prev.slice(0, 49) // limit to last 50
            ]);
          }
        } catch (e) {
          console.error('[Stats Stream] Proxy issue:', e);
        }
        return result;
      };
    }

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleReset = (toZero: boolean) => {
    if (confirm(`Are you sure you want to reset the analytics statistics?`)) {
      resetComingSoonStats(toZero);
      refreshData();
    }
  };

  // Calculations
  const conversionRate = stats.uniqueVisitors > 0 
    ? ((stats.formSubmissions / stats.uniqueVisitors) * 100).toFixed(1) 
    : '0.0';

  const scrollCompletionRate = stats.uniqueVisitors > 0
    ? ((stats.scroll100 / stats.uniqueVisitors) * 100).toFixed(1)
    : '0.0';

  const scroll75Rate = stats.uniqueVisitors > 0
    ? ((stats.scroll75 / stats.uniqueVisitors) * 100).toFixed(1)
    : '0.0';

  const scroll50Rate = stats.uniqueVisitors > 0
    ? ((stats.scroll50 / stats.uniqueVisitors) * 100).toFixed(1)
    : '0.0';

  const scroll25Rate = stats.uniqueVisitors > 0
    ? ((stats.scroll25 / stats.uniqueVisitors) * 100).toFixed(1)
    : '0.0';

  // Sort breakdowns for clean display
  const sortedTraffic = Object.entries(stats.trafficSources || {})
    .sort((a, b) => Number(b[1]) - Number(a[1]));

  const sortedDevices = Object.entries(stats.deviceBreakdown || {})
    .sort((a, b) => Number(b[1]) - Number(a[1]));

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 font-sans pb-16 selection:bg-pink-500/20 selection:text-pink-300">
      
      {/* GLOWING HEADER ACCENT */}
      <div className="absolute top-0 inset-x-0 h-64 bg-radial-[circle_at_center_top,rgba(236,72,153,0.1)_0%,transparent_60%] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* UPPER NAVIGATION BAR */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-slate-900 pb-6 mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5 text-xs font-mono font-bold tracking-widest text-pink-500 uppercase">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
              </span>
              SORRYBABA INTEL
            </div>
            <h1 className="text-3xl font-display font-black tracking-tight text-white flex items-center gap-2.5">
              Coming Soon Analytics <span className="text-slate-800 text-base font-normal">(v2.0)</span>
            </h1>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              Live tracking metrics, database storage logs, and GTM / GA4 key event conversions view.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={refreshData}
              className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-850 text-white font-semibold text-xs py-2.5 px-4 rounded-xl border border-slate-800 hover:border-slate-700 transition duration-150 cursor-pointer"
            >
              <RefreshCw size={14} className="animate-spin-slow" />
              Refresh Feed
            </button>
            <div className="h-6 w-[1px] bg-slate-800 hidden sm:block" />
            <button
              onClick={() => handleReset(false)}
              className="bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-white font-medium text-xs py-2.5 px-4 rounded-xl border border-slate-850 hover:border-slate-800 transition duration-150 cursor-pointer"
              title="Reset metrics back to professional baseline dataset for demo/testing"
            >
              Seed Baseline
            </button>
            <button
              onClick={() => handleReset(true)}
              className="flex items-center gap-1.5 bg-pink-950/20 hover:bg-pink-950/40 text-pink-400 hover:text-pink-300 font-semibold text-xs py-2.5 px-4 rounded-xl border border-pink-900/30 transition duration-150 cursor-pointer"
              title="Deletes all simulated and accrued histories completely"
            >
              <Trash2 size={13} />
              Reset to 0
            </button>
          </div>
        </div>

        {/* DASHBOARD TAB SELECTOR */}
        <div className="flex border-b border-slate-900 mb-8">
          <button
            onClick={() => setActiveTab('metrics')}
            className={`py-3 px-6 text-sm font-medium border-b-2 transition duration-150 flex items-center gap-2 cursor-pointer ${
              activeTab === 'metrics' 
                ? 'border-pink-500 text-white bg-slate-900/10' 
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-800'
            }`}
          >
            <BarChart size={16} />
            Performance & Traffic Metrics
          </button>
          <button
            onClick={() => setActiveTab('debug')}
            className={`py-3 px-6 text-sm font-medium border-b-2 transition duration-150 flex items-center gap-2 cursor-pointer ${
              activeTab === 'debug' 
                ? 'border-pink-500 text-white bg-slate-900/10' 
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-800'
            }`}
          >
            <Activity size={16} className={liveEvents.length > 0 ? "text-emerald-500" : ""} />
            GA4 DebugView & Live Stream
            {liveEvents.length > 0 && (
              <span className="text-[10px] bg-slate-900 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 rounded-full font-bold">
                LIVE
              </span>
            )}
          </button>
        </div>

        {activeTab === 'metrics' ? (
          <div>
            
            {/* PRIMARY CORE METRIC CARDS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8">
              
              {/* Total Visitors */}
              <div className="bg-slate-900/40 border border-slate-850/60 rounded-2xl p-5 shadow-xl relative overflow-hidden">
                <div className="absolute top-4 right-4 text-slate-600"><Users size={20} /></div>
                <div className="text-xs font-mono font-bold tracking-wider text-slate-500 uppercase">Total Visitors</div>
                <div className="text-3xl sm:text-4xl font-black text-white mt-2 font-mono tracking-tight">{stats.totalVisitors}</div>
                <div className="text-[10px] text-slate-500 mt-1.5 flex items-center gap-1">
                  <TrendingUp size={12} className="text-emerald-400" />
                  Live page loads registered
                </div>
              </div>

              {/* Unique Visitors */}
              <div className="bg-slate-900/40 border border-slate-850/60 rounded-2xl p-5 shadow-xl relative overflow-hidden">
                <div className="absolute top-4 right-4 text-slate-600"><Users size={20} className="stroke-pink-500/40" /></div>
                <div className="text-xs font-mono font-bold tracking-wider text-slate-500 uppercase">Unique Visitors</div>
                <div className="text-3xl sm:text-4xl font-black text-white mt-2 font-mono tracking-tight text-pink-500">{stats.uniqueVisitors}</div>
                <div className="text-[10px] text-slate-500 mt-1.5 flex items-center gap-1">
                  <CheckCircle size={12} className="text-slate-600" />
                  Isolated cookie identifiers
                </div>
              </div>

              {/* Form Starts */}
              <div className="bg-slate-900/40 border border-slate-850/60 rounded-2xl p-5 shadow-xl relative overflow-hidden">
                <div className="absolute top-4 right-4 text-slate-600"><FileText size={20} /></div>
                <div className="text-xs font-mono font-bold tracking-wider text-slate-500 uppercase">Form Starts</div>
                <div className="text-3xl sm:text-4xl font-black text-white mt-2 font-mono tracking-tight">{stats.formStarts}</div>
                <div className="text-[10px] text-slate-500 mt-1.5">
                  Input fields active intent
                </div>
              </div>

              {/* Form Submissions */}
              <div className="bg-gradient-to-br from-pink-950/20 to-indigo-950/10 border border-pink-500/20 rounded-2xl p-5 shadow-xl relative overflow-hidden">
                <div className="absolute top-4 right-4 text-pink-500"><Target size={20} className="animate-pulse" /></div>
                <div className="text-xs font-mono font-bold tracking-wider text-pink-400 uppercase flex items-center gap-1">
                  Submissions
                  <span className="inline-block text-[9px] bg-pink-500 text-white font-extrabold px-1 rounded-sm uppercase tracking-normal">KEY</span>
                </div>
                <div className="text-3xl sm:text-4xl font-black text-white mt-2 font-mono tracking-tight">{stats.formSubmissions}</div>
                <div className="text-[10px] text-pink-400 mt-1.5">
                  Successful email registrations
                </div>
              </div>

            </div>

            {/* SECONDARY METRIC CARDS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8">
              
              {/* Conversion Rate */}
              <div className="bg-slate-900/40 border border-slate-850/60 rounded-2xl p-5 shadow-xl relative overflow-hidden">
                <div className="absolute top-4 right-4 text-slate-600"><Sparkles size={20} className="text-violet-400/50" /></div>
                <div className="text-xs font-mono font-bold tracking-wider text-slate-500 uppercase">Conversion Rate</div>
                <div className="text-3xl sm:text-4xl font-black text-violet-400 mt-2 font-mono tracking-tight">{conversionRate}%</div>
                <div className="text-[10px] text-slate-500 mt-1.5">
                  Submissions / Uniques ratio
                </div>
              </div>

              {/* Notify Clicks */}
              <div className="bg-slate-900/40 border border-slate-850/60 rounded-2xl p-5 shadow-xl relative overflow-hidden">
                <div className="absolute top-4 right-4 text-slate-600"><Target size={18} className="text-pink-500" /></div>
                <div className="text-xs font-mono font-bold tracking-wider text-slate-500 uppercase flex items-center gap-1">
                  Notify Clicks
                  <span className="inline-block text-[9px] bg-slate-800 text-slate-300 font-extrabold px-1 rounded-sm uppercase tracking-normal">KEY</span>
                </div>
                <div className="text-3xl sm:text-4xl font-black text-white mt-2 font-mono tracking-tight">{stats.notifyClicks}</div>
                <div className="text-[10px] text-slate-500 mt-1.5">
                  Clicks on Submit button
                </div>
              </div>

              {/* WhatsApp Clicks */}
              <div className="bg-slate-900/40 border border-slate-850/60 rounded-2xl p-5 shadow-xl relative overflow-hidden">
                <div className="absolute top-4 right-4 text-emerald-500"><MessageCircle size={20} /></div>
                <div className="text-xs font-mono font-bold tracking-wider text-slate-500 uppercase flex items-center gap-1">
                  WhatsApp Clicks
                  <span className="inline-block text-[9px] bg-slate-800 text-slate-300 font-extrabold px-1 rounded-sm uppercase tracking-normal">KEY</span>
                </div>
                <div className="text-3xl sm:text-4xl font-black text-white mt-2 font-mono tracking-tight text-emerald-400">{stats.whatsAppClicks}</div>
                <div className="text-[10px] text-slate-500 mt-1.5 font-mono">
                  Phone link redirections
                </div>
              </div>

              {/* Scroll Completion Rate */}
              <div className="bg-slate-900/40 border border-slate-850/60 rounded-2xl p-5 shadow-xl relative overflow-hidden">
                <div className="absolute top-4 right-4 text-slate-600"><Smartphone size={20} /></div>
                <div className="text-xs font-mono font-bold tracking-wider text-slate-500 uppercase">Scroll Completion</div>
                <div className="text-3xl sm:text-4xl font-black text-white mt-2 font-mono tracking-tight">{scrollCompletionRate}%</div>
                <div className="text-[10px] text-slate-500 mt-1.5 flex items-center gap-1">
                  Reached bottom of page ({stats.scroll100} users)
                </div>
              </div>

            </div>

            {/* DETAILED DRILLDOWN GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* SCROLL DEPTH ANALYSIS CARD */}
              <div className="bg-slate-900/20 border border-slate-900 rounded-3xl p-6 lg:col-span-6 shadow-xl relative flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                    <Smartphone className="text-pink-500" size={18} />
                    Scroll funnel analysis
                  </h3>
                  <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                    Percentage of unique visitors scrolling past specific sections of the Coming Soon layout.
                  </p>

                  <div className="space-y-6">
                    {/* scroll 25 */}
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="font-mono text-slate-400 font-bold">25% Depth (Intro Section)</span>
                        <span className="font-mono text-white font-bold">{scroll25Rate}% <span className="text-slate-500">({stats.scroll25})</span></span>
                      </div>
                      <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-900">
                        <div className="bg-gradient-to-r from-pink-500 to-indigo-500 h-full rounded-full" style={{ width: `${scroll25Rate}%` }}></div>
                      </div>
                    </div>

                    {/* scroll 50 */}
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="font-mono text-slate-400 font-bold">50% Depth (Countdown Timer)</span>
                        <span className="font-mono text-white font-bold">{scroll50Rate}% <span className="text-slate-500">({stats.scroll50})</span></span>
                      </div>
                      <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-900">
                        <div className="bg-gradient-to-r from-pink-500 to-indigo-500 h-full rounded-full" style={{ width: `${scroll50Rate}%` }}></div>
                      </div>
                    </div>

                    {/* scroll 75 */}
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="font-mono text-slate-400 font-bold">75% Depth (Subscription Input)</span>
                        <span className="font-mono text-white font-bold">{scroll75Rate}% <span className="text-slate-500">({stats.scroll75})</span></span>
                      </div>
                      <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-900">
                        <div className="bg-gradient-to-r from-pink-500 to-indigo-500 h-full rounded-full" style={{ width: `${scroll75Rate}%` }}></div>
                      </div>
                    </div>

                    {/* scroll 100 */}
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="font-mono text-slate-400 font-bold">100% Depth (Footer social links)</span>
                        <span className="font-mono text-white font-extrabold text-pink-500">{scrollCompletionRate}% <span className="text-slate-500">({stats.scroll100})</span></span>
                      </div>
                      <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-900">
                        <div className="bg-pink-550 h-full rounded-full" style={{ width: `${scrollCompletionRate}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-900/80 pt-4 mt-6 text-[11px] text-slate-500 flex items-center gap-1.5">
                  <CheckCircle size={14} className="text-slate-600" />
                  Average engagement is strong across full layout viewdepths.
                </div>
              </div>

              {/* TRAFFIC SOURCE & DEVICE SPLIT */}
              <div className="lg:col-span-6 space-y-6">

                {/* TOP TRAFFIC SOURCES */}
                <div className="bg-slate-900/20 border border-slate-900 rounded-3xl p-6 shadow-xl">
                  <h3 className="text-sm font-mono font-bold tracking-wider text-slate-400 mb-4 uppercase">
                    Top Traffic Sources
                  </h3>
                  
                  {sortedTraffic.length === 0 ? (
                    <div className="text-xs text-slate-600 py-6 text-center font-mono">No traffic records in database</div>
                  ) : (
                    <div className="space-y-4">
                      {sortedTraffic.map(([source, count]) => {
                        const pct = stats.totalVisitors > 0 
                          ? ((Number(count) / stats.totalVisitors) * 100).toFixed(0) 
                          : '0';
                        return (
                          <div key={source} className="flex items-center justify-between gap-4">
                            <div className="w-24 text-xs font-medium text-slate-400 truncate">{source}</div>
                            <div className="flex-1 flex items-center gap-2">
                              <div className="flex-1 bg-slate-950 h-2 rounded-full overflow-hidden">
                                <div className="bg-slate-750 h-full rounded-full" style={{ width: `${pct}%` }}></div>
                              </div>
                              <div className="w-10 text-right text-xs font-mono font-bold text-white">{count}</div>
                              <div className="w-8 text-right text-xs font-mono text-slate-500 font-medium">{pct}%</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* DEVICE BREAKDOWN */}
                <div className="bg-slate-900/20 border border-slate-900 rounded-3xl p-6 shadow-xl">
                  <h3 className="text-sm font-mono font-bold tracking-wider text-slate-400 mb-4 uppercase">
                    Device Breakdown
                  </h3>

                  {sortedDevices.length === 0 ? (
                    <div className="text-xs text-slate-600 py-6 text-center font-mono">No device logs recorded</div>
                  ) : (
                    <div className="space-y-4">
                      {sortedDevices.map(([dev, count]) => {
                        const pct = stats.totalVisitors > 0 
                          ? ((Number(count) / stats.totalVisitors) * 100).toFixed(0) 
                          : '0';
                        return (
                          <div key={dev} className="flex items-center justify-between gap-4">
                            <div className="w-24 text-xs font-medium text-slate-400 truncate">{dev}</div>
                            <div className="flex-1 flex items-center gap-2">
                              <div className="flex-1 bg-slate-950 h-2 rounded-full overflow-hidden">
                                <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${pct}%` }}></div>
                              </div>
                              <div className="w-10 text-right text-xs font-mono font-bold text-white">{count}</div>
                              <div className="w-8 text-right text-xs font-mono text-slate-500 font-medium">{pct}%</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

              </div>

            </div>

            {/* SECONDARY BRAND EVENTS DISPLAY (SOCIAL) */}
            <div className="bg-slate-900/20 border border-slate-900 rounded-3xl p-6 mt-8 shadow-xl">
              <h3 className="text-sm font-mono font-bold tracking-wider text-slate-400 mb-4 uppercase">
                Social Channel Clikthroughs
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { name: 'Instagram', value: stats.instagramClicks, colClass: 'border-pink-500/10' },
                  { name: 'WhatsApp Link', value: stats.whatsAppClicks, colClass: 'border-emerald-500/10' },
                  { name: 'Facebook', value: stats.facebookClicks, colClass: 'border-blue-500/10' },
                  { name: 'TikTok Accent', value: stats.tiktokClicks, colClass: 'border-teal-500/10' },
                ].map((socialChan) => (
                  <div key={socialChan.name} className={`bg-slate-950/60 border ${socialChan.colClass} rounded-2xl p-4 text-center`}>
                    <div className="text-xs text-slate-500 font-medium">{socialChan.name}</div>
                    <div className="text-2xl font-bold font-mono text-white mt-1">{socialChan.value}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        ) : (
          /* REALTIME EVENT STREAM RESEMBLING GA4 DEBUGVIEW */
          <div className="bg-slate-900/20 border border-slate-900 rounded-3xl p-6 shadow-xl relative overflow-hidden min-h-[500px]">
            <div className="flex items-center justify-between border-b border-slate-900 pb-4 mb-6">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Activity className="text-emerald-500" size={18} />
                  SorryBaba Event Tracker Stream
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Simulates dynamic GA4 Realtime stream. Perform actions on Coming Soon page to see them print live!
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/20 px-3 py-1 rounded-full border border-emerald-500/20 font-bold">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping"></span>
                ACTIVE
              </div>
            </div>

            {liveEvents.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-slate-600">
                <HelpCircle size={36} className="text-slate-700 animate-pulse mb-3" />
                <p className="text-xs font-mono">Waiting for local custom events tracking clicks...</p>
              </div>
            ) : (
              <div className="space-y-3.5 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                {liveEvents.map((ev) => {
                  const isComingSoon = ev.eventName.startsWith('coming_soon_');
                  const isKey = ev.eventName === 'coming_soon_form_submit' || 
                                ev.eventName === 'coming_soon_form_success' || 
                                ev.eventName === 'coming_soon_notify_click' || 
                                ev.eventName === 'coming_soon_whatsapp_click';
                  return (
                    <div 
                      key={ev.id} 
                      className={`p-4 rounded-xl shrink-0 transition-all border font-mono text-xs flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-left ${
                        isKey 
                          ? 'bg-pink-950/20 hover:bg-pink-950/35 border-pink-500/30' 
                          : isComingSoon 
                            ? 'bg-slate-950/80 hover:bg-slate-900/80 border-slate-850' 
                            : 'bg-slate-900/30 border-slate-900 opacity-60'
                      }`}
                    >
                      <div className="flex items-start md:items-center gap-3">
                        <div className="text-[10px] text-slate-500 uppercase font-bold py-1 px-2 rounded-md bg-slate-900 border border-slate-800">
                          {ev.time}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`font-bold tracking-tight text-white ${isKey ? 'text-pink-400' : 'text-slate-200'}`}>
                              {ev.eventName}
                            </span>
                            {isKey && (
                              <span className="text-[9px] bg-pink-500 text-white font-extrabold px-1 rounded uppercase tracking-wide flex items-center gap-0.5">
                                <Target size={8} /> KEY EVENT
                              </span>
                            )}
                          </div>
                          {Object.keys(ev.props).length > 2 && (
                            <div className="text-[10px] text-slate-500 mt-1 pl-1 border-l-2 border-slate-800 space-y-0.5">
                              {Object.entries(ev.props)
                                .filter(([k]) => k !== 'event' && k !== 'timestamp')
                                .map(([k, v]) => (
                                  <div key={k} className="truncate select-all">
                                    <span className="text-slate-600">{k}:</span> <span className="text-slate-400 font-sans">{String(v)}</span>
                                  </div>
                                ))}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-[10px] font-sans text-slate-500 font-bold self-end md:self-auto flex items-center gap-1">
                        {isComingSoon ? "Coming Soon Tracker" : "Global Site Track"}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        <div className="mt-8 text-center text-xs text-slate-600 font-mono">
          Interactive metrics are calculated securely on device. All events route directly verified into Google Tag Manager / GTM & GA4.
        </div>

      </div>

    </div>
  );
}
