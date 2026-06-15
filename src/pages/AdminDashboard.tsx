import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Package, ShoppingCart, LogOut, Plus, Edit2, Trash2,
  Search, X, Check, AlertCircle,
  DollarSign, Users, Box, Save, Bell, Menu, Video, Star, Film
} from 'lucide-react';
import {
  getStoredProducts, addProduct, updateProduct, deleteProduct,
  type Product,
} from '../lib/products-data';
import {
  getVideoReviews, type VideoReview,
  addVideoReview, deleteVideoReview, uploadReviewVideo
} from '../lib/video-reviews-data';
import { supabase } from '../lib/supabase-client';

// ─── Types ───────────────────────────────────────────────────────────────────

type AdminView = 'overview' | 'products' | 'orders' | 'video_reviews';
type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

interface OrderItem { id: number; name: string; image: string; warehouse: string; qty: number; price: number; }
interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  customer: { firstName: string; lastName: string; email: string; phone: string; address: string; city: string; state: string; zip: string; country: string; };
  items: OrderItem[];
  paymentMethod: string;
  shippingSpeed: string;
  subtotal: number;
  promoCode: string | null;
  promoDiscount: number;
  cryptoDiscount: number;
  shippingFee: number;
  total: number;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const STATUS_COLORS: Record<OrderStatus, { bg: string; color: string; label: string }> = {
  pending:    { bg: 'rgba(245,158,11,0.15)',  color: '#f59e0b',  label: 'Pending' },
  processing: { bg: 'rgba(59,130,246,0.15)',  color: '#3b82f6',  label: 'Processing' },
  shipped:    { bg: 'rgba(139,92,246,0.15)',  color: '#8b5cf6',  label: 'Shipped' },
  delivered:  { bg: 'rgba(34,197,94,0.15)',   color: '#22c55e',  label: 'Delivered' },
  cancelled:  { bg: 'rgba(239,68,68,0.15)',   color: '#ef4444',  label: 'Cancelled' },
};

const CATEGORIES = [
  { name: 'Oral Anabolic Steroids', slug: 'orals-380' },
  { name: 'Injectable Anabolic Steroids', slug: 'injectables-391' },
  { name: 'SARMs', slug: 'sarms-2034' },
  { name: 'Post-Cycle Therapy (PCT)', slug: 'post-cycle-therapy-3855' },
  { name: 'Fat Loss', slug: 'fat-loss-397' },
  { name: 'Sexual Health', slug: 'sexual-health-415' },
  { name: 'Peptides', slug: 'peptides-414' },
  { name: 'Supplements', slug: 'supplements-3050' },
  { name: 'Steroid Cycles', slug: 'cycles-1933' },
];

const EMPTY_PRODUCT: Omit<Product, 'id' | 'slug'> = {
  name: '', category: 'Oral Anabolic Steroids', categorySlug: 'orals-380',
  brand: 'Dragon Pharma', brandSlug: 'buy-2194',
  substance: '', classification: '', form: '',
  halfLife: '', dosage: '', acne: '', waterRetention: '', hbp: '',
  hepatotoxicity: '', aromatization: '',
  image: '', intPrice: 0, usaPrice: 0,
  intOriginalPrice: undefined, usaOriginalPrice: undefined,
  discounts: [], suggestions: [], ribbons: [],
  labTested: false, labTestImage: undefined,
  featured: false, bestSeller: false,
  description: '',
};

// ─── Styles ──────────────────────────────────────────────────────────────────

