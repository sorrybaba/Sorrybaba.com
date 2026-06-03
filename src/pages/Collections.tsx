import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { SAMPLE_PRODUCTS } from '../data';
import { Star, ArrowRight, ShieldCheck, ShoppingBag, Grid, Layers, Sparkles } from 'lucide-react';
import { trackPageView, trackProductClick, trackSelectItem, trackProductImageClick, trackAddToCart, trackAddToCartClick, trackEGiftClick } from '../lib/analytics';
import { useApp } from '../context/AppContext';
import { SEO } from '../components/SEO';

export interface CollectionData {
  slug: string;
  name: string;
  description: string;
  vibe: string;
  imageSymbol: string;
  filterFn: (products: typeof SAMPLE_PRODUCTS) => typeof SAMPLE_PRODUCTS;
}

export const COLLECTIONS_LIST: CollectionData[] = [
  {
    slug: 'best-sellers',
    name: 'Best Selling Apologies',
    description: 'The proven crowd favorites that have successfully restored dozens of relationships across Sri Lanka province borders.',
    vibe: 'Highly Effective',
    imageSymbol: '🔥',
    filterFn: (prods) => prods.filter(p => p.tags.includes('Popular')),
  },
  {
    slug: 'new-arrivals',
    name: 'New Romantic Launches',
    description: 'Freshly designed physical boxes and interactive digital structures to make your gesture feel completely unique and unexpected.',
    vibe: 'Modern Romance',
    imageSymbol: '✨',
    filterFn: (prods) => prods.filter(p => p.tags.includes('New')),
  },
  {
    slug: 'featured',
    name: 'Featured Masterpieces',
    description: 'Expert-curated combinations featuring comprehensive letters, physical anchors, and immersive emotional sound backings.',
    vibe: 'Curated Elegance',
    imageSymbol: '👑',
    filterFn: (prods) => prods.slice(0, 4),
  },
  {
    slug: 'under-5000-lkr',
    name: 'Budget-Safe Sincerity (Under LKR 5,000)',
    description: 'Beautiful, emotional apology presents designed to make them feel highly cherished without taxing your bank ledger.',
    vibe: 'Accessible Affection',
    imageSymbol: '💖',
    filterFn: (prods) => prods.filter(p => p.price < 5000),
  },
  {
    slug: 'premium-gifts',
    name: 'Luxury Reconciliation Gifting',
    description: 'Ultimate statements of emotional devotion and deep regret, including hand-carved natural frames and imported rose crates.',
    vibe: 'Ultimate Remorse',
    imageSymbol: '💎',
    filterFn: (prods) => prods.filter(p => p.price >= 3500),
  }
];

