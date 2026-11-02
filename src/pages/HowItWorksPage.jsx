import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import WorkProcess from '../components/WorkProcess';
import VideoSection from '../components/VideoSection';
import FaqSection from '../components/FaqSection';
import CtaSection from '../components/CtaSection';

export default function HowItWorksPage() {
  const detailedSteps = [
    {
      num: '01',
      title: 'Quick Registration & Identity Verification',
      desc: 'Submit basic account details in less than 2 minutes. Our automated e-KYC compliance verifies your credentials securely in real-time.',
      badge: 'Step 1',
    },
    {
      num: '02',
      title: 'Fund Your Multi-Currency Wallet',
      desc: 'Seamlessly deposit through over 25 supported payment gateways including cards, bank wire, crypto, PayPal, and local bank transfers.',
      badge: 'Step 2',
    },
    {
      num: '03',
      title: 'Select Your Desired Financial Service',
      desc: 'Whether subscribing to high-yield DPS/FDR plans, applying for low-interest school/business loans, or scheduling automated transfers.',
      badge: 'Step 3',
    },
    {
      num: '04',
      title: 'Earn, Transact & Withdraw Instantly',
      desc: 'Receive interest paybacks on schedule, track detailed statements, and withdraw funds to your external bank or wallet anytime with zero delays.',
      badge: 'Step 4',
    },
  ];

  return (
    <>
      <Breadcrumb
        title="How It Works"
        subtitle="A simple, fast, and secure path to modern online banking in four simple steps."
      />

      <WorkProcess />

      {/* Step details section */}
      <section className="section-space bg-sugar-milk">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xxl-7 col-xl-7 col-lg-8">
              <div className="section-title-wrapper text-center section-title-space">
                <h2 className="section-title mb-15">Step-by-Step Experience</h2>
                <p className="description">
                  Designed from the ground up for maximum ease of use without compromising security.
                </p>
              </div>
            </div>
          </div>

          <div className="row g-4">
            {detailedSteps.map((step, idx) => (
              <div key={idx} className="col-lg-6">
                <div className="p-4 p-md-5 bg-white rounded-4 border shadow-sm h-100 position-relative">
                  <span
                    className="badge bg-warning text-dark mb-3 px-3 py-2 fw-semibold rounded-pill"
                    style={{ fontSize: '13px' }}
                  >
                    {step.badge}
                  </span>
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <span
                      className="fw-bold gd-text"
                      style={{ fontSize: '36px', lineHeight: 1 }}
                    >
                      {step.num}
                    </span>
                    <h3 className="h5 mb-0 fw-bold">{step.title}</h3>
                  </div>
                  <p className="text-secondary mb-0">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-5">
            <Link to="/register" className="site-btn gdt-btn me-3">
              Get Started Now
            </Link>
            <Link to="/solutions" className="site-btn primary-btn">
              Explore Solutions
            </Link>
          </div>
        </div>
      </section>

      <VideoSection />
      <FaqSection />
      <CtaSection />
    </>
  );
}
