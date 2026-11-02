import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, User, Clock, ArrowRight, BookOpen, Tag, Sparkles } from 'lucide-react';
import { newsItems } from '../lib/news-data';
import ScrollReveal from '../components/ScrollReveal';

const FALLBACK_BLOG_IMG = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 340' width='600' height='340'><rect width='600' height='340' fill='%231f1f23'/><rect x='40' y='40' width='520' height='260' rx='16' fill='%232a2a30'/><circle cx='300' cy='150' r='48' fill='%23b54444' opacity='0.2'/><polygon points='290,130 320,150 290,170' fill='%23b54444'/><text x='300' y='230' font-family='Arial,sans-serif' font-size='18' font-weight='900' fill='%23ffffff' text-anchor='middle'>DRAGON PHARMA RESEARCH</text></svg>";

export default function BlogList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Extract categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    newsItems.forEach(item => set.add(item.category));
    return ['All', ...Array.from(set)];
  }, []);

  // Filtered list
  const filteredPosts = useMemo(() => {
    return newsItems.filter(item => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const featuredPost = useMemo(() => {
    return newsItems.find(p => p.featured) || newsItems[0];
  }, []);

  return (
    <div className="bg-brand-soft min-h-screen pb-20">
      {/* ── Top Hero Banner ─────────────────────────────── */}
      <section className="bg-brand-text text-white relative overflow-hidden py-14 md:py-20 border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-950/60 via-transparent to-primary-900/40 pointer-events-none" />
        <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-primary-600/15 blur-3xl pointer-events-none" />
        
        <div className="page-container relative z-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/30 text-primary-400 font-extrabold text-xs uppercase tracking-wider mb-4">
            <BookOpen size={14} />
            <span>Dragon Pharma Research & Articles</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4">
            Peptide Science, Protocols & Laboratory Insights
          </h1>
          <p className="text-sm md:text-base text-white/70 leading-relaxed max-w-2xl mx-auto">
            In-depth guides, verified dosage titration tables, third-party lab analytical reports, and harm-reduction protocols authored by industry biochemists.
          </p>

          {/* Search bar inside hero */}
          <div className="mt-8 max-w-lg mx-auto relative">
            <input
              type="text"
              placeholder="Search guides, peptides, lab tests, or protocols..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-2xl py-3.5 pl-11 pr-4 text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-black/40 transition-all backdrop-blur-md"
            />
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none" />
          </div>
        </div>
      </section>

      {/* ── Main Content Area ─────────────────────────── */}
      <div className="page-container mt-10">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
                selectedCategory === cat
                  ? 'bg-primary-500 text-white shadow-md shadow-primary-500/25 scale-[1.02]'
                  : 'bg-white text-brand-muted border border-brand-border hover:bg-neutral-100 hover:text-brand-text'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Post Card (shown when 'All' is selected and search is empty) */}
        {selectedCategory === 'All' && searchQuery === '' && featuredPost && (
          <ScrollReveal className="mb-12">
            <div className="bg-white border border-brand-border rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-primary-200 transition-all duration-300 grid lg:grid-cols-12 gap-0">
              <div className="lg:col-span-7 aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto relative bg-[#1f1f23] overflow-hidden group">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  loading="eager"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = FALLBACK_BLOG_IMG;
                  }}
                />
                <div className="absolute top-4 left-4 z-10 flex gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary-600 text-white text-[11px] font-black rounded-lg uppercase tracking-wider shadow-lg">
                    <Sparkles size={12} />
                    Featured Guide
                  </span>
                  <span className="px-3 py-1 bg-black/70 backdrop-blur-md text-white text-[11px] font-bold rounded-lg border border-white/20">
                    {featuredPost.category}
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 p-6 md:p-8 flex flex-col justify-between bg-white">
                <div>
                  <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-brand-muted mb-3">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={13} className="text-primary-500" />
                      {featuredPost.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={13} className="text-primary-500" />
                      {featuredPost.readTime}
                    </span>
                  </div>

                  <Link to={`/blog/${featuredPost.slug}`}>
                    <h2 className="text-xl md:text-2xl font-black text-brand-text leading-snug hover:text-primary-500 transition-colors mb-3">
                      {featuredPost.title}
                    </h2>
                  </Link>

                  <p className="text-sm text-brand-muted leading-relaxed line-clamp-3 mb-6">
                    {featuredPost.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {featuredPost.tags.slice(0, 4).map(tag => (
                      <span key={tag} className="inline-flex items-center gap-1 text-[11px] font-semibold text-neutral-600 bg-neutral-100 px-2.5 py-1 rounded-md">
                        <Tag size={10} className="text-neutral-400" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-brand-border flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center font-black text-xs border border-primary-100">
                      DP
                    </div>
                    <div>
                      <div className="text-xs font-bold text-brand-text">{featuredPost.author}</div>
                      <div className="text-[10px] text-brand-muted">Editorial Review</div>
                    </div>
                  </div>
                  <Link
                    to={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-bold text-xs shadow-sm hover:shadow transition-all"
                  >
                    Read Guide <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* ── Articles Grid ─────────────────────────────── */}
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-brand-text">
            {selectedCategory === 'All' ? 'All Published Articles' : `${selectedCategory} Articles`}
            <span className="text-sm font-semibold text-brand-muted ml-2">({filteredPosts.length})</span>
          </h2>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="bg-white rounded-3xl border border-brand-border p-12 text-center max-w-md mx-auto my-12">
            <BookOpen size={40} className="mx-auto text-brand-muted mb-3 opacity-40" />
            <h3 className="font-bold text-base text-brand-text mb-1">No articles found</h3>
            <p className="text-xs text-brand-muted mb-4">Try clearing your search query or selecting a different category.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="px-4 py-2 bg-primary-500 text-white rounded-xl text-xs font-bold hover:bg-primary-600 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, idx) => (
              <ScrollReveal key={post.slug} delay={idx * 50} className="flex flex-col h-full">
                <article className="flex flex-col bg-white border border-brand-border rounded-2xl overflow-hidden hover:shadow-brand-md hover:border-primary-200 transition-all flex-1 group">
                  {/* Article Thumbnail */}
                  <Link to={`/blog/${post.slug}`} className="aspect-[16/10] bg-[#1f1f23] overflow-hidden relative block">
                    <span className="absolute right-3 top-3 z-10 px-2.5 py-1 bg-white/95 text-brand-text text-[10px] font-bold rounded-lg border border-brand-border shadow-sm">
                      {post.category}
                    </span>
                    <img
                      src={post.image}
                      alt={post.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = FALLBACK_BLOG_IMG;
                      }}
                    />
                  </Link>

                  {/* Article Info */}
                  <div className="p-5 flex flex-col flex-1 gap-3">
                    <div className="flex items-center gap-3 text-[11px] font-semibold text-brand-muted">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {post.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {post.readTime}
                      </span>
                    </div>

                    <Link to={`/blog/${post.slug}`}>
                      <h3 className="font-extrabold text-base text-brand-text leading-snug group-hover:text-primary-500 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                    </Link>

                    <p className="text-xs text-brand-muted leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="mt-auto pt-3 border-t border-brand-border/60 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-[11px] font-semibold text-brand-muted truncate max-w-[160px]">
                        <User size={12} className="shrink-0 text-primary-500" />
                        <span className="truncate">{post.author}</span>
                      </div>
                      <Link
                        to={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-primary-500 hover:text-primary-600 transition-all hover:translate-x-0.5"
                      >
                        Read <ArrowRight size={13} />
                      </Link>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        )}

        {/* ── Stay Updated Newsletter / Telegram CTA ──────── */}
        <ScrollReveal className="mt-16">
          <div className="bg-gradient-to-r from-[#1b1c20] to-[#252830] text-white rounded-3xl p-8 md:p-10 border border-white/10 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-xl text-center md:text-left z-10">
              <span className="text-primary-400 font-extrabold text-xs uppercase tracking-wider mb-2 block">
                Stay Ahead of Industry Developments
              </span>
              <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                Get Fresh Lab Tests & Protocol Updates First
              </h3>
              <p className="text-xs md:text-sm text-white/70 mt-2 leading-relaxed">
                Join our verified Telegram channel for real-time announcements, certificate releases, and private discount vouchers.
              </p>
            </div>
            <div className="shrink-0 z-10 flex gap-3">
              <a
                href="https://t.me/Dragonpharmalab"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-primary-500 hover:bg-primary-600 text-white rounded-2xl font-bold text-sm shadow-lg hover:shadow-primary-500/30 transition-all flex items-center gap-2"
              >
                Join Telegram Channel <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
