/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SAMPLE_PRODUCTS } from '../data';

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

// Fallback to the hardcoded ID values of SorryBaba in index.html for maximum reliability
const GA4_ID = (import.meta as any).env?.VITE_GA4_ID || "G-ZE2Q73E852";
const GTM_ID = (import.meta as any).env?.VITE_GTM_ID || "GTM-P9GLNMLK";

export function initAnalytics() {
  if (typeof window === 'undefined') return;

  // Initialize GTM dataLayer if not initialized
  window.dataLayer = window.dataLayer || [];

  // GTM activation tracking script if GTM_ID is defined and not already instantiated
  const hasGtmScript = Array.from(document.scripts).some(s => s.src.includes(`id=${GTM_ID}`));
  if (GTM_ID && !hasGtmScript) {
    if (!window.dataLayer.some(e => e.event === 'gtm.js')) {
      window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
    }
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
    document.head.appendChild(script);
    console.log(`[SorryBaba Analytics] GTM Initialized on demand with ID: ${GTM_ID}`);
  }

  // GA4 activation tracking script if GA4_ID is defined and not already instantiated
  const hasGaScript = Array.from(document.scripts).some(s => s.src.includes(`id=${GA4_ID}`));
  if (GA4_ID && !hasGaScript) {
    const scriptTag = document.createElement('script');
    scriptTag.async = true;
    scriptTag.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
    document.head.appendChild(scriptTag);

    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    window.gtag = gtag as any;
    gtag('js', new Date());
    gtag('config', GA4_ID);
    console.log(`[SorryBaba Analytics] GA4 Initialized on demand with ID: ${GA4_ID}`);
  }
}

// Low-level Tracking Core pushing both to standard GTM dataLayer and GA4
export function trackEvent(eventName: string, properties: Record<string, any> = {}) {
  if (typeof window === 'undefined') return;

  // Make sure dataLayer is initialized
  window.dataLayer = window.dataLayer || [];

  // Extract parameters for easy root-level consumption inside the Google Tag Manager interface
  const payload = {
    event: eventName,
    timestamp: new Date().toISOString(),
    page_name: properties.page_name || properties.page_title || '',
    product_name: properties.product_name || properties.name || '',
    product_id: properties.product_id || properties.id || '',
    category: properties.category || properties.product_category || '',
    price: properties.price !== undefined ? properties.price : '',
    quantity: properties.quantity !== undefined ? properties.quantity : '',
    cart_value: properties.cart_value !== undefined ? properties.cart_value : '',
    payment_method: properties.payment_method || '',
    ...properties
  };

  // Push event + root parameters to GTM
  window.dataLayer.push(payload);

  // Send event to GA4
  if (window.gtag) {
    window.gtag('event', eventName, properties);
  } else if ((window as any).gtag) {
    (window as any).gtag('event', eventName, properties);
  }

  // Visual Console logger for testing & verification
  console.log(
    `%c[SorryBaba Tracker] Event: %s`,
    'color: #FF1A75; font-weight: bold; font-family: sans-serif; background-color: #FFE6F0; padding: 2px 6px; borderRadius: 4px;',
    eventName,
    properties
  );
}

/* ==========================================================================
   1. PAGE VIEW TRACKING
   ========================================================================== */
let lastTrackedPath = '';
let lastTrackedTime = 0;

