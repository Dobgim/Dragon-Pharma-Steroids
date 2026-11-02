import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import WhyChooseUs from '../components/WhyChooseUs';
import FeedbackSection from '../components/FeedbackSection';
import SponsorSection from '../components/SponsorSection';
import CtaSection from '../components/CtaSection';

export default function AboutPage() {
  const stats = [
    { count: '100K+', label: 'Active Users' },
    { count: '99.9%', label: 'Uptime SLA' },
    { count: '150+', label: 'Supported Countries' },
    { count: '$2.5B+', label: 'Annual Volume' },
  ];

  return (
    <>
      <Breadcrumb
        title="About Us"
        subtitle="WorkTrust International is a leading digital banking solution built for speed, security, and effortless modern finance."
      />

      {/* About Main Section */}
      <section className="about-main-wrapper section-space">
        <div className="container">
          <div className="row gy-50 align-items-center">
            <div className="col-xxl-6 col-xl-6 col-lg-6">
              <div className="about-thumb-wrap">
                <div className="about-thumb">
                  <img
                    src="/assets/global/images/Lj92lXxATdIg1J37VMbR.png"
                    alt="WorkTrust Banking"
                    style={{ maxWidth: '100%' }}
                  />
                </div>
                <div className="about-card-one">
                  <span>
                    <img src="/assets/front/theme-2/images/icons/check-black.svg" alt="check" />
                  </span>
                  <div className="title">100% Secure &amp; Verified</div>
                </div>
                <div className="about-card-two">
                  <span className="short-title">Total Trust</span>
                  <h4 className="title">5 Star</h4>
                </div>
              </div>
            </div>

            <div className="col-xxl-6 col-xl-6 col-lg-6">
              <div className="about-content-wrap">
                <div className="section-title-wrapper mb-25">
                  <span className="banner-subtitle mb-15">
                    <i className="fa-solid fa-shield-halved me-2"></i>
                    Next-Generation Banking
                  </span>
                  <h2 className="section-title mb-20">Empowering Your Financial Growth Globally</h2>
                  <p className="description">
                    WorkTrust International was founded on the belief that banking should be transparent, boundaryless,
                    and tailored to personal and commercial growth. Whether you are managing domestic savings, cross-border
                    settlements, or enterprise capital, our intelligent platform simplifies every transaction.
                  </p>
                </div>

                <div className="banner-list mb-35">
                  <ul>
                    <li>
                      <div className="list-item">
                        <span className="list-icon">
                          <img src="/assets/front/theme-2/images/icons/check-white.svg" alt="check" />
                        </span>
                        <span className="list-title">Bank-grade 256-bit AES encryption &amp; MFA security</span>
                      </div>
                      <div className="list-item">
                        <span className="list-icon">
                          <img src="/assets/front/theme-2/images/icons/check-white.svg" alt="check" />
                        </span>
                        <span className="list-title">Global currency exchange with zero hidden commissions</span>
                      </div>
                      <div className="list-item">
                        <span className="list-icon">
                          <img src="/assets/front/theme-2/images/icons/check-white.svg" alt="check" />
                        </span>
                        <span className="list-title">Automated high-yield DPS &amp; Fixed Deposit (FDR) plans</span>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="btn-wrap">
                  <Link to="/register" className="site-btn gdt-btn me-3">
                    Open An Account
                  </Link>
                  <Link to="/contact" className="site-btn primary-btn">
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Counters / Stats Section */}
      <section className="bg-sugar-milk section-space">
        <div className="container">
          <div className="row g-4 text-center">
            {stats.map((s, idx) => (
              <div key={idx} className="col-6 col-lg-3">
                <div className="p-4 bg-white rounded-4 shadow-sm border border-light">
                  <h3 className="fw-bold mb-2 gd-text" style={{ fontSize: '42px' }}>
                    {s.count}
                  </h3>
                  <p className="text-secondary mb-0 fw-medium">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WhyChooseUs />
      <FeedbackSection />
      <SponsorSection />
      <CtaSection />
    </>
  );
}