export const Collections: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addToCart } = useApp();

  const activeCollection = slug ? COLLECTIONS_LIST.find(c => c.slug === slug) : null;

  useEffect(() => {
    if (activeCollection) {
      trackPageView(`/collections/${activeCollection.slug}`);
    } else {
      trackPageView('/collections');
    }
  }, [activeCollection, slug]);

  const handleEGiftRedirect = (product: any) => {
    trackEGiftClick(product.id, product.name);
    trackProductClick(product, 'collection_catalog_egift');
    trackSelectItem(product);
    navigate('/e-gifts');
  };

  const handleProductClick = (product: any) => {
    trackProductClick(product, 'collection_catalog');
    trackSelectItem(product);
  };

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

  // If we are looking at a specific collection sub-route, render filtered grid
  if (activeCollection) {
    const products = activeCollection.filterFn(SAMPLE_PRODUCTS);

    return (
      <div className="space-y-10 font-sans selection:bg-brand-pink-soft selection:text-brand-pink">
        <SEO 
          title={`${activeCollection.name} | Curriculum & Catalog - SorryBaba.com`} 
          description={activeCollection.description} 
        />
        
        {/* Breadcrumb & Navigation */}
        <div className="flex justify-between items-center">
          <Link to="/collections" className="text-xs font-bold text-gray-500 hover:text-brand-pink cursor-pointer flex items-center gap-1">
            <span>← Back to Collections</span>
          </Link>
          <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-gray-400 bg-gray-50 px-2.5 py-1 rounded-lg border">
            {activeCollection.vibe}
          </span>
        </div>

        {/* Collection Header */}
        <section className="text-center max-w-xl mx-auto space-y-3 pt-4">
          <span className="text-5xl select-none select-none filter drop-shadow-sm pb-2 block">{activeCollection.imageSymbol}</span>
          <h1 className="font-display font-black text-2xl md:text-4xl text-gray-850 tracking-tight">
            {activeCollection.name}
          </h1>
          <p className="text-xs md:text-sm text-gray-400 font-medium leading-relaxed font-sans">
            {activeCollection.description}
          </p>
        </section>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border">
            <span className="text-4xl">😿</span>
            <p className="text-xs text-gray-400 font-bold mt-2">No items are matching right now.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {products.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-3xl p-6 border border-gray-150 hover:border-brand-pink-soft shadow-xs hover:shadow-cute transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div
                    onClick={() => {
                      trackProductImageClick(product);
                      trackSelectItem(product);
                      if (product.isEGift) handleEGiftRedirect(product);
                      else navigate(`/product/${product.id}`);
                    }}
                    className="relative aspect-square w-full rounded-2xl bg-brand-bg/60 border border-brand-pink-soft/10 mb-5 flex items-center justify-center text-6xl font-normal overflow-hidden group-hover:scale-[1.02] transform transition-transform select-none cursor-pointer"
                  >
                    <span className="filter drop-shadow-md select-none">{renderProductSymbol(product.image)}</span>
                    <div className="absolute top-3 left-3 flex gap-1">
                      {product.isEGift ? (
                        <span className="text-[9px] font-mono uppercase bg-brand-blue-soft text-brand-blue font-extrabold px-2 py-0.5 rounded-lg border border-brand-blue-soft">E-Gift</span>
                      ) : (
                        <span className="text-[9px] font-mono uppercase bg-brand-pink-soft text-brand-pink font-extrabold px-2 py-0.5 rounded-lg border border-brand-pink-soft">Physical</span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] uppercase font-mono tracking-widest font-extrabold text-brand-purple">
                        For {product.subCategory}
                      </span>
                      <span className="text-xs font-bold text-yellow-500 flex items-center gap-1">
                        ★ <span className="text-gray-600 font-mono text-[10px]">{product.rating}</span>
                      </span>
                    </div>

                    <h3 className="font-display font-extrabold text-gray-800 text-sm leading-tight group-hover:text-brand-pink transition-colors">
                      {product.isEGift ? (
                        <button onClick={() => handleEGiftRedirect(product)} className="text-left font-bold focus:none outline-none cursor-pointer">
                          {product.name}
                        </button>
                      ) : (
                        <Link to={`/product/${product.id}`} onClick={() => handleProductClick(product)} className="font-bold">
                          {product.name}
                        </Link>
                      )}
                    </h3>

                    <p className="text-[11px] text-gray-400 font-medium line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-50 mt-6 flex items-center justify-between gap-2">
                  <div className="flex flex-col">
                    {product.originalPrice && (
                      <span className="text-[10px] line-through text-gray-400 font-mono">
                        LKR {product.originalPrice.toLocaleString()}
                      </span>
                    )}
                    <span className="text-sm font-black text-gray-800 font-mono">
                      LKR {product.price.toLocaleString()}
                    </span>
                  </div>

                  {product.isEGift ? (
                    <button
                      onClick={() => handleEGiftRedirect(product)}
                      className="px-4 py-2 bg-brand-purple text-white hover:bg-brand-purple/95 rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer"
                    >
                      Customize
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        addToCart(product, 1);
                        trackAddToCart(product, 1);
                        trackAddToCartClick(product.id, product.name, 'collections_page');
                      }}
                      className="px-4 py-2 bg-brand-pink text-white hover:bg-brand-pink/95 rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer"
                    >
                      Add To Bag
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    );
  }

  // Normal landing views listing all collections
  return (
    <div className="space-y-12 py-4 font-sans selection:bg-brand-pink-soft selection:text-brand-pink">
      <SEO 
        title="Curated Reconciliation Gift Collections | SorryBaba.com" 
        description="Explore our exclusively curated apology gift categories. Find premium best sellers, budget picks, new arrivals, and high-impact reconciliation options." 
      />
      
      {/* Landing Header */}
      <section className="text-center max-w-xl mx-auto space-y-3">
        <span className="text-[10px] font-mono font-bold tracking-widest text-[#FF1A75] uppercase bg-brand-pink-soft/20 px-3 py-1 rounded-full flex items-center gap-1.5 w-fit mx-auto">
          <Layers size={11} />
          <span>Exclusive Selections</span>
        </span>
        <h1 className="font-display font-black text-3xl md:text-5xl text-gray-800 tracking-tight">
          Explore Our <span className="text-brand-pink">Collections</span>
        </h1>
        <p className="text-xs md:text-sm text-gray-400 font-semibold leading-relaxed">
          Struggling to select a starting point? We group our romantic assets into helpful conceptual bundles based on price ranges, launch dates, and effectiveness metrics.
        </p>
      </section>

      {/* Grid listing collections */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {COLLECTIONS_LIST.map((col) => {
          const matchingProdsCount = col.filterFn(SAMPLE_PRODUCTS).length;
          return (
            <div
              key={col.slug}
              className="group bg-white rounded-3xl p-6 md:p-8 border border-gray-150 flex flex-col justify-between hover:border-brand-pink-soft hover:shadow-cute transition-style duration-300"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center text-[10px] font-mono font-bold text-gray-400">
                  <span className="text-brand-pink uppercase bg-brand-pink-soft/10 px-2 py-0.5 rounded-lg border border-brand-pink/10">{col.vibe}</span>
                  <span className="text-gray-400">({matchingProdsCount} Items)</span>
                </div>

                <h3 className="font-display font-black text-gray-850 text-base md:text-lg tracking-tight group-hover:text-brand-pink transition-colors flex items-center gap-2">
                  <span className="text-2xl select-none">{col.imageSymbol}</span>
                  <span>{col.name}</span>
                </h3>

                <p className="text-xs text-gray-500 font-medium leading-relaxed font-sans line-clamp-3">
                  {col.description}
                </p>
              </div>

              <div className="pt-6 border-t border-gray-50 mt-6 flex justify-between items-center">
                <span className="text-[10px] font-mono font-semibold text-gray-400">Sincerity Guaranteed</span>
                <Link
                  to={`/collections/${col.slug}`}
                  className="flex items-center gap-1 text-xs text-brand-pink font-extrabold uppercase hover:underline"
                >
                  <span>View Items</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          );
        })}
      </section>

    </div>
  );
};
