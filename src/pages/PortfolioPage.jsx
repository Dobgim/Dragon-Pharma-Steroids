import React from 'react';
import Breadcrumb from '../components/Breadcrumb';
import OurPlans from '../components/OurPlans';
import FaqSection from '../components/FaqSection';
import CtaSection from '../components/CtaSection';

export default function PortfolioPage() {
  const comparisonPlans = [
    {
      type: 'DPS Plan (Deposit Pension Scheme)',
      tenure: '1 - 5 Years',
      roi: '8.50% - 12.00% p.a.',
      minDeposit: '$50.00 / month',
      risk: 'Zero Risk (Insured)',
    },
    {
      type: 'Fixed Deposit Receipt (FDR)',
      tenure: '3 - 24 Months',
      roi: '7.20% - 10.50% p.a.',
      minDeposit: '$500.00 Lump Sum',
      risk: 'Zero Risk (Insured)',
    },
    {
      type: 'School & Educational Loan',
      tenure: '350 Days',
      roi: '3.00% Flat Interest',
      minDeposit: 'Min $500 - Max $40k',
      risk: 'Flexible Installments',
    },
    {
      type: 'SME Commercial Growth Loan',
      tenure: '12 - 36 Months',
      roi: '5.50% p.a.',
      minDeposit: 'Up to $150,000',
      risk: 'Fast-Track Approval',
    },
  ];

  return (
    <>
      <Breadcrumb
        title="Portfolios &amp; Plans"
        subtitle="Explore high-yielding DPS savings schemes, fixed deposit investments, and tailored loan financing packages."
      />

      <OurPlans />

      {/* Portfolio comparison table */}
      <section className="section-space bg-sugar-milk">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xxl-7 col-xl-7 col-lg-8">
              <div className="section-title-wrapper text-center section-title-space">
                <h2 className="section-title mb-15">Plan Portfolio Overview</h2>
                <p className="description">
                  Transparent terms, flexible installment options, and competitive returns tailored for you.
                </p>
              </div>
            </div>
          </div>

          <div className="table-responsive bg-white rounded-4 border shadow-sm p-4">
            <table className="table align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th scope="col" className="py-3">Plan Type</th>
                  <th scope="col" className="py-3">Tenure / Period</th>
                  <th scope="col" className="py-3">Return / Interest</th>
                  <th scope="col" className="py-3">Deposit / Limit</th>
                  <th scope="col" className="py-3">Security &amp; Guarantee</th>
                </tr>
              </thead>
              <tbody>
                {comparisonPlans.map((p, idx) => (
                  <tr key={idx}>
                    <td className="fw-bold text-dark py-3">{p.type}</td>
                    <td className="text-secondary py-3">{p.tenure}</td>
                    <td className="fw-semibold text-success py-3">{p.roi}</td>
                    <td className="text-secondary py-3">{p.minDeposit}</td>
                    <td className="py-3">
                      <span className="badge bg-success-subtle text-success border border-success-subtle px-3 py-2 rounded-pill">
                        {p.risk}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <FaqSection />
      <CtaSection />
    </>
  );
}
