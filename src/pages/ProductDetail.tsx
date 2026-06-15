import { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ShoppingCart, 
  CheckCircle, 
  FlaskConical, 
  Info,
  Minus,
  Plus,
  Maximize2
} from 'lucide-react';
import { getStoredProducts, type Product } from '../lib/products-data';
import { useCart, type Warehouse } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import ScrollReveal from '../components/ScrollReveal';

export default function ProductDetail() {
  const { productSlug } = useParams<{ productSlug: string }>();
  const { addItem } = useCart();
  const [productsList, setProductsList] = useState<Product[]>(getStoredProducts());

  useEffect(() => {
    const handler = () => {
      setProductsList(getStoredProducts());
    };
    window.addEventListener('dp_products_updated', handler);
    return () => window.removeEventListener('dp_products_updated', handler);
  }, []);

  // Find product by slug
  const product = useMemo(() => {
    return productsList.find(p => p.slug === productSlug);
  }, [productSlug, productsList]);

  const [warehouse, setWarehouse] = useState<Warehouse>('int');
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  // If product not found
  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8 page-container">
        <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center mb-4">
          <Info size={28} />
        </div>
        <h1 className="text-xl font-bold text-brand-text mb-2">Compound Not Found</h1>
        <p className="text-sm text-brand-muted max-w-sm mb-6 leading-relaxed">
          The product you are looking for does not exist or has been removed from the catalog.
        </p>
        <Link to="/orals-380" className="btn-primary">
          Back to Shop
        </Link>
      </div>
    );
  }

  // Calculate pricing based on warehouse selection
  const unitPrice = warehouse === 'usa' ? product.usaPrice : product.intPrice;
  const originalPrice = warehouse === 'usa' ? product.usaOriginalPrice : product.intOriginalPrice;
  const discount = originalPrice ? Math.round((1 - unitPrice / originalPrice) * 100) : 0;
  const saveAmount = originalPrice ? originalPrice - unitPrice : 0;

  const handleAddToCart = () => {
    // Add multiple quantities by loop or add once then update
    for (let i = 0; i < qty; i++) {
      addItem(product, warehouse);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  // Recommendations: Other products in the same category
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return productsList
      .filter(p => p.categorySlug === product.categorySlug && p.id !== product.id)
      .slice(0, 4);
  }, [product, productsList]);

  return (
    <div className="min-h-screen py-10 page-container">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-1.5 text-xs text-brand-muted mb-8 font-medium">
        <Link to="/" className="hover:text-primary-500 transition-colors">Home</Link>
        <span>/</span>
        <Link to={`/${product.categorySlug}`} className="hover:text-primary-500 transition-colors">{product.category}</Link>
        <span>/</span>
        <span className="text-primary-500 font-bold truncate max-w-[200px]">{product.name}</span>
      </div>

      {/* ── Main Panel ──────────────────────────────── */}
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 bg-white border border-brand-border rounded-3xl p-6 md:p-10 shadow-brand-sm mb-12">
        {/* Left Column: Media */}
        <div className="space-y-6">
          <div className="aspect-square bg-brand-soft border border-brand-border rounded-2xl overflow-hidden relative group">
            {/* Ribbons */}
            <div className="absolute left-3 top-3 z-10 flex flex-col gap-1.5 pointer-events-none">
              {product.labTested && (
                <span className="ribbon ribbon-green text-[10px]">Verified Purity</span>
              )}
              {discount > 0 && (
                <span className="ribbon text-[10px] bg-primary-500">-{discount}% OFF</span>
              )}
            </div>

            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain p-6 hover:scale-[1.03] transition-transform duration-300 cursor-zoom-in"
              onClick={() => setLightboxImg(product.image)}
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://via.placeholder.com/512x512/fdf1ef/b54444?text=${encodeURIComponent(product.name)}`;
              }}
            />

            <button 
              onClick={() => setLightboxImg(product.image)}
              className="absolute right-3 bottom-3 p-2 rounded-xl bg-white/90 border border-brand-border text-brand-muted hover:text-primary-500 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Zoom Image"
            >
              <Maximize2 size={16} />
            </button>
          </div>

          {/* Verification Badge */}
          {product.labTested && product.labTestImage && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center justify-between gap-4">
              <div className="flex gap-3 items-start">
                <FlaskConical className="text-emerald-600 mt-0.5 shrink-0" size={20} />
                <div>
                  <h4 className="font-bold text-xs text-emerald-800">Independent Lab Tested Batch</h4>
                  <p className="text-[11px] text-emerald-700 mt-0.5 leading-relaxed">
                    This batch is certified for compound purity, raw concentration, and structural integrity.
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setLightboxImg(product.labTestImage || null)}
                className="shrink-0 text-xs font-black text-emerald-800 border border-emerald-300 bg-white hover:bg-emerald-100 rounded-xl px-3 py-2 transition-colors whitespace-nowrap"
              >
                View Certificate
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Order Details */}
        <div className="flex flex-col gap-6">
          <div>
            <span className="text-xs font-bold text-brand-muted uppercase tracking-wider">{product.brand}</span>
            <h1 className="text-2xl md:text-3xl font-black text-brand-text tracking-tight mt-1 leading-tight">{product.name}</h1>
            <p className="text-xs text-brand-muted mt-1.5 font-bold flex items-center gap-1.5">
              Category: <Link to={`/${product.categorySlug}`} className="text-primary-500 hover:underline">{product.category}</Link>
            </p>
          </div>

          {/* Warehouse Selector */}
          <div className="space-y-2.5">
            <label className="text-xs font-extrabold text-brand-text uppercase tracking-wider block">Shipping Warehouse</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setWarehouse('int')}
                className={`p-3 rounded-2xl border text-left flex flex-col transition-all cursor-pointer ${
                  warehouse === 'int'
                    ? 'border-primary-500 bg-primary-50/40 text-brand-text ring-1 ring-primary-500'
                    : 'border-brand-border hover:border-primary-300 text-brand-muted bg-white'
                }`}
              >
                <span className="font-extrabold text-xs flex items-center gap-1.5">
                  🌏 International
                </span>
                <span className="text-[10px] mt-0.5 leading-snug">
                  Worldwide delivery in 10-21 days. Lower prices.
                </span>
              </button>

              <button
                onClick={() => setWarehouse('usa')}
                className={`p-3 rounded-2xl border text-left flex flex-col transition-all cursor-pointer ${
                  warehouse === 'usa'
                    ? 'border-primary-500 bg-primary-50/40 text-brand-text ring-1 ring-primary-500'
                    : 'border-brand-border hover:border-primary-300 text-brand-muted bg-white'
                }`}
              >
                <span className="font-extrabold text-xs flex items-center gap-1.5">
                  🇺🇸 US Domestic
                </span>
                <span className="text-[10px] mt-0.5 leading-snug">
                  USA local shipping in 2-5 days. Local hubs.
                </span>
              </button>
            </div>
          </div>

          {/* Pricing Panel */}
          <div className="bg-brand-soft border border-brand-border rounded-2xl p-4 flex items-center justify-between gap-4 flex-wrap">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-brand-text">${unitPrice.toFixed(2)}</span>
                {originalPrice && (
                  <span className="text-sm text-brand-muted line-through">${originalPrice.toFixed(2)}</span>
                )}
              </div>
              {saveAmount > 0 && (
                <div className="text-xs text-emerald-600 font-extrabold mt-1">
                  You save ${saveAmount.toFixed(2)} (-{discount}%)
                </div>
              )}
            </div>

            {/* Qty & Add to Cart */}
            <div className="flex items-center gap-3">
              {/* Qty Selector */}
              <div className="flex items-center border border-brand-border rounded-xl bg-white overflow-hidden shadow-sm">
                <button
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="w-9 h-9 flex items-center justify-center text-brand-muted hover:bg-brand-soft transition-colors font-extrabold"
                  aria-label="Decrease Qty"
                >
                  <Minus size={14} />
                </button>
                <span className="w-10 text-center text-sm font-black text-brand-text">{qty}</span>
                <button
                  onClick={() => setQty(q => q + 1)}
                  className="w-9 h-9 flex items-center justify-center text-brand-muted hover:bg-brand-soft transition-colors font-extrabold"
                  aria-label="Increase Qty"
                >
                  <Plus size={14} />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className={`py-2.5 px-5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer ${
                  added 
                    ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                    : 'bg-primary-500 text-white hover:bg-primary-600'
                }`}
              >
                {added ? (
                  <>
                    <CheckCircle size={16} />
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingCart size={16} />
                    Add to Cart
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="border-t border-brand-border pt-4">
            <h3 className="font-extrabold text-xs text-brand-text uppercase tracking-wider mb-2">Description</h3>
            <p className="text-xs text-brand-muted leading-relaxed whitespace-pre-line">{product.description}</p>
          </div>
        </div>
      </div>

      {/* ── Technical Specifications ────────────────── */}
      <ScrollReveal className="bg-white border border-brand-border rounded-3xl p-6 md:p-8 shadow-brand-sm mb-12">
        <h2 className="font-black text-brand-text text-lg mb-6 border-b border-brand-border pb-3 uppercase tracking-wider">
          Compound Specifications
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-8">
          {[
            { label: 'Chemical Substance', value: product.substance },
            { label: 'Classification', value: product.classification },
            { label: 'Dosage Form', value: product.form },
            { label: 'Active Half-life', value: product.halfLife },
            { label: 'Standard Dosage', value: product.dosage },
            { label: 'Hepatotoxicity (Liver Stress)', value: product.hepatotoxicity },
            { label: 'Aromatization (Estrogen Convert)', value: product.aromatization },
            { label: 'Water Retention Risk', value: product.waterRetention },
            { label: 'Acne Side-effects', value: product.acne },
            { label: 'High Blood Pressure Risk', value: product.hbp },
          ].map((spec, idx) => (
            <div key={idx} className="flex justify-between py-2.5 border-b border-brand-border/40 text-xs gap-3">
              <span className="font-extrabold text-brand-text uppercase tracking-wide shrink-0">{spec.label}</span>
              <span className="text-right text-brand-muted font-bold capitalize">{spec.value.toLowerCase()}</span>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* ── Related Products ────────────────────────── */}
      {relatedProducts.length > 0 && (
        <section>
          <ScrollReveal className="mb-6">
            <h2 className="section-title">Related Compounds</h2>
            <p className="section-sub mt-1">Other effective products from this classification.</p>
          </ScrollReveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.map((p, idx) => (
              <ScrollReveal key={p.id} delay={idx * 50}>
                <ProductCard product={p} />
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}

      {/* ── Lightbox Overlay ───────────────────────── */}
      {lightboxImg && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm">
          {/* Close Backdrop */}
          <div className="absolute inset-0" onClick={() => setLightboxImg(null)} />
          {/* Image Box */}
          <div className="relative max-w-4xl max-h-[85vh] bg-white rounded-3xl overflow-hidden p-3 shadow-2xl flex flex-col z-10 animate-scaleIn">
            <button
              onClick={() => setLightboxImg(null)}
              className="absolute right-4 top-4 w-9 h-9 bg-black/60 hover:bg-primary-500 rounded-full flex items-center justify-center text-white font-extrabold transition-colors z-20"
              aria-label="Close Lightbox"
            >
              ✕
            </button>
            <img
              src={lightboxImg}
              alt="Verification Lightbox"
              className="max-h-[75vh] object-contain mx-auto rounded-xl"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/600x600/fdf1ef/b54444?text=Certificate+Not+Found';
              }}
            />
            {lightboxImg === product.labTestImage && (
              <div className="bg-brand-soft border-t border-brand-border p-3 text-center text-xs text-emerald-800 font-bold uppercase tracking-wide">
                Verified Lab Batch Certificate Claims • {product.name}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