export function trackPageView(pathname: string, search: string = '') {
  const fullPathname = pathname + search;
  const now = Date.now();
  if (fullPathname === lastTrackedPath && now - lastTrackedTime < 30) {
    return;
  }
  lastTrackedPath = fullPathname;
  lastTrackedTime = now;

  let eventName = 'page_view';
  let pageTitle = '';
  let metaDesc = '';

  const cleanedPath = pathname.split('?')[0];
  const queryParams = new URLSearchParams(search);
  const tab = queryParams.get('tab');

  if (cleanedPath === '/' || cleanedPath === '') {
    eventName = 'home_page_view';
    pageTitle = 'SorryBaba.com | Cute Apology Gifts & Romantic Digital Present Delivery';
    metaDesc = 'Cute Apology Gifts & Romantic Digital Present Delivery. Dissolve marital silences, apologize to your partner, wife, husband, girlfriend or boyfriend with handpicked cozy present bundles.';
  } else if (cleanedPath.includes('/wife-husband-gifts')) {
    if (tab === 'husband') {
      eventName = 'husband_gifts_page_view';
      pageTitle = 'Husband Apology Gifts | SorryBaba.com';
      metaDesc = 'Handpicked cute apology gifts and romantic presents for your husband. Express your sincere apologies with cozy tokens of love.';
    } else {
      eventName = 'wife_gifts_page_view';
      pageTitle = 'Wife Apology Gifts | SorryBaba.com';
      metaDesc = 'Handpicked cute apology gifts and romantic presents for your wife. Re-ignite your commitment and dissolve marital silences today.';
    }
  } else if (cleanedPath.includes('/girlfriend-boyfriend-gifts')) {
    if (tab === 'boyfriend') {
      eventName = 'boyfriend_gifts_page_view';
      pageTitle = 'Boyfriend Apology Gifts | SorryBaba.com';
      metaDesc = 'Find thoughtful apology gifts and romantic presents for your boyfriend. Make up with cute and emotional surprises.';
    } else {
      eventName = 'girlfriend_gifts_page_view';
      pageTitle = 'Girlfriend Apology Gifts | SorryBaba.com';
      metaDesc = 'Discover the best apology gifts and romantic surprises for your girlfriend. Soft plushies, custom letters, and digital presents.';
    }
  } else if (cleanedPath.includes('/other-gifts')) {
    eventName = 'other_gifts_page_view';
    pageTitle = 'Special Gifts | SorryBaba.com';
    metaDesc = 'Browse special gifts, apology packages, and other unique present options to make someone smile or say sorry.';
  } else if (cleanedPath.includes('/e-gifts')) {
    eventName = 'e_gifts_page_view';
    pageTitle = 'Digital E-Gifts | SorryBaba.com';
    metaDesc = 'Personalize cute digital apology cards, music playbacks, or virtual keepsakes and send them instantly to your partner.';
  } else if (cleanedPath.includes('/all-products')) {
    eventName = 'all_products_page_view';
    pageTitle = 'All Gifts | SorryBaba.com';
    metaDesc = 'Browse our full catalog of apology gifts, romantic presents, e-gifts, and luxury customized scrolls.';
  } else if (cleanedPath.includes('/product/')) {
    eventName = 'product_details_page_view';
    const productId = cleanedPath.split('/product/')[1];
    const product = SAMPLE_PRODUCTS.find(p => p.id === productId);
    if (product) {
      pageTitle = `${product.name} | SorryBaba.com`;
      metaDesc = `Send '${product.name}' as a sweet apology gift. ${product.description || 'Explore our beautiful present ideas to win back their heart.'}`;
    } else {
      pageTitle = 'Product Details | SorryBaba.com';
      metaDesc = 'Explore our apology gift options and premium customized details.';
    }
  } else if (cleanedPath.includes('/cart')) {
    eventName = 'cart_page_view';
    pageTitle = 'Shopping Cart | SorryBaba.com';
    metaDesc = 'View your shopping cart, review selected apology gifts and options before checking out.';
  } else if (cleanedPath.includes('/checkout')) {
    eventName = 'checkout_page_view';
    pageTitle = 'Checkout | SorryBaba.com';
    metaDesc = 'Complete your order details and delivery information. Send your apologies with SorryBaba.';
  } else if (cleanedPath.includes('/contact-us')) {
    eventName = 'contact_page_view';
    pageTitle = 'Contact Us | SorryBaba.com';
    metaDesc = 'Get in touch with SorryBaba customer support. Contact our 24/7 team via WhatsApp or email.';
  } else if (cleanedPath.includes('/faq')) {
    eventName = 'faq_page_view';
    pageTitle = 'FAQ | SorryBaba.com';
    metaDesc = 'Read answers to frequently asked questions about our apology gifts, delivery status, customization, and payments.';
  } else if (cleanedPath.includes('/privacy-policy')) {
    eventName = 'privacy_policy_page_view';
    pageTitle = 'Privacy Policy | SorryBaba.com';
    metaDesc = 'Read the Privacy Policy of SorryBaba.com to understand how we secure your data and personal information.';
  } else if (cleanedPath.includes('/terms-conditions')) {
    eventName = 'terms_page_view';
    pageTitle = 'Terms & Conditions | SorryBaba.com';
    metaDesc = 'Read the Terms and Conditions of SorryBaba.com for custom details regarding delivery and service terms.';
  } else if (cleanedPath.includes('/success')) {
    eventName = 'order_success_page_view';
    pageTitle = 'Order Success | SorryBaba.com';
    metaDesc = 'Thank you for your order! Your apology gift order was successfully placed.';
  } else {
    eventName = 'other_page_view';
    pageTitle = 'SorryBaba.com | Cute Apology Gifts';
    metaDesc = 'Cute apology gifts and romantic presents for your favorite person.';
  }

  // Live updates to Browser elements (title & meta tags)
  if (typeof document !== 'undefined') {
    document.title = pageTitle;
    
    // Update/Create meta description
    let metaDescTag = document.querySelector('meta[name="description"]');
    if (metaDescTag) {
      metaDescTag.setAttribute('content', metaDesc);
    } else {
      metaDescTag = document.createElement('meta');
      metaDescTag.setAttribute('name', 'description');
      metaDescTag.setAttribute('content', metaDesc);
      document.head.appendChild(metaDescTag);
    }
  }

  // Track config in GA4 dynamically so future event dispatches align on correct page reference
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA4_ID, {
      page_title: pageTitle,
      page_path: fullPathname,
      page_location: window.location.href,
    });
  }

  // Push standard GTM and custom tracking log
  trackEvent('page_view', {
    page_title: pageTitle,
    page_path: fullPathname,
    page_name: eventName,
  });
}

