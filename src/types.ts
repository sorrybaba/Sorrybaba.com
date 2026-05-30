/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  relationship?: string;
  avatar?: string;
}

export type GiftCategory = 'wife-husband' | 'girlfriend-boyfriend' | 'other' | 'e-gift';
export type GiftSubCategory = 'wife' | 'husband' | 'girlfriend' | 'boyfriend' | 'women' | 'men';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string; // Tailwind-friendly decorative SVG thumbnail representation
  category: GiftCategory;
  subCategory: GiftSubCategory;
  isEGift: boolean;
  description: string;
  longDescription: string;
  rating: number;
  reviewsCount: number;
  tags: ('Romantic' | 'Anniversary' | 'Birthday' | 'Apology' | 'Popular' | 'New' | 'Physical' | 'E-Gift' | string)[];
  specifications: { name: string; value: string }[];
  reviews: Review[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSubCategory?: string;
}

export interface OrderDetails {
  fullName: string;
  phone: string;
  whatsApp: string;
  email: string;
  address: string;
  city: string;
  province: string;
  giftMessage: string;
  specialNotes: string;
  paymentMethod: 'cod' | 'bank' | 'whatsapp';
}

export interface AnalyticsEvent {
  eventName: string;
  properties?: Record<string, any>;
}
