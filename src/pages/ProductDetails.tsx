/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { SAMPLE_PRODUCTS } from '../data';
import { Heart, Sparkles, Plus, Minus, ArrowLeft, Star, ChevronDown, ChevronUp, ShieldCheck, ShoppingBag } from 'lucide-react';
import { SEO } from '../components/SEO';
import {
  trackViewItem,
  trackProductView,
  trackAddToCart,
  trackAddToCartClick,
  trackProductWhatsAppClick
} from '../lib/analytics';

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, cart } = useApp();

  // Find product by id
  const product = SAMPLE_PRODUCTS.find((p) => p.id === id);

  // States for quantity
  const [quantity, setQuantity] = useState(1);

  // Accordion triggers for mobile-first collapsed views
  const [descOpen, setDescOpen] = useState(true);
  const [specsOpen, setSpecsOpen] = useState(false);
  const [deliveryOpen, setDeliveryOpen] = useState(false);
  const [reviewsOpen, setReviewsOpen] = useState(true);

  useEffect(() => {
    if (product) {
      trackViewItem({
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
      });
      trackProductView({
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
      });
    }
  }, [product, id]);

  if (!product) {
    return (
      <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 max-w-sm mx-auto shadow-xs p-6 space-y-4">
        <SEO 
          title="Apology Gift Not Found | SorryBaba.com" 
          description="The requested apology gift was not found in our catalog. Browse our collection to find the perfect gift." 
        />
        <span className="text-5xl">🙈</span>
        <h1 className="font-display font-black text-gray-800 text-lg">Product Not Found!</h1>
        <p className="text-xs text-gray-400 font-semibold leading-relaxed">
          The requested item does not exist or has been removed from our current apology selection catalog.
        </p>
        <Link to="/all-products" className="inline-block px-5 py-2.5 bg-brand-pink text-white rounded-xl text-xs font-bold shadow-sm">
          Return to Catalog
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    trackAddToCart(product, quantity);
    trackAddToCartClick(product.id, product.name, 'product_details_page');
  };

  const increaseQty = () => setQuantity(prev => prev + 1);
  const decreaseQty = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  // Find 3 complementary items
  const suggestedGifts = SAMPLE_PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  const renderProductSymbol = (imageName: string) => {
    switch (imageName) {
      case 'e-card': return '✉️';
      case 'virtual-flowers': return '💐';
      case 'love-letter': return '📝';
      case 'teddy-bear': return '🧸';
      case 'rose-box': return '🌹';
      case 'memory-frame': return '🖼️';
      case 'magnetic-bracelets': return '🔗';
      case 'mugs-set': return '☕';
      case 'aromatherapy': return '🔮';
      default: return '🎁';
    }
  };

  return (
    <div className="space-y-12 pb-16">
      <SEO 
        title={`${product.name} - Apology Gift | SorryBaba.com`} 
        description={`Send ${product.name} to express your sincere apologies. Price: LKR ${product.price.toLocaleString()}. Premium delivery and high-fidelity apology elements bundled.`} 
      />
      
      {/* Return to catalogs row */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-brand-pink transition-colors focus:none outline-none cursor-pointer"
        >
          <ArrowLeft size={14} />
          <span>Go back</span>
        </button>
      </div>

      {/* Main product card (Split-view details) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        
        {/* Left column: Visual display */}
        <div className="relative aspect-square w-full rounded-3xl bg-white border border-gray-100 shadow-sm flex items-center justify-center text-[110px] md:text-[140px] font-normal overflow-hidden select-none">
          <span className="filter drop-shadow-lg select-none">{renderProductSymbol(product.image)}</span>
          
          <div className="absolute top-5 left-5 flex gap-1">
            {product.isEGift ? (
              <span className="text-[10px] font-mono uppercase bg-brand-blue-soft text-brand-blue font-extrabold px-3 py-1 rounded-xl border border-brand-blue-soft">Electronic E-Gift</span>
            ) : (
              <span className="text-[10px] font-mono uppercase bg-brand-pink-soft text-brand-pink font-extrabold px-3 py-1 rounded-xl border border-brand-pink-soft">Tactile Hand Delivery</span>
            )}
          </div>
        </div>

        {/* Right column: Formative specifications & shopping controllers */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-[10px] font-mono font-bold text-brand-purple uppercase tracking-widest bg-purple-50 px-2.5 py-1 rounded-lg">
              Catalog • {product.category.replace('-', ' & ')}
            </span>
            <h1 className="font-display font-black text-2xl md:text-3xl text-gray-800 tracking-tight leading-tight pt-1">
              {product.name}
            </h1>

            {/* Ratings and reviews bar summary */}
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center text-yellow-500 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={13} className="fill-current" />
                ))}
              </div>
              <span className="font-bold text-gray-700">{product.rating}</span>
              <span className="text-gray-400 font-medium">({product.reviewsCount} verified apologies given)</span>
            </div>
          </div>

          <p className="text-xs md:text-sm text-gray-500 font-medium leading-relaxed">
            {product.description}
          </p>

          {/* Pricing area */}
          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-black text-brand-pink font-mono">
              LKR {product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-xs line-through text-gray-400 font-mono">
                LKR {product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Quantity and Checkout controllers */}
          {!product.isEGift ? (
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest font-mono">Select Quantity</span>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50/50">
                  <button
                    onClick={decreaseQty}
                    className="p-3 text-gray-400 hover:text-brand-pink transition-colors cursor-pointer"
                    aria-label="Reduce"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="px-4 text-sm font-black text-gray-700 font-mono">{quantity}</span>
                  <button
                    onClick={increaseQty}
                    className="p-3 text-gray-400 hover:text-brand-pink transition-colors cursor-pointer"
                    aria-label="Increase"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 bg-brand-pink text-white rounded-2xl text-xs font-extrabold shadow-cute hover:bg-brand-pink/95 transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag size={15} />
                  <span>Add to Greeting Bag</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="pt-4 border-t border-gray-100">
              {/* E-Gift redirect CTA */}
              <button
                onClick={() => navigate('/e-gifts')}
                className="w-full py-4 bg-brand-purple hover:bg-brand-purple/95 text-white font-extrabold text-sm rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles size={16} />
                <span>Configure & Send E-Gift instantly</span>
              </button>
            </div>
          )}

          {/* Secure details tag */}
          <a
            href={`https://wa.me/94776826937?text=Hi%20SorryBaba,%20I%20am%20interested%20in%20the%20apology%20gift%3A%20${encodeURIComponent(product.name)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackProductWhatsAppClick(product.id, product.name)}
            className="p-3.5 bg-green-50 hover:bg-green-100 rounded-2xl border border-green-200 text-[10px] font-semibold text-emerald-800 flex items-center justify-between gap-2 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-green-600 shrink-0" />
              <span>Have questions? Chat with our WhatsApp Apology Concierge</span>
            </div>
            <strong className="text-emerald-700 underline shrink-0 font-bold uppercase tracking-wider">Chat Now</strong>
          </a>

        </div>

      </div>

      {/* MOBILE OPTIMIZED ACCORDIONS SECTION */}
      <section className="space-y-3 bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-xs">
        
        {/* Accordion 1: Long Description */}
        <div className="border-b border-gray-50 pb-3 last:border-0 last:pb-0">
          <button
            onClick={() => setDescOpen(!descOpen)}
            className="w-full flex items-center justify-between text-left py-2 font-display font-bold text-gray-800 text-sm focus:outline-none cursor-pointer"
          >
            <span>Product Significance & Story</span>
            {descOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          
          {descOpen && (
            <div className="pt-3 text-xs text-gray-500 leading-relaxed font-medium">
              {product.longDescription}
            </div>
          )}
        </div>

        {/* Accordion 2: Specs */}
        <div className="border-b border-gray-50 pb-3 last:border-0 last:pb-0 pt-2">
          <button
            onClick={() => setSpecsOpen(!specsOpen)}
            className="w-full flex items-center justify-between text-left py-2 font-display font-bold text-gray-800 text-sm focus:outline-none cursor-pointer"
          >
            <span>Product Specifications</span>
            {specsOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          
          {specsOpen && (
            <div className="pt-3 space-y-2">
              <table className="w-full text-xs font-medium text-gray-500">
                <tbody>
                  {product.specifications.map((spec, i) => (
                    <tr key={i} className="border-b border-gray-50 last:border-0">
                      <td className="py-2 font-bold text-gray-700 w-1/3">{spec.name}</td>
                      <td className="py-2 text-gray-500">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Accordion 3: Delivery Info */}
        <div className="border-b border-gray-50 pb-3 last:border-0 last:pb-0 pt-2">
          <button
            onClick={() => setDeliveryOpen(!deliveryOpen)}
            className="w-full flex items-center justify-between text-left py-2 font-display font-bold text-gray-800 text-sm focus:outline-none cursor-pointer"
          >
            <span>Shipping & Delivery Policy</span>
            {deliveryOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          
          {deliveryOpen && (
            <div className="pt-3 text-xs text-gray-500 leading-relaxed font-medium space-y-2">
              <p>⏰ <strong>Digital E-Gifts</strong>: Finalized by our design coordinator and emailed/sent via WhatsApp in under 30 minutes! Free delivery worldwide.</p>
              <p>🚛 <strong>Physical Gifts</strong>: Flat rate of <strong>LKR 350</strong>. Delivered across any province in Sri Lanka. Under 1-2 days within Colombo suburbs, and 2-3 business days for outstations.</p>
              <p>🎁 <strong>Signature Wrapping</strong>: Every physical item is packed in a scented signature gift-box lined with fine tissue paper, plus a complimentary printed apology letter card.</p>
            </div>
          )}
        </div>

        {/* Accordion 4: Customer Reviews list */}
        <div className="pt-2">
          <button
            onClick={() => setReviewsOpen(!reviewsOpen)}
            className="w-full flex items-center justify-between text-left py-2 font-display font-bold text-gray-800 text-sm focus:outline-none cursor-pointer"
          >
            <span>Verified Customer Reviews ({product.reviews.length})</span>
            {reviewsOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          
          {reviewsOpen && (
            <div className="pt-4 space-y-4">
              {product.reviews.map((rev) => (
                <div key={rev.id} className="p-4 bg-brand-bg/40 rounded-2xl border border-brand-pink-soft/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-brand-pink-soft/50 text-brand-pink flex items-center justify-center font-bold text-[10px] select-none">
                        {rev.author.charAt(0)}
                      </span>
                      <strong className="text-xs text-gray-700">{rev.author}</strong>
                      {rev.relationship && (
                        <span className="text-[9px] font-mono bg-white text-brand-purple border border-brand-purple/20 px-1.5 py-0.5 rounded-lg">
                          {rev.relationship}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-gray-400 font-mono">{rev.date}</span>
                  </div>

                  <div className="flex items-center text-yellow-500 gap-0.5">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={11} className="fill-current" />
                    ))}
                  </div>

                  <p className="text-[11px] leading-relaxed text-gray-500 font-medium italic">
                    "{rev.comment}"
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

      </section>

      {/* Related Complementary Gifts */}
      <section className="space-y-6">
        <h3 className="font-display font-bold text-gray-800 text-base">You might also want to add:</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {suggestedGifts.map((p) => (
            <div
              key={p.id}
              className="bg-white p-4 rounded-3xl border border-gray-100 hover:border-brand-pink-soft shadow-xs hover:shadow-cute flex items-center gap-4 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-brand-bg rounded-2xl flex items-center justify-center text-3xl shrink-0 select-none">
                {renderProductSymbol(p.image)}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-display font-bold text-xs text-gray-800 truncate">
                  {p.name}
                </h4>
                <span className="text-xs font-black text-brand-pink font-mono block mt-1">LKR {p.price.toLocaleString()}</span>
                <Link
                  to={p.isEGift ? `/e-gifts` : `/product/${p.id}`}
                  className="text-[10px] text-brand-purple hover:underline font-bold mt-1.5 block"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