/* ==========================================================================
   2. PRODUCT TRACKING
   ========================================================================== */
export interface ProductPayload {
  id: string;
  name: string;
  category: string;
  price: number;
}

export function trackViewItem(product: ProductPayload) {
  trackEvent('view_item', {
    product_id: product.id,
    product_name: product.name,
    product_category: product.category,
    price: product.price,
  });
}

export function trackSelectItem(product: ProductPayload) {
  trackEvent('select_item', {
    product_id: product.id,
    product_name: product.name,
    product_category: product.category,
    price: product.price,
  });
}

export function trackProductView(product: ProductPayload) {
  trackEvent('product_view', {
    product_id: product.id,
    product_name: product.name,
    product_category: product.category,
    price: product.price,
  });
}

export function trackProductClick(product: ProductPayload, source?: string) {
  trackEvent('product_click', {
    product_id: product.id,
    product_name: product.name,
    product_category: product.category,
    price: product.price,
    click_source: source || 'unknown',
  });
}

export function trackProductImageClick(product: ProductPayload) {
  trackEvent('product_image_click', {
    product_id: product.id,
    product_name: product.name,
    product_category: product.category,
    price: product.price,
  });
}

export function trackProductSearchResultClick(product: ProductPayload, searchTerm: string) {
  trackEvent('product_search_result_click', {
    product_id: product.id,
    product_name: product.name,
    product_category: product.category,
    price: product.price,
    search_term: searchTerm,
  });
}

/* ==========================================================================
   3. SEARCH TRACKING
   ========================================================================== */
export function trackSearchUsed(searchTerm: string, resultsCount: number) {
  trackEvent('search_used', {
    search_term: searchTerm,
    results_count: resultsCount,
  });
}

/* ==========================================================================
   4. FILTER TRACKING
   ========================================================================== */
export function trackFilterPriceUsed(price: number) {
  trackEvent('filter_price_used', {
    price_max: price,
  });
}

