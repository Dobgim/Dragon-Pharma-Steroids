import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, HelpCircle, Truck, CreditCard, ShieldAlert, BadgeHelp } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

interface FAQItem {
  q: string;
  a: string;
}

interface FAQGroup {
  category: string;
  icon: React.ReactNode;
  items: FAQItem[];
}

const faqData: FAQGroup[] = [
  {
    category: 'Shipping & Logistics',
    icon: <Truck className="w-4 h-4" />,
    items: [
      {
        q: 'How long does shipping take and what are the rates?',
        a: 'We offer two shipping options. Standard Shipping costs $15 (Free for orders over $200) and takes 10–21 business days. Express Shipping costs $30 and takes 2–5 business days, dispatched from local regional domestic warehouses.'
      },
      {
        q: 'Do you ship to PO Boxes or APO addresses?',
        a: 'Yes, we ship to PO Boxes and military APO/FPO addresses. To guarantee delivery, please ensure your details are complete and formatted correctly in the address fields.'
      },
      {
        q: 'Is shipping discreet? What does the packaging look like?',
        a: 'Absolute discretion is guaranteed. Packages are shipped in standard cardboard mailer boxes or envelopes with no markings, company logos, or descriptions referencing peptides, steroids, or pharmaceuticals. Your privacy is our priority.'
      },
      {
        q: 'What happens if my package is seized by customs?',
        a: 'We have a 100% Guaranteed Delivery policy. If your order is lost in transit or seized by customs control, we will reship your order once free of charge, or issue a full store credit refund. Lab verification of customs seizure notices may be required.'
      }
    ]
  },
  {
    category: 'Payments & Ordering',
    icon: <CreditCard className="w-4 h-4" />,
    items: [
      {
        q: 'What payment methods do you accept?',
        a: 'We accept payments through secure Cryptocurrency (Bitcoin BTC, Tether USDT, Litecoin LTC), standard Credit Cards (Visa, Mastercard), and direct International Bank Wire transfers.'
      },
      {
        q: 'Why should I pay with Cryptocurrency?',
        a: 'We encourage crypto payments because they are instant, anonymous, secure, and require no processing fees. To incentivize crypto usage, we automatically apply a 20% discount to all orders checked out using Bitcoin or Tether.'
      },
      {
        q: 'Can I modify or cancel my order after placing it?',
        a: 'Orders can be modified or cancelled within 2 hours of submission by contacting support, provided they have not yet been dispatched. Once an order is processed for packaging and tracking is generated, no modifications can be completed.'
      }
    ]
  },
  {
    category: 'Product Quality & Safety',
    icon: <ShieldAlert className="w-4 h-4" />,
    items: [
      {
        q: 'Are your products genuine pharmaceutical grade?',
        a: 'Yes. We are the official store for Dragon Pharma products. All compounds are manufactured under strict Good Manufacturing Practices (GMP) and hold active pharmaceutical quality certifications.'
      },
      {
        q: 'How do I verify the authenticity of my batch?',
        a: 'Every item comes with a unique serial number and scratch-off verification code on the box. You can check these codes directly on our "Supplier Verification" portal to guarantee authenticity.'
      },
      {
        q: 'What are independent laboratory reports?',
        a: 'To guarantee absolute transparency, we submit random samples from each manufacturing batch to independent analytical laboratories. These labs verify the exact active ingredient concentration (e.g. 10mg Anavar) and compound purity.'
      }
    ]
  }
];

export default function FAQ() {
  const [activeTab, setActiveTab] = useState(0);
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (idx: string) => {
    setOpenItems(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="min-h-screen py-10 page-container">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-1.5 text-xs text-brand-muted mb-8 font-medium">
        <Link to="/" className="hover:text-primary-500 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-primary-500 font-bold">FAQ</span>
      </div>

      <ScrollReveal className="text-center max-w-xl mx-auto mb-10 space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-100 text-primary-500 font-extrabold text-[10px] uppercase tracking-wider">
          <BadgeHelp size={12} /> Support Board
        </span>
        <h1 className="section-title">Frequently Asked Questions</h1>
        <p className="section-sub">
          Got questions? We have answers. Find details about shipping logistics, payment security, and quality audits below.
        </p>
      </ScrollReveal>

      {/* ── Tabs & Accordions ──────────────────────── */}
      <div className="grid md:grid-cols-4 gap-8">
        {/* Navigation Tabs */}
        <aside className="space-y-2">
          {faqData.map((group, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-2xl text-xs font-bold transition-all text-left cursor-pointer ${
                activeTab === idx
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-white border border-brand-border text-brand-muted hover:border-primary-300 hover:text-brand-text'
              }`}
            >
              {group.icon}
              {group.category}
            </button>
          ))}
          
          <div className="bg-brand-soft border border-brand-border rounded-2xl p-4 space-y-2 pt-4">
            <h4 className="font-extrabold text-xs text-brand-text">Still need help?</h4>
            <p className="text-[10px] text-brand-muted leading-relaxed">
              If you cannot find the answer to your question, our support team is available 24/7.
            </p>
            <Link to="/contact" className="inline-flex text-xs font-bold text-primary-500 hover:underline">
              Contact Support →
            </Link>
          </div>
        </aside>

        {/* Accordions Panel */}
        <section className="md:col-span-3 space-y-4">
          <div className="bg-white border border-brand-border rounded-3xl p-6 md:p-8 shadow-brand-sm space-y-4">
            <h2 className="font-black text-brand-text text-base pb-3 border-b border-brand-border flex items-center gap-2">
              <HelpCircle className="text-primary-500" size={18} /> {faqData[activeTab].category}
            </h2>

            <div className="divide-y divide-brand-border">
              {faqData[activeTab].items.map((item, itemIdx) => {
                const globalKey = `${activeTab}-${itemIdx}`;
                const isOpen = !!openItems[globalKey];

                return (
                  <div key={itemIdx} className="py-4 first:pt-1 last:pb-1">
                    <button
                      onClick={() => toggleItem(globalKey)}
                      className="w-full flex items-center justify-between text-left font-bold text-xs md:text-sm text-brand-text hover:text-primary-500 transition-colors py-2"
                    >
                      <span>{item.q}</span>
                      <ChevronDown
                        size={16}
                        className={`text-brand-muted shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-primary-500' : ''
                        }`}
                      />
                    </button>
                    
                    <div
                      className={`accordion-content ${isOpen ? 'open' : ''}`}
                    >
                      <p className="text-xs text-brand-muted leading-relaxed pt-2.5 pb-1 border-t border-brand-soft mt-1">
                        {item.a}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
