import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, User, Menu, X, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { categories, brands, sales, warehouses } from '../lib/products-data';
import { supabase } from '../lib/supabase-client';

interface NavDropdownItem { label: string; sublabel?: string; to: string; }
interface NavMenuItem {
  label: string;
  to?: string;
  children?: NavDropdownItem[];
}

const navItems: NavMenuItem[] = [
  {
    label: 'SALE',
    children: sales.map(s => ({ label: s.name, sublabel: s.suffix, to: `/${s.slug}` })),
  },
  {
    label: 'Warehouse',
    children: warehouses.map(w => ({ label: w.name, to: `/${w.slug}` })),
  },
  {
    label: 'Categories',
    children: categories.map(c => ({ label: c.name, to: `/${c.slug}` })),
  },
  {
    label: 'Brands',
    children: brands.map(b => ({ label: b.name, to: `/${b.slug}` })),
  },
  { label: 'Lab Tested', to: '/lab-tested-3525' },
  { label: 'Reviews', to: '/reviews' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact Us', to: '/contact' },
];

export default function Header() {
  const { totalItems, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQ, setSearchQ] = useState('');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLInputElement>(null);
  const dropdownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) setTimeout(() => searchRef.current?.focus(), 100);
  }, [searchOpen]);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleDropdownEnter = (label: string) => {
    if (dropdownTimer.current) clearTimeout(dropdownTimer.current);
    setActiveDropdown(label);
  };
  const handleDropdownLeave = () => {
    dropdownTimer.current = setTimeout(() => setActiveDropdown(null), 120);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQ.trim()) {
      setSearchOpen(false);
      navigate(`/search?q=${encodeURIComponent(searchQ.trim())}`);
      setSearchQ('');
    }
  };

  return (
    <>
      {/* ── Search Overlay ─────────────────────────── */}
      {searchOpen && (
        <>
          <div className="quick-search-overlay" onClick={() => setSearchOpen(false)} />
          <div className="quick-search-box">
            <form onSubmit={handleSearch} className="flex items-center gap-3 max-w-3xl mx-auto">
              <Search className="text-brand-muted shrink-0" size={20} />
              <input
                ref={searchRef}
                value={searchQ}
                onChange={e => setSearchQ(e.target.value)}
                placeholder="Search products, substances…"
                className="flex-1 text-lg outline-none border-none bg-transparent text-brand-text placeholder:text-brand-muted"
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="p-1 rounded-full hover:bg-brand-soft transition-colors"
              >
                <X size={20} className="text-brand-muted" />
              </button>
            </form>
          </div>
        </>
      )}

      {/* ── Main Header ────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white shadow-brand-md' : 'bg-white border-b border-brand-border'
        }`}
        style={{ height: 64 }}
      >
        <div className="page-container h-full flex items-center gap-4">
          {/* Hamburger */}
          <button
            className="lg:hidden p-2 -ml-2 text-brand-text"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 mr-4">
            <img src="/logo.png" alt="Dragon Pharma Logo" className="w-9 h-9 object-contain shrink-0" />
            <div className="hidden sm:block">
              <div className="font-black text-brand-text text-sm leading-none tracking-tight">DRAGON PHARMA LABS</div>
              <div className="text-[10px] text-brand-muted leading-none mt-0.5">official steroid store</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 flex-1">
            {navItems.map(item => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && handleDropdownEnter(item.label)}
                onMouseLeave={() => item.children && handleDropdownLeave()}
              >
                {item.to ? (
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `nav-link px-3 py-2 rounded-lg hover:bg-brand-soft ${isActive ? 'text-primary-500' : ''}`
                    }
                  >
                    {item.label}
                  </NavLink>
                ) : (
                  <button
                    className={`nav-link px-3 py-2 rounded-lg hover:bg-brand-soft flex items-center gap-1 ${
                      item.label === 'SALE' ? 'text-primary-500' : ''
                    }`}
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-150 ${activeDropdown === item.label ? 'rotate-180' : ''}`}
                      />
                    )}
                  </button>
                )}

                {/* Dropdown */}
                {item.children && (
                  <div
                    className={`absolute top-full left-0 mt-1 bg-white border border-brand-border rounded-2xl shadow-brand-md py-2 z-50 min-w-[200px] transition-all duration-200 ${
                      activeDropdown === item.label
                        ? 'opacity-100 visible translate-y-0'
                        : 'opacity-0 invisible -translate-y-1 pointer-events-none'
                    }`}
                    onMouseEnter={() => handleDropdownEnter(item.label)}
                    onMouseLeave={handleDropdownLeave}
                  >
                    {item.children.map(child => (
                      <Link
                        key={child.to}
                        to={child.to}
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-center justify-between px-4 py-2 text-sm text-brand-text hover:bg-brand-soft hover:text-primary-500 transition-colors"
                      >
                        <span>{child.label}</span>
                        {child.sublabel && (
                          <sup className="text-primary-500 font-bold text-[10px]">{child.sublabel}</sup>
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 ml-auto lg:ml-0">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-xl hover:bg-brand-soft text-brand-muted hover:text-primary-500 transition-colors"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            {user ? (
              <div className="flex items-center gap-2">
                <div className="hidden md:flex flex-col items-end text-right">
                  <span className="text-xs font-black text-brand-text truncate max-w-[120px]">
                    {user.user_metadata?.name || user.email?.split('@')[0]}
                  </span>
                  <button
                    onClick={() => supabase.auth.signOut()}
                    className="text-[10px] text-red-500 font-extrabold hover:underline cursor-pointer bg-transparent border-none p-0"
                  >
                    Sign Out
                  </button>
                </div>
                <div className="w-8 h-8 rounded-full bg-primary-100 border border-primary-200 text-primary-600 flex items-center justify-center font-black text-xs uppercase shadow-sm">
                  {(user.user_metadata?.name || user.email || 'U')[0]}
                </div>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold text-brand-text hover:bg-brand-soft hover:text-primary-500 transition-colors"
                >
                  <User size={16} />
                  <span className="hidden md:inline">Login</span>
                </Link>
                <Link
                  to="/join"
                  className="hidden sm:inline-flex px-3 py-2 rounded-xl text-sm font-semibold border border-brand-border text-brand-muted hover:border-primary-500 hover:text-primary-500 transition-colors"
                >
                  Join
                </Link>
              </>
            )}
            <button
              onClick={openCart}
              className="relative flex items-center gap-1.5 px-3 py-2 bg-primary-500 text-white rounded-xl text-sm font-semibold hover:bg-primary-600 transition-colors"
            >
              <ShoppingBag size={16} />
              <span className="hidden sm:inline">Cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-brand-dark text-white text-[10px] font-black rounded-full flex items-center justify-center">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Menu ─────────────────────────────── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="relative bg-white w-[320px] max-w-full h-full overflow-y-auto flex flex-col shadow-xl animate-fadeIn">
            {/* Mobile Header */}
            <div className="flex items-center justify-between p-4 border-b border-brand-border">
              <Link to="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2">
                <img src="/logo.png" alt="Dragon Pharma Logo" className="w-8 h-8 object-contain shrink-0" />
                <span className="font-black text-brand-text text-sm">DRAGONPHARMALABS.COM</span>
              </Link>
              <button onClick={() => setMobileOpen(false)} className="p-2 rounded-lg hover:bg-brand-soft">
                <X size={20} className="text-brand-muted" />
              </button>
            </div>

            {/* Mobile Search */}
            <div className="p-4 border-b border-brand-border">
              <form onSubmit={(e) => { e.preventDefault(); setMobileOpen(false); navigate(`/search?q=${searchQ}`); }}>
                <div className="flex items-center gap-2 bg-brand-soft rounded-xl px-3 py-2">
                  <Search size={16} className="text-brand-muted" />
                  <input
                    value={searchQ}
                    onChange={e => setSearchQ(e.target.value)}
                    placeholder="Search products…"
                    className="flex-1 text-sm bg-transparent outline-none text-brand-text placeholder:text-brand-muted"
                  />
                </div>
              </form>
            </div>

            {/* Mobile Links */}
            <div className="flex-1 py-2">
              {user ? (
                <div className="px-4 py-3 border-b border-brand-border space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-black text-sm uppercase">
                      {(user.user_metadata?.name || user.email || 'U')[0]}
                    </div>
                    <div>
                      <div className="text-xs font-black text-brand-text">
                        {user.user_metadata?.name || user.email?.split('@')[0]}
                      </div>
                      <div className="text-[10px] text-brand-muted">{user.email}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => { supabase.auth.signOut(); setMobileOpen(false); }}
                    className="w-full text-center text-xs font-black text-red-500 hover:bg-red-50 py-2 rounded-xl border border-red-100 transition-all cursor-pointer block bg-transparent"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-brand-text hover:bg-brand-soft">
                    <User size={16} /> Login
                  </Link>
                  <Link to="/join" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-brand-text hover:bg-brand-soft border-b border-brand-border">
                    Join Free
                  </Link>
                </>
              )}

              {navItems.map(item => (
                <div key={item.label}>
                  {item.to ? (
                    <NavLink
                      to={item.to}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        `block px-4 py-3 text-sm font-semibold hover:bg-brand-soft border-b border-brand-border/50 ${isActive ? 'text-primary-500' : 'text-brand-text'}`
                      }
                    >
                      {item.label}
                    </NavLink>
                  ) : (
                    <div>
                      <button
                        className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-brand-text hover:bg-brand-soft border-b border-brand-border/50"
                        onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                      >
                        <span className={item.label === 'SALE' ? 'text-primary-500' : ''}>{item.label}</span>
                        <ChevronDown
                          size={14}
                          className={`text-brand-muted transition-transform duration-200 ${mobileExpanded === item.label ? 'rotate-180' : ''}`}
                        />
                      </button>
                      {mobileExpanded === item.label && item.children && (
                        <div className="bg-brand-soft border-b border-brand-border">
                          {item.children.map(child => (
                            <Link
                              key={child.to}
                              to={child.to}
                              onClick={() => setMobileOpen(false)}
                              className="flex items-center gap-2 px-8 py-2.5 text-sm text-brand-muted hover:text-primary-500 hover:bg-white/60 transition-colors"
                            >
                              <span className="w-1 h-1 rounded-full bg-brand-border shrink-0" />
                              {child.label}
                              {child.sublabel && (
                                <sup className="text-primary-500 font-bold text-[10px]">{child.sublabel}</sup>
                              )}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
