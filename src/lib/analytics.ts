/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

const GA4_ID = (import.meta as any).env?.VITE_GA4_ID;
const GTM_ID = (import.meta as any).env?.VITE_GTM_ID;

// Initialize Google Analytics block if configured
export function initAnalytics() {
  if (typeof window === 'undefined') return;

  // Initialize GTM
  if (GTM_ID) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
    document.head.appendChild(script);
    console.log(`[SorryBaba Analytics] GTM Initialized with ID: ${GTM_ID}`);
  }

  // Initialize GA4
  if (GA4_ID) {
    const scriptTag = document.createElement('script');
    scriptTag.async = true;
    scriptTag.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
    document.head.appendChild(scriptTag);

    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    window.gtag = gtag as any;
    gtag('js', new Date());
    gtag('config', GA4_ID);
    console.log(`[SorryBaba Analytics] GA4 Initialized with ID: ${GA4_ID}`);
  }
}

// Global helper for tracking across the application
export function trackEvent(eventName: string, properties: Record<string, any> = {}) {
  if (typeof window === 'undefined') return;

  // Safe tracking payload
  const payload = {
    event: eventName,
    timestamp: new Date().toISOString(),
    ...properties
  };

  // Push to GTM dataLayer
  if (window.dataLayer) {
    window.dataLayer.push(payload);
  }

  // Send to GA4
  if (window.gtag && GA4_ID) {
    window.gtag('event', eventName, properties);
  }

  // Visual log to console so users can see events during manual testing
  console.log(`%c[Analytics Event]: %s`, 'color: #FF5FA2; font-weight: bold; font-family: monospace;', eventName, properties);
}
