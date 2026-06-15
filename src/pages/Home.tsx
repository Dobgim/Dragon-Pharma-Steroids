import { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Pill,
  Syringe,
  Activity,
  Heart,
  Flame,
  Dna,
  Sparkles,
  CalendarDays,
  ShieldCheck,
  Truck,
  FlaskConical,
  Lock,
  ArrowRight,
  TrendingUp,
  Star,
  Zap,
  Package,
} from 'lucide-react';
import { getStoredProducts, products as defaultProducts, categories, type Product } from '../lib/products-data';
import { newsItems } from '../lib/news-data';
import ProductCard from '../components/ProductCard';
import ScrollReveal from '../components/ScrollReveal';

// Map slugs to icons
const getCategoryIcon = (slug: string) => {
  switch (slug) {
    case 'orals-380': return <Pill className="w-6 h-6 text-primary-500" />;
    case 'injectables-391': return <Syringe className="w-6 h-6 text-primary-500" />;
    case 'sarms-2034': return <Activity className="w-6 h-6 text-primary-500" />;
    case 'post-cycle-therapy-3855': return <ShieldCheck className="w-6 h-6 text-primary-500" />;
    case 'fat-loss-397': return <Flame className="w-6 h-6 text-primary-500" />;
    case 'sexual-health-415': return <Heart className="w-6 h-6 text-primary-500" />;
    case 'peptides-414': return <Dna className="w-6 h-6 text-primary-500" />;
    case 'supplements-3050': return <Sparkles className="w-6 h-6 text-primary-500" />;
    case 'cycles-1933': return <CalendarDays className="w-6 h-6 text-primary-500" />;
    default: return <Pill className="w-6 h-6 text-primary-500" />;
  }
};

// Category hero images
const categoryImages: Record<string, string> = {
  'orals-380': 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=800&auto=format&fit=crop',
  'injectables-391': 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=800&auto=format&fit=crop',
  'peptides-414': 'https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=800&auto=format&fit=crop',
  'sarms-2034': 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?q=80&w=800&auto=format&fit=crop',
  'fat-loss-397': 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop',
  'post-cycle-therapy-3855': 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=800&auto=format&fit=crop',
  'sexual-health-415': 'https://images.unsplash.com/photo-1576671081837-49000212a370?q=80&w=800&auto=format&fit=crop',
  'supplements-3050': 'https://images.unsplash.com/photo-1544991875-5dc1b05f1571?q=80&w=800&auto=format&fit=crop',
  'cycles-1933': 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800&auto=format&fit=crop',
};

