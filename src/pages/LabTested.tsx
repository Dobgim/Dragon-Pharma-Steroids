import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  FlaskConical, 
  Search, 
  CheckCircle2, 
  Calendar, 
  ArrowUpRight, 
  HelpCircle,
  Maximize2
} from 'lucide-react';
import { labReports } from '../lib/products-data';
import ScrollReveal from '../components/ScrollReveal';

export default function LabTested() {
  const [searchQ, setSearchQ] = useState('');
  const [lightboxImg, setLightboxImg] = useState<{ image: string; title: string } | null>(null);

  // Filter lab reports based on search query
  const filteredReports = useMemo(() => {
    if (!searchQ.trim()) return labReports;
    const q = searchQ.toLowerCase();
    return labReports.filter(r => 
      r.product.toLowerCase().includes(q)
    );
  }, [searchQ]);

  return (
    <div className="min-h-screen py-10 page-container">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-1.5 text-xs text-brand-muted mb-8 font-medium">
        <Link to="/" className="hover:text-primary-500 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-primary-500 font-bold">Lab Reports</span>
      </div>

      {/* ── Intro Header ───────────────────────────── */}
      <div className="bg-gradient-to-br from-brand-text to-slate-900 border border-white/5 rounded-3xl p-6 md:p-10 text-white shadow-xl mb-10 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 rounded-full bg-primary-500/10 blur-3xl pointer-events-none" />
        <div className="max-w-2xl space-y-4 z-10 relative">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-extrabold text-xs tracking-wider uppercase">
            <CheckCircle2 size={13} /> 100% Quality Guaranteed
          </span>
          <h1 className="text-2xl md:text-4xl font-black text-white tracking-tight leading-tight">
            Independent Lab Verification
          </h1>
          <p className="text-sm text-gray-300 leading-relaxed max-w-xl font-medium">
            We partner with independent, third-party chemical analytics laboratories to audit our compounds. Below you can view verified batch purity reports, test dates, and official lab certificates.
          </p>
        </div>
      </div>

      {/* ── Controls Bar ───────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-brand-border mb-8">
        <div className="relative w-full sm:max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted" />
          <input
            type="text"
            placeholder="Search verified products..."
            value={searchQ}
            onChange={e => setSearchQ(e.target.value)}
            className="form-input pl-10 pr-4 py-2.5 text-xs rounded-xl shadow-brand-sm w-full"
          />
        </div>

        <div className="text-xs font-semibold text-brand-muted self-end sm:self-center shrink-0">
          Showing <span className="text-brand-text font-black">{filteredReports.length}</span> verified batches
        </div>
      </div>

      {/* ── Reports Grid ───────────────────────────── */}
      {filteredReports.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReports.map((report, idx) => (
            <ScrollReveal key={idx} delay={idx * 50}>
              <div className="bg-white border border-brand-border rounded-2xl p-5 shadow-brand-sm hover:shadow-brand-md hover:border-primary-200 transition-all space-y-4 flex flex-col justify-between h-full">
                <div className="space-y-3">
                  {/* Status Bar */}
                  <div className="flex justify-between items-center">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 border border-emerald-100 text-emerald-600 text-[10px] font-black rounded-lg">
                      <CheckCircle2 size={11} /> VERIFIED PASS
                    </span>
                    <span className="text-[10px] text-brand-muted font-bold flex items-center gap-1">
                      <Calendar size={11} /> {report.date}
                    </span>
                  </div>

                  {/* Title */}
                  <div>
                    <h3 className="font-extrabold text-base text-brand-text leading-tight">{report.product}</h3>
                    <p className="text-[10px] text-brand-muted mt-0.5 uppercase tracking-wide">Dragon Pharma Batch</p>
                  </div>

                  {/* Results Panel */}
                  <div className="bg-brand-soft border border-brand-border rounded-xl p-3 text-xs space-y-2">
                    <div className="flex justify-between">
                      <span className="font-bold text-brand-muted">Label Claim:</span>
                      <span className="font-extrabold text-brand-text">
                        {report.product.includes('10') ? '10.00 mg' : report.product.includes('270') ? '270.00 mg' : report.product.includes('250') ? '250.00 mg' : report.product.includes('150') ? '150.00 mg' : report.product.includes('200') ? '200.00 mg' : report.product.includes('350') ? '350.00 mg' : '100% Purity'}
                      </span>
                    </div>
                    <div className="flex justify-between text-emerald-700 font-extrabold">
                      <span>Lab Verified:</span>
                      <span>{report.verified}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2.5 pt-2 border-t border-brand-border/40">
                  <button
                    onClick={() => setLightboxImg({ image: report.image, title: report.product })}
                    className="flex-1 py-2.5 rounded-xl border border-brand-border hover:border-primary-500 hover:text-primary-500 transition-colors text-xs font-bold bg-white text-brand-muted flex items-center justify-center gap-1 cursor-pointer"
                  >
                    View Lab Report <Maximize2 size={12} />
                  </button>
                  <Link
                    to={`/${report.productSlug}`}
                    className="p-2.5 rounded-xl bg-brand-soft hover:bg-primary-50 border border-brand-border text-brand-muted hover:text-primary-500 transition-colors"
                    aria-label="View Product Detail"
                  >
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white border border-brand-border rounded-3xl max-w-md mx-auto space-y-4 p-8 shadow-brand-sm">
          <div className="w-14 h-14 rounded-2xl bg-brand-soft flex items-center justify-center mx-auto text-brand-muted">
            <FlaskConical size={24} />
          </div>
          <h2 className="font-bold text-brand-text text-sm">No Reports Found</h2>
          <p className="text-xs text-brand-muted leading-relaxed">
            We couldn't find any verified lab reports matching your search query. Try searching for a different compound.
          </p>
        </div>
      )}

      {/* ── FAQ trust banner ── */}
      <ScrollReveal className="bg-white border border-brand-border rounded-3xl p-6 md:p-8 mt-12 shadow-brand-sm space-y-4">
        <h2 className="font-black text-brand-text text-base flex items-center gap-2">
          <HelpCircle className="text-primary-500" size={18} /> Lab Testing Frequently Asked Questions
        </h2>
        <div className="grid md:grid-cols-2 gap-6 text-xs leading-relaxed">
          <div className="space-y-1.5">
            <h4 className="font-extrabold text-brand-text">How often do you test your batches?</h4>
            <p className="text-brand-muted">
              We send random audit samples from every single chemical synthesizer run and tableting batch prior to packaging and warehouse distribution.
            </p>
          </div>
          <div className="space-y-1.5">
            <h4 className="font-extrabold text-brand-text">Which laboratories perform these analyses?</h4>
            <p className="text-brand-muted">
              Our batches are submitted to independent, ISO-certified laboratories specialising in high-performance liquid chromatography (HPLC) testing.
            </p>
          </div>
        </div>
      </ScrollReveal>

      {/* ── Lightbox Certificate Modal ───────────────── */}
      {lightboxImg && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="absolute inset-0" onClick={() => setLightboxImg(null)} />
          <div className="relative max-w-4xl max-h-[85vh] bg-white rounded-3xl overflow-hidden p-3 shadow-2xl flex flex-col z-10 animate-scaleIn">
            <button
              onClick={() => setLightboxImg(null)}
              className="absolute right-4 top-4 w-9 h-9 bg-black/60 hover:bg-primary-500 rounded-full flex items-center justify-center text-white font-extrabold transition-colors z-20"
              aria-label="Close Lightbox"
            >
              ✕
            </button>
            <img
              src={lightboxImg.image}
              alt={lightboxImg.title}
              className="max-h-[75vh] object-contain mx-auto rounded-xl"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/600x600/fdf1ef/b54444?text=Certificate+Not+Found';
              }}
            />
            <div className="bg-brand-soft border-t border-brand-border p-3 text-center text-xs text-emerald-800 font-bold uppercase tracking-wide">
              Official Independent Lab Certificate Claims • {lightboxImg.title}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
