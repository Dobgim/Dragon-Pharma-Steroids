import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import CtaSection from '../components/CtaSection';

export default function RewardsPage() {
  const tiers = [
    {
      level: 'Bronze Tier',
      icon: 'fa-solid fa-medal',
      points: '1,000 Pts',
      bonus: '0.25% Cashback',
      feeDiscount: '5% Off Outward Fees',
      desc: 'Standard tier granted upon account verification. Begin collecting loyalty points on each deposit, fund transfer, and bill payment.',
    },
    {
      level: 'Silver Tier',
      icon: 'fa-solid fa-award',
      points: '5,000 Pts',
      bonus: '0.50% Cashback',
      feeDiscount: '15% Off Outward Fees',
      desc: 'Unlocked after maintaining active balances and achieving initial referral milestones. Enjoy upgraded transfer velocity and discounted exchange.',
    },
    {
      level: 'Gold Tier',
      icon: 'fa-solid fa-crown',
      points: '20,000 Pts',
      bonus: '1.00% Cashback',
      feeDiscount: '35% Off Outward Fees',
      desc: 'Premium tier featuring expedited live support, VIP loan evaluation, and seasonal bonus yields on all active fixed deposits.',
    },
    {
      level: 'Platinum Tier',
      icon: 'fa-solid fa-gem',
      points: '50,000+ Pts',
      bonus: '2.00% Cashback',
      feeDiscount: '100% Free Transfers',
      desc: 'Our ultimate membership level. Includes dedicated personal account management, custom credit facilities, and unlimited zero-fee withdrawals.',
    },
  ];

  const referralLevels = [
    { level: 'Level 1 (Direct Referrals)', comm: '5.0%', desc: 'Earn 5% on every deposit or plan subscribed by friends who join using your personal invite link.' },
    { level: 'Level 2 (Secondary Network)', comm: '2.5%', desc: 'Earn 2.5% whenever your direct referrals invite new members who transact on the platform.' },
    { level: 'Level 3 (Extended Community)', comm: '1.0%', desc: 'Earn 1.0% passive commission from tertiary network activity credited instantly to your primary wallet.' },
  ];

  return (
    <>
      <Breadcrumb
        title="Rewards &amp; Referral Program"
        subtitle="Earn passive revenue, loyalty cashback, and exclusive perks through our multi-tier referral and VIP banking system."
      />

      {/* Rewards Grid matching theme SCSS */}
      <section className="section-space">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xxl-7 col-xl-7 col-lg-8">
              <div className="section-title-wrapper text-center section-title-space">
                <h2 className="section-title mb-15">VIP Loyalty Tiers</h2>
                <p className="description">
                  The more you bank with WorkTrust International, the higher your status and yields.
                </p>
              </div>
            </div>
          </div>

          <div className="row g-4">
            {tiers.map((tier, idx) => (
              <div key={idx} className="col-xl-3 col-lg-6 col-md-6">
                <div className="rewards-item h-100 shadow-sm">
                  <div className="icon">
                    <span
                      className="d-inline-flex align-items-center justify-content-center rounded-circle bg-white shadow"
                      style={{ width: '80px', height: '80px', fontSize: '30px', color: '#FF7E42' }}
                    >
                      <i className={tier.icon}></i>
                    </span>
                  </div>
                  <div className="contents pt-4">
                    <h3 className="title">{tier.level}</h3>
                    <div className="rewards-point mb-3">
                      <span className="badge bg-warning text-dark px-3 py-2 fs-6 rounded-pill">
                        {tier.points}
                      </span>
                    </div>
                    <ul className="list-unstyled mb-4 text-start small">
                      <li className="mb-2">
                        <i className="fa-solid fa-check text-success me-2"></i>
                        <strong>Cashback:</strong> {tier.bonus}
                      </li>
                      <li className="mb-2">
                        <i className="fa-solid fa-check text-success me-2"></i>
                        <strong>Fee Benefit:</strong> {tier.feeDiscount}
                      </li>
                    </ul>
                    <p className="description">{tier.desc}</p>
                    <Link to="/register" className="site-btn gdt-btn w-100 mt-2">
                      Unlock Tier
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Referral Program Breakdown */}
      <section className="section-space bg-sugar-milk">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xxl-7 col-xl-7 col-lg-8">
              <div className="section-title-wrapper text-center section-title-space">
                <h2 className="section-title mb-15">Multi-Level Referral System</h2>
                <p className="description">
                  Share your referral link with colleagues, friends, or clients and build steady recurring income.
                </p>
              </div>
            </div>
          </div>

          <div className="row g-4">
            {referralLevels.map((ref, idx) => (
              <div key={idx} className="col-lg-4">
                <div className="p-4 p-md-5 bg-white rounded-4 border shadow-sm h-100 text-center">
                  <div className="display-4 fw-bold gd-text mb-2">{ref.comm}</div>
                  <h4 className="h6 fw-bold mb-3">{ref.level}</h4>
                  <p className="text-secondary small mb-0">{ref.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-5">
            <Link to="/register" className="site-btn primary-btn px-5 py-3">
              Join &amp; Get Your Referral Code
            </Link>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
