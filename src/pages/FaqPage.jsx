import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import CtaSection from '../components/CtaSection';

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  const allFaqs = [
    {
      id: 1,
      category: 'General',
      question: 'How does it work with two wallets?',
      answer:
        'WorkTrust International provides both a Primary Spending Wallet for day-to-day transactions and an Interest/Yield Wallet for automated payouts from your active DPS and FDR investments. You can easily sweep funds between wallets with zero fees.',
    },
    {
      id: 2,
      category: 'Deposits',
      question: 'Is there an option for manual Deposit?',
      answer:
        'Yes, along with over 25 automated gateways like PayPal, Stripe, and crypto, you can make manual direct wire transfers or bank deposits by following the instructions provided in your user dashboard.',
    },
    {
      id: 3,
      category: 'Withdrawals',
      question: 'How to Withdraw Money',
      answer:
        'To withdraw funds, simply navigate to your dashboard, select Withdraw, specify your preferred receiving method (bank account, debit card, or crypto wallet), specify the amount, and confirm the transaction.',
    },
    {
      id: 4,
      category: 'Account',
      question: 'How can I upgrade my Ranking',
      answer:
        'Rankings upgrade automatically as your cumulative transaction volume, referral network size, and average monthly account balance reach tier thresholds (Bronze, Silver, Gold, Platinum).',
    },
    {
      id: 5,
      category: 'Referrals',
      question: 'How the Referral Levels works?',
      answer:
        'Our multi-level referral architecture rewards you on three levels: Level 1 (5% commission on direct referrals), Level 2 (2.5% on their network), and Level 3 (1% extended network bonus).',
    },
    {
      id: 6,
      category: 'Security',
      question: 'How is my financial data protected?',
      answer:
        'All sensitive customer data is stored behind multi-tiered firewalls with bank-standard 256-bit AES encryption, cold storage for reserve funds, and multi-factor biometric authentication.',
    },
    {
      id: 7,
      category: 'Loans',
      question: 'What is the School and Educational Loan policy?',
      answer:
        'Our School Loan package offers an ultra-low 3% installment interest rate spread across 350 days with 4 flexible repayment slices and loan limits from $500 up to $40,000.',
    },
  ];

  const categories = ['All', 'General', 'Deposits', 'Withdrawals', 'Account', 'Referrals', 'Security', 'Loans'];

  const filteredFaqs = allFaqs.filter((f) => {
    const matchesCat = activeCategory === 'All' || f.category === activeCategory;
    const matchesSearch =
      f.question.toLowerCase().includes(search.toLowerCase()) ||
      f.answer.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <>
      <Breadcrumb
        title="Frequently Asked Questions"
        subtitle="Find instant answers to popular inquiries concerning accounts, deposits, loan schedules, and security."
      />

      <section className="faq-section section-space">
        <div className="container">
          {/* Search & Categories */}
          <div className="row justify-content-center mb-5">
            <div className="col-lg-8">
              <div className="input-group mb-4 shadow-sm">
                <input
                  type="text"
                  className="form-control py-3"
                  placeholder="Search questions (e.g. withdrawal, deposit, loan)..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button className="btn btn-primary px-4" type="button">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </div>

              <div className="d-flex flex-wrap gap-2 justify-content-center">
                {categories.map((c) => (
                  <button
                    key={c}
                    className={`btn btn-sm rounded-pill px-3 py-2 fw-medium ${
                      activeCategory === c ? 'btn-primary' : 'btn-outline-secondary'
                    }`}
                    onClick={() => setActiveCategory(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* FAQ Accordion List */}
          <div className="row justify-content-center">
            <div className="col-xxl-10 col-xl-10 col-lg-10">
              <div className="accordion-wrapper site-faq">
                <div className="accordion" id="accordionFaqPage">
                  {filteredFaqs.length > 0 ? (
                    filteredFaqs.map((faq, idx) => {
                      const isOpen = openIndex === idx;
                      return (
                        <div key={faq.id} className={`accordion-item ${isOpen ? 'active' : ''}`}>
                          <h2 className="accordion-header">
                            <button
                              className={`accordion-button ${isOpen ? '' : 'collapsed'}`}
                              type="button"
                              onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                              aria-expanded={isOpen}
                            >
                              <span className="count">{faq.id}</span>
                              {faq.question}
                            </button>
                          </h2>
                          <div
                            className={`accordion-collapse collapse ${isOpen ? 'show' : ''}`}
                            style={{ display: isOpen ? 'block' : 'none' }}
                          >
                            <div className="accordion-body">
                              <p>{faq.answer}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-5">
                      <p className="text-secondary fs-5">No questions matched your search criteria.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Need help banner */}
          <div className="row justify-content-center mt-5">
            <div className="col-xxl-10 col-xl-10 col-lg-10">
              <div
                className="p-4 p-md-5 rounded-4 text-center text-white"
                style={{ background: '#20293A' }}
              >
                <h3 className="text-white mb-2">Still Have Questions?</h3>
                <p className="text-light opacity-75 mb-4">
                  Our dedicated international support representatives are available around the clock to assist you.
                </p>
                <Link to="/contact" className="site-btn gdt-btn">
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
