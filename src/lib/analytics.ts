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
export function trackPageView(pathname: string) {
  let eventName = 'home_page_view';
  let pageTitle = 'Home';

  const cleanedPath = pathname.split('?')[0];

  if (cleanedPath === '/' || cleanedPath === '') {
    eventName = 'home_page_view';
    pageTitle = 'Home';
  } else if (cleanedPath.includes('/wife-husband-gifts')) {
    eventName = 'wife_husband_page_view';
    pageTitle = 'Wife & Husband Gifts';
  } else if (cleanedPath.includes('/girlfriend-boyfriend-gifts')) {
    eventName = 'girlfriend_boyfriend_page_view';
    pageTitle = 'Girlfriend & Boyfriend Gifts';
  } else if (cleanedPath.includes('/other-gifts')) {
    eventName = 'other_gifts_page_view';
    pageTitle = 'Other Apology Gifts';
  } else if (cleanedPath.includes('/e-gifts')) {
    eventName = 'e_gifts_page_view';
    pageTitle = 'E-Gifts Customizer-Main';
  } else if (cleanedPath.includes('/all-products')) {
    eventName = 'all_products_page_view';
    pageTitle = 'All Products Catalog';
  } else if (cleanedPath.includes('/product/')) {
    eventName = 'product_details_page_view';
    pageTitle = 'Product Details';
  } else if (cleanedPath.includes('/cart')) {
    eventName = 'cart_page_view';
    pageTitle = 'Full Cart Page';
  } else if (cleanedPath.includes('/checkout')) {
    eventName = 'checkout_page_view';
    pageTitle = 'Checkout Page';
  } else if (cleanedPath.includes('/contact-us')) {
    eventName = 'contact_page_view';
    pageTitle = 'Contact Us Page';
  } else if (cleanedPath.includes('/faq')) {
    eventName = 'faq_page_view';
    pageTitle = 'FAQ Page';
  } else if (cleanedPath.includes('/privacy-policy')) {
    eventName = 'privacy_policy_page_view';
    pageTitle = 'Privacy Policy Page';
  } else if (cleanedPath.includes('/terms-conditions')) {
    eventName = 'terms_page_view';
    pageTitle = 'Terms and Conditions Page';
  } else if (cleanedPath.includes('/success')) {
    eventName = 'order_success_page_view';
    pageTitle = 'Order Completed Page';
  } else {
    eventName = 'other_page_view';
    pageTitle = pathname;
  }

  trackEvent(eventName, {
    page_title: pageTitle,
    page_path: pathname,
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
