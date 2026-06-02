import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, ArrowRight, User, Hash } from 'lucide-react';
import { trackPageView } from '../lib/analytics';

export interface BlogArticle {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  emoji: string;
  content: string[];
}

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    slug: 'how-to-apologize-to-wife',
    title: 'Heal Your Bond: How to Apologize to Your Wife After a Deep Argument',
    excerpt: 'Arguments can leave deep silence in bedrooms. Here is a step-by-step roadmap to expressing genuine remorse, regaining intimacy, and putting a warm smile back on her face.',
    category: 'Relationship Repair',
    readTime: '5 min read',
    date: 'June 01, 2026',
    author: 'Dr. Chalani Perera',
    emoji: '🌸',
    content: [
      'Every marriage experiences moments of intense testing, and severe arguments are just a natural, albeit painful, side-effect of combining two distinct lives. However, what matters isn’t the argument itself—it’s how you recover and apologize afterward.',
      '1. Take Direct Accountability. Avoid phrases like "I am sorry if you felt that way" which shift the guilt back onto her. Instead, own your actions clearly: "I was impatient and spoke harshly, and I am deeply sorry for hurting you."',
      '2. Write Your Remorse. Sometimes speaking can lead back to defensive arguments. A hand-written card or an interactive digital apology love letter gives her the space to read, absorb, and melt at her own emotional pace.',
      '3. Back Words with Reconnection Tokens. Hand-wrapped physical apology packages—such as a cuddly Teddy Bear or fresh red roses—act as physical anchors of peace. They show you spent deliberate effort to coordinate a gesture of love.'
    ]
  },
  {
    slug: 'perfect-surprise-girlfriend',
    title: 'The Art of Surprising: The Absolute Best Romantic Gifting Ideas for Your Girlfriend',
    excerpt: 'Looking for a sweet way to declare your affection? Learn how to select unique surprise gifts that melt heartaches and make anniversaries magical.',
    category: 'Gifting Guide',
    readTime: '4 min read',
    date: 'May 28, 2026',
    author: 'Sajith Kularatne',
    emoji: '🎁',
    content: [
      'Girlfriends cherish thoughtfulness and custom gestures far more than expensive, store-bought items. The key to an unforgettable surprise is personalization.',
      'Think about moments that are custom to only the two of you—a specific song, a special photo, or an inside caricature joke. Capturing these inside an LED custom glowing photo frame on her bedside table is an incredible romantic sentiment.',
      'Additionally, digital e-gifts like music playlist presentations or slow-petal animated letters offer a gorgeous avenue to deliver surprise smiles directly to her phone during busy work hours.'
    ]
  },
  {
    slug: 'understanding-relationship-silence',
    title: 'Breaking the Quiet: Why Relationship Silent Treatment Occurs and How to Fix It',
    excerpt: 'Silent treatment isn’t just awkward—it can slowly erode relationship foundations. Discover the psychological roots of romantic silence and how comfort gifts can bridge the void.',
    category: 'Psychology',
    readTime: '6 min read',
    date: 'May 24, 2026',
    author: 'Prof. Nimalka Jayasinghe',
    emoji: '🤫',
    content: [
      'The silent treatment, or "stonewalling", is a defensive coping mechanism. When a partner feels emotionally overwhelmed or flooded, they may retreat into silence to protect themselves from saying things they regret.',
      'To break the silence safely without provoking further defensiveness, try putting down a physical comfort token in their active household space—like an interlocking Couple Hug Mug Set on the kitchen counter.',
      'This silent but warm invitation indicates that your love is steady, waiting, and ready to listen whenever they are comfortable opening up.'
    ]
  },
  {
    slug: 'digital-versus-physical-apologies',
    title: 'E-Gifts vs. Physical Presents: Which Apology Vibe Melts Heartaches Faster?',
    excerpt: 'Should you send an instant interactive apology e-card or wait for a courier package? We break down the science of reconciliation timings and response rates.',
    category: 'Apology Insights',
    readTime: '3 min read',
    date: 'May 18, 2026',
    author: 'SorryBaba Team',
    emoji: '⚡',
    content: [
      'Timings are critical in relationships. If you had an argument in the morning, waiting 3 days for a physical courier to arrive might aggravate the distance. In these situations, an instant Digital E-Gift (custom apology e-card or memories letter delivered under 30 mins) is extremely effective at softening her anger immediately.',
      'For deep, long-standing conflicts, physical high-density plushies and scented boxes are exceptional milestones of a permanent fresh start. They serve as reliable tactile reminders of your apology over months to come.'
    ]
  }
];

export const Blog: React.FC = () => {
  useEffect(() => {
    trackPageView('/blog');
  }, []);

  return (
    <div className="space-y-12 py-4 md:py-8 font-sans selection:bg-brand-pink-soft selection:text-brand-pink">
      {/* Blog Hero Header */}
      <section className="text-center max-w-xl mx-auto space-y-3">
        <span className="text-[10px] font-mono font-bold tracking-widest text-[#FF1A75] uppercase bg-brand-pink-soft/20 px-3 py-1 rounded-full">
          SorryBaba Blog
        </span>
        <h1 className="font-display font-black text-3xl md:text-5xl text-gray-800 tracking-tight">
          Relationship & <br />
          <span className="text-brand-pink">Reconciliation Insights</span>
        </h1>
        <p className="text-xs md:text-sm text-gray-400 font-semibold leading-relaxed">
          Read expert columns, psychological guides, and romantic advice on rebuilding communication, surviving silence, and selecting the perfect apologize gifts.
        </p>
      </section>

      {/* Blog List Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto gap-8">
        {BLOG_ARTICLES.map((article) => (
          <article
            key={article.slug}
            className="group bg-white rounded-3xl border border-gray-150 p-6 md:p-8 flex flex-col justify-between hover:border-brand-pink-soft hover:shadow-cute transition-all duration-300"
          >
            <div className="space-y-4">
              {/* Category, Read Time, and Emoji Row */}
              <div className="flex items-center justify-between text-[10px] font-bold text-gray-400 font-mono tracking-wider uppercase">
                <span className="flex items-center gap-1 text-brand-purple">
                  <Hash size={12} />
                  {article.category}
                </span>
                <span>{article.readTime}</span>
              </div>

              {/* Title Section */}
              <h2 className="font-display font-extrabold text-gray-800 text-base md:text-lg tracking-tight group-hover:text-brand-pink transition-colors leading-tight">
                <Link to={`/blog/${article.slug}`}>
                  <span className="mr-2 text-2xl select-none">{article.emoji}</span>
                  {article.title}
                </Link>
              </h2>

              {/* Excerpt */}
              <p className="text-xs text-gray-500 font-medium leading-relaxed font-sans line-clamp-3">
                {article.excerpt}
              </p>
            </div>

            {/* Footer Row */}
            <div className="pt-6 border-t border-gray-50 mt-6 flex justify-between items-center text-[11px] text-gray-400">
              <span className="flex items-center gap-1">
                <User size={12} className="text-brand-pink/60" />
                {article.author}
              </span>
              <Link
                to={`/blog/${article.slug}`}
                className="flex items-center gap-1 text-brand-pink font-extrabold uppercase hover:underline"
              >
                <span>Read Article</span>
                <ArrowRight size={12} />
              </Link>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
};