export function trackFilterCategoryUsed(category: string) {
  trackEvent('filter_category_used', {
    category_selected: category,
  });
}

export function trackFilterEGiftUsed(enabled: boolean | string) {
  trackEvent('filter_egift_used', {
    egift_only: enabled,
  });
}

export function trackFilterPopularUsed(enabled: boolean | string) {
  trackEvent('filter_popular_used', {
    popular_only: enabled,
  });
}

export function trackFilterRomanticUsed(enabled: boolean | string) {
  trackEvent('filter_romantic_used', {
    romantic_only: enabled,
  });
}

export function trackFilterApologyUsed(enabled: boolean | string) {
  trackEvent('filter_apology_used', {
    apology_only: enabled,
  });
}

/* ==========================================================================
   5. CART TRACKING
   ========================================================================== */
export function trackAddToCart(product: ProductPayload, quantity: number) {
  trackEvent('add_to_cart', {
    product_id: product.id,
    product_name: product.name,
    product_category: product.category,
    price: product.price,
    quantity,
    cart_value: product.price * quantity,
  });
}

export function trackRemoveFromCart(product: ProductPayload, quantity: number) {
  trackEvent('remove_from_cart', {
    product_id: product.id,
    product_name: product.name,
    product_category: product.category,
    price: product.price,
    quantity,
    cart_value: product.price * quantity,
  });
}

export function trackViewCart(cartItemsCount: number, cartSubtotal: number) {
  trackEvent('view_cart', {
    item_count: cartItemsCount,
    cart_value: cartSubtotal,
  });
}

export function trackUpdateCartQuantity(product: ProductPayload, quantity: number) {
  trackEvent('update_cart_quantity', {
    product_id: product.id,
    product_name: product.name,
    product_category: product.category,
    price: product.price,
    quantity,
    cart_value: product.price * quantity,
  });
}

export function trackClearCart() {
  trackEvent('clear_cart');
}

/* ==========================================================================
   6. BUTTON CLICK TRACKING
   ========================================================================== */
export function trackFloatingWhatsAppClick() {
  trackEvent('floating_whatsapp_click');
}

export function trackProductWhatsAppClick(productId: string, productName: string) {
  trackEvent('product_whatsapp_click', {
    product_id: productId,
    product_name: productName,
  });
}

export function trackAddToCartClick(productId: string, productName: string, source: string) {
  trackEvent('add_to_cart_click', {
    product_id: productId,
    product_name: productName,
    click_source: source,
  });
}

export function trackViewFullCartClick() {
  trackEvent('view_full_cart_click');
}

export function trackProceedToCheckoutClick(cartValue: number, itemCount: number) {
  trackEvent('proceed_to_checkout_click', {
    cart_value: cartValue,
    item_count: itemCount,
  });
}

export function trackContinueShoppingClick() {
  trackEvent('continue_shopping_click');
}

export function trackPlaceOrderClick(cartValue: number, itemCount: number, paymentMethod: string) {
  trackEvent('place_order_click', {
    cart_value: cartValue,
    item_count: itemCount,
    payment_method: paymentMethod,
  });
}

export function trackContactFormSubmit(name: string, email: string) {
  trackEvent('contact_form_submit', {
    sender_name: name,
    sender_email: email,
  });
}

export function trackSearchButtonClick(searchTerm: string) {
  trackEvent('search_button_click', {
    search_term: searchTerm,
  });
}

export function trackSendGiftCtaClick() {
  trackEvent('send_gift_cta_click');
}

export function trackExploreEGiftsCtaClick() {
  trackEvent('explore_egifts_cta_click');
}

/* ==========================================================================
   7. CHECKOUT TRACKING
   ========================================================================== */
export function trackBeginCheckout(cartValue: number, itemCount: number) {
  trackEvent('begin_checkout', {
    cart_value: cartValue,
    item_count: itemCount,
  });
}

export function trackCheckoutStep1(cartValue: number, itemCount: number) {
  trackEvent('checkout_step_1', {
    cart_value: cartValue,
    item_count: itemCount,
  });
}