const S = {
  shell: {
    minHeight: '100vh',
    background: '#0d1117',
    display: 'flex',
    fontFamily: "'Inter', 'Outfit', sans-serif",
    color: '#e2e8f0',
  } as React.CSSProperties,

  sidebar: {
    width: '240px',
    minHeight: '100vh',
    background: 'linear-gradient(180deg, #111827 0%, #0f172a 100%)',
    borderRight: '1px solid rgba(255,255,255,0.06)',
    display: 'flex', flexDirection: 'column' as const,
    flexShrink: 0,
    position: 'sticky' as const, top: 0, height: '100vh', overflowY: 'auto' as const,
  },

  main: {
    flex: 1, minWidth: 0,
    display: 'flex', flexDirection: 'column' as const,
    overflow: 'hidden',
  },

  topbar: {
    background: '#111827',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    padding: '14px 24px',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    position: 'sticky' as const, top: 0, zIndex: 10,
  },

  content: {
    padding: '28px 32px',
    flex: 1, overflowY: 'auto' as const,
  },

  card: {
    background: '#161b27',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '16px',
    padding: '24px',
  } as React.CSSProperties,

  btn: (variant: 'primary' | 'ghost' | 'danger' | 'secondary') => ({
    display: 'inline-flex', alignItems: 'center', gap: '6px',
    padding: '8px 16px', borderRadius: '10px',
    fontSize: '13px', fontWeight: 600, cursor: 'pointer',
    border: 'none', transition: 'all 0.15s',
    ...(variant === 'primary' ? {
      background: 'linear-gradient(135deg, #dc2626, #b91c1c)',
      color: '#fff', boxShadow: '0 4px 12px rgba(220,38,38,0.3)',
    } : variant === 'danger' ? {
      background: 'rgba(239,68,68,0.1)', color: '#ef4444',
      border: '1px solid rgba(239,68,68,0.2)',
    } : variant === 'secondary' ? {
      background: 'rgba(255,255,255,0.06)', color: '#94a3b8',
      border: '1px solid rgba(255,255,255,0.08)',
    } : {
      background: 'transparent', color: '#94a3b8', border: 'none',
    }),
  } as React.CSSProperties),

  input: {
    width: '100%', padding: '10px 14px',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '10px', color: '#e2e8f0', fontSize: '14px',
    outline: 'none', boxSizing: 'border-box' as const,
    transition: 'border-color 0.2s',
  } as React.CSSProperties,

  label: {
    display: 'block', fontSize: '12px', fontWeight: 600,
    color: '#64748b', letterSpacing: '0.04em', textTransform: 'uppercase' as const,
    marginBottom: '6px',
  } as React.CSSProperties,

  table: {
    width: '100%', borderCollapse: 'collapse' as const, fontSize: '13px',
  } as React.CSSProperties,

  th: {
    textAlign: 'left' as const, padding: '10px 14px',
    color: '#64748b', fontWeight: 600, fontSize: '11px',
    textTransform: 'uppercase' as const, letterSpacing: '0.05em',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    whiteSpace: 'nowrap' as const,
  } as React.CSSProperties,

  td: {
    padding: '12px 14px',
    borderBottom: '1px solid rgba(255,255,255,0.04)',
    color: '#cbd5e1', verticalAlign: 'middle' as const,
  } as React.CSSProperties,

  statCard: {
    background: '#161b27',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '16px',
    padding: '20px 24px',
  } as React.CSSProperties,
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fmtMoney(n: number) { return `$${n.toFixed(2)}`; }
function fmtDate(s: string) {
  return new Date(s).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

// ─── Product Modal ────────────────────────────────────────────────────────────

function ProductModal({ product, onClose, onSave }: {
  product: Product | null;
  onClose: () => void;
  onSave: (data: Omit<Product, 'id' | 'slug'>, id?: number, productImageFile?: File | null, labTestImageFile?: File | null) => void;
}) {
  const isEdit = !!product;
  const [form, setForm] = useState<Omit<Product, 'id' | 'slug'>>(
    product ? { ...product } : { ...EMPTY_PRODUCT }
  );
  const [tab, setTab] = useState<'basic' | 'specs' | 'pricing' | 'media'>('basic');
  const [productImageFile, setProductImageFile] = useState<File | null>(null);
  const [labTestImageFile, setLabTestImageFile] = useState<File | null>(null);

  const set = (key: keyof typeof form, val: unknown) =>
    setForm(f => ({ ...f, [key]: val }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form, product?.id, productImageFile, labTestImageFile);
  };

  const tabStyle = (t: string) => ({
    padding: '8px 18px', borderRadius: '8px', fontSize: '13px', fontWeight: 600,
    cursor: 'pointer', border: 'none', transition: 'all 0.15s',
    background: tab === t ? 'linear-gradient(135deg, #dc2626, #b91c1c)' : 'rgba(255,255,255,0.05)',
    color: tab === t ? '#fff' : '#64748b',
  } as React.CSSProperties);

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px',
    }}>
      <div style={{
        width: '100%', maxWidth: '720px', maxHeight: '90vh',
        background: '#161b27', border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '20px', overflow: 'hidden', display: 'flex', flexDirection: 'column',
      }}>
        {/* Modal Header */}
        <div style={{
          padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.07)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#f1f5f9' }}>
            {isEdit ? `Edit: ${product!.name}` : 'Add New Product'}
          </h2>
          <button onClick={onClose} style={{ ...S.btn('ghost'), padding: '6px' }}>
            <X size={18} />
          </button>
        </div>

        {/* Tabs */}
        <div style={{
          padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.07)',
          display: 'flex', gap: '8px', flexWrap: 'wrap',
        }}>
          {(['basic', 'specs', 'pricing', 'media'] as const).map(t => (
            <button key={t} style={tabStyle(t)} onClick={() => setTab(t)}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          <div style={{ display: 'grid', gap: '16px' }}>

            {/* ── BASIC TAB ── */}
            {tab === 'basic' && (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={S.label}>Product Name *</label>
                    <input style={S.input} value={form.name} onChange={e => set('name', e.target.value)} required placeholder="e.g. DIANABOL 20" />
                  </div>
                  <div>
                    <label style={S.label}>Brand *</label>
                    <input style={S.input} value={form.brand} onChange={e => set('brand', e.target.value)} required placeholder="Dragon Pharma" />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={S.label}>Category *</label>
                    <select
                      style={{ ...S.input, appearance: 'none' }}
                      value={form.categorySlug}
                      onChange={e => {
                        const cat = CATEGORIES.find(c => c.slug === e.target.value);
                        set('categorySlug', e.target.value);
                        if (cat) set('category', cat.name);
                      }}
                    >
                      {CATEGORIES.map(c => (
                        <option key={c.slug} value={c.slug} style={{ background: '#1e293b' }}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={S.label}>Classification</label>
                    <input style={S.input} value={form.classification} onChange={e => set('classification', e.target.value)} placeholder="e.g. ANDROGEN; ANABOLIC STEROID" />
                  </div>
                </div>
                <div>
                  <label style={S.label}>Substance *</label>
                  <input style={S.input} value={form.substance} onChange={e => set('substance', e.target.value)} required placeholder="e.g. Methandrostanolone" />
                </div>
                <div>
                  <label style={S.label}>Description</label>
                  <textarea
                    style={{ ...S.input, minHeight: '80px', resize: 'vertical' }}
                    value={form.description} onChange={e => set('description', e.target.value)}
                    placeholder="Product description..."
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={S.label}>Form</label>
                    <input style={S.input} value={form.form} onChange={e => set('form', e.target.value)} placeholder="100 PILLS x 20 MG" />
                  </div>
                  <div>
                    <label style={S.label}>Half-Life</label>
                    <input style={S.input} value={form.halfLife} onChange={e => set('halfLife', e.target.value)} placeholder="3.2–4.5 HOURS" />
                  </div>
                  <div>
                    <label style={S.label}>Dosage</label>
                    <input style={S.input} value={form.dosage} onChange={e => set('dosage', e.target.value)} placeholder="MEN 20 MG/DAY" />
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '24px' }}>
                  {[['featured', 'Featured'], ['bestSeller', 'Best Seller'], ['labTested', 'Lab Tested']].map(([key, label]) => (
                    <label key={key} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', color: '#94a3b8' }}>
                      <input type="checkbox" checked={!!form[key as keyof typeof form]} onChange={e => set(key as keyof typeof form, e.target.checked)}
                        style={{ width: '16px', height: '16px', accentColor: '#dc2626' }} />
                      {label}
                    </label>
                  ))}
                </div>
              </>
            )}

            {/* ── SPECS TAB ── */}
            {tab === 'specs' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                {[
                  ['acne', 'Acne'],
                  ['waterRetention', 'Water Retention'],
                  ['hbp', 'High Blood Pressure'],
                  ['hepatotoxicity', 'Hepatotoxicity'],
                  ['aromatization', 'Aromatization'],
                ].map(([key, label]) => (
                  <div key={key}>
                    <label style={S.label}>{label}</label>
                    <select style={{ ...S.input, appearance: 'none' }} value={form[key as keyof typeof form] as string} onChange={e => set(key as keyof typeof form, e.target.value)}>
                      {['YES', 'NO', 'PERHAPS', 'RARELY', 'LOW', 'HIGH', 'NONE', 'NOT REPORTED', 'NO KNOWN IMPACT', 'DOES NOT AROMATIZE'].map(v => (
                        <option key={v} value={v} style={{ background: '#1e293b' }}>{v}</option>
                      ))}
                    </select>
                  </div>
                ))}
                <div>
                  <label style={S.label}>Ribbons (comma-separated)</label>
                  <input style={S.input} value={form.ribbons.join(', ')} onChange={e => set('ribbons', e.target.value.split(',').map(s => s.trim()).filter(Boolean))} placeholder="Lab Tested, -50% OFF" />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={S.label}>Discounts (one per line)</label>
                  <textarea style={{ ...S.input, minHeight: '64px', resize: 'vertical' }} value={form.discounts.join('\n')} onChange={e => set('discounts', e.target.value.split('\n').filter(Boolean))} placeholder="You will save $28.50" />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={S.label}>Suggestions (one per line)</label>
                  <textarea style={{ ...S.input, minHeight: '64px', resize: 'vertical' }} value={form.suggestions.join('\n')} onChange={e => set('suggestions', e.target.value.split('\n').filter(Boolean))} placeholder="Buy 3 and get 1 FREE" />
                </div>
              </div>
            )}

            {/* ── PRICING TAB ── */}
            {tab === 'pricing' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={S.label}>INT Price ($) *</label>
                  <input type="number" step="0.01" style={S.input} value={form.intPrice} onChange={e => set('intPrice', parseFloat(e.target.value) || 0)} required />
                </div>
                <div>
                  <label style={S.label}>USA Price ($) *</label>
                  <input type="number" step="0.01" style={S.input} value={form.usaPrice} onChange={e => set('usaPrice', parseFloat(e.target.value) || 0)} required />
                </div>
                <div>
                  <label style={S.label}>INT Original Price ($)</label>
                  <input type="number" step="0.01" style={S.input} value={form.intOriginalPrice ?? ''} onChange={e => set('intOriginalPrice', e.target.value ? parseFloat(e.target.value) : undefined)} placeholder="Leave blank if no discount" />
                </div>
                <div>
                  <label style={S.label}>USA Original Price ($)</label>
                  <input type="number" step="0.01" style={S.input} value={form.usaOriginalPrice ?? ''} onChange={e => set('usaOriginalPrice', e.target.value ? parseFloat(e.target.value) : undefined)} placeholder="Leave blank if no discount" />
                </div>
                <div style={{ gridColumn: '1 / -1', background: 'rgba(220,38,38,0.05)', borderRadius: '12px', padding: '16px', border: '1px solid rgba(220,38,38,0.1)' }}>
                  <p style={{ fontSize: '12px', color: '#94a3b8', margin: '0 0 8px' }}>💡 <b>Preview</b></p>
                  <div style={{ display: 'flex', gap: '24px' }}>
                    <div>
                      <p style={{ fontSize: '11px', color: '#64748b', margin: 0 }}>INT Price</p>
                      {form.intOriginalPrice && <p style={{ fontSize: '11px', color: '#94a3b8', textDecoration: 'line-through', margin: 0 }}>${form.intOriginalPrice}</p>}
                      <p style={{ fontSize: '18px', fontWeight: 800, color: '#dc2626', margin: 0 }}>${form.intPrice}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: '11px', color: '#64748b', margin: 0 }}>USA Price</p>
                      {form.usaOriginalPrice && <p style={{ fontSize: '11px', color: '#94a3b8', textDecoration: 'line-through', margin: 0 }}>${form.usaOriginalPrice}</p>}
                      <p style={{ fontSize: '18px', fontWeight: 800, color: '#dc2626', margin: 0 }}>${form.usaPrice}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── MEDIA TAB ── */}
            {tab === 'media' && (
              <>
                {/* ── Product Image Upload ── */}
                <div>
                  <label style={S.label}>Product Image *</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {/* Upload Zone */}
                    {!form.image ? (
                      <>
                        <label
                          htmlFor="product-img-upload"
                          style={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center',
                            justifyContent: 'center', gap: '10px',
                            padding: '36px 20px', borderRadius: '14px',
                            border: '2px dashed rgba(220,38,38,0.35)',
                            background: 'rgba(220,38,38,0.04)',
                            cursor: 'pointer', transition: 'all 0.2s',
                          }}
                          onMouseEnter={e => {
                            (e.currentTarget as HTMLLabelElement).style.borderColor = 'rgba(220,38,38,0.7)';
                            (e.currentTarget as HTMLLabelElement).style.background = 'rgba(220,38,38,0.08)';
                          }}
                          onMouseLeave={e => {
                            (e.currentTarget as HTMLLabelElement).style.borderColor = 'rgba(220,38,38,0.35)';
                            (e.currentTarget as HTMLLabelElement).style.background = 'rgba(220,38,38,0.04)';
                          }}
                        >
                          <div style={{
                            width: '48px', height: '48px', borderRadius: '12px',
                            background: 'rgba(220,38,38,0.15)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                          }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                              <polyline points="21,15 16,10 5,21"/>
                            </svg>
                          </div>
                          <div style={{ textAlign: 'center' }}>
                            <p style={{ fontSize: '14px', fontWeight: 700, color: '#e2e8f0', margin: 0 }}>
                              Upload Product Image
                            </p>
                            <p style={{ fontSize: '11px', color: '#64748b', margin: '4px 0 0' }}>
                              Click to select JPG, PNG, WEBP or GIF · Max 5 MB
                            </p>
                          </div>
                        </label>
                        <input
                          id="product-img-upload"
                          type="file"
                          accept="image/*"
                          style={{ display: 'none' }}
                          onChange={e => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            if (file.size > 5 * 1024 * 1024) {
                              alert('File is too large. Maximum size is 5 MB.');
                              return;
                            }
                            setProductImageFile(file);
                            const reader = new FileReader();
                            reader.onload = ev => set('image', ev.target?.result as string);
                            reader.readAsDataURL(file);
                          }}
                        />
                      </>
                    ) : (
                      <div style={{ borderRadius: '14px', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)', padding: '20px', textAlign: 'center' }}>
                        <div style={{ position: 'relative', display: 'inline-block', padding: '8px', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                          <img
                            src={form.image}
                            alt="Preview"
                            style={{ maxHeight: '160px', maxWidth: '100%', objectFit: 'contain', borderRadius: '8px' }}
                            onError={e => { (e.target as HTMLImageElement).style.opacity = '0.3'; }}
                          />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '16px' }}>
                          <label
                            htmlFor="product-img-upload-change"
                            style={{
                              display: 'inline-flex', alignItems: 'center', gap: '6px',
                              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                              borderRadius: '8px', color: '#e2e8f0', cursor: 'pointer',
                              padding: '8px 14px', fontSize: '12px', fontWeight: 600, transition: 'all 0.2s'
                            }}
                            onMouseEnter={e => { (e.currentTarget as HTMLLabelElement).style.background = 'rgba(255,255,255,0.1)'; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLLabelElement).style.background = 'rgba(255,255,255,0.05)'; }}
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
                            </svg>
                            Change Photo
                          </label>
                          <input
                            id="product-img-upload-change"
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={e => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              if (file.size > 5 * 1024 * 1024) {
                                alert('File is too large. Maximum size is 5 MB.');
                                return;
                              }
                              setProductImageFile(file);
                              const reader = new FileReader();
                              reader.onload = ev => set('image', ev.target?.result as string);
                              reader.readAsDataURL(file);
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => set('image', '')}
                            style={{
                              display: 'inline-flex', alignItems: 'center', gap: '6px',
                              background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)',
                              borderRadius: '8px', color: '#f87171', cursor: 'pointer',
                              padding: '8px 14px', fontSize: '12px', fontWeight: 600, transition: 'all 0.2s'
                            }}
                            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(239,68,68,0.18)'; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(239,68,68,0.1)'; }}
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                            </svg>
                            Remove
                          </button>
                        </div>
                        <p style={{ fontSize: '11px', color: '#10b981', margin: '10px 0 0', fontWeight: 500 }}>
                          ✓ Image loaded successfully
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* ── Lab Test Image Upload ── */}
                <div>
                  <label style={S.label}>Lab Test Image (optional)</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {!form.labTestImage ? (
                      <>
                        <label
                          htmlFor="lab-img-upload"
                          style={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center',
                            justifyContent: 'center', gap: '10px',
                            padding: '28px 20px', borderRadius: '14px',
                            border: '2px dashed rgba(34,197,94,0.25)',
                            background: 'rgba(34,197,94,0.03)',
                            cursor: 'pointer', transition: 'all 0.2s',
                          }}
                          onMouseEnter={e => {
                            (e.currentTarget as HTMLLabelElement).style.borderColor = 'rgba(34,197,94,0.6)';
                            (e.currentTarget as HTMLLabelElement).style.background = 'rgba(34,197,94,0.07)';
                          }}
                          onMouseLeave={e => {
                            (e.currentTarget as HTMLLabelElement).style.borderColor = 'rgba(34,197,94,0.25)';
                            (e.currentTarget as HTMLLabelElement).style.background = 'rgba(34,197,94,0.03)';
                          }}
                        >
                          <div style={{
                            width: '40px', height: '40px', borderRadius: '10px',
                            background: 'rgba(34,197,94,0.12)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                          }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/>
                            </svg>
                          </div>
                          <div style={{ textAlign: 'center' }}>
                            <p style={{ fontSize: '13px', fontWeight: 700, color: '#e2e8f0', margin: 0 }}>
                              Upload Lab Test Result Image
                            </p>
                            <p style={{ fontSize: '11px', color: '#64748b', margin: '4px 0 0' }}>
                              Click to select JPG, PNG or WEBP · Max 5 MB
                            </p>
                          </div>
                        </label>
                        <input
                          id="lab-img-upload"
                          type="file"
                          accept="image/*"
                          style={{ display: 'none' }}
                          onChange={e => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            if (file.size > 5 * 1024 * 1024) {
                              alert('File is too large. Maximum size is 5 MB.');
                              return;
                            }
                            setLabTestImageFile(file);
                            const reader = new FileReader();
                            reader.onload = ev => set('labTestImage', ev.target?.result as string);
                            reader.readAsDataURL(file);
                          }}
                        />
                      </>
                    ) : (
                      <div style={{ borderRadius: '14px', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)', padding: '20px', textAlign: 'center' }}>
                        <div style={{ position: 'relative', display: 'inline-block', padding: '8px', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                          <img
                            src={form.labTestImage}
                            alt="Lab Test Preview"
                            style={{ maxHeight: '160px', maxWidth: '100%', objectFit: 'contain', borderRadius: '8px' }}
                            onError={e => { (e.target as HTMLImageElement).style.opacity = '0.3'; }}
                          />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '16px' }}>
                          <label
                            htmlFor="lab-img-upload-change"
                            style={{
                              display: 'inline-flex', alignItems: 'center', gap: '6px',
                              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                              borderRadius: '8px', color: '#e2e8f0', cursor: 'pointer',
                              padding: '8px 14px', fontSize: '12px', fontWeight: 600, transition: 'all 0.2s'
                            }}
                            onMouseEnter={e => { (e.currentTarget as HTMLLabelElement).style.background = 'rgba(255,255,255,0.1)'; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLLabelElement).style.background = 'rgba(255,255,255,0.05)'; }}
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
                            </svg>
                            Change Photo
                          </label>
                          <input
                            id="lab-img-upload-change"
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={e => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              if (file.size > 5 * 1024 * 1024) {
                                alert('File is too large. Maximum size is 5 MB.');
                                return;
                              }
                              setLabTestImageFile(file);
                              const reader = new FileReader();
                              reader.onload = ev => set('labTestImage', ev.target?.result as string);
                              reader.readAsDataURL(file);
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => set('labTestImage', undefined)}
                            style={{
                              display: 'inline-flex', alignItems: 'center', gap: '6px',
                              background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)',
                              borderRadius: '8px', color: '#f87171', cursor: 'pointer',
                              padding: '8px 14px', fontSize: '12px', fontWeight: 600, transition: 'all 0.2s'
                            }}
                            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(239,68,68,0.18)'; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(239,68,68,0.1)'; }}
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                            </svg>
                            Remove
                          </button>
                        </div>
                        <p style={{ fontSize: '11px', color: '#10b981', margin: '10px 0 0', fontWeight: 500 }}>
                          ✓ Lab image loaded successfully
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Modal Footer */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '24px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            <button type="button" onClick={onClose} style={S.btn('secondary')}>Cancel</button>
            <button type="submit" style={S.btn('primary')}>
              <Save size={14} />
              {isEdit ? 'Save Changes' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Delete Confirm Modal ─────────────────────────────────────────────────────

function DeleteConfirmModal({ name, onCancel, onConfirm }: { name: string; onCancel: () => void; onConfirm: () => void }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1001,
      background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px',
    }}>
      <div style={{
        width: '100%', maxWidth: '400px',
        background: '#161b27', border: '1px solid rgba(239,68,68,0.3)',
        borderRadius: '20px', padding: '32px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(239,68,68,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Trash2 size={20} color="#ef4444" />
          </div>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#f1f5f9', margin: 0 }}>Delete Product</h3>
            <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0 }}>This action cannot be undone</p>
          </div>
        </div>
        <p style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '24px' }}>
          Are you sure you want to delete <strong style={{ color: '#f1f5f9' }}>{name}</strong>?
        </p>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button style={{ ...S.btn('secondary'), flex: 1, justifyContent: 'center' }} onClick={onCancel}>Cancel</button>
          <button style={{ ...S.btn('danger'), flex: 1, justifyContent: 'center' }} onClick={onConfirm}>
            <Trash2 size={13} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}

