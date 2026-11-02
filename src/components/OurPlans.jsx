import React, { useState } from 'react';

export default function OurPlans() {
  const [activeTab, setActiveTab] = useState('loan'); // 'dps', 'fdr', 'loan'

  const tabIcon = (
    <span className="icon">
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="22" cy="22" r="20.75" fill="white" stroke="#FF7E42" strokeWidth="2.5" />
        <path
          d="M29.6221 18.3445L28.2444 16.9668C28.1992 16.9214 28.1456 16.8855 28.0865 16.8609C28.0274 16.8364 27.964 16.8237 27.9 16.8237C27.836 16.8237 27.7727 16.8364 27.7136 16.8609C27.6545 16.8855 27.6008 16.9214 27.5557 16.9668L20.5114 24.403L16.4736 20.3637C16.381 20.2711 16.2555 20.2192 16.1246 20.2192C15.9938 20.2192 15.8682 20.2711 15.7757 20.3637L14.3799 21.7605C14.2873 21.8531 14.2354 21.9786 14.2354 22.1094C14.2354 22.2403 14.2873 22.3658 14.3799 22.4584L20.1225 28.334C20.1756 28.386 20.24 28.4249 20.3107 28.4476C20.3814 28.4704 20.4564 28.4763 20.5298 28.465C20.6053 28.4782 20.6829 28.4732 20.7562 28.4504C20.8294 28.4276 20.8962 28.3877 20.951 28.334L29.6221 19.0335C29.7135 18.9421 29.7649 18.8182 29.7649 18.689C29.7649 18.5597 29.7135 18.4358 29.6221 18.3444V18.3445Z"
          fill="#FF7E42"
        />
      </svg>
    </span>
  );

  return (
    <section
      className="pricing-section section-space include-bg"
      id="portfolio"
      style={{
        backgroundImage: `url('/assets/front/theme-2/images/bg/price-bg.png')`,
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xxl-6 col-xl-6 col-lg-6">
            <div className="section-title-wrapper text-center section-title-space">
              <h2 className="section-title white-text mb-15">Our Plans</h2>
              <p className="description white-text">All Plans</p>
            </div>
          </div>
        </div>

        <div className="price-main-wrapper">
          <div className="price-tab-content">
            <h3 className="title">Get Started Now</h3>
            <div className="price-tab-list td-tab">
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${activeTab === 'dps' ? 'active' : ''}`}
                    onClick={() => setActiveTab('dps')}
                    type="button"
                    role="tab"
                  >
                    {tabIcon}
                    DPS
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${activeTab === 'fdr' ? 'active' : ''}`}
                    onClick={() => setActiveTab('fdr')}
                    type="button"
                    role="tab"
                  >
                    {tabIcon}
                    FDR
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${activeTab === 'loan' ? 'active' : ''}`}
                    onClick={() => setActiveTab('loan')}
                    type="button"
                    role="tab"
                  >
                    {tabIcon}
                    Loan
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="tab-content" id="myTabContent">
            {activeTab === 'dps' && (
              <div className="tab-pane fade show active">
                <div className="row">
                  <div className="text-center py-5 fs-5">No Data Found!</div>
                </div>
              </div>
            )}

            {activeTab === 'fdr' && (
              <div className="tab-pane fade show active">
                <div className="row">
                  <div className="text-center py-5 fs-5">No Data Found!</div>
                </div>
              </div>
            )}

            {activeTab === 'loan' && (
              <div className="tab-pane fade show active">
                <div className="row">
                  <div className="col-xxl-4 col-xl-4 col-lg-6">
                    <div className="price-item">
                      <div className="price-heading">
                        <h3 className="title">School loan</h3>
                      </div>
                      <div className="price-value">
                        <h4 className="title">3</h4>
                        <sup className="dollar">%</sup>
                        <sub>/350 Days</sub>
                      </div>
                      <div className="price-list">
                        <ul>
                          <li>
                            <div className="list-item">
                              <span className="icon">
                                <img
                                  src="/assets/front/theme-2/images/icons/check-black.svg"
                                  alt="check"
                                />
                              </span>
                              <span className="title">Minimum Loan : $500.00</span>
                            </div>
                          </li>
                          <li>
                            <div className="list-item">
                              <span className="icon">
                                <img
                                  src="/assets/front/theme-2/images/icons/check-black.svg"
                                  alt="check"
                                />
                              </span>
                              <span className="title">Miximum Loan : $40000.00</span>
                            </div>
                          </li>
                          <li>
                            <div className="list-item">
                              <span className="icon">
                                <img
                                  src="/assets/front/theme-2/images/icons/check-black.svg"
                                  alt="check"
                                />
                              </span>
                              <span className="title">Installment Rate : 3%</span>
                            </div>
                          </li>
                          <li>
                            <div className="list-item">
                              <span className="icon">
                                <img
                                  src="/assets/front/theme-2/images/icons/check-black.svg"
                                  alt="check"
                                />
                              </span>
                              <span className="title">Installment Slice : 350 Days</span>
                            </div>
                          </li>
                          <li>
                            <div className="list-item">
                              <span className="icon">
                                <img
                                  src="/assets/front/theme-2/images/icons/check-black.svg"
                                  alt="check"
                                />
                              </span>
                              <span className="title">Total Installment : 4</span>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div className="price-link">
                        <a href="#register" className="site-btn gdt-btn w-100 text-center mb-2">
                          Subscribe
                        </a>
                        <a
                          href="https://wa.me/16615414978?text=Hello%20WorkTrust%20International,%20I%20would%20like%20to%20order%20the%20School%20Loan%20plan."
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-success w-100 d-flex align-items-center justify-content-center gap-2 py-2 rounded-3 text-white fw-semibold"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12.043 2C6.52 2 2.023 6.496 2.023 12.019C2.023 13.784 2.483 15.508 3.356 17.025L2 22L7.099 20.662C8.57 21.465 10.276 21.888 12.043 21.888C17.566 21.888 22.062 17.392 22.062 11.869C22.062 6.346 17.566 2 12.043 2ZM17.472 14.382C17.155 14.223 15.602 13.458 15.313 13.353C15.025 13.248 14.815 13.195 14.606 13.512C14.397 13.829 13.799 14.534 13.616 14.745C13.433 14.957 13.249 14.983 12.933 14.825C12.617 14.666 11.599 14.331 10.392 13.255C9.452 12.417 8.816 11.381 8.633 11.064C8.449 10.747 8.613 10.575 8.772 10.418C8.915 10.276 9.091 10.047 9.249 9.862C9.407 9.677 9.46 9.545 9.565 9.333C9.671 9.122 9.618 8.937 9.539 8.778C9.46 8.619 8.831 7.07 8.569 6.435C8.314 5.817 8.055 5.901 7.863 5.891C7.682 5.882 7.472 5.88 7.262 5.88C7.052 5.88 6.711 5.959 6.423 6.276C6.134 6.593 5.321 7.36 5.321 8.921C5.321 10.482 6.449 11.989 6.607 12.2C6.764 12.412 8.823 15.586 11.969 16.945C12.717 17.268 13.301 17.461 13.754 17.605C14.505 17.844 15.189 17.81 15.731 17.729C16.335 17.639 17.589 16.969 17.851 16.229C18.113 15.488 18.113 14.854 18.034 14.722C17.955 14.59 17.789 14.537 17.472 14.382Z" />
                          </svg>
                          <span>Order on WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
