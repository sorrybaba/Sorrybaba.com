import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { BLOG_ARTICLES } from './Blog';
import { ArrowLeft, Calendar, User, Clock, ChevronRight } from 'lucide-react';
import { trackPageView } from '../lib/analytics';

export const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const article = BLOG_ARTICLES.find((art) => art.slug === slug);

  useEffect(() => {
    if (article) {
      trackPageView(`/blog/${article.slug}`);
    }
  }, [article, slug]);

  if (!article) {
    return (
      <div className="text-center py-20 bg-white rounded-3xl border border-gray-150 max-w-sm mx-auto p-6 space-y-4">
        <span className="text-5xl">🕵️</span>
        <h3 className="font-display font-black text-gray-800 text-lg">Article Not Found!</h3>
        <p className="text-xs text-gray-400 font-semibold leading-relaxed">
          The requested blog article has been moved or does not exist under SorryBaba’s current library.
        </p>
        <Link to="/blog" className="inline-block px-5 py-2.5 bg-brand-pink text-white rounded-xl text-xs font-bold shadow-sm">
          Return to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-4 font-sans selection:bg-brand-pink-soft selection:text-brand-pink">
      
      {/* Breadcrumbs navigation structure */}
      <nav className="flex items-center gap-1.5 text-[11px] font-bold text-gray-400 uppercase tracking-wide">
        <Link to="/" className="hover:text-brand-pink">Home</Link>
        <ChevronRight size={10} />
        <Link to="/blog" className="hover:text-brand-pink">Blog</Link>
        <ChevronRight size={10} />
        <span className="text-gray-600 truncate max-w-[200px]">{article.title}</span>
      </nav>

      {/* Hero Header */}
      <header className="space-y-4">
        <span className="text-[10px] font-mono font-bold tracking-widest text-brand-pink uppercase bg-brand-pink-soft/20 px-2.5 py-1 rounded-lg">
          {article.category}
        </span>
        <h1 className="font-display font-black text-2xl md:text-4xl text-gray-900 tracking-tight leading-tight">
          <span className="mr-2 text-3xl md:text-4xl select-none">{article.emoji}</span>
          {article.title}
        </h1>

        {/* Metadata section */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-gray-400 pt-1 font-semibold border-b border-gray-50 pb-5">
          <span className="flex items-center gap-1.5">
            <User size={13} className="text-brand-pink" />
            <span>By {article.author}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar size={13} />
            <span>{article.date}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={13} />
            <span>{article.readTime}</span>
          </span>
        </div>
      </header>

      {/* Main Body paragraphs content */}
      <article className="space-y-6 text-xs md:text-sm text-gray-600 leading-relaxed font-normal">
        {article.content.map((para, idx) => (
          <p key={idx} className="font-medium">
            {para}
          </p>
        ))}
      </article>

      {/* CTA Footer Panel */}
      <footer className="pt-8 border-t border-gray-150 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-12 bg-slate-50 p-6 rounded-3xl">
        <div className="space-y-1">
          <h4 className="font-display font-bold text-gray-800 text-xs">Help your relationship recover today</h4>
          <p className="text-[10px] text-gray-400 font-semibold leading-relaxed">
            Choose from custom digital cards and hand-wrapped physical gifts coordinated instantly over WhatsApp.
          </p>
        </div>
        <Link
          to="/products"
          className="px-5 py-2.5 bg-brand-pink text-white text-xs font-bold rounded-xl text-center shadow-cute hover:bg-brand-pink/90 transition-all cursor-pointer inline-block whitespace-nowrap"
        >
          Explore Apology Gifts
        </Link>
      </footer>

      {/* Back button */}
      <div>
        <button
          onClick={() => navigate('/blog')}
          className="inline-flex items-center gap-1 text-xs font-bold text-gray-400 hover:text-brand-pink cursor-pointer"
        >
          <ArrowLeft size={13} />
          <span>Back to all articles</span>
        </button>
      </div>

    </div>
  );
};
