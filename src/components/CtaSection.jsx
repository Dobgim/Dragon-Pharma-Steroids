import React from 'react';

export default function CtaSection() {
  return (
    <section className="cta-section section-space-top bg-forsythia-bud" id="cta">
      <div className="container">
        <div className="cta-main-wrapper">
          <div className="row gy-30 align-items-center">
            <div className="col-xxl-8 col-xl-7 col-lg-7">
              <div className="cta-content">
                <h2 className="cta-title">
                  Liberate your time for concentrating on other significant endeavors.
                </h2>
                <p className="description">
                  Join us today and experience the power of AI-powered text creation for yourself!
                </p>
                <a className="site-btn gdt-btn" href="#register">
                  Join Us
                </a>
              </div>
            </div>
            <div className="col-xxl-4 col-xl-4">
              <div className="cta-thumb-wrapper">
                <div className="cta-thumb">
                  <img src="/assets/front/theme-2/images/cta/cta-thumb.png" alt="cta-thumb" />
                </div>
                <div className="cta-shape">
                  <img src="/assets/front/theme-2/images/cta/cta-bg.png" alt="cta-bg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
