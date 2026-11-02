import React from 'react';
import { PlusCircle, Archive, AlertCircle, Package, Users } from 'lucide-react';

export default function ProfessionalFeatures() {
  const features = [
    {
      title: 'Deposit',
      icon: <PlusCircle size={32} strokeWidth={1.5} />,
      desc: 'Depositing money securely involves ensuring that the process of transferring funds into a bank account is protected from unauthorized access or potential risks. This can include various measures such as',
    },
    {
      title: 'DPS',
      icon: <Archive size={32} strokeWidth={1.5} />,
      desc: 'Depositing money securely involves ensuring that the process of transferring funds into a bank account is protected from unauthorized access or potential risks. This can i nclude various measures such as Depositing money securely involves ensuring that the process of transferring funds into a',
    },
    {
      title: 'FDR',
      icon: <Archive size={32} strokeWidth={1.5} />,
      desc: 'Depositing money securely involves ensuring that the process of transferring funds into a bank account is protected from unauthorized access or potential risks. This can include various measures such as',
    },
    {
      title: 'Transaction',
      icon: <AlertCircle size={32} strokeWidth={1.5} />,
      desc: 'Depositing money securely involves ensuring that the process of transferring funds into a bank account is protected',
    },
    {
      title: 'Withdraw',
      icon: <Package size={32} strokeWidth={1.5} />,
      desc: 'Depositing money securely involves ensuring that the process of transferring funds into a bank account is protected from unauthorized access or potential risks. This can include various measures such as',
    },
    {
      title: 'Referral',
      icon: <Users size={32} strokeWidth={1.5} />,
      desc: 'Depositing money securely involves ensuring that the process of transferring funds into a bank account is protected This can include various measures such as',
    },
  ];

  return (
    <section className="professional-features-section section-space" id="features">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xxl-7 col-xl-7 col-lg-7">
            <div className="section-title-wrapper text-center section-title-space">
              <h2 className="section-title mb-15">Our Professional Features</h2>
              <p className="description">Banking Solution</p>
            </div>
          </div>
        </div>
        <div className="row gy-30">
          {features.map((feat, index) => (
            <div key={index} className="col-xxl-4 col-xl-4 col-lg-4 col-md-6">
              <div className="professional-features-item">
                <div className="icon">
                  <span>{feat.icon}</span>
                </div>
                <div className="content">
                  <h3 className="title">
                    <a href="#features">{feat.title}</a>
                  </h3>
                  <p className="description">{feat.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
