import React from 'react';

export default function OurSolutions() {
  const solutions = [
    {
      title: 'Fund Transfer',
      icon: '/assets/global/images/r399BNLtoX5lNDRghEGO.png',
      desc: 'Bank fund transfer refers to the process of moving money from one bank account to another. This can be done through various means, including online banking, mobile banking apps, wire transfers,',
    },
    {
      title: 'Loan',
      icon: '/assets/global/images/DI46TIemizLYTKwKuSo9.png',
      desc: 'Bank fund transfer refers to the process of moving money from one bank account to another. This can be done through various means, including online banking, mobile banking apps, wire transfers,',
    },
    {
      title: 'Pay Bill',
      icon: '/assets/global/images/Ffopm3Uv9nALAhOU4TSe.png',
      desc: 'Bank fund transfer refers to the process of moving money from one bank account to another. This can be done through various means, including online banking, mobile banking apps, wire transfers,',
    },
  ];

  return (
    <section className="our-solutions-section section-space-bottom" id="solutions">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xxl-6 col-xl-6 col-lg-8">
            <div className="section-title-wrapper text-center section-title-space">
              <h2 className="section-title mb-15">Our Powerful Solutions</h2>
              <p className="description">Banking Powered</p>
            </div>
          </div>
        </div>
        <div className="row gy-50">
          {solutions.map((item, idx) => (
            <div key={idx} className="col-xxl-4 col-xl-4 col-lg-4 col-md-6">
              <div className="our-solutions-item">
                <div className="our-solutions-icon">
                  <img src={item.icon} alt={item.title} width="80" height="80" />
                </div>
                <div className="our-solutions-content">
                  <h3 className="title">{item.title}</h3>
                  <p className="description">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
