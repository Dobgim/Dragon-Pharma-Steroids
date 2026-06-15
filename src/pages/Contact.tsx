import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, CheckCircle2, ShieldCheck, MessageSquare } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [orderId, setOrderId] = useState('');
  const [subject, setSubject] = useState('order-status');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && message) {
      setSuccess(true);
      setName('');
      setEmail('');
      setOrderId('');
      setMessage('');
      setTimeout(() => setSuccess(false), 4000);
    }
  };

  return (
    <div className="min-h-screen py-10 page-container">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-1.5 text-xs text-brand-muted mb-8 font-medium">
        <Link to="/" className="hover:text-primary-500 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-primary-500 font-bold">Contact Us</span>
      </div>

      <ScrollReveal className="text-center max-w-xl mx-auto mb-10 space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-100 text-primary-500 font-extrabold text-[10px] uppercase tracking-wider">
          <MessageSquare size={12} /> Support Desk
        </span>
        <h1 className="section-title">Get In Touch</h1>
        <p className="section-sub">
          Have an inquiry about an order, shipment, or batch? Our support team is online 24/7 to assist.
        </p>
      </ScrollReveal>

      {/* ── Main Layout ────────────────────────────── */}
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Left Column: Support Cards */}
        <section className="space-y-6">
          {/* Info Card */}
          <ScrollReveal className="bg-white border border-brand-border rounded-3xl p-6 shadow-brand-sm space-y-4">
            <h2 className="font-black text-brand-text text-base pb-3 border-b border-brand-border flex items-center gap-2">
              <Clock className="text-primary-500" size={18} /> Support Operating Hours
            </h2>
            <div className="space-y-3 text-xs leading-relaxed text-brand-muted font-medium">
              <p>
                We operate on a <strong>24/7/365</strong> schedule. Our ticketing and email systems are actively monitored by support representatives.
              </p>
              <ul className="space-y-2 pl-4 list-disc">
                <li><strong>Order Inquiries:</strong> Typically answered within 1–2 hours.</li>
                <li><strong>Payment Confirmations:</strong> Automated for crypto; bank wire verification takes 12–24 hours.</li>
                <li><strong>General Questions:</strong> Replied within 6–12 hours.</li>
              </ul>
            </div>
          </ScrollReveal>

          {/* Guarantee Card */}
          <ScrollReveal className="bg-white border border-brand-border rounded-3xl p-6 shadow-brand-sm space-y-4">
            <h2 className="font-black text-brand-text text-base pb-3 border-b border-brand-border flex items-center gap-2">
              <ShieldCheck className="text-emerald-600" size={18} /> Our Reshipment Guarantee
            </h2>
            <div className="space-y-3 text-xs leading-relaxed text-brand-muted">
              <p>
                We stand behind our deliveries. If your package is lost in transit or stopped at customs border check, we offer:
              </p>
              <ul className="space-y-2 pl-4 list-disc font-medium">
                <li><strong>100% Free Reshipment:</strong> Dispatched from alternate warehouse routing.</li>
                <li><strong>Store Credit Refund:</strong> Valid for any compound in our catalog.</li>
                <li><strong>Discreet Re-routing:</strong> Double stealth packaging applied for re-shipments.</li>
              </ul>
            </div>
          </ScrollReveal>
        </section>

        {/* Right Column: Form */}
        <aside>
          <ScrollReveal className="bg-white border border-brand-border rounded-3xl p-6 md:p-8 shadow-brand-sm space-y-4">
            <h2 className="font-black text-brand-text text-sm uppercase tracking-wider pb-3 border-b border-brand-border">
              Submit a Support Ticket
            </h2>

            {success ? (
              <div className="border border-emerald-200 bg-emerald-50/50 rounded-2xl p-6 text-center space-y-3 py-10">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-500 mx-auto animate-scaleIn">
                  <CheckCircle2 size={24} />
                </div>
                <h4 className="font-bold text-sm text-emerald-800">Support Ticket Created</h4>
                <p className="text-xs text-emerald-700 leading-relaxed max-w-xs mx-auto">
                  Thank you! Your inquiry has been received. One of our support representatives will contact you shortly at the email address provided.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitContact} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label text-xs">Your Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="e.g. Brad P."
                      className="form-input text-xs rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="form-label text-xs">Email Address</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="e.g. brad@example.com"
                      className="form-input text-xs rounded-xl"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label text-xs">Order ID (Optional)</label>
                    <input
                      type="text"
                      value={orderId}
                      onChange={e => setOrderId(e.target.value)}
                      placeholder="e.g. DP-2026-98741"
                      className="form-input text-xs rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="form-label text-xs">Inquiry Topic</label>
                    <select
                      value={subject}
                      onChange={e => setSubject(e.target.value)}
                      className="form-input text-xs rounded-xl"
                    >
                      <option value="order-status">Order & Tracking Status</option>
                      <option value="payment-issue">Payment Assistance</option>
                      <option value="product-quality">Product Authenticity & Labs</option>
                      <option value="shipping-problem">Shipping & Logistics Issue</option>
                      <option value="general-inquiry">General Inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="form-label text-xs">Your Message</label>
                  <textarea
                    required
                    rows={5}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Provide details about your query. Include order receipts, substance names, or delivery tracking if relevant..."
                    className="form-input text-xs rounded-xl resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full btn-primary py-3 rounded-xl justify-center font-bold text-xs shadow-md cursor-pointer"
                >
                  Send Support Message
                </button>
              </form>
            )}
          </ScrollReveal>
        </aside>
      </div>
    </div>
  );
}
