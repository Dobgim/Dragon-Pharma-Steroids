import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import ProfessionalFeatures from '../components/ProfessionalFeatures';
import OurSolutions from '../components/OurSolutions';
import CtaSection from '../components/CtaSection';

export default function SolutionsPage() {
  const [loanAmount, setLoanAmount] = useState(5000);
  const [days, setDays] = useState(350);
  const rate = 3; // 3%

  const interest = (loanAmount * rate) / 100;
  const totalRepay = loanAmount + interest;
  const perInstallment = totalRepay / 4;

  const extraSolutions = [
    {
      title: 'Virtual & Physical Cards',
      icon: 'fa-solid fa-credit-card',
      desc: 'Instantly issue multi-currency debit cards connected to your WorkTrust wallet with customizable spending limits and instant freeze features.',
    },
    {
      title: 'Merchant Gateway Integration',
      icon: 'fa-solid fa-store',
      desc: 'Accept payments across websites and e-commerce platforms effortlessly using our RESTful APIs, webhooks, and instant payouts.',
    },
    {
      title: 'Automated Payroll & Batch Transfers',
      icon: 'fa-solid fa-file-invoice-dollar',
      desc: 'Disburse employee salaries, vendor payments, and bulk bonuses across borders in minutes with transparent FX rates.',
    },
  ];

  return (
    <>
      <Breadcrumb
        title="Our Solutions"
        subtitle="Comprehensive financial technology solutions engineered for individuals, entrepreneurs, and global businesses."
      />

      <OurSolutions />

      {/* Additional Enterprise Solutions */}
      <section className="section-space bg-sugar-milk">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xxl-7 col-xl-7 col-lg-8">
              <div className="section-title-wrapper text-center section-title-space">
                <h2 className="section-title mb-15">Advanced Digital Services</h2>
                <p className="description">
                  Tailored tools built to scale seamlessly with your financial requirements.
                </p>
              </div>
            </div>
          </div>

          <div className="row gy-30">
            {extraSolutions.map((sol, idx) => (
              <div key={idx} className="col-xxl-4 col-xl-4 col-lg-4 col-md-6">
                <div className="p-4 p-md-5 bg-white rounded-4 border shadow-sm h-100">
                  <div
                    className="d-inline-flex align-items-center justify-content-center rounded-circle mb-4"
                    style={{
                      width: '64px',
                      height: '64px',
                      background: 'rgba(255, 126, 66, 0.12)',
                      color: '#FF7E42',
                      fontSize: '24px',
                    }}
                  >
                    <i className={sol.icon}></i>
                  </div>
                  <h3 className="h5 fw-bold mb-3">{sol.title}</h3>
                  <p className="text-secondary mb-0">{sol.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Loan Calculator Section */}
      <section className="section-space">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xxl-7 col-xl-7 col-lg-8">
              <div className="section-title-wrapper text-center section-title-space">
                <h2 className="section-title mb-15">Interactive Loan Calculator</h2>
                <p className="description">
                  Estimate your loan interest, installment schedule, and total payback terms transparently.
                </p>
              </div>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="p-4 p-md-5 bg-white rounded-4 border shadow-sm">
                <div className="row g-4 align-items-center">
                  <div className="col-md-6">
                    <div className="mb-4">
                      <label className="form-label fw-bold d-flex justify-content-between">
                        <span>Loan Amount ($)</span>
                        <span className="text-primary">${loanAmount.toLocaleString()}</span>
                      </label>
                      <input
                        type="range"
                        className="form-range"
                        min="500"
                        max="40000"
                        step="500"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(Number(e.target.value))}
                      />
                      <div className="d-flex justify-content-between text-muted small">
                        <span>Min: $500</span>
                        <span>Max: $40,000</span>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-bold">Loan Duration</label>
                      <select
                        className="form-select"
                        value={days}
                        onChange={(e) => setDays(Number(e.target.value))}
                      >
                        <option value="180">180 Days (Half Year)</option>
                        <option value="350">350 Days (School / Standard)</option>
                        <option value="700">700 Days (Long Term)</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="p-4 rounded-3 text-white" style={{ background: '#20293A' }}>
                      <h4 className="text-white h6 mb-3 border-bottom pb-2 border-secondary">
                        Calculation Summary
                      </h4>
                      <div className="d-flex justify-content-between mb-2">
                        <span className="text-light opacity-75">Principal:</span>
                        <span className="fw-bold">${loanAmount.toLocaleString()}</span>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <span className="text-light opacity-75">Fixed Rate:</span>
                        <span className="fw-bold text-success">3.00%</span>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <span className="text-light opacity-75">Interest Fee:</span>
                        <span className="fw-bold text-warning">${interest.toFixed(2)}</span>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <span className="text-light opacity-75">Installments:</span>
                        <span className="fw-bold">4 Slices</span>
                      </div>
                      <div className="d-flex justify-content-between border-top pt-2 mt-2">
                        <span className="fw-bold">Per Installment:</span>
                        <span className="fw-bold text-primary" style={{ fontSize: '18px' }}>
                          ${perInstallment.toFixed(2)}
                        </span>
                      </div>
                      <div className="d-flex justify-content-between mt-1">
                        <span className="fw-bold">Total Payback:</span>
                        <span className="fw-bold text-success" style={{ fontSize: '20px' }}>
                          ${totalRepay.toFixed(2)}
                        </span>
                      </div>

                      <Link to="/register" className="site-btn gdt-btn w-100 text-center mt-3">
                        Apply For This Loan
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProfessionalFeatures />
      <CtaSection />
    </>
  );
}
