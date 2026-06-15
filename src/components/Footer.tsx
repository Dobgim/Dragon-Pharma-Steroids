import { useState } from 'react';
import { Link } from 'react-router-dom';
import { categories, brands } from '../lib/products-data';
import { Shield, Truck, FlaskConical, Lock, X } from 'lucide-react';

export default function Footer() {
  const [shippingBannerDismissed, setShippingBannerDismissed] = useState(false);

  return (
    <>
      {/* ── Free Shipping Sticky Banner ──────────────── */}
      {!shippingBannerDismissed && (
        <div
          className="fixed bottom-0 left-0 right-0 z-50 flex flex-col items-center justify-center py-2.5 px-4 shadow-2xl"
          style={{
            background: 'linear-gradient(to bottom, #951914, #b75a56)',
          }}
        >
          <div className="text-black font-black text-lg md:text-xl leading-none">
            Free Shipping!
          </div>
          <div className="text-black font-extrabold text-[10px] md:text-xs leading-none mt-1 tracking-wide">
            on Orders Over $800
          </div>

          {/* Dismiss button */}
          <button
            onClick={() => setShippingBannerDismissed(true)}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center bg-black border border-[#951914] hover:bg-neutral-900 transition-colors"
            aria-label="Dismiss banner"
          >
            <X size={12} className="text-white stroke-[3px]" />
          </button>
        </div>
      )}

      <footer className="bg-brand-text text-white" style={{ paddingBottom: shippingBannerDismissed ? '0' : '56px' }}>
        {/* Trust Bar */}
        <div className="border-b border-white/10">
          <div className="page-container py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: <Truck size={20} />, title: 'Fast & Discreet', desc: 'Worldwide shipping in 2–5 days' },
                { icon: <Shield size={20} />, title: '100% Guarantee', desc: 'Guaranteed delivery or reship' },
                { icon: <FlaskConical size={20} />, title: 'Lab Verified', desc: 'Independent 3rd-party testing' },
                { icon: <Lock size={20} />, title: 'Secure Payment', desc: 'Crypto, card & bank transfer' },
              ].map(item => (
                <div key={item.title} className="flex items-start gap-3">
                  <div className="text-primary-400 mt-0.5 shrink-0">{item.icon}</div>
                  <div>
                    <div className="font-bold text-sm">{item.title}</div>
                    <div className="text-xs text-white/60 mt-0.5">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="page-container py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <Link to="/" className="flex items-center gap-2.5 mb-4">
                <img src="/logo.png" alt="Dragon Pharma Logo" className="w-9 h-9 object-contain shrink-0" />
                <div>
                  <div className="font-black text-sm leading-none">DRAGON PHARMA</div>
                  <div className="text-[10px] text-white/50 leading-none mt-0.5">official steroid store</div>
                </div>
              </Link>
              <p className="text-sm text-white/60 leading-relaxed">
                Legit pharmaceutical-grade anabolic steroids and peptides. Trusted by athletes worldwide since 2000.
              </p>
              {/* Free shipping note */}
              <div className="mt-4 flex items-center gap-2 px-3 py-2 rounded-xl border border-primary-800/50 bg-primary-900/30">
                <Truck size={14} className="text-primary-400 shrink-0" />
                <span className="text-xs text-primary-300 font-semibold">Free shipping on orders over $800</span>
              </div>
            </div>

            {/* Categories */}
            <div>
              <h4 className="font-bold text-sm mb-4 text-white/90 uppercase tracking-wider">Categories</h4>
              <ul className="space-y-2">
                {categories.slice(0, 6).map(c => (
                  <li key={c.slug}>
                    <Link to={`/${c.slug}`} className="text-sm text-white/60 hover:text-primary-400 transition-colors">
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Brands */}
            <div>
              <h4 className="font-bold text-sm mb-4 text-white/90 uppercase tracking-wider">Brands</h4>
              <ul className="space-y-2">
                {brands.slice(0, 6).map(b => (
                  <li key={b.slug}>
                    <Link to={`/${b.slug}`} className="text-sm text-white/60 hover:text-primary-400 transition-colors">
                      {b.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Info */}
            <div>
              <h4 className="font-bold text-sm mb-4 text-white/90 uppercase tracking-wider">Information</h4>
              <ul className="space-y-2">
                {[
                  { label: 'About Us', to: '/info/about-us' },
                  { label: 'Shipping Info', to: '/info/shipping' },
                  { label: 'Guarantees', to: '/info/guarantees' },
                  { label: 'Privacy Policy', to: '/info/privacy-policy' },
                  { label: 'Terms of Use', to: '/info/terms-of-use' },
                  { label: 'Check Supplier', to: '/info/supplier' },
                ].map(l => (
                  <li key={l.to}>
                    <Link to={l.to} className="text-sm text-white/60 hover:text-primary-400 transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="page-container py-4 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-xs text-white/40 text-center md:text-left">
              Copyright © 2000 – 2026{' '}
              <Link to="/" className="text-white/60 hover:text-primary-400 transition-colors">DragonPharma.net</Link>
              {' '}® All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {[
                { label: 'About Us', to: '/info/about-us' },
                { label: 'Terms', to: '/info/terms-of-use' },
                { label: 'Privacy', to: '/info/privacy-policy' },
                { label: 'Contact', to: '/contact' },
              ].map(l => (
                <Link key={l.to} to={l.to} className="text-xs text-white/40 hover:text-white/70 transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-black/20">
          <div className="page-container py-4">
            <p className="text-[11px] text-white/30 leading-relaxed text-center">
              Use of this online service signifies your agreement to our{' '}
              <Link to="/info/privacy-policy" className="underline hover:text-white/50">privacy notice</Link>{' '}
              and{' '}
              <Link to="/info/terms-of-use" className="underline hover:text-white/50">terms of use</Link>.
              Our products are not designated to diagnose, care for or prevent any disease. These statements have not been
              evaluated by the FDA. Must be eighteen (18) years old to purchase. Use under doctor supervision.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