const slides = [
  {
    title: 'OFFICIAL DRAGON PHARMA LABS STORE',
    subtitle: 'Premium Anabolic Steroids & High-Purity Peptides',
    desc: 'Get access to direct source pricing, worldwide shipping, and independent lab results verification.',
    btnText: 'Shop All Products',
    to: '/orals-380',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1470&auto=format&fit=crop',
    overlay: 'linear-gradient(180deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.1) 50%, rgba(0, 0, 0, 0.5) 100%)',
    theme: 'general' as const,
  },
  {
    title: '🇺🇸 USA DOMESTIC WAREHOUSE',
    subtitle: 'USA Domestic Warehouse',
    desc: 'Reliable shipping in just 2-5 days to your doorstep.',
    btnText: 'Shop Now',
    to: '/us-domestic-warehouse-3401',
    image: 'https://www.dragonpharma.net/uploads/dragonpharmanet/136913.webp',
    overlay: 'linear-gradient(180deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.1) 50%, rgba(0, 0, 0, 0.5) 100%)',
    theme: 'usa' as const,
  },
  {
    title: 'QUALITY VERIFIED BY SCIENCE!',
    subtitle: 'Quality Verified by Science!',
    desc: 'A curated list of products analyzed by professional labs with results from the latest batch.',
    btnText: 'Explore Lab Tested Products',
    to: '/lab-tested-3525',
    image: 'https://www.dragonpharma.net/uploads/dragonpharmanet/139844.webp',
    overlay: 'linear-gradient(180deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.1) 50%, rgba(0, 0, 0, 0.5) 100%)',
    theme: 'science' as const,
  },
  {
    title: 'PAY WITH CRYPTO, GET 20% BACK!',
    subtitle: 'Pay with Crypto, Get 20% Back!',
    desc: 'Use cryptocurrency at checkout and earn 20% cashback for your next purchase.',
    btnText: 'Start with Crypto',
    to: '/weekly-deals-4304',
    image: 'https://www.dragonpharma.net/uploads/dragonpharmanet/139843.webp',
    overlay: 'linear-gradient(180deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.1) 50%, rgba(0, 0, 0, 0.5) 100%)',
    theme: 'crypto' as const,
  },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [productsList, setProductsList] = useState<Product[]>(getStoredProducts());

  useEffect(() => {
    const handler = () => {
      setProductsList(getStoredProducts());
    };
    window.addEventListener('dp_products_updated', handler);
    return () => window.removeEventListener('dp_products_updated', handler);
  }, []);

  const bestSellers: Product[] = useMemo(() => productsList.filter((p: Product) => p.bestSeller).slice(0, 8), [productsList]);
  const featuredProducts: Product[] = useMemo(() => productsList.filter((p: Product) => p.featured).slice(0, 8), [productsList]);
  const newArrivals: Product[] = useMemo(() => [...productsList].sort((a: Product, b: Product) => b.id - a.id).slice(0, 12), [productsList]);
  const injectables: Product[] = useMemo(() => productsList.filter((p: Product) => p.categorySlug === 'injectables-391').slice(0, 5), [productsList]);
  const orals: Product[] = useMemo(() => productsList.filter((p: Product) => p.categorySlug === 'orals-380').slice(0, 5), [productsList]);
  const peptides: Product[] = useMemo(() => productsList.filter((p: Product) => p.categorySlug === 'peptides-414').slice(0, 4), [productsList]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide(prev => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);

  const scrollLeft = () => scrollRef.current?.scrollBy({ left: -320, behavior: 'smooth' });
  const scrollRight = () => scrollRef.current?.scrollBy({ left: 320, behavior: 'smooth' });

  return (
    <div className="pb-16 bg-brand-soft">

      {/* ── Hero Slider ───────────────────────────── */}
      <div className="relative h-[460px] md:h-[540px] bg-brand-dark overflow-hidden select-none">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
            style={{
              backgroundImage: `${slide.overlay}, url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="page-container h-full flex flex-col justify-center text-white">
              <div className="space-y-4 md:space-y-6 max-w-4xl mx-auto text-center flex flex-col items-center">
                {slide.title && (
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary-500/20 border border-primary-500/30 text-primary-400 font-extrabold text-xs tracking-wider uppercase">
                    <TrendingUp size={13} /> {slide.title}
                  </span>
                )}
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                  {slide.subtitle}
                </h1>
                <p className="text-sm md:text-lg text-white/95 leading-relaxed max-w-2xl font-bold drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
                  {slide.desc}
                </p>
                <div className="pt-2 flex flex-col items-center">
                  <Link 
                    to={slide.to} 
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-extrabold text-base shadow-2xl hover:-translate-y-0.5 transition-all bg-[#b54444] text-white hover:bg-[#a33b3b]"
                    style={{ boxShadow: '0 8px 24px rgba(181, 68, 68, 0.5)' }}
                  >
                    {slide.btnText}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
        <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 md:w-12 h-10 md:h-12 rounded-full bg-black/30 border border-white/10 hover:bg-primary-500 text-white flex items-center justify-center transition-colors" aria-label="Previous slide">
          <ChevronLeft size={20} />
        </button>
        <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 md:w-12 h-10 md:h-12 rounded-full bg-black/30 border border-white/10 hover:bg-primary-500 text-white flex items-center justify-center transition-colors" aria-label="Next slide">
          <ChevronRight size={20} />
        </button>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slides.map((_, idx) => (
            <button key={idx} onClick={() => setCurrentSlide(idx)} className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentSlide ? 'bg-primary-500 w-6' : 'bg-white/40'}`} aria-label={`Go to slide ${idx + 1}`} />
          ))}
        </div>
      </div>

      {/* ── Quality Bar ────────────────────────────── */}
      <div className="bg-white border-y border-brand-border py-8 shadow-sm">
        <div className="page-container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Truck className="text-primary-500" size={24} />, title: 'Discreet 2–5 Day Shipping', desc: 'Secure local domestic shipping hubs' },
              { icon: <ShieldCheck className="text-primary-500" size={24} />, title: 'Guaranteed Delivery', desc: '100% reship or refund insurance policy' },
              { icon: <FlaskConical className="text-primary-500" size={24} />, title: 'Lab Tested Batches', desc: 'Verified raw ingredient potency reports' },
              { icon: <Lock className="text-primary-500" size={24} />, title: 'Encrypted Checkout', desc: 'Anonymous cryptocurrency checkout support' },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-4 items-start">
                <div className="p-3 bg-brand-soft rounded-2xl shrink-0">{item.icon}</div>
                <div>
                  <h3 className="font-bold text-sm text-brand-text">{item.title}</h3>
                  <p className="text-xs text-brand-muted mt-0.5 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Best Sellers ────────────────────────────── */}
      <section className="page-container py-12 md:py-16">
        <ScrollReveal className="flex justify-between items-end mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Star size={16} className="text-primary-500 fill-primary-500" />
              <span className="text-xs font-bold text-primary-500 uppercase tracking-wider">Most Popular</span>
            </div>
            <h2 className="section-title">Best Sellers</h2>
            <p className="section-sub mt-1">Our most popular pharmaceutical-grade products.</p>
          </div>
          <Link to="/orals-380" className="hidden sm:flex items-center gap-1.5 text-sm font-bold text-primary-500 hover:text-primary-600 transition-colors shrink-0">
            View All <ArrowRight size={15} />
          </Link>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {bestSellers.map((product: Product, idx: number) => (
            <ScrollReveal key={product.id} delay={idx * 60}>
              <ProductCard product={product} />
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-6 text-center sm:hidden">
          <Link to="/orals-380" className="btn-outline btn-sm">View All Best Sellers</Link>
        </div>
      </section>

      {/* ── New Arrivals Scroll Strip ───────────────── */}
      <section className="py-12 md:py-16 bg-white border-y border-brand-border overflow-hidden">
        <div className="page-container">
          <ScrollReveal className="flex justify-between items-end mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Zap size={15} className="text-amber-500" />
                <span className="text-xs font-bold text-amber-500 uppercase tracking-wider">Just In</span>
              </div>
              <h2 className="section-title">New Arrivals</h2>
              <p className="section-sub mt-1">The latest additions to our catalog.</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button onClick={scrollLeft} className="w-9 h-9 rounded-full border border-brand-border bg-white hover:border-primary-500 hover:text-primary-500 flex items-center justify-center transition-all shadow-sm">
                <ChevronLeft size={16} />
              </button>
              <button onClick={scrollRight} className="w-9 h-9 rounded-full border border-brand-border bg-white hover:border-primary-500 hover:text-primary-500 flex items-center justify-center transition-all shadow-sm">
                <ChevronRight size={16} />
              </button>
            </div>
          </ScrollReveal>
        </div>

        {/* Scrollable Strip */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', paddingLeft: 'calc((100% - 1300px) / 2 + 1rem)', paddingRight: '1.5rem' }}
        >
          {newArrivals.map((product: Product) => (
            <Link
              key={product.id}
              to={`/${product.categorySlug}/${product.slug}`}
              className="flex-none w-[180px] group"
            >
              <div className="bg-brand-soft rounded-2xl overflow-hidden border border-brand-border hover:border-primary-200 hover:shadow-brand-md transition-all">
                <div className="aspect-square relative overflow-hidden bg-white p-3">
                  {product.labTested && (
                    <span className="absolute top-2 left-2 z-10 px-1.5 py-0.5 bg-emerald-500 text-white text-[9px] font-bold rounded-full">✓ LAB</span>
                  )}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://via.placeholder.com/256x256/f8ebea/b54444?text=${encodeURIComponent(product.name.slice(0, 2))}`;
                    }}
                  />
                </div>
                <div className="p-3">
                  <div className="text-[9px] font-bold text-brand-muted uppercase tracking-wide mb-1">{product.category.replace('Anabolic Steroids', '').replace('Injectable ', '').trim()}</div>
                  <div className="font-bold text-xs text-brand-text leading-tight line-clamp-2 group-hover:text-primary-500 transition-colors">{product.name}</div>
                  <div className="mt-2 flex items-baseline gap-1.5">
                    <span className="font-extrabold text-sm text-brand-text">${product.intPrice.toFixed(2)}</span>
                    {product.intOriginalPrice && (
                      <span className="text-[10px] text-brand-muted line-through">${product.intOriginalPrice.toFixed(2)}</span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Category Visual Showcase ─────────────────── */}
      <section className="page-container py-12 md:py-16">
        <ScrollReveal className="text-center max-w-xl mx-auto mb-10">
          <h2 className="section-title">Shop by Category</h2>
          <p className="section-sub mt-2">Browse our full catalog of pharmaceutical-grade performance products.</p>
        </ScrollReveal>

        {/* Large featured category grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
          {categories.slice(0, 8).map((cat, idx) => (
            <ScrollReveal key={cat.slug} delay={idx * 50}>
              <Link
                to={`/${cat.slug}`}
                className="group relative rounded-2xl overflow-hidden aspect-[4/3] block border border-brand-border hover:border-primary-300 transition-all shadow-brand-sm hover:shadow-brand-md"
              >
                <img
                  src={categoryImages[cat.slug] || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=800&auto=format&fit=crop'}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/85 via-brand-dark/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <div className="w-8 h-8 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center mb-2">
                    <div className="text-white [&>svg]:text-white [&>svg]:w-4 [&>svg]:h-4">
                      {getCategoryIcon(cat.slug)}
                    </div>
                  </div>
                  <h3 className="font-extrabold text-white text-sm leading-tight group-hover:text-primary-300 transition-colors">
                    {cat.name}
                  </h3>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {/* Remaining categories as pill chips */}
        {categories.length > 8 && (
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.slice(8).map(cat => (
              <Link key={cat.slug} to={`/${cat.slug}`} className="flex items-center gap-2 px-4 py-2 bg-white border border-brand-border rounded-full text-sm font-semibold text-brand-text hover:border-primary-400 hover:text-primary-500 transition-all shadow-sm">
                {getCategoryIcon(cat.slug)}
                {cat.name}
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* ── Injectable + Oral Split Showcase ─────────── */}
      <section className="bg-white border-y border-brand-border py-12 md:py-16">
        <div className="page-container">
          <div className="grid md:grid-cols-2 gap-8">

            {/* Injectables Panel */}
            <ScrollReveal>
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 p-6 md:p-8 border border-white/5 shadow-xl">
                <div className="absolute top-0 right-0 w-48 h-48 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-primary-500/20 rounded-xl"><Syringe size={18} className="text-primary-400" /></div>
                  <span className="text-xs font-bold text-primary-400 uppercase tracking-wider">Injectable Steroids</span>
                </div>
                <h3 className="text-xl font-extrabold text-white mb-1">Oil-Based Compounds</h3>
                <p className="text-sm text-white/60 mb-6 leading-relaxed">Long-acting testosterone esters, boldenone, trenbolone & blends.</p>

                {/* Product images row */}
                <div className="flex gap-3 mb-6">
                  {injectables.map((p: Product) => (
                    <Link key={p.id} to={`/${p.categorySlug}/${p.slug}`} className="group flex-1 min-w-0">
                      <div className="aspect-square rounded-xl bg-white/5 border border-white/10 hover:border-primary-500/50 overflow-hidden p-1.5 transition-all">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                          onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/120x120/1e293b/b54444?text=DP'; }}
                        />
                      </div>
                      <div className="mt-1.5 text-center text-[10px] font-bold text-white/60 group-hover:text-primary-400 transition-colors truncate leading-tight">
                        {p.name.split(' ').slice(0, 2).join(' ')}
                      </div>
                    </Link>
                  ))}
                </div>

                <Link to="/injectables-391" className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-500 text-white rounded-xl text-sm font-bold hover:bg-primary-600 transition-colors">
                  Shop Injectables <ArrowRight size={14} />
                </Link>
              </div>
            </ScrollReveal>

            {/* Oral Steroids Panel */}
            <ScrollReveal delay={100}>
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary-900 to-primary-800 p-6 md:p-8 border border-white/5 shadow-xl">
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none" />
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-white/10 rounded-xl"><Pill size={18} className="text-white" /></div>
                  <span className="text-xs font-bold text-primary-200 uppercase tracking-wider">Oral Steroids</span>
                </div>
                <h3 className="text-xl font-extrabold text-white mb-1">Tablet & Capsule Form</h3>
                <p className="text-sm text-white/60 mb-6 leading-relaxed">Dianabol, Winstrol, Anavar, Anadrol and premium oral compounds.</p>

                <div className="flex gap-3 mb-6">
                  {orals.map((p: Product) => (
                    <Link key={p.id} to={`/${p.categorySlug}/${p.slug}`} className="group flex-1 min-w-0">
                      <div className="aspect-square rounded-xl bg-white/5 border border-white/10 hover:border-white/40 overflow-hidden p-1.5 transition-all">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                          onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/120x120/7f1d1d/ffffff?text=DP'; }}
                        />
                      </div>
                      <div className="mt-1.5 text-center text-[10px] font-bold text-white/60 group-hover:text-white transition-colors truncate leading-tight">
                        {p.name.split(' ').slice(0, 2).join(' ')}
                      </div>
                    </Link>
                  ))}
                </div>

                <Link to="/orals-380" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-primary-600 rounded-xl text-sm font-bold hover:bg-primary-50 transition-colors">
                  Shop Orals <ArrowRight size={14} />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Featured Products ────────────────────────── */}
      <section className="page-container py-12 md:py-16">
        <ScrollReveal className="flex justify-between items-end mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Zap size={15} className="text-primary-500" />
              <span className="text-xs font-bold text-primary-500 uppercase tracking-wider">On Promotion</span>
            </div>
            <h2 className="section-title">Featured Weekly Deals</h2>
            <p className="section-sub mt-1">Highly-recommended compounds on special promotion.</p>
          </div>
          <Link to="/weekly-deals-4304" className="hidden sm:flex items-center gap-1.5 text-sm font-bold text-primary-500 hover:text-primary-600 transition-colors shrink-0">
            View All Deals <ArrowRight size={15} />
          </Link>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {featuredProducts.map((product: Product, idx: number) => (
            <ScrollReveal key={product.id} delay={idx * 60}>
              <ProductCard product={product} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── Peptides & HGH Showcase ──────────────────── */}
      <section className="bg-white border-y border-brand-border py-12 md:py-16">
        <div className="page-container">
          <ScrollReveal className="flex justify-between items-end mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Dna size={15} className="text-emerald-500" />
                <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider">Growth & Recovery</span>
              </div>
              <h2 className="section-title">HGH & Peptides</h2>
              <p className="section-sub mt-1">Pharmaceutical-grade growth hormone and peptide compounds.</p>
            </div>
            <Link to="/peptides-414" className="hidden sm:flex items-center gap-1.5 text-sm font-bold text-primary-500 hover:text-primary-600 transition-colors shrink-0">
              View All <ArrowRight size={15} />
            </Link>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {peptides.map((product: Product, idx: number) => (
              <ScrollReveal key={product.id} delay={idx * 70}>
                <ProductCard product={product} />
              </ScrollReveal>
            ))}
          </div>

          {/* HGH promo strip */}
          <ScrollReveal className="mt-8">
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-emerald-950 to-slate-900 p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 border border-emerald-900/40">
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 80% 50%, #10b981, transparent 60%)' }} />
              <div className="flex-1 z-10 text-center md:text-left">
                <span className="inline-flex px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 text-[10px] font-extrabold uppercase tracking-wider mb-3">
                  Third-Party Lab Verified
                </span>
                <h3 className="text-xl md:text-2xl font-extrabold text-white mb-2">Dragontropin HGH — Lab Confirmed Purity</h3>
                <p className="text-sm text-white/60 max-w-lg">Independent laboratory tests confirm 100% accurate dosage strength. Full transparency, every batch.</p>
              </div>
              <div className="shrink-0 flex items-center gap-4 z-10">
                {peptides.slice(0, 2).map((p: Product) => (
                  <div key={p.id} className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 overflow-hidden p-2">
                    <img src={p.image} alt={p.name} className="w-full h-full object-contain" onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/80x80/052e16/10b981?text=HGH'; }} />
                  </div>
                ))}
                <Link to="/peptides-414" className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500 text-white rounded-xl text-sm font-bold hover:bg-emerald-600 transition-colors whitespace-nowrap">
                  Shop HGH <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Lab Test Promo Banner ────────────────────── */}
      <section className="page-container py-12 md:py-16">
        <ScrollReveal>
          <div className="bg-gradient-to-r from-brand-text via-slate-900 to-brand-text border border-white/5 rounded-3xl p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
            <div className="absolute right-0 top-0 w-80 h-80 rounded-full bg-primary-500/10 blur-3xl pointer-events-none" />
            <div className="absolute left-10 bottom-0 w-64 h-64 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />
            <div className="space-y-4 max-w-2xl text-center md:text-left z-10">
              <span className="inline-flex px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-extrabold text-[10px] uppercase tracking-wider">
                Third-Party Laboratory Verified
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-white leading-tight tracking-tight">
                Purity & Potency Guaranteed
              </h2>
              <p className="text-sm text-white/70 leading-relaxed max-w-lg">
                We believe in complete transparency. Every single production batch of our products is tested by independent laboratories to verify dosage strength and raw ingredient purity.
              </p>
            </div>
            <div className="shrink-0 z-10">
              <Link to="/lab-tested-3525" className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-brand-text rounded-2xl font-bold text-sm shadow-lg hover:bg-brand-soft hover:-translate-y-0.5 transition-all">
                Check Verified Reports <ArrowRight size={16} className="text-primary-500" />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ── All Products Quick Browse ─────────────────── */}
      <section className="bg-white border-y border-brand-border py-12 md:py-16">
        <div className="page-container">
          <ScrollReveal className="flex justify-between items-end mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Package size={15} className="text-brand-muted" />
                <span className="text-xs font-bold text-brand-muted uppercase tracking-wider">Full Catalog</span>
              </div>
              <h2 className="section-title">More Products</h2>
              <p className="section-sub mt-1">Explore more from our complete range of compounds.</p>
            </div>
            <Link to="/search" className="hidden sm:flex items-center gap-1.5 text-sm font-bold text-primary-500 hover:text-primary-600 transition-colors shrink-0">
              Browse All <ArrowRight size={15} />
            </Link>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {defaultProducts.slice(4, 14).map((product, idx) => (
              <ScrollReveal key={product.id} delay={idx * 40}>
                <Link
                  to={`/${product.categorySlug}/${product.slug}`}
                  className="group block bg-brand-soft rounded-2xl border border-brand-border hover:border-primary-200 hover:shadow-brand-md transition-all overflow-hidden"
                >
                  <div className="aspect-square bg-white p-4 relative">
                    {product.labTested && (
                      <span className="absolute top-2 left-2 px-1.5 py-0.5 bg-emerald-500 text-white text-[9px] font-bold rounded-full z-10">✓ LAB</span>
                    )}
                    {product.intOriginalPrice && (
                      <span className="absolute top-2 right-2 px-1.5 py-0.5 bg-primary-500 text-white text-[9px] font-bold rounded-full z-10">
                        -{Math.round((1 - product.intPrice / product.intOriginalPrice) * 100)}%
                      </span>
                    )}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => { (e.target as HTMLImageElement).src = `https://via.placeholder.com/200x200/fdf1ef/b54444?text=${encodeURIComponent(product.name.slice(0, 2))}`; }}
                    />
                  </div>
                  <div className="p-3">
                    <div className="text-[9px] font-semibold text-brand-muted uppercase tracking-wide mb-0.5">
                      {product.substance.split(',')[0].trim()}
                    </div>
                    <div className="font-bold text-xs text-brand-text leading-tight line-clamp-2 group-hover:text-primary-500 transition-colors mb-2">
                      {product.name}
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-extrabold text-sm text-brand-text">${product.intPrice.toFixed(2)}</span>
                      {product.intOriginalPrice && (
                        <span className="text-[10px] text-brand-muted line-through">${product.intOriginalPrice.toFixed(2)}</span>
                      )}
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/search" className="btn-outline">
              Browse All Products <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Latest News ─────────────────────────────── */}
      <section className="page-container py-12 md:py-16">
        <ScrollReveal className="text-center max-w-xl mx-auto mb-10">
          <h2 className="section-title">News & Updates</h2>
          <p className="section-sub mt-2">Latest industry updates, laboratory postings, and sales announcements.</p>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {newsItems.slice(0, 3).map((item, idx) => (
            <ScrollReveal key={item.id} delay={idx * 100} className="flex flex-col h-full">
              <div className="flex flex-col bg-white border border-brand-border rounded-2xl overflow-hidden hover:shadow-brand-md hover:border-primary-200 transition-all flex-1">
                <div className="aspect-[16/9] bg-brand-soft overflow-hidden relative">
                  <span className="absolute right-3 top-3 z-10 px-2 py-1 bg-white/95 text-brand-text text-[10px] font-bold rounded-lg border border-brand-border shadow-sm">
                    {item.category}
                  </span>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/600x340/fdf1ef/b54444?text=Dragon+Pharma+News'; }}
                  />
                </div>
                <div className="p-5 flex flex-col flex-1 gap-2.5">
                  <div className="text-[11px] font-semibold text-brand-muted uppercase tracking-wide">
                    {item.date} • {item.author}
                  </div>
                  <h3 className="font-extrabold text-base text-brand-text leading-snug hover:text-primary-500 transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-brand-muted leading-relaxed line-clamp-3">{item.excerpt}</p>
                  <Link to="/info/about-us" className="inline-flex items-center gap-1 text-xs font-bold text-primary-500 hover:text-primary-600 mt-auto pt-2 transition-all hover:translate-x-0.5">
                    Read Article <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
}
