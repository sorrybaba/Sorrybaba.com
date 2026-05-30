/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Product } from '../types';
import { trackEvent } from '../lib/analytics';

interface AppContextProps {
  cart: CartItem[];
  isCartOpen: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  addToCart: (product: Product, quantity?: number, selectedSubCategory?: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCartDrawer: (isOpen: boolean) => void;
  cartTotalItems: number;
  cartSubtotal: number;
  cartShipping: number;
  cartGrandTotal: number;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Initial load from local storage
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('sorrybaba_cart');
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    } catch (e) {
      console.error('Failed to load cart from localStorage', e);
    }
  }, []);

  // Save to local storage on change
  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    try {
      localStorage.setItem('sorrybaba_cart', JSON.stringify(newCart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  };

  const addToCart = (product: Product, quantity = 1, selectedSubCategory?: string) => {
    const existingIndex = cart.findIndex((item) => item.product.id === product.id);
    let updatedCart = [...cart];

    if (existingIndex > -1) {
      updatedCart[existingIndex].quantity += quantity;
    } else {
      updatedCart.push({ product, quantity, selectedSubCategory });
    }

    saveCart(updatedCart);
    setIsCartOpen(true); // Auto-open cart drawer on adding item

    // Trigger standard Analytics Event
    trackEvent('add_to_cart', {
      product_id: product.id,
      product_name: product.name,
      price: product.price,
      quantity,
      is_e_gift: product.isEGift,
      category: product.category
    });
  };

  const removeFromCart = (productId: string) => {
    const matchedItem = cart.find((item) => item.product.id === productId);
    const updatedCart = cart.filter((item) => item.product.id !== productId);
    saveCart(updatedCart);

    if (matchedItem) {
      trackEvent('remove_from_cart', {
        product_id: productId,
        product_name: matchedItem.product.name,
        price: matchedItem.product.price
      });
    }
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    const updatedCart = cart.map((item) => {
      if (item.product.id === productId) {
        return { ...item, quantity };
      }
      return item;
    });

    saveCart(updatedCart);

    trackEvent('update_cart_quantity', {
      product_id: productId,
      new_quantity: quantity
    });
  };

  const clearCart = () => {
    saveCart([]);
    trackEvent('clear_cart');
  };

  const toggleCartDrawer = (isOpen: boolean) => {
    setIsCartOpen(isOpen);
    if (isOpen) {
      trackEvent('view_cart', {
        items_count: cart.length,
        subtotal: cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
      });
    }
  };

  // Derived Values
  const cartTotalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  
  // Free delivery for digital gifts only, flat LKR 350 if physical gifts are in the cart
  const hasPhysicalGifts = cart.some(item => !item.product.isEGift);
  const cartShipping = cartTotalItems > 0 && hasPhysicalGifts ? 350 : 0;
  
  const cartGrandTotal = cartSubtotal + cartShipping;

  return (
    <AppContext.Provider
      value={{
        cart,
        isCartOpen,
        searchQuery,
        setSearchQuery,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleCartDrawer,
        cartTotalItems,
        cartSubtotal,
        cartShipping,
        cartGrandTotal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
