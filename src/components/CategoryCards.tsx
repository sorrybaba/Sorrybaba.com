/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Sparkles, Smile, MessageCircleHeart } from 'lucide-react';
import { trackEvent } from '../lib/analytics';

interface CategoryCardProps {
  title: string;
  subtitle: string;
  link: string;
  icon: React.ReactNode;
  themeColor: 'pink' | 'blue' | 'purple';
  emoji: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, subtitle, link, icon, themeColor, emoji }) => {
  const isPink = themeColor === 'pink';
  const isBlue = themeColor === 'blue';
  
  const borderStyles = isPink 
    ? 'border-brand-pink-soft/80 hover:border-brand-pink shadow-cute hover:shadow-cute-hover' 
    : isBlue 
    ? 'border-brand-blue-soft hover:border-brand-blue shadow-blue-cute hover:shadow-blue-cute-hover'
    : 'border-purple-200 hover:border-brand-purple shadow-cute hover:shadow-cute-hover';

  const glowStyles = isPink
    ? 'bg-brand-pink-soft/20 group-hover:bg-brand-pink-soft/35'
    : isBlue
    ? 'bg-brand-blue-soft/30 group-hover:bg-brand-blue-soft/50'
    : 'bg-purple-100/40 group-hover:bg-purple-100/60';

  const accentText = isPink
    ? 'text-brand-pink-text bg-brand-pink-soft/40'
    : isBlue
    ? 'text-brand-blue-text bg-brand-blue-soft/50'
    : 'text-brand-purple-text bg-purple-100';

  const handleCardClick = () => {
    trackEvent('category_view', { category_title: title, path: link });
    if (link.includes('wife-husband')) {
      trackEvent('category_wife_husband_selected', { category_title: title });
    } else if (link.includes('girlfriend-boyfriend')) {
      trackEvent('category_girlfriend_boyfriend_selected', { category_title: title });
    } else if (link.includes('other-gifts')) {
      trackEvent('category_other_selected', { category_title: title });
    }
  };

  return (
    <Link
      to={link}
      onClick={handleCardClick}
      className={`group block p-8 rounded-3xl bg-white border transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden ${borderStyles}`}
    >
      {/* Background radial soft light highlight */}
      <div className={`absolute -right-10 -bottom-10 w-44 h-44 rounded-full filter blur-xl opacity-20 transition-all group-hover:scale-125 ${glowStyles}`} />
      
      {/* Absolute floating decorations */}
      <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {isPink ? (
          <Heart className="text-brand-pink fill-brand-pink/30 animate-pulse-custom" size={18} />
        ) : (
          <Sparkles className="text-brand-blue animate-wiggle" size={18} />
        )}
      </div>

      <div className="flex flex-col h-full justify-between gap-6 relative z-10">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className={`p-4 rounded-2xl ${accentText} inline-flex items-center justify-center transition-transform group-hover:rotate-12`}>
              {icon}
            </div>
            <span className="text-3xl filter drop-shadow-sm select-none">{emoji}</span>
          </div>

          <div className="space-y-1.5">
            <h3 className="font-display font-extrabold text-xl md:text-2xl text-gray-800 tracking-tight flex items-center gap-2">
              {title}
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed font-medium">
              {subtitle}
            </p>
          </div>
        </div>

        <div className="pt-2">
          <div className={`inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl transition-all ${
            isPink 
              ? 'text-white bg-brand-pink-text hover:bg-brand-pink-text/95' 
              : isBlue 
              ? 'text-white bg-brand-blue-text hover:bg-brand-blue-text/95' 
              : 'text-white bg-brand-purple-text hover:bg-brand-purple-text/95'
          }`}>
            <span>View Gifts</span>
            <span className="group-hover:translate-x-1.5 transition-transform">→</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export const CategoryCards: React.FC = () => {
  return (
    <section className="py-12 md:py-20 bg-cute-radial">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="text-xs tracking-widest font-mono text-brand-pink-text font-extrabold bg-brand-pink-soft/30 px-3.5 py-1.5 rounded-full uppercase">
            Reconciliation Station 🌸
          </span>
          <h2 className="font-display font-black text-3xl md:text-4xl text-gray-800 tracking-tight mt-3">
            Choose Your Relationship Pathway
          </h2>
          <p className="text-xs md:text-sm text-gray-500 mt-2 font-medium">
            Every apology is different. Select who you want to reconnect with and find the perfect physical or digital expression designed specifically for them.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <CategoryCard
            title="Wife & Husband Gifts"
            subtitle="Deepen your vows, resolve household arguments, and re-establish your family comfort zone with high-grade cozy customized teddy bears & ceramic hot-mugs."
            link="/wife-husband-gifts"
            icon={<MessageCircleHeart size={24} />}
            themeColor="pink"
            emoji="💍"
          />

          <CategoryCard
            title="Girlfriend & Boyfriend"
            subtitle="Apologize passionately, repair romantic misunderstandings, and win their heart back instantly with physical sweet rose boxes, couple bracelets, & cute glowing frames."
            link="/girlfriend-boyfriend-gifts"
            icon={<Heart size={24} className="fill-current" />}
            themeColor="blue"
            emoji="💌"
          />

          <CategoryCard
            title="Other Warm Gifts"
            subtitle="Restore friendship circles, make peace with siblings, or say a gentle sorry to parents and coworkers with aromatherapy stress pouches, customized cards & letters."
            link="/other-gifts"
            icon={<Smile size={24} />}
            themeColor="purple"
            emoji="🌸"
          />

        </div>

      </div>
    </section>
  );
};