function VideoReviewModal({ onClose, onSave }: {
  onClose: () => void;
  onSave: (data: Omit<VideoReview, 'id' | 'date'>, fileBlob?: Blob) => Promise<void>;
}) {
  const [rating, setRating] = useState(5);
  const [fileBlob, setFileBlob] = useState<Blob | null>(null);
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileBlob) {
      alert('Please select a local video file.');
      return;
    }
    setLoading(true);
    try {
      await onSave({
        title: 'Verified Customer Review',
        author: 'Verified Customer',
        rating,
        description: 'Verified customer video review.',
        videoType: 'file',
      }, fileBlob);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px',
    }}>
      <div style={{
        width: '100%', maxWidth: '600px', maxHeight: '90vh',
        background: '#161b27', border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '20px', overflow: 'hidden', display: 'flex', flexDirection: 'column',
      }}>
        <div style={{
          padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.07)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#f1f5f9' }}>Add Video Review</h2>
          <button onClick={onClose} style={{ ...S.btn('ghost'), padding: '6px' }} disabled={loading}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={S.label}>Rating *</label>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', height: '40px' }}>
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  style={{ background: 'none', border: 'none', cursor: loading ? 'default' : 'pointer', padding: 2 }}
                  disabled={loading}
                >
                  <Star
                    size={20}
                    style={{
                      fill: star <= rating ? '#f59e0b' : 'none',
                      color: star <= rating ? '#f59e0b' : '#475569',
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={S.label}>Select Video File *</label>
            <div style={{
              border: '2px dashed rgba(220,38,38,0.3)',
              borderRadius: '12px',
              padding: '24px',
              textAlign: 'center',
              background: 'rgba(255,255,255,0.02)',
              cursor: loading ? 'default' : 'pointer',
              opacity: loading ? 0.7 : 1,
            }}>
              <label htmlFor="video-file-upload" style={{ cursor: loading ? 'default' : 'pointer', display: 'block' }}>
                <Film size={32} style={{ color: '#dc2626', margin: '0 auto 8px', opacity: 0.8 }} />
                {fileName ? (
                  <div>
                    <p style={{ fontSize: '13px', fontWeight: 600, color: '#e2e8f0', margin: 0 }}>{fileName}</p>
                    <p style={{ fontSize: '11px', color: '#10b981', margin: '4px 0 0' }}>✓ Video loaded successfully</p>
                  </div>
                ) : (
                  <div>
                    <p style={{ fontSize: '13px', fontWeight: 600, color: '#e2e8f0', margin: 0 }}>Click to select a video file</p>
                    <p style={{ fontSize: '10px', color: '#64748b', margin: '4px 0 0' }}>Supports MP4, WEBM, MOV · Saved to browser storage</p>
                  </div>
                )}
              </label>
              <input
                id="video-file-upload"
                type="file"
                accept="video/*"
                style={{ display: 'none' }}
                disabled={loading}
                onChange={e => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  setFileName(file.name);
                  setFileBlob(file);
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.07)', justifyContent: 'flex-end' }}>
            <button type="button" onClick={onClose} style={S.btn('secondary')} disabled={loading}>Cancel</button>
            <button type="submit" style={S.btn('primary')} disabled={loading}>
              {loading ? (
                <>
                  <svg className="spin" style={{ marginRight: '6px' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" />
                    <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" fill="currentColor" />
                  </svg>
                  Uploading Video Review...
                </>
              ) : (
                <>
                  <Save size={14} /> Add Video Review
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [view, setView] = useState<AdminView>('overview');
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [productSearch, setProductSearch] = useState('');
  const [orderSearch, setOrderSearch] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null | 'new'>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
  const [orderFilter, setOrderFilter] = useState<OrderStatus | 'all'>('all');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  const [videoReviews, setVideoReviews] = useState<VideoReview[]>([]);
  const [videoSearch, setVideoSearch] = useState('');
  const [editingVideo, setEditingVideo] = useState(false);

  // Auth check
  useEffect(() => {
    if (!sessionStorage.getItem('dp_admin_auth')) {
      navigate('/admin');
    }
  }, [navigate]);

  // Load data
  useEffect(() => {
    setProducts(getStoredProducts());
    setVideoReviews(getVideoReviews());

    // Sync orders from Supabase
    const syncOrders = async () => {
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .order('date', { ascending: false });
        if (!error && data) {
          setOrders(data);
          localStorage.setItem('dp_orders', JSON.stringify(data));
        }
      } catch (err) {
        console.error('Failed to sync orders:', err);
      }
    };
    syncOrders();
  }, []);

  // Listen for products updates
  useEffect(() => {
    const handler = () => setProducts(getStoredProducts());
    window.addEventListener('dp_products_updated', handler);
    return () => window.removeEventListener('dp_products_updated', handler);
  }, []);

  // Listen for video reviews updates
  useEffect(() => {
    const handler = () => setVideoReviews(getVideoReviews());
    window.addEventListener('dp_video_reviews_updated', handler);
    return () => window.removeEventListener('dp_video_reviews_updated', handler);
  }, []);

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('dp_admin_auth');
    navigate('/admin');
  };

  const handleSaveProduct = async (
    data: Omit<Product, 'id' | 'slug'>, 
    id?: number,
    productImageFile?: File | null,
    labTestImageFile?: File | null
  ) => {
    try {
      showToast('Saving product...', 'success');
      const updatedData = { ...data };

      // 1. Upload Product Image to storage bucket
      if (productImageFile) {
        const fileExt = productImageFile.name.split('.').pop() || 'png';
        const fileId = `prod-${Date.now()}`;
        const filePath = `${fileId}.${fileExt}`;
        const { error: uploadErr } = await supabase.storage
          .from('product-images')
          .upload(filePath, productImageFile, { upsert: true });
        if (uploadErr) throw uploadErr;

        const { data: { publicUrl } } = supabase.storage
          .from('product-images')
          .getPublicUrl(filePath);
        updatedData.image = publicUrl;
      }

      // 2. Upload Lab Test Image to storage bucket
      if (labTestImageFile) {
        const fileExt = labTestImageFile.name.split('.').pop() || 'png';
        const fileId = `lab-${Date.now()}`;
        const filePath = `${fileId}.${fileExt}`;
        const { error: uploadErr } = await supabase.storage
          .from('lab-test-images')
          .upload(filePath, labTestImageFile, { upsert: true });
        if (uploadErr) throw uploadErr;

        const { data: { publicUrl } } = supabase.storage
          .from('lab-test-images')
          .getPublicUrl(filePath);
        updatedData.labTestImage = publicUrl;
      }

      // 3. Save to database
      if (id !== undefined) {
        await updateProduct(id, updatedData);
        showToast('Product updated successfully!');
      } else {
        await addProduct(updatedData);
        showToast('Product added successfully!');
      }
      setProducts(getStoredProducts());
      setEditingProduct(null);
    } catch (err: any) {
      console.error(err);
      showToast(err.message || 'Failed to save product.', 'error');
    }
  };

  const handleDeleteProduct = async (id: number) => {
    try {
      showToast('Deleting product...', 'success');
      await deleteProduct(id);
      setProducts(getStoredProducts());
      setDeletingProduct(null);
      showToast('Product deleted.', 'error');
    } catch (err: any) {
      console.error(err);
      showToast('Failed to delete product', 'error');
    }
  };

  const handleSaveVideoReview = async (data: Omit<VideoReview, 'id' | 'date'>, fileBlob?: Blob) => {
    const newId = `vid-${Date.now()}`;
    const dateStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const newReview: VideoReview = {
      id: newId,
      date: dateStr,
      ...data,
    };
    
    showToast('Saving video review...', 'success');

    if (data.videoType === 'file' && fileBlob) {
      try {
        const publicUrl = await uploadReviewVideo(newId, fileBlob);
        newReview.videoUrl = publicUrl;
        newReview.fileId = newId;
      } catch (err) {
        console.error(err);
        showToast('Failed to upload video file', 'error');
        throw err;
      }
    }
    
    try {
      await addVideoReview(newReview);
      setEditingVideo(false);
      showToast('Video review added successfully!');
    } catch (err: any) {
      console.error(err);
      showToast(err.message || 'Failed to save review', 'error');
      throw err;
    }
  };

  const handleDeleteVideoReview = async (id: string) => {
    try {
      showToast('Deleting video review...', 'success');
      await deleteVideoReview(id);
      showToast('Video review deleted.', 'error');
    } catch (err: any) {
      console.error(err);
      showToast('Failed to delete review', 'error');
    }
  };

  const handleUpdateOrderStatus = async (orderId: string, status: OrderStatus) => {
    try {
      showToast('Updating status...', 'success');
      const { error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', orderId);
      if (error) throw error;

      const updated = orders.map(o => o.id === orderId ? { ...o, status } : o);
      setOrders(updated);
      localStorage.setItem('dp_orders', JSON.stringify(updated));
      showToast('Order status updated!');
    } catch (err: any) {
      console.error(err);
      showToast('Failed to update status', 'error');
    }
  };

  // Derived stats
  const totalRevenue = orders.filter(o => o.status !== 'cancelled').reduce((s, o) => s + o.total, 0);
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const totalCustomers = new Set(orders.map(o => o.customer.email)).size;
  const filteredProducts = products.filter(p =>
    !productSearch ||
    p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.substance.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.category.toLowerCase().includes(productSearch.toLowerCase())
  );
  const filteredOrders = orders.filter(o => {
    const matchStatus = orderFilter === 'all' || o.status === orderFilter;
    const q = orderSearch.toLowerCase();
    const matchSearch = !q || o.id.toLowerCase().includes(q) ||
      o.customer.email.toLowerCase().includes(q) ||
      `${o.customer.firstName} ${o.customer.lastName}`.toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  const filteredVideos = videoReviews.filter(v =>
    !videoSearch ||
    v.title.toLowerCase().includes(videoSearch.toLowerCase()) ||
    v.author.toLowerCase().includes(videoSearch.toLowerCase()) ||
    v.description.toLowerCase().includes(videoSearch.toLowerCase())
  );

  const navItems: { id: AdminView; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={16} /> },
    { id: 'products', label: 'Products', icon: <Package size={16} /> },
    { id: 'orders',   label: 'Orders',   icon: <ShoppingCart size={16} /> },
    { id: 'video_reviews', label: 'Video Reviews', icon: <Video size={16} /> },
  ];

  return (
    <div style={S.shell}>
      {/* ──── SIDEBAR ──────────────────────────────────── */}
      {sidebarOpen && (
        <aside style={S.sidebar}>
          {/* Logo */}
          <div style={{ padding: '24px 20px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '10px',
                background: 'linear-gradient(135deg, #dc2626, #7f1d1d)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 20px rgba(220,38,38,0.3)',
              }}>
                <span style={{ fontSize: '16px' }}>🐉</span>
              </div>
              <div>
                <p style={{ fontSize: '13px', fontWeight: 800, color: '#f1f5f9', margin: 0, lineHeight: 1.2 }}>Dragon Pharma</p>
                <p style={{ fontSize: '10px', color: '#64748b', margin: 0 }}>Admin Dashboard</p>
              </div>
            </div>
          </div>

          {/* Nav */}
          <nav style={{ padding: '16px 12px', flex: 1 }}>
            <p style={{ fontSize: '10px', color: '#475569', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', padding: '0 8px', marginBottom: '8px' }}>Navigation</p>
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px', width: '100%',
                  padding: '10px 12px', borderRadius: '10px', fontSize: '13px', fontWeight: 600,
                  cursor: 'pointer', border: 'none', transition: 'all 0.15s', marginBottom: '2px',
                  background: view === item.id ? 'rgba(220,38,38,0.15)' : 'transparent',
                  color: view === item.id ? '#f87171' : '#94a3b8',
                  borderLeft: view === item.id ? '2px solid #dc2626' : '2px solid transparent',
                }}
              >
                {item.icon}
                {item.label}
                {item.id === 'orders' && pendingOrders > 0 && (
                  <span style={{
                    marginLeft: 'auto', background: '#dc2626', color: '#fff',
                    borderRadius: '10px', fontSize: '10px', fontWeight: 700,
                    padding: '1px 7px',
                  }}>
                    {pendingOrders}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Stats quick */}
          <div style={{ padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ background: 'rgba(220,38,38,0.08)', borderRadius: '12px', padding: '14px', marginBottom: '12px' }}>
              <p style={{ fontSize: '11px', color: '#64748b', margin: '0 0 4px' }}>Total Revenue</p>
              <p style={{ fontSize: '20px', fontWeight: 800, color: '#dc2626', margin: 0 }}>{fmtMoney(totalRevenue)}</p>
            </div>
            <button onClick={handleLogout} style={{ ...S.btn('danger'), width: '100%', justifyContent: 'center' }}>
              <LogOut size={14} /> Sign Out
            </button>
          </div>
        </aside>
      )}

      {/* ──── MAIN ─────────────────────────────────────── */}
      <div style={S.main}>
        {/* Topbar */}
        <div style={S.topbar}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} style={S.btn('ghost')}>
              <Menu size={18} />
            </button>
            <div>
              <h1 style={{ fontSize: '16px', fontWeight: 700, color: '#f1f5f9', margin: 0 }}>
                {view === 'overview' ? 'Dashboard Overview' : view === 'products' ? 'Product Management' : view === 'orders' ? 'Order Management' : 'Video Reviews'}
              </h1>
              <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ position: 'relative' }}>
              <Bell size={18} style={{ color: '#64748b' }} />
              {pendingOrders > 0 && (
                <span style={{
                  position: 'absolute', top: '-4px', right: '-4px',
                  width: '8px', height: '8px', borderRadius: '50%', background: '#dc2626',
                }} />
              )}
            </div>
            <div style={{
              width: '34px', height: '34px', borderRadius: '10px',
              background: 'linear-gradient(135deg, #dc2626, #7f1d1d)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '14px', fontWeight: 700, color: '#fff',
            }}>A</div>
          </div>
        </div>

        {/* Content */}
        <div style={S.content}>

          {/* ── OVERVIEW ─── */}
          {view === 'overview' && (
            <div>
              {/* Stats Row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '28px' }}>
                {[
                  { label: 'Total Revenue', value: fmtMoney(totalRevenue), icon: <DollarSign size={20} />, color: '#22c55e', bg: 'rgba(34,197,94,0.12)' },
                  { label: 'Total Orders', value: orders.length.toString(), icon: <ShoppingCart size={20} />, color: '#3b82f6', bg: 'rgba(59,130,246,0.12)' },
                  { label: 'Pending Orders', value: pendingOrders.toString(), icon: <AlertCircle size={20} />, color: '#f59e0b', bg: 'rgba(245,158,11,0.12)' },
                  { label: 'Total Products', value: products.length.toString(), icon: <Box size={20} />, color: '#8b5cf6', bg: 'rgba(139,92,246,0.12)' },
                  { label: 'Customers', value: totalCustomers.toString(), icon: <Users size={20} />, color: '#06b6d4', bg: 'rgba(6,182,212,0.12)' },
                ].map(stat => (
                  <div key={stat.label} style={S.statCard}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <p style={{ fontSize: '12px', color: '#64748b', fontWeight: 600, margin: 0, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{stat.label}</p>
                      <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: stat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: stat.color }}>
                        {stat.icon}
                      </div>
                    </div>
                    <p style={{ fontSize: '26px', fontWeight: 800, color: stat.color, margin: 0 }}>{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Recent Orders + Products Summary */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                {/* Recent Orders */}
                <div style={S.card}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                    <h2 style={{ fontSize: '14px', fontWeight: 700, color: '#f1f5f9', margin: 0 }}>Recent Orders</h2>
                    <button onClick={() => setView('orders')} style={{ ...S.btn('ghost'), fontSize: '12px', color: '#dc2626' }}>
                      View All →
                    </button>
                  </div>
                  {orders.slice(0, 5).length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '32px', color: '#475569' }}>
                      <ShoppingCart size={32} style={{ margin: '0 auto 8px', opacity: 0.4 }} />
                      <p style={{ fontSize: '13px', margin: 0 }}>No orders yet</p>
                    </div>
                  ) : (
                    orders.slice(0, 5).map(o => (
                      <div key={o.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                        <div>
                          <p style={{ fontSize: '13px', fontWeight: 600, color: '#e2e8f0', margin: 0 }}>{o.id}</p>
                          <p style={{ fontSize: '11px', color: '#64748b', margin: 0 }}>{o.customer.firstName} {o.customer.lastName}</p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <p style={{ fontSize: '13px', fontWeight: 700, color: '#dc2626', margin: 0 }}>{fmtMoney(o.total)}</p>
                          <span style={{ fontSize: '10px', fontWeight: 600, padding: '2px 8px', borderRadius: '6px', background: STATUS_COLORS[o.status].bg, color: STATUS_COLORS[o.status].color }}>
                            {STATUS_COLORS[o.status].label}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Categories Breakdown */}
                <div style={S.card}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                    <h2 style={{ fontSize: '14px', fontWeight: 700, color: '#f1f5f9', margin: 0 }}>Products by Category</h2>
                    <button onClick={() => setView('products')} style={{ ...S.btn('ghost'), fontSize: '12px', color: '#dc2626' }}>
                      Manage →
                    </button>
                  </div>
                  {CATEGORIES.map(cat => {
                    const count = products.filter(p => p.categorySlug === cat.slug).length;
                    const pct = products.length ? (count / products.length) * 100 : 0;
                    return count > 0 ? (
                      <div key={cat.slug} style={{ marginBottom: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                          <span style={{ fontSize: '12px', color: '#94a3b8' }}>{cat.name}</span>
                          <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>{count}</span>
                        </div>
                        <div style={{ height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px' }}>
                          <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg, #dc2626, #f87171)', borderRadius: '4px', transition: 'width 0.5s' }} />
                        </div>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ── PRODUCTS ─── */}
          {view === 'products' && (
            <div>
              {/* Toolbar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
                <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
                  <Search size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                  <input
                    style={{ ...S.input, paddingLeft: '36px' }}
                    placeholder="Search products..."
                    value={productSearch}
                    onChange={e => setProductSearch(e.target.value)}
                  />
                </div>
                <button style={S.btn('primary')} onClick={() => setEditingProduct('new')}>
                  <Plus size={14} /> Add Product
                </button>
              </div>

              {/* Stats bar */}
              <div style={{ display: 'flex', gap: '16px', marginBottom: '20px', flexWrap: 'wrap' }}>
                {[
                  { label: 'All Products', count: products.length, color: '#94a3b8' },
                  { label: 'Featured', count: products.filter(p => p.featured).length, color: '#f59e0b' },
                  { label: 'Best Sellers', count: products.filter(p => p.bestSeller).length, color: '#22c55e' },
                  { label: 'Lab Tested', count: products.filter(p => p.labTested).length, color: '#3b82f6' },
                ].map(s => (
                  <div key={s.label} style={{ fontSize: '13px', color: '#64748b' }}>
                    <span style={{ fontWeight: 700, color: s.color }}>{s.count}</span> {s.label}
                  </div>
                ))}
              </div>

              {/* Table */}
              <div style={{ ...S.card, padding: 0, overflow: 'auto' }}>
                <table style={S.table}>
                  <thead>
                    <tr>
                      <th style={S.th}>Product</th>
                      <th style={S.th}>Category</th>
                      <th style={S.th}>INT Price</th>
                      <th style={S.th}>USA Price</th>
                      <th style={S.th}>Badges</th>
                      <th style={S.th}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map(p => (
                      <tr key={p.id} style={{ transition: 'background 0.1s' }} onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')} onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                        <td style={S.td}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <img src={p.image} alt={p.name} style={{ width: '40px', height: '40px', objectFit: 'contain', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', flexShrink: 0 }} onError={e => { (e.target as HTMLImageElement).style.opacity = '0.3'; }} />
                            <div>
                              <p style={{ fontSize: '13px', fontWeight: 600, color: '#e2e8f0', margin: 0 }}>{p.name}</p>
                              <p style={{ fontSize: '11px', color: '#64748b', margin: 0 }}>{p.substance}</p>
                            </div>
                          </div>
                        </td>
                        <td style={S.td}><span style={{ fontSize: '12px', color: '#94a3b8' }}>{p.category}</span></td>
                        <td style={S.td}><span style={{ fontWeight: 700, color: '#dc2626' }}>{fmtMoney(p.intPrice)}</span></td>
                        <td style={S.td}><span style={{ fontWeight: 700, color: '#f87171' }}>{fmtMoney(p.usaPrice)}</span></td>
                        <td style={S.td}>
                          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                            {p.featured && <span style={{ fontSize: '10px', padding: '2px 6px', borderRadius: '5px', background: 'rgba(245,158,11,0.15)', color: '#f59e0b', fontWeight: 600 }}>Featured</span>}
                            {p.bestSeller && <span style={{ fontSize: '10px', padding: '2px 6px', borderRadius: '5px', background: 'rgba(34,197,94,0.15)', color: '#22c55e', fontWeight: 600 }}>Best Seller</span>}
                            {p.labTested && <span style={{ fontSize: '10px', padding: '2px 6px', borderRadius: '5px', background: 'rgba(59,130,246,0.15)', color: '#3b82f6', fontWeight: 600 }}>Lab Tested</span>}
                          </div>
                        </td>
                        <td style={S.td}>
                          <div style={{ display: 'flex', gap: '6px' }}>
                            <button
                              style={{ ...S.btn('secondary'), padding: '6px 10px' }}
                              onClick={() => setEditingProduct(p)}
                            >
                              <Edit2 size={13} />
                            </button>
                            <button
                              style={{ ...S.btn('danger'), padding: '6px 10px' }}
                              onClick={() => setDeletingProduct(p)}
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredProducts.length === 0 && (
                      <tr>
                        <td colSpan={6} style={{ ...S.td, textAlign: 'center', padding: '40px', color: '#475569' }}>
                          <Package size={32} style={{ margin: '0 auto 8px', opacity: 0.3 }} />
                          <p style={{ margin: 0 }}>No products found</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── ORDERS ─── */}
          {view === 'orders' && (
            <div>
              {/* Toolbar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
                <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
                  <Search size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                  <input
                    style={{ ...S.input, paddingLeft: '36px' }}
                    placeholder="Search by order ID, name, email..."
                    value={orderSearch}
                    onChange={e => setOrderSearch(e.target.value)}
                  />
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {(['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'] as const).map(s => (
                    <button
                      key={s}
                      onClick={() => setOrderFilter(s)}
                      style={{
                        padding: '7px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: 600,
                        cursor: 'pointer', border: 'none', transition: 'all 0.15s',
                        background: orderFilter === s
                          ? (s === 'all' ? 'rgba(220,38,38,0.2)' : STATUS_COLORS[s as OrderStatus]?.bg ?? 'rgba(220,38,38,0.2)')
                          : 'rgba(255,255,255,0.05)',
                        color: orderFilter === s
                          ? (s === 'all' ? '#f87171' : STATUS_COLORS[s as OrderStatus]?.color ?? '#f87171')
                          : '#64748b',
                      }}
                    >
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Orders Table */}
              <div style={{ ...S.card, padding: 0, overflow: 'auto' }}>
                <table style={S.table}>
                  <thead>
                    <tr>
                      <th style={S.th}>Order ID</th>
                      <th style={S.th}>Customer</th>
                      <th style={S.th}>Items</th>
                      <th style={S.th}>Payment</th>
                      <th style={S.th}>Total</th>
                      <th style={S.th}>Date</th>
                      <th style={S.th}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map(order => (
                      <tr key={order.id} style={{ transition: 'background 0.1s' }} onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')} onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                        <td style={S.td}>
                          <span style={{ fontFamily: 'monospace', fontSize: '12px', color: '#e2e8f0', fontWeight: 600 }}>{order.id}</span>
                        </td>
                        <td style={S.td}>
                          <p style={{ fontSize: '13px', fontWeight: 600, color: '#e2e8f0', margin: 0 }}>{order.customer.firstName} {order.customer.lastName}</p>
                          <p style={{ fontSize: '11px', color: '#64748b', margin: 0 }}>{order.customer.email}</p>
                          <p style={{ fontSize: '11px', color: '#475569', margin: 0 }}>{order.customer.city}, {order.customer.country}</p>
                        </td>
                        <td style={S.td}>
                          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', maxWidth: '120px' }}>
                            {order.items.slice(0, 3).map((item, i) => (
                              <img key={i} src={item.image} alt={item.name} title={`${item.qty}x ${item.name}`} style={{ width: '28px', height: '28px', objectFit: 'contain', borderRadius: '6px', background: 'rgba(255,255,255,0.05)' }} onError={e => { (e.target as HTMLImageElement).style.opacity = '0.3'; }} />
                            ))}
                            {order.items.length > 3 && <span style={{ fontSize: '10px', color: '#64748b', display: 'flex', alignItems: 'center' }}>+{order.items.length - 3}</span>}
                          </div>
                          <p style={{ fontSize: '11px', color: '#64748b', margin: '4px 0 0' }}>{order.items.reduce((s, i) => s + i.qty, 0)} item(s)</p>
                        </td>
                        <td style={S.td}>
                        <span style={{
                            fontSize: '11px', padding: '3px 8px', borderRadius: '6px', fontWeight: 600,
                            background: order.paymentMethod === 'bitcoin' ? 'rgba(245,158,11,0.15)' : 'rgba(148,163,184,0.1)',
                            color: order.paymentMethod === 'bitcoin' ? '#f59e0b' : '#94a3b8',
                          }}>
                            {order.paymentMethod === 'bitcoin' ? '₿ Bitcoin' :
                             order.paymentMethod === 'applepay' ? '🍎 Apple Pay' :
                             order.paymentMethod === 'bank' ? '🏦 Bank Transfer' :
                             order.paymentMethod === 'card' ? '💳 Credit Card' :
                             order.paymentMethod === 'zelle' ? '⚡ Zelle' :
                             order.paymentMethod === 'chime' ? '🟢 Chime' :
                             order.paymentMethod === 'paypal' ? '🅿️ PayPal' :
                             order.paymentMethod === 'cashapp' ? '💵 Cash App' :
                             order.paymentMethod}
                          </span>
                        </td>
                        <td style={S.td}>
                          <span style={{ fontWeight: 700, color: '#dc2626', fontSize: '14px' }}>{fmtMoney(order.total)}</span>
                        </td>
                        <td style={S.td}>
                          <span style={{ fontSize: '11px', color: '#64748b' }}>{fmtDate(order.date)}</span>
                        </td>
                        <td style={S.td}>
                          <select
                            value={order.status}
                            onChange={e => handleUpdateOrderStatus(order.id, e.target.value as OrderStatus)}
                            style={{
                              padding: '5px 10px', borderRadius: '8px', fontSize: '12px', fontWeight: 600,
                              border: 'none', cursor: 'pointer', outline: 'none',
                              background: STATUS_COLORS[order.status].bg,
                              color: STATUS_COLORS[order.status].color,
                              appearance: 'none',
                            }}
                          >
                            {Object.entries(STATUS_COLORS).map(([k, v]) => (
                              <option key={k} value={k} style={{ background: '#1e293b', color: '#e2e8f0' }}>{v.label}</option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    ))}
                    {filteredOrders.length === 0 && (
                      <tr>
                        <td colSpan={7} style={{ ...S.td, textAlign: 'center', padding: '40px', color: '#475569' }}>
                          <ShoppingCart size={32} style={{ margin: '0 auto 8px', opacity: 0.3 }} />
                          <p style={{ margin: 0 }}>No orders found</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── VIDEO REVIEWS ─── */}
          {view === 'video_reviews' && (
            <div>
              {/* Toolbar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
                <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
                  <Search size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                  <input
                    style={{ ...S.input, paddingLeft: '36px' }}
                    placeholder="Search video reviews..."
                    value={videoSearch}
                    onChange={e => setVideoSearch(e.target.value)}
                  />
                </div>
                <button style={S.btn('primary')} onClick={() => setEditingVideo(true)}>
                  <Plus size={14} /> Add Video Review
                </button>
              </div>

              {/* Table */}
              <div style={{ ...S.card, padding: 0, overflow: 'auto' }}>
                <table style={S.table}>
                  <thead>
                    <tr>
                      <th style={S.th}>Review Details</th>
                      <th style={S.th}>Rating</th>
                      <th style={S.th}>Source</th>
                      <th style={S.th}>Date</th>
                      <th style={S.th}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredVideos.map(video => (
                      <tr key={video.id} style={{ transition: 'background 0.1s' }} onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')} onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                        <td style={S.td}>
                          <div>
                            <p style={{ fontSize: '13px', fontWeight: 600, color: '#e2e8f0', margin: 0 }}>{video.title}</p>
                            <p style={{ fontSize: '11px', color: '#64748b', margin: 0 }}>By {video.author}</p>
                            <p style={{ fontSize: '11px', color: '#cbd5e1', opacity: 0.8, marginTop: '4px', maxWidth: '300px', whiteSpace: 'normal' }}>
                              {video.description}
                            </p>
                          </div>
                        </td>
                        <td style={S.td}>
                          <div style={{ display: 'flex', gap: '2px' }}>
                            {[1, 2, 3, 4, 5].map(star => (
                              <Star
                                key={star}
                                size={12}
                                style={{
                                  fill: star <= video.rating ? '#f59e0b' : 'none',
                                  color: star <= video.rating ? '#f59e0b' : '#475569',
                                }}
                              />
                            ))}
                          </div>
                        </td>
                        <td style={S.td}>
                          <span style={{
                            fontSize: '11px', padding: '3px 8px', borderRadius: '6px', fontWeight: 600,
                            background: video.videoType === 'file' ? 'rgba(34,197,94,0.15)' : 'rgba(59,130,246,0.15)',
                            color: video.videoType === 'file' ? '#22c55e' : '#3b82f6',
                          }}>
                            {video.videoType === 'file' ? '📁 Local File' : '🔗 Link URL'}
                          </span>
                        </td>
                        <td style={S.td}>
                          <span style={{ fontSize: '11px', color: '#64748b' }}>{video.date}</span>
                        </td>
                        <td style={S.td}>
                          <button
                            style={{ ...S.btn('danger'), padding: '6px 10px' }}
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete the review by "${video.author}"?`)) {
                                handleDeleteVideoReview(video.id);
                              }
                            }}
                          >
                            <Trash2 size={13} /> Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                    {filteredVideos.length === 0 && (
                      <tr>
                        <td colSpan={5} style={{ ...S.td, textAlign: 'center', padding: '40px', color: '#475569' }}>
                          <Film size={32} style={{ margin: '0 auto 8px', opacity: 0.3 }} />
                          <p style={{ margin: 0 }}>No video reviews found</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Modals ── */}
      {editingProduct !== null && (
        <ProductModal
          product={editingProduct === 'new' ? null : editingProduct as Product}
          onClose={() => setEditingProduct(null)}
          onSave={handleSaveProduct}
        />
      )}
      {deletingProduct && (
        <DeleteConfirmModal
          name={deletingProduct.name}
          onCancel={() => setDeletingProduct(null)}
          onConfirm={() => handleDeleteProduct(deletingProduct.id)}
        />
      )}
      {editingVideo && (
        <VideoReviewModal
          onClose={() => setEditingVideo(false)}
          onSave={handleSaveVideoReview}
        />
      )}

      {/* ── Toast ── */}
      {toast && (
        <div style={{
          position: 'fixed', bottom: '24px', right: '24px', zIndex: 2000,
          padding: '12px 18px', borderRadius: '12px', fontSize: '13px', fontWeight: 600,
          background: toast.type === 'success' ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)',
          border: `1px solid ${toast.type === 'success' ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'}`,
          color: toast.type === 'success' ? '#22c55e' : '#ef4444',
          display: 'flex', alignItems: 'center', gap: '8px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
          animation: 'slideIn 0.3s ease',
        }}>
          {toast.type === 'success' ? <Check size={14} /> : <AlertCircle size={14} />}
          {toast.msg}
        </div>
      )}

      <style>{`
        @keyframes slideIn { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .spin { animation: spin 1s linear infinite; }
        input::placeholder, textarea::placeholder { color: rgba(148,163,184,0.35); }
        select option { background: #1e293b; color: #e2e8f0; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: rgba(255,255,255,0.02); }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
      `}</style>
    </div>
  );
}
