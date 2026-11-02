import React from 'react';
import Breadcrumb from '../components/Breadcrumb';
import CtaSection from '../components/CtaSection';

export default function TermsPage() {
  return (
    <>
      <Breadcrumb
        title="Terms and Conditions"
        subtitle="Please review our terms of service governing usage of the WorkTrust International banking platform."
      />

      <section className="section-space">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="bg-white p-4 p-md-5 rounded-4 border shadow-sm">
                <div className="mb-4 text-muted small">
                  Last Updated: November 2026 | Effective Date: November 2026
                </div>

                <h3 className="h5 fw-bold mb-3 text-dark">1. Acceptance of Terms</h3>
                <p className="text-secondary mb-4 lh-lg">
                  By registering for an account, accessing, or using the WorkTrust International platform, you acknowledge
                  that you have read, understood, and agreed to be bound by these Terms and Conditions in their entirety.
                  If you disagree with any part of these terms, you must discontinue using our services immediately.
                </p>

                <h3 className="h5 fw-bold mb-3 text-dark">2. Account Eligibility &amp; Verification</h3>
                <p className="text-secondary mb-4 lh-lg">
                  To open an account, you must be at least 18 years old and legally capable of entering into binding contracts.
                  You agree to submit authentic, current, and complete identification documents as prompted during our
                  onboarding verification protocol. WorkTrust reserves the right to suspend any account suspected of fraud or misrepresentation.
                </p>

                <h3 className="h5 fw-bold mb-3 text-dark">3. Deposits, Plans &amp; Withdrawals</h3>
                <p className="text-secondary mb-4 lh-lg">
                  Deposits made using third-party payment gateways (e.g., Stripe, PayPal, crypto) are subject to network confirmations
                  and provider clearance times. Subscriptions to high-yield schemes (DPS, FDR) adhere to stipulated maturity cycles.
                  Withdrawal requests are processed promptly subject to routine fraud checks and compliance verification.
                </p>

                <h3 className="h5 fw-bold mb-3 text-dark">4. User Conduct &amp; Prohibited Activities</h3>
                <p className="text-secondary mb-4 lh-lg">
                  You agree not to use WorkTrust International for any unlawful activities, including money laundering, terrorist
                  financing, cyber-attacks, or unauthorized commercial exploitation. Any prohibited usage will trigger immediate account
                  freezing and reporting to the relevant statutory authorities.
                </p>

                <h3 className="h5 fw-bold mb-3 text-dark">5. Limitation of Liability</h3>
                <p className="text-secondary mb-4 lh-lg">
                  WorkTrust International strives for 99.9% platform availability. However, we shall not be held liable for indirect,
                  incidental, or consequential damages resulting from third-party network outages, blockchain network congestion, or acts of God.
                </p>

                <h3 className="h5 fw-bold mb-3 text-dark">6. Amendments &amp; Contact</h3>
                <p className="text-secondary mb-0 lh-lg">
                  We reserve the right to revise these Terms periodically. Continued utilization of our services following any amendment
                  constitutes your binding acceptance of the updated terms. For inquiries, contact
                  <a href="mailto:legal@worktrustinternational.ltd" className="text-primary ms-1">legal@worktrustinternational.ltd</a>.
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
