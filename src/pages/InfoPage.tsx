import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShieldAlert, ShieldCheck, HelpCircle, Truck, FileText, Info } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

export default function InfoPage() {
  const { slug } = useParams<{ slug: string }>();

  // Supplier verification state
  const [serialCode, setSerialCode] = useState('');
  const [verifiedResult, setVerifiedResult] = useState<'success' | 'failed' | null>(null);

  const handleVerifySupplier = (e: React.FormEvent) => {
    e.preventDefault();
    const code = serialCode.trim().toUpperCase();
    if (code.startsWith('DP-') && code.length >= 8) {
      setVerifiedResult('success');
    } else {
      setVerifiedResult('failed');
    }
  };

  // Content mapper for different slugs
  const infoContent = useMemo(() => {
    switch (slug) {
      case 'about-us':
        return {
          title: 'About Dragon Pharma Store',
          icon: <Info className="text-primary-500" size={24} />,
          body: (
            <div className="space-y-4">
              <p>
                Welcome to <strong>Dragon Pharma</strong>, the official online retail distributor for premium laboratory-grade performance enhancers. Established in 2000, we have served athletes, bodybuilders, and fitness enthusiasts globally for over two decades.
              </p>
              <h3 className="font-extrabold text-sm text-brand-text pt-2 uppercase tracking-wide">Our Mission</h3>
              <p>
                Our mission is simple: to supply the highest quality anabolic steroids, SARMs, peptides, and post-cycle therapies directly to your doorstep with absolute transparency, verified purity, and total security.
              </p>
              <h3 className="font-extrabold text-sm text-brand-text pt-2 uppercase tracking-wide">GMP Certified Production</h3>
              <p>
                All compounds featured on our platform are manufactured under Good Manufacturing Practices (GMP) using automated synthesis equipment. We mandate independent third-party laboratory audits for every single production run to ensure dosage accuracy.
              </p>
            </div>
          )
        };
      case 'shipping':
        return {
          title: 'Shipping & Delivery Info',
          icon: <Truck className="text-primary-500" size={24} />,
          body: (
            <div className="space-y-4">
              <p>
                We operate multiple global distribution nodes, including local domestic warehouses inside the United States and international warehouses in Europe and Asia.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                <div className="border border-brand-border rounded-2xl p-4 bg-brand-soft">
                  <h4 className="font-bold text-xs text-brand-text mb-1">🇺🇸 US Domestic Warehouse</h4>
                  <p className="text-[11px] text-brand-muted leading-relaxed">
                    Orders are processed and dispatched within 24 hours. Deliveries typically arrive in <strong>2–5 business days</strong> via USPS priority mail.
                  </p>
                </div>
                <div className="border border-brand-border rounded-2xl p-4 bg-brand-soft">
                  <h4 className="font-bold text-xs text-brand-text mb-1">🌏 International Warehouses</h4>
                  <p className="text-[11px] text-brand-muted leading-relaxed">
                    Shipped worldwide via registered postal mail. Deliveries arrive in <strong>10–21 business days</strong> depending on destination customs clearance.
                  </p>
                </div>
              </div>
              <h3 className="font-extrabold text-sm text-brand-text pt-2 uppercase tracking-wide">Stealth & Discretion</h3>
              <p>
                All parcels are packed using stealth methods. The outer box contains no markings referencing pharmacy, peptides, or steroids. Custom declarations are marked under generic gift descriptions to avoid border control attention.
              </p>
            </div>
          )
        };
      case 'guarantees':
        return {
          title: 'Delivery & Quality Guarantees',
          icon: <ShieldCheck className="text-emerald-600" size={24} />,
          body: (
            <div className="space-y-4">
              <p>
                At Dragon Pharma, we value client satisfaction above all else. We provide ironclad guarantees for shipping and product quality.
              </p>
              <h3 className="font-extrabold text-sm text-brand-text pt-2 uppercase tracking-wide">1. Seizure & Loss Re-shipment</h3>
              <p>
                If your parcel is lost in transit for more than 30 days, or if you receive an official customs seizure letter, we will reship your complete order <strong>100% free of charge</strong>. We request only that you provide a scanned image of the customs notification.
              </p>
              <h3 className="font-extrabold text-sm text-brand-text pt-2 uppercase tracking-wide">2. Purity Verification Credit</h3>
              <p>
                In the rare event that a batch does not meet standard dosage claims, we will credit your store account for the full product value or replace the vials. Verification requires sharing high-resolution pictures of the box serials.
              </p>
            </div>
          )
        };
      case 'privacy-policy':
        return {
          title: 'Privacy Policy',
          icon: <FileText className="text-primary-500" size={24} />,
          body: (
            <div className="space-y-4">
              <p>
                Your privacy is paramount. We implement strict operational protocols to safeguard your personal identity and order history.
              </p>
              <h3 className="font-extrabold text-sm text-brand-text pt-2 uppercase tracking-wide">Data Protection</h3>
              <p>
                We do not store credit card details or billing information on our web servers. All databases containing shipping addresses are encrypted using AES-256 standard and automatically purged from our systems 30 days after order delivery.
              </p>
              <h3 className="font-extrabold text-sm text-brand-text pt-2 uppercase tracking-wide">Anonymous Transactions</h3>
              <p>
                We encourage all customers to check out using anonymous cryptocurrencies like Bitcoin (BTC) or Monero. No email verification or account creation is strictly mandated to complete a purchase transaction.
              </p>
            </div>
          )
        };
      case 'terms-of-use':
        return {
          title: 'Terms of Use',
          icon: <FileText className="text-primary-500" size={24} />,
          body: (
            <div className="space-y-4">
              <p>
                By accessing and purchasing from Dragon Pharma, you agree to comply with the terms and conditions outlined below.
              </p>
              <h3 className="font-extrabold text-sm text-brand-text pt-2 uppercase tracking-wide">Legal Age Requirements</h3>
              <p>
                You must be at least 18 years of age or the legal age of majority in your jurisdiction to purchase compounds from this store.
              </p>
              <h3 className="font-extrabold text-sm text-brand-text pt-2 uppercase tracking-wide">Local Regulations</h3>
              <p>
                It is the sole responsibility of the purchaser to verify the legal status of peptides, anabolic hormones, and post-cycle compounds within their respective countries. Dragon Pharma is not liable for border conflicts or regulatory violations.
              </p>
            </div>
          )
        };
      case 'supplier':
        return {
          title: 'Supplier Verification Portal',
          icon: <ShieldCheck className="text-primary-500" size={24} />,
          body: (
            <div className="space-y-6">
              <p>
                Counterfeit pharmaceuticals pose severe health risks. To protect athletes from under-dosed or contaminated products, every authentic Dragon Pharma compound contains a unique scratch-off serial code on its package box.
              </p>
              
              {/* Verification Form Card */}
              <div className="border border-brand-border rounded-3xl p-6 bg-white shadow-brand-sm space-y-4 max-w-md mx-auto">
                <h3 className="font-black text-xs text-brand-text uppercase tracking-wider text-center">
                  Verify Batch Serial Code
                </h3>
                
                {verifiedResult === 'success' && (
                  <div className="border border-emerald-200 bg-emerald-50 text-emerald-800 rounded-2xl p-4 text-center space-y-2 animate-scaleIn">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-500 mx-auto">
                      <ShieldCheck size={20} />
                    </div>
                    <h4 className="font-bold text-xs">Genuine Product Verified!</h4>
                    <p className="text-[10px] text-emerald-700 leading-relaxed">
                      Serial Code <strong>{serialCode.toUpperCase()}</strong> is registered in our manufacturing log. This batch is verified as genuine Dragon Pharma pharmaceutical grade.
                    </p>
                    <button 
                      onClick={() => { setVerifiedResult(null); setSerialCode(''); }}
                      className="text-[10px] font-black text-emerald-800 hover:underline pt-2.5 block mx-auto"
                    >
                      Verify Another Code
                    </button>
                  </div>
                )}

                {verifiedResult === 'failed' && (
                  <div className="border border-red-200 bg-red-50 text-red-800 rounded-2xl p-4 text-center space-y-2 animate-scaleIn">
                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-500 mx-auto">
                      <ShieldAlert size={20} />
                    </div>
                    <h4 className="font-bold text-xs">Authenticity Check Failed</h4>
                    <p className="text-[10px] text-red-700 leading-relaxed">
                      Code <strong>{serialCode.toUpperCase()}</strong> was not found in our database. Ensure you typed the code correctly. If you suspect a counterfeit, please contact our support desk immediately.
                    </p>
                    <button 
                      onClick={() => { setVerifiedResult(null); setSerialCode(''); }}
                      className="text-[10px] font-black text-red-800 hover:underline pt-2.5 block mx-auto"
                    >
                      Try Again
                    </button>
                  </div>
                )}

                {verifiedResult === null && (
                  <form onSubmit={handleVerifySupplier} className="space-y-4">
                    <div>
                      <label className="form-label text-[10px] uppercase text-center block">Enter Scratch-off Code</label>
                      <input
                        type="text"
                        required
                        value={serialCode}
                        onChange={e => setSerialCode(e.target.value)}
                        placeholder="e.g. DP-1082-98A"
                        className="form-input text-center text-xs font-mono rounded-xl tracking-widest placeholder:tracking-normal uppercase"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full btn-primary py-2.5 rounded-xl justify-center font-bold text-xs cursor-pointer"
                    >
                      Verify Authenticity
                    </button>
                    <div className="text-[9px] text-brand-muted text-center leading-relaxed">
                      Tip: Enter any code starting with "DP-" (e.g. DP-1002-TEST) to simulate a successful genuineness check.
                    </div>
                  </form>
                )}
              </div>
            </div>
          )
        };
      default:
        return {
          title: 'Information Board',
          icon: <HelpCircle className="text-primary-500" size={24} />,
          body: <p>Information page not found. Please browse other corporate information tabs.</p>
        };
    }
  }, [slug, serialCode, verifiedResult]);

  return (
    <div className="min-h-screen py-10 page-container">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-1.5 text-xs text-brand-muted mb-8 font-medium">
        <Link to="/" className="hover:text-primary-500 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-brand-text capitalize">Info</span>
        <span>/</span>
        <span className="text-primary-500 font-bold">{infoContent.title}</span>
      </div>

      {/* ── Main Layout ────────────────────────────── */}
      <div className="grid md:grid-cols-4 gap-8">
        {/* Navigation Sidebar */}
        <aside className="space-y-2.5">
          <div className="bg-white border border-brand-border rounded-3xl p-5 shadow-brand-sm space-y-2">
            <h3 className="font-extrabold text-xs text-brand-text uppercase tracking-wider mb-3 pb-2 border-b border-brand-border">
              Information
            </h3>
            
            {[
              { label: 'About Us', slugVal: 'about-us' },
              { label: 'Shipping Info', slugVal: 'shipping' },
              { label: 'Guarantees', slugVal: 'guarantees' },
              { label: 'Privacy Policy', slugVal: 'privacy-policy' },
              { label: 'Terms of Use', slugVal: 'terms-of-use' },
              { label: 'Verify Supplier', slugVal: 'supplier' },
            ].map(link => (
              <Link
                key={link.slugVal}
                to={`/info/${link.slugVal}`}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  slug === link.slugVal
                    ? 'bg-primary-500 text-white shadow-sm'
                    : 'text-brand-muted hover:bg-brand-soft hover:text-brand-text'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="bg-brand-soft border border-brand-border rounded-2xl p-4 text-center">
            <p className="text-[10px] text-brand-muted leading-relaxed">
              Need technical support or custom assistance?
            </p>
            <Link to="/contact" className="inline-flex text-xs font-bold text-primary-500 hover:underline mt-2">
              Submit Support Ticket →
            </Link>
          </div>
        </aside>

        {/* Content Body */}
        <section className="md:col-span-3">
          <ScrollReveal className="bg-white border border-brand-border rounded-3xl p-6 md:p-10 shadow-brand-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-brand-border pb-4">
              <div className="p-3 bg-brand-soft rounded-2xl shrink-0">
                {infoContent.icon}
              </div>
              <h1 className="text-xl md:text-2xl font-black text-brand-text tracking-tight leading-tight">
                {infoContent.title}
              </h1>
            </div>

            <div className="text-xs md:text-sm text-brand-muted leading-relaxed max-w-3xl">
              {infoContent.body}
            </div>
          </ScrollReveal>
        </section>
      </div>
    </div>
  );
}