export function trackCheckoutStep2(city: string, cartValue: number, itemCount: number) {
  trackEvent('checkout_step_2', {
    customer_city: city,
    cart_value: cartValue,
    item_count: itemCount,
  });
}

export function trackCheckoutReview(city: string, paymentMethod: string, cartValue: number, itemCount: number) {
  trackEvent('checkout_review', {
    customer_city: city,
    payment_method: paymentMethod,
    cart_value: cartValue,
    item_count: itemCount,
  });
}

export function trackCheckoutSubmit(city: string, paymentMethod: string, cartValue: number, itemCount: number) {
  trackEvent('checkout_submit', {
    customer_city: city,
    payment_method: paymentMethod,
    cart_value: cartValue,
    item_count: itemCount,
  });
}

/* ==========================================================================
   8. PAYMENT METHOD TRACKING
   ========================================================================== */
export function trackPaymentMethodCodSelected(cartValue: number, itemCount: number) {
  trackEvent('payment_method_cod_selected', {
    cart_value: cartValue,
    item_count: itemCount,
  });
}

export function trackPaymentMethodBankTransferSelected(cartValue: number, itemCount: number) {
  trackEvent('payment_method_bank_transfer_selected', {
    cart_value: cartValue,
    item_count: itemCount,
  });
}

export function trackPaymentMethodWhatsAppSelected(cartValue: number, itemCount: number) {
  trackEvent('payment_method_whatsapp_selected', {
    cart_value: cartValue,
    item_count: itemCount,
  });
}

/* ==========================================================================
   9. WHATSAPP ORDER TRACKING
   ========================================================================== */
export function trackWhatsAppOrderStarted(orderValue: number, itemCount: number, paymentMethod: string) {
  trackEvent('whatsapp_order_started', {
    order_value: orderValue,
    item_count: itemCount,
    selected_payment_method: paymentMethod,
  });
}

export function trackWhatsAppOrderMessageGenerated(orderValue: number, itemCount: number) {
  trackEvent('whatsapp_order_message_generated', {
    order_value: orderValue,
    item_count: itemCount,
  });
}

export function trackWhatsAppOrderSent(orderValue?: number, itemCount?: number, paymentMethod?: string) {
  trackEvent('whatsapp_order_sent', {
    order_value: orderValue || 0,
    item_count: itemCount || 0,
    selected_payment_method: paymentMethod || 'whatsapp',
  });
}

/* ==========================================================================
   10. CONTACT PAGE TRACKING & OTHER VIEWS
   ========================================================================== */
export function trackContactPageView() {
  trackEvent('contact_page_view');
}

export function trackWhatsAppSupportClick() {
  trackEvent('whatsapp_support_click');
}

/* ==========================================================================
   11. CATEGORY TRACKING
   ========================================================================== */
export function trackWifeSelected() { trackEvent('wife_selected'); }
export function trackHusbandSelected() { trackEvent('husband_selected'); }
export function trackGirlfriendSelected() { trackEvent('girlfriend_selected'); }
export function trackBoyfriendSelected() { trackEvent('boyfriend_selected'); }
export function trackWomenSelected() { trackEvent('women_selected'); }
export function trackMenSelected() { trackEvent('men_selected'); }

/* ==========================================================================
   12. E-GIFT TRACKING
   ========================================================================== */
export function trackEGiftView(productId: string, productName: string) {
  trackEvent('egift_view', {
    product_id: productId,
    product_name: productName,
  });
}

export function trackEGiftClick(productId: string, productName: string) {
  trackEvent('egift_click', {
    product_id: productId,
    product_name: productName,
  });
}

export function trackEGiftCheckoutStart(productId: string, productName: string, price: number) {
  trackEvent('egift_checkout_start', {
    product_id: productId,
    product_name: productName,
    price: price,
  });
}

export function trackEGiftPurchase(productId: string, productName: string, price: number) {
  trackEvent('egift_purchase', {
    product_id: productId,
    product_name: productName,
    price: price,
  });
}
