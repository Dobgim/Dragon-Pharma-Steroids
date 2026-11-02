import React from 'react';
import Breadcrumb from '../components/Breadcrumb';
import CtaSection from '../components/CtaSection';

export default function PrivacyPolicyPage() {
  return (
    <>
      <Breadcrumb
        title="Privacy Policy"
        subtitle="WorkTrust International values and safeguards your personal and financial information."
      />

      <section className="section-space">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="bg-white p-4 p-md-5 rounded-4 border shadow-sm">
                <div className="mb-4 text-muted small">
                  Last Updated: November 2026 | Effective Immediately
                </div>

                <h3 className="h5 fw-bold mb-3 text-dark">1. Introduction</h3>
                <p className="text-secondary mb-4 lh-lg">
                  WorkTrust International ("we", "our", or "us") is dedicated to protecting your personal data and
                  respecting your privacy. This Privacy Policy details how we collect, store, handle, and protect your
                  personal data when you visit our website, utilize our mobile interfaces, or open an account with us.
                </p>

                <h3 className="h5 fw-bold mb-3 text-dark">2. Information We Collect</h3>
                <p className="text-secondary mb-2 lh-lg">
                  To provide seamless online banking and comply with regulatory financial frameworks (e.g. AML/KYC), we collect:
                </p>
                <ul className="text-secondary mb-4 lh-lg">
                  <li><strong>Identity Information:</strong> Full legal name, date of birth, nationality, government-issued identification numbers.</li>
                  <li><strong>Contact Information:</strong> Residential address, registered email address, mobile contact number.</li>
                  <li><strong>Financial Data:</strong> Wallet balances, transaction histories, payment source details, destination addresses.</li>
                  <li><strong>Technical Data:</strong> IP address, device fingerprints, browser telemetry, access logs.</li>
                </ul>

                <h3 className="h5 fw-bold mb-3 text-dark">3. How We Use Your Information</h3>
                <p className="text-secondary mb-4 lh-lg">
                  We process your information strictly for legitimate commercial and regulatory purposes, including account
                  administration, processing deposits/withdrawals, detecting fraudulent activities, maintaining platform uptime,
                  and complying with statutory tax and regulatory reporting requirements.
                </p>

                <h3 className="h5 fw-bold mb-3 text-dark">4. Data Security Standards</h3>
                <p className="text-secondary mb-4 lh-lg">
                  We implement robust technical and organizational security protocols, including end-to-end 256-bit SSL/TLS
                  data encryption in transit, encrypted storage at rest, strict employee access controls, and regular penetration testing.
                </p>

                <h3 className="h5 fw-bold mb-3 text-dark">5. Cookie Policy</h3>
                <p className="text-secondary mb-4 lh-lg">
                  Our service uses cookies and local storage tokens to remember your login session, store theme preferences (light/dark mode),
                  and gather aggregated analytical data. You can control or disable cookies via your browser settings at any time.
                </p>

                <h3 className="h5 fw-bold mb-3 text-dark">6. Your Rights</h3>
                <p className="text-secondary mb-4 lh-lg">
                  Depending on your jurisdiction (such as GDPR or CCPA), you may hold statutory rights to access, rectify, or request
                  the erasure of your personal records. For data requests, please write to our compliance officer at
                  <a href="mailto:privacy@worktrustinternational.ltd" className="text-primary ms-1">privacy@worktrustinternational.ltd</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
