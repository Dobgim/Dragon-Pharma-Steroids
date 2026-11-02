import React from 'react';

export default function WorkProcess() {
  const steps = [
    {
      title: 'Signup',
      image: '/assets/global/images/2rBHfTIE9QZxOch925i7.png',
    },
    {
      title: 'Start Banking',
      image: '/assets/global/images/Fzo0HWNdpYNhRncxttPS.png',
    },
    {
      title: 'Collect Paybacks',
      image: '/assets/global/images/9qiNUIxPjxiwcwrLSbgk.png',
    },
    {
      title: 'Enjoy Banking',
      image: '/assets/global/images/oqIRKRFZkGnhySsfswW1.png',
    },
  ];

  return (
    <section
      className="work-process-section include-bg section-space"
      id="how-it-works"
      style={{
        backgroundImage: `url('/assets/front/theme-2/images/bg/work-process-bg.png')`,
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xxl-6 col-xl-7 col-lg-6">
            <div className="section-title-wrapper text-center section-title-space">
              <h2 className="section-title text-white mb-15">Our Work Process</h2>
              <p className="description text-white">
                Depositing money securely involves ensuring that the process of transferring funds into a bank account is
                protected from unauthorized access or potential risks
              </p>
            </div>
          </div>
          <div className="work-process-main">
            <div className="process-intro-logo">
              <span>
                <img
                  src="/assets/front/theme-2/images/logo/intro-logo.svg"
                  alt="intro-logo"
                />
              </span>
            </div>
            <div className="row gy-30">
              {steps.map((step, idx) => (
                <div key={idx} className="col-xxl-3 col-xl-3 col-lg-4 col-md-6">
                  <div className="work-process-item">
                    <div className="icon">
                      <span>
                        <img src={step.image} alt={step.title} />
                      </span>
                    </div>
                    <div className="content">
                      <h3 className="title">{step.title}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
