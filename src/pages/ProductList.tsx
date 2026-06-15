import { useState, useMemo, useEffect } from 'react';
import { useParams, useSearchParams, useLocation, Link } from 'react-router-dom';
import { 
  Filter, 
  SlidersHorizontal, 
  X, 
  Search, 
  Sparkles,
  ShoppingBag
} from 'lucide-react';
import { 
  getStoredProducts,
  categories, 
  brands, 
  sales, 
  warehouses,
  type Product
} from '../lib/products-data';
import ProductCard from '../components/ProductCard';
import ScrollReveal from '../components/ScrollReveal';

export default function ProductList() {
  const { slug } = useParams<{ slug?: string }>();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const searchQ = searchParams.get('q') || '';
  const [productsList, setProductsList] = useState<Product[]>(getStoredProducts());

  useEffect(() => {
    const handler = () => {
      setProductsList(getStoredProducts());
    };
    window.addEventListener('dp_products_updated', handler);
    return () => window.removeEventListener('dp_products_updated', handler);
  }, []);

  // Filter & Sorting state
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSubstances, setSelectedSubstances] = useState<string[]>([]);
  const [onlyLabTested, setOnlyLabTested] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState<number>(650); // max price in dataset
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Reset filters when the route/slug changes
  useEffect(() => {
    setSelectedBrands([]);
    setSelectedCategories([]);
    setSelectedSubstances([]);
    setOnlyLabTested(false);
    setSortBy('featured');
    setPriceRange(650);
  }, [slug, searchQ]);

  // Determine current contextual categorization based on URL or query
  const pageMeta = useMemo(() => {
    const isSearch = location.pathname.startsWith('/search');
    if (isSearch) {
      return {
        type: 'search',
        title: `Search Results`,
        subtitle: searchQ ? `Showing products matching "${searchQ}"` : `Browse our entire product catalog`,
      };
    }

    if (!slug) {
      return {
        type: 'all',
        title: 'All Products',
        subtitle: 'Explore our full range of pharmaceutical-grade products.',
      };
    }

    const catMatch = categories.find(c => c.slug === slug);
    if (catMatch) {
      return {
        type: 'category',
        title: catMatch.name,
        subtitle: `High-quality ${catMatch.name.toLowerCase()} pharmaceutical compounds.`,
        categorySlug: slug
      };
    }

    const brandMatch = brands.find(b => b.slug === slug);
    if (brandMatch) {
      return {
        type: 'brand',
        title: `${brandMatch.name} Store`,
        subtitle: `Official, verified products manufactured by ${brandMatch.name}.`,
        brandSlug: slug
      };
    }

    const saleMatch = sales.find(s => s.slug === slug);
    if (saleMatch) {
      return {
        type: 'sale',
        title: saleMatch.name,
        subtitle: `Huge savings of up to ${saleMatch.suffix} off list price. Limited time offer.`,
        saleSlug: slug
      };
    }

    const whMatch = warehouses.find(w => w.slug === slug);
    if (whMatch) {
      return {
        type: 'warehouse',
        title: whMatch.name,
        subtitle: `Compounds stocked and ready to dispatch from our ${whMatch.name.split(' ')[0]} location.`,
        warehouseSlug: slug
      };
    }

    return {
      type: 'all',
      title: 'Products Store',
      subtitle: 'Premium performance enhancers.',
    };
  }, [slug, searchQ, location.pathname]);

  // Retrieve base filtered products list based on URL context
  const baseProducts = useMemo(() => {
    let list = [...productsList];

    if (pageMeta.type === 'search' && searchQ) {
      const q = searchQ.toLowerCase();
      list = list.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.substance.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q)
      );
    } else if (pageMeta.type === 'category' && pageMeta.categorySlug) {
      list = list.filter(p => p.categorySlug === pageMeta.categorySlug);
    } else if (pageMeta.type === 'brand' && pageMeta.brandSlug) {
      list = list.filter(p => p.brandSlug === pageMeta.brandSlug);
    } else if (pageMeta.type === 'sale' && pageMeta.saleSlug) {
      const slugVal = pageMeta.saleSlug;
      if (slugVal === 'weekly-deals-4304') {
        list = list.filter(p => p.ribbons.includes('-50% OFF'));
      } else if (slugVal === 'exclusive-deals-3047') {
        list = list.filter(p => p.ribbons.includes('-40% OFF'));
      } else if (slugVal === 'clearance-4305') {
        list = list.filter(p => p.ribbons.includes('-30% OFF'));
      } else if (slugVal === 'promo-4068') {
        list = list.filter(p => p.ribbons.includes('Buy 3 Get 1 FREE') || p.suggestions.some(s => s.includes('FREE')));
      }
    } else if (pageMeta.type === 'warehouse' && pageMeta.warehouseSlug) {
      // US Domestic vs International warehouse shipping
      // For this mock e-commerce, all items have prices for both.
      // But we can filter by products that have ribbons or suggestions that match, or simply show all.
      // In products-data, ribbons have "Domestic & International" for US & Int.
      // So all products fit, but we will indicate the selected warehouse in checkout.
    }

    return list;
  }, [pageMeta, searchQ, productsList]);

  // Extract metadata values (brands, categories, substances) from currently listed products for filters
  const filterOptions = useMemo(() => {
    const bSet = new Set<string>();
    const cSet = new Set<string>();
    const sSet = new Set<string>();
    let maxP = 0;

    baseProducts.forEach(p => {
      bSet.add(p.brand);
      cSet.add(p.category);
      // Clean substance name from details (e.g. split /)
      p.substance.split('/').forEach(sub => sSet.add(sub.trim()));
      if (p.intPrice > maxP) maxP = p.intPrice;
    });

    return {
      brands: Array.from(bSet),
      categories: Array.from(cSet),
      substances: Array.from(sSet).slice(0, 15), // cap options list length
      maxPrice: maxP || 650
    };
  }, [baseProducts]);

  // Apply user interactive filters and sorting logic
  const filteredProducts = useMemo(() => {
    let list = [...baseProducts];

    // Filter by Brand
    if (selectedBrands.length > 0) {
      list = list.filter(p => selectedBrands.includes(p.brand));
    }

    // Filter by Category (Only active when browsing brand/search/sale/all, not on specific category page)
    if (selectedCategories.length > 0 && pageMeta.type !== 'category') {
      list = list.filter(p => selectedCategories.includes(p.category));
    }

    // Filter by Substance
    if (selectedSubstances.length > 0) {
      list = list.filter(p => 
        selectedSubstances.some(sub => p.substance.toLowerCase().includes(sub.toLowerCase()))
      );
    }

    // Filter by Price range
    list = list.filter(p => p.intPrice <= priceRange);

    // Filter by Lab Tested
    if (onlyLabTested) {
      list = list.filter(p => p.labTested);
    }

    // Sort Products
    list.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc': return a.intPrice - b.intPrice;
        case 'price-desc': return b.intPrice - a.intPrice;
        case 'name-asc': return a.name.localeCompare(b.name);
        case 'best': return (b.bestSeller ? 1 : 0) - (a.bestSeller ? 1 : 0);
        case 'featured':
        default:
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      }
    });

    return list;
  }, [baseProducts, selectedBrands, selectedCategories, selectedSubstances, priceRange, onlyLabTested, sortBy, pageMeta.type]);

  const toggleBrand = (b: string) => {
    setSelectedBrands(prev => prev.includes(b) ? prev.filter(x => x !== b) : [...prev, b]);
  };

  const toggleCategory = (c: string) => {
    setSelectedCategories(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);
  };

  const toggleSubstance = (s: string) => {
    setSelectedSubstances(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  };

  const clearAllFilters = () => {
    setSelectedBrands([]);
    setSelectedCategories([]);
    setSelectedSubstances([]);
    setOnlyLabTested(false);
    setPriceRange(filterOptions.maxPrice);
  };

  const activeFilterCount = selectedBrands.length + selectedCategories.length + selectedSubstances.length + (onlyLabTested ? 1 : 0);

  return (
    <div className="min-h-screen py-10 page-container">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-1.5 text-xs text-brand-muted mb-4 font-medium">
        <Link to="/" className="hover:text-primary-500 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-brand-text capitalize">{pageMeta.type}</span>
        {slug && (
          <>
            <span>/</span>
            <span className="text-primary-500 font-bold truncate max-w-[150px]">{pageMeta.title}</span>
          </>
        )}
      </div>

      {/* Header Banner */}
      <div className="bg-white border border-brand-border rounded-3xl p-6 md:p-8 mb-8 shadow-brand-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-brand-text tracking-tight flex items-center gap-2">
            {pageMeta.title}
          </h1>
          <p className="text-sm text-brand-muted mt-1 max-w-xl font-medium leading-relaxed">
            {pageMeta.subtitle}
          </p>
        </div>
        
        {pageMeta.type === 'search' && (
          <div className="shrink-0 bg-brand-soft rounded-2xl px-4 py-3 border border-brand-border flex items-center gap-2.5">
            <Search size={18} className="text-primary-500" />
            <span className="text-xs font-bold text-brand-text">
              Found {filteredProducts.length} Compounds
            </span>
          </div>
        )}
      </div>

      <div className="flex gap-8 items-start relative">
        {/* ── Sidebar Filters (Desktop) ───────────────── */}
        <aside className="w-64 shrink-0 hidden lg:block space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-brand-border">
            <span className="font-bold text-brand-text flex items-center gap-2 text-sm">
              <SlidersHorizontal size={16} /> Filters
            </span>
            {activeFilterCount > 0 && (
              <button 
                onClick={clearAllFilters}
                className="text-xs font-extrabold text-primary-500 hover:underline"
              >
                Clear all ({activeFilterCount})
              </button>
            )}
          </div>

          {/* Categories Filter (Only show when not in specific category view) */}
          {pageMeta.type !== 'category' && filterOptions.categories.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-bold text-brand-text text-sm uppercase tracking-wider">Categories</h3>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {filterOptions.categories.map(cat => (
                  <label key={cat} className="flex items-center gap-2.5 text-xs text-brand-muted hover:text-brand-text cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat)}
                      onChange={() => toggleCategory(cat)}
                      className="w-4 h-4 rounded border-brand-border text-primary-500 focus:ring-primary-500"
                    />
                    <span className={selectedCategories.includes(cat) ? 'text-primary-500 font-bold' : ''}>
                      {cat}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Brands Filter */}
          {filterOptions.brands.length > 1 && (
            <div className="space-y-3 pt-4 border-t border-brand-border/60">
              <h3 className="font-bold text-brand-text text-sm uppercase tracking-wider">Brands</h3>
              <div className="space-y-2">
                {filterOptions.brands.map(br => (
                  <label key={br} className="flex items-center gap-2.5 text-xs text-brand-muted hover:text-brand-text cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(br)}
                      onChange={() => toggleBrand(br)}
                      className="w-4 h-4 rounded border-brand-border text-primary-500 focus:ring-primary-500"
                    />
                    <span className={selectedBrands.includes(br) ? 'text-primary-500 font-bold' : ''}>
                      {br}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Price Range Filter */}
          <div className="space-y-3 pt-4 border-t border-brand-border/60">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-brand-text text-sm uppercase tracking-wider">Max Price</h3>
              <span className="font-black text-xs text-primary-500">${priceRange}</span>
            </div>
            <input
              type="range"
              min={10}
              max={filterOptions.maxPrice}
              value={priceRange}
              onChange={e => setPriceRange(Number(e.target.value))}
              className="w-full accent-primary-500 bg-brand-soft border-brand-border h-1.5 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-brand-muted font-bold">
              <span>$10</span>
              <span>${filterOptions.maxPrice}</span>
            </div>
          </div>

          {/* Substances Filter */}
          {filterOptions.substances.length > 0 && (
            <div className="space-y-3 pt-4 border-t border-brand-border/60">
              <h3 className="font-bold text-brand-text text-sm uppercase tracking-wider">Active Substance</h3>
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {filterOptions.substances.map(sub => (
                  <label key={sub} className="flex items-center gap-2.5 text-xs text-brand-muted hover:text-brand-text cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={selectedSubstances.includes(sub)}
                      onChange={() => toggleSubstance(sub)}
                      className="w-4 h-4 rounded border-brand-border text-primary-500 focus:ring-primary-500"
                    />
                    <span className={selectedSubstances.includes(sub) ? 'text-primary-500 font-bold' : ''}>
                      {sub}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Lab tested filter */}
          <div className="pt-4 border-t border-brand-border/60">
            <label className="flex items-center gap-2.5 text-xs text-brand-muted hover:text-brand-text cursor-pointer select-none font-bold">
              <input
                type="checkbox"
                checked={onlyLabTested}
                onChange={() => setOnlyLabTested(!onlyLabTested)}
                className="w-4 h-4 rounded border-brand-border text-primary-500 focus:ring-primary-500"
              />
              <span className="text-emerald-600 flex items-center gap-1">
                <Sparkles size={12} /> Only Lab Tested
              </span>
            </label>
          </div>
        </aside>

        {/* ── Main Catalog Column ────────────────────── */}
        <section className="flex-1">
          {/* Controls Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-brand-border mb-6 flex-wrap gap-3">
            <div className="text-xs font-semibold text-brand-muted">
              Showing <span className="text-brand-text font-black">{filteredProducts.length}</span> of {baseProducts.length} results
            </div>

            <div className="flex items-center gap-2">
              {/* Mobile Filter Toggle */}
              <button 
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-1.5 px-3 py-2 border border-brand-border rounded-xl text-xs font-bold bg-white text-brand-text"
              >
                <Filter size={14} /> Filter
              </button>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-1">
                <span className="text-xs text-brand-muted font-bold hidden sm:inline">Sort:</span>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="bg-white border border-brand-border rounded-xl px-3 py-2 text-xs font-bold outline-none focus:border-primary-500 text-brand-text"
                >
                  <option value="featured">Featured First</option>
                  <option value="best">Best Sellers</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                </select>
              </div>
            </div>
          </div>

          {/* Active Filters Summary Chips */}
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedBrands.map(b => (
                <span key={b} className="inline-flex items-center gap-1 px-2.5 py-1 bg-primary-100 text-primary-500 text-[10px] font-black rounded-lg">
                  {b} <X size={12} className="cursor-pointer" onClick={() => toggleBrand(b)} />
                </span>
              ))}
              {selectedCategories.map(c => (
                <span key={c} className="inline-flex items-center gap-1 px-2.5 py-1 bg-primary-100 text-primary-500 text-[10px] font-black rounded-lg">
                  {c} <X size={12} className="cursor-pointer" onClick={() => toggleCategory(c)} />
                </span>
              ))}
              {selectedSubstances.map(s => (
                <span key={s} className="inline-flex items-center gap-1 px-2.5 py-1 bg-primary-100 text-primary-500 text-[10px] font-black rounded-lg">
                  {s} <X size={12} className="cursor-pointer" onClick={() => toggleSubstance(s)} />
                </span>
              ))}
              {onlyLabTested && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-black rounded-lg">
                  Lab Tested <X size={12} className="cursor-pointer" onClick={() => setOnlyLabTested(false)} />
                </span>
              )}
            </div>
          )}

          {/* Catalog Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {filteredProducts.map((product, idx) => (
                <ScrollReveal key={product.id} delay={idx * 50}>
                  <ProductCard product={product} size="sm" />
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white border border-brand-border rounded-3xl p-8 max-w-md mx-auto space-y-4 shadow-brand-sm">
              <div className="w-16 h-16 rounded-2xl bg-brand-soft flex items-center justify-center mx-auto text-primary-500">
                <ShoppingBag size={28} />
              </div>
              <h2 className="text-lg font-bold text-brand-text">No Products Found</h2>
              <p className="text-sm text-brand-muted leading-relaxed">
                We couldn't find any products matching your current filters. Try relaxing your parameters or clearing active selections.
              </p>
              <button 
                onClick={clearAllFilters} 
                className="btn-primary"
              >
                Reset Filters
              </button>
            </div>
          )}
        </section>
      </div>

      {/* ── Mobile Filters Slide-over Drawer ───────── */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileFilterOpen(false)} />
          {/* Drawer Body */}
          <div className="relative bg-white w-[300px] h-full shadow-2xl flex flex-col p-5 overflow-y-auto animate-fadeIn ml-auto">
            <div className="flex items-center justify-between pb-4 border-b border-brand-border mb-4">
              <span className="font-bold text-brand-text text-sm">Filters</span>
              <button onClick={() => setMobileFilterOpen(false)} className="p-1.5 rounded-lg hover:bg-brand-soft text-brand-muted">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-6 flex-grow">
              {/* Category */}
              {pageMeta.type !== 'category' && filterOptions.categories.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-extrabold text-xs text-brand-text uppercase">Categories</h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {filterOptions.categories.map(cat => (
                      <label key={cat} className="flex items-center gap-2 text-xs text-brand-muted">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(cat)}
                          onChange={() => toggleCategory(cat)}
                          className="w-4 h-4 rounded border-brand-border text-primary-500"
                        />
                        {cat}
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Brands */}
              {filterOptions.brands.length > 1 && (
                <div className="space-y-2">
                  <h4 className="font-extrabold text-xs text-brand-text uppercase">Brands</h4>
                  <div className="space-y-2">
                    {filterOptions.brands.map(br => (
                      <label key={br} className="flex items-center gap-2 text-xs text-brand-muted">
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(br)}
                          onChange={() => toggleBrand(br)}
                          className="w-4 h-4 rounded border-brand-border text-primary-500"
                        />
                        {br}
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Max Price */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <h4 className="font-extrabold text-brand-text uppercase">Max Price</h4>
                  <span className="font-bold text-primary-500">${priceRange}</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={filterOptions.maxPrice}
                  value={priceRange}
                  onChange={e => setPriceRange(Number(e.target.value))}
                  className="w-full accent-primary-500"
                />
              </div>

              {/* Substances */}
              {filterOptions.substances.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-extrabold text-xs text-brand-text uppercase">Active Substance</h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {filterOptions.substances.map(sub => (
                      <label key={sub} className="flex items-center gap-2 text-xs text-brand-muted">
                        <input
                          type="checkbox"
                          checked={selectedSubstances.includes(sub)}
                          onChange={() => toggleSubstance(sub)}
                          className="w-4 h-4 rounded border-brand-border text-primary-500"
                        />
                        {sub}
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Lab Tested */}
              <div>
                <label className="flex items-center gap-2 text-xs text-brand-muted font-bold">
                  <input
                    type="checkbox"
                    checked={onlyLabTested}
                    onChange={() => setOnlyLabTested(!onlyLabTested)}
                    className="w-4 h-4 rounded border-brand-border text-primary-500"
                  />
                  Only Lab Tested
                </label>
              </div>
            </div>

            <div className="pt-4 border-t border-brand-border mt-6 flex gap-3">
              {activeFilterCount > 0 && (
                <button 
                  onClick={clearAllFilters} 
                  className="flex-1 py-2.5 border border-brand-border rounded-xl text-xs font-bold text-brand-muted"
                >
                  Reset
                </button>
              )}
              <button 
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-2.5 bg-primary-500 text-white rounded-xl text-xs font-bold"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
