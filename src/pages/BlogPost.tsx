import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  Check,
  Tag,
  AlertTriangle,
  Lightbulb,
  Info,
  Flame,
  ShieldCheck,
  Send,
  MessageCircle,
  Package,
} from 'lucide-react';
import { newsItems } from '../lib/news-data';
import { products as allProducts } from '../lib/products-data';
import ScrollReveal from '../components/ScrollReveal';

const FALLBACK_BLOG_IMG = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 340' width='600' height='340'><rect width='600' height='340' fill='%231f1f23'/><rect x='40' y='40' width='520' height='260' rx='16' fill='%232a2a30'/><circle cx='300' cy='150' r='48' fill='%23b54444' opacity='0.2'/><polygon points='290,130 320,150 290,170' fill='%23b54444'/><text x='300' y='230' font-family='Arial,sans-serif' font-size='18' font-weight='900' fill='%23ffffff' text-anchor='middle'>DRAGON PHARMA RESEARCH</text></svg>";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [copied, setCopied] = useState(false);

  // Find post
  const post = useMemo(() => {
    return newsItems.find(p => p.slug === slug);
  }, [slug]);

  // Related products
  const relatedProducts = useMemo(() => {
    if (!post?.relatedProductSlugs || post.relatedProductSlugs.length === 0) return [];
    return allProducts.filter(p => post.relatedProductSlugs?.includes(p.slug));
  }, [post]);

  // Other related posts
  const otherPosts = useMemo(() => {
    return newsItems.filter(p => p.slug !== slug).slice(0, 3);
  }, [slug]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!post) {
    return (
      <div className="min-h-[70vh] bg-brand-soft flex items-center justify-center p-6">
        <div className="bg-white border border-brand-border rounded-3xl p-10 max-w-lg w-full text-center shadow-sm">
          <div className="w-14 h-14 bg-primary-50 text-primary-500 rounded-2xl flex items-center justify-center mx-auto mb-4 font-bold text-xl">
            404
          </div>
          <h1 className="text-2xl font-black text-brand-text mb-2">Article Not Found</h1>
          <p className="text-xs text-brand-muted leading-relaxed mb-6">
            The article or research guide you are looking for has been moved, archived, or is currently unavailable.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-5 py-3 bg-primary-500 hover:bg-primary-600 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
          >
            <ArrowLeft size={14} /> Back to All Articles
          </Link>
        </div>
      </div>
    );
  }

  const encodedUrl = encodeURIComponent(window.location.href);
  const encodedTitle = encodeURIComponent(post.title);

  return (
    <div className="bg-brand-soft min-h-screen pb-24">
      {/* ── Breadcrumb Navigation ─────────────────────── */}
      <div className="border-b border-brand-border bg-white">
        <div className="page-container py-3">
          <div className="flex items-center gap-2 text-xs text-brand-muted overflow-x-auto whitespace-nowrap">
            <Link to="/" className="hover:text-primary-500 transition-colors">Home</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-primary-500 transition-colors">Blog & Research</Link>
            <span>/</span>
            <span className="text-brand-text font-semibold truncate max-w-[280px] sm:max-w-md">{post.title}</span>
          </div>
        </div>
      </div>

      <article className="page-container mt-8 max-w-4xl mx-auto">
        {/* ── Article Header ──────────────────────────── */}
        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-primary-50 border border-primary-200 text-primary-600 font-extrabold text-[11px] rounded-lg uppercase tracking-wider">
              {post.category}
            </span>
            <span className="flex items-center gap-1.5 text-xs font-semibold text-brand-muted">
              <Calendar size={13} className="text-brand-muted" />
              {post.date}
            </span>
            <span className="text-brand-border">•</span>
            <span className="flex items-center gap-1.5 text-xs font-semibold text-brand-muted">
              <Clock size={13} className="text-brand-muted" />
              {post.readTime}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-brand-text tracking-tight leading-[1.15] mb-4">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-brand-muted leading-relaxed font-normal mb-6">
            {post.excerpt}
          </p>

          {/* Author and Share actions bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-brand-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-500 text-white flex items-center justify-center font-black text-sm shadow-sm">
                DP
              </div>
              <div>
                <div className="text-xs font-extrabold text-brand-text flex items-center gap-1.5">
                  {post.author}
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200">
                    Verified
                  </span>
                </div>
                <div className="text-[11px] text-brand-muted">Biochemical Research & Protocol Division</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-brand-border bg-white text-brand-text hover:bg-neutral-50 text-xs font-bold transition-all shadow-sm"
              >
                {copied ? <Check size={14} className="text-emerald-500" /> : <Share2 size={14} />}
                <span>{copied ? 'Copied' : 'Share'}</span>
              </button>
              <a
                href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center hover:bg-emerald-600 transition-colors shadow-sm"
                title="Share on WhatsApp"
              >
                <MessageCircle size={15} />
              </a>
              <a
                href={`https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-xl bg-sky-500 text-white flex items-center justify-center hover:bg-sky-600 transition-colors shadow-sm"
                title="Share on Telegram"
              >
                <Send size={14} />
              </a>
            </div>
          </div>
        </header>

        {/* ── Featured Hero Visual ─────────────────────── */}
        <div className="aspect-[16/9] sm:aspect-[21/9] bg-[#1a1b1f] rounded-3xl overflow-hidden border border-brand-border shadow-sm mb-10 relative">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover object-center"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = FALLBACK_BLOG_IMG;
            }}
          />
        </div>

        {/* ── Table of Contents (for long posts) ──────── */}
        {post.sections.length > 2 && (
          <div className="bg-white rounded-2xl border border-brand-border p-5 md:p-6 mb-10 shadow-sm">
            <h3 className="font-extrabold text-xs uppercase tracking-wider text-brand-muted mb-3 flex items-center gap-2">
              <Tag size={13} className="text-primary-500" />
              In This Protocol Guide
            </h3>
            <div className="grid sm:grid-cols-2 gap-2">
              {post.sections.map((section, idx) => (
                section.heading ? (
                  <a
                    key={idx}
                    href={`#section-${idx}`}
                    className="text-xs font-semibold text-brand-text hover:text-primary-500 transition-colors flex items-center gap-2 py-1 truncate"
                  >
                    <span className="w-5 h-5 rounded-md bg-neutral-100 text-neutral-600 flex items-center justify-center text-[10px] font-bold shrink-0">
                      {idx + 1}
                    </span>
                    <span className="truncate">{section.heading.replace(/^\d+\.\s*/, '')}</span>
                  </a>
                ) : null
              ))}
            </div>
          </div>
        )}

        {/* ── Body Sections ───────────────────────────── */}
        <div className="bg-white border border-brand-border rounded-3xl p-6 sm:p-10 shadow-sm space-y-10">
          {post.sections.map((section, idx) => (
            <section key={idx} id={`section-${idx}`} className="scroll-mt-24 space-y-4">
              {section.heading && (
                <h2 className="text-xl sm:text-2xl font-black text-brand-text tracking-tight pt-2 border-b border-neutral-100 pb-3">
                  {section.heading}
                </h2>
              )}

              {section.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="text-sm sm:text-base text-neutral-700 leading-relaxed font-normal">
                  {p}
                </p>
              ))}

              {/* Callouts */}
              {section.callout && (
                <div
                  className={`rounded-2xl p-4 sm:p-5 border-l-4 my-6 ${
                    section.callout.type === 'warning'
                      ? 'bg-amber-500/10 border-amber-500 text-amber-950'
                      : section.callout.type === 'tip'
                      ? 'bg-emerald-500/10 border-emerald-500 text-emerald-950'
                      : section.callout.type === 'highlight'
                      ? 'bg-primary-500/10 border-primary-500 text-primary-950'
                      : 'bg-neutral-100 border-neutral-400 text-neutral-900'
                  }`}
                >
                  <div className="flex items-center gap-2 font-black text-xs uppercase tracking-wider mb-1.5">
                    {section.callout.type === 'warning' && <AlertTriangle size={15} className="text-amber-600" />}
                    {section.callout.type === 'tip' && <Lightbulb size={15} className="text-emerald-600" />}
                    {section.callout.type === 'highlight' && <Flame size={15} className="text-primary-600" />}
                    {section.callout.type === 'info' && <Info size={15} className="text-neutral-600" />}
                    <span>{section.callout.title}</span>
                  </div>
                  <p className="text-xs sm:text-sm font-medium leading-relaxed">
                    {section.callout.message}
                  </p>
                </div>
              )}

              {/* Custom Formatted Tables */}
              {section.table && (
                <div className="overflow-x-auto my-6 border border-brand-border rounded-2xl shadow-sm">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-neutral-900 text-white font-extrabold">
                        {section.table.headers.map((h, hIdx) => (
                          <th key={hIdx} className="p-3.5 whitespace-nowrap border-b border-neutral-800">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {section.table.rows.map((row, rIdx) => (
                        <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-white' : 'bg-neutral-50/70'}>
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className="p-3.5 text-neutral-700 font-medium">
                              {cIdx === 0 ? <strong className="text-brand-text">{cell}</strong> : cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* List Component */}
              {section.list && (
                <div className="bg-brand-soft/70 rounded-2xl p-5 border border-brand-border my-6">
                  {section.list.title && (
                    <h4 className="font-bold text-xs uppercase tracking-wider text-brand-text mb-3">
                      {section.list.title}
                    </h4>
                  )}
                  <ul className="space-y-2.5">
                    {section.list.items.map((item, lIdx) => (
                      <li key={lIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700">
                        <span className="w-5 h-5 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">
                          ✓
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          ))}

          {/* ── Product Recommendations Section (if available) ─ */}
          {relatedProducts.length > 0 && (
            <div className="mt-12 pt-8 border-t border-brand-border">
              <div className="flex items-center gap-2 mb-2">
                <Package size={16} className="text-primary-500" />
                <span className="text-xs font-bold text-brand-muted uppercase tracking-wider">Related Compounds</span>
              </div>
              <h3 className="text-xl font-black text-brand-text mb-4">
                Laboratory-Grade Compounds Mentioned In This Article
              </h3>
              <p className="text-xs text-brand-muted mb-6">
                Directly verify batch HPLC purity reports and order with domestic or international dispatch.
              </p>

              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {relatedProducts.map((p) => (
                  <div
                    key={p.id}
                    className="border border-brand-border rounded-2xl p-4 bg-brand-soft/40 hover:border-primary-300 hover:shadow-brand-sm transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="aspect-square bg-white rounded-xl overflow-hidden p-3 border border-brand-border mb-3 relative">
                        {p.labTested && (
                          <span className="absolute top-2 left-2 px-1.5 py-0.5 bg-emerald-500 text-white text-[9px] font-bold rounded-md">
                            ✓ LAB
                          </span>
                        )}
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 256' width='256' height='256'><rect width='256' height='256' fill='%23faf7f7'/><rect x='92' y='110' width='72' height='50' rx='6' fill='%23b54444'/><text x='128' y='142' font-family='Arial,sans-serif' font-size='16' font-weight='900' fill='white' text-anchor='middle'>DRAGON</text></svg>";
                          }}
                        />
                      </div>
                      <div className="text-[10px] font-bold text-brand-muted uppercase mb-1">
                        {p.substance.split(',')[0]}
                      </div>
                      <h4 className="font-extrabold text-xs text-brand-text line-clamp-2 mb-2">
                        {p.name}
                      </h4>
                    </div>

                    <div className="pt-3 border-t border-brand-border flex items-center justify-between mt-auto">
                      <span className="font-black text-sm text-brand-text">
                        ${p.intPrice.toFixed(2)}
                      </span>
                      <Link
                        to={`/${p.categorySlug}/${p.slug}`}
                        className="px-3 py-1.5 bg-brand-text hover:bg-primary-500 text-white rounded-lg text-[11px] font-bold transition-colors"
                      >
                        View Compound
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Author Bio Footer Box ───────────────────── */}
          <div className="p-6 bg-brand-soft rounded-2xl border border-brand-border flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left mt-8">
            <div className="w-14 h-14 rounded-2xl bg-neutral-900 text-white flex items-center justify-center font-black text-lg shrink-0 shadow-md">
              DP
            </div>
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                <h4 className="font-extrabold text-sm text-brand-text">{post.author}</h4>
                <ShieldCheck size={14} className="text-emerald-500" />
              </div>
              <p className="text-xs text-brand-muted leading-relaxed">
                Specialized in endocrine modulation, peptide synthesis, and third-party analytical chromatography. All protocols published are for scientific documentation, athletic harm reduction, and laboratory analysis.
              </p>
            </div>
          </div>
        </div>

        {/* ── Tags and Return Link ──────────────────────── */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="text-xs font-semibold text-neutral-600 bg-white border border-brand-border px-3 py-1.5 rounded-xl shadow-xs">
                #{tag}
              </span>
            ))}
          </div>

          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-xs font-bold text-primary-500 hover:text-primary-600 transition-colors"
          >
            <ArrowLeft size={14} /> Back to All Articles
          </Link>
        </div>

        {/* ── Related Articles Carousel/List ───────────── */}
        {otherPosts.length > 0 && (
          <ScrollReveal className="mt-16">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-black text-brand-text">More From Dragon Pharma Research</h3>
              <Link to="/blog" className="text-xs font-bold text-primary-500 hover:underline">
                View All Guides →
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {otherPosts.map((p) => (
                <Link
                  key={p.slug}
                  to={`/blog/${p.slug}`}
                  className="bg-white border border-brand-border rounded-2xl overflow-hidden hover:shadow-brand-md hover:border-primary-200 transition-all flex flex-col group"
                >
                  <div className="aspect-[16/10] bg-[#1a1b1f] overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = FALLBACK_BLOG_IMG;
                      }}
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <span className="text-[10px] font-extrabold text-primary-600 uppercase mb-1">{p.category}</span>
                    <h4 className="font-extrabold text-sm text-brand-text group-hover:text-primary-500 transition-colors line-clamp-2 mb-2">
                      {p.title}
                    </h4>
                    <p className="text-xs text-brand-muted line-clamp-2 mt-auto">
                      {p.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </ScrollReveal>
        )}
      </article>
    </div>
  );
}
