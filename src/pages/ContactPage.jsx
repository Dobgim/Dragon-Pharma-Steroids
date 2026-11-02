import React, { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import CtaSection from '../components/CtaSection';

export default function ContactPage() {
  const phoneNumber = '+1(661)5414978';
  const whatsappUrl =
    'https://wa.me/16615414978?text=Hello%20WorkTrust%20International,%20I%20would%20like%20to%20place%20an%20order%20/%20make%20an%20inquiry.';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('Thank you! Your inquiry has been sent to our customer relations team. You can also message our WhatsApp desk at ' + phoneNumber + ' for immediate processing.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    setTimeout(() => setStatus(''), 7000);
  };

  const contactCards = [
    {
      title: 'WhatsApp Orders & Inquiries',
      linkText: phoneNumber,
      href: whatsappUrl,
      desc: 'Instant direct chat for receiving orders, deposit verification & fast inquiry.',
      isWhatsApp: true,
      actionText: 'Chat on WhatsApp',
    },
    {
      title: 'Direct Phone Line',
      linkText: phoneNumber,
      href: 'tel:+16615414978',
      desc: 'Our direct phone assistance desk is available for immediate telephone calls.',
      icon: 'fa-solid fa-phone-volume',
      actionText: 'Call Now',
    },
    {
      title: 'Official Email Support',
      linkText: 'info@worktrustinternational.ltd',
      href: 'mailto:info@worktrustinternational.ltd',
      desc: 'Our institutional and customer relations desk is available 24 hours a day.',
      icon: 'fa-solid fa-envelope',
      actionText: 'Send Email',
    },
  ];

  return (
    <>
      <Breadcrumb
        title="Contact Us"
        subtitle="Reach out to our global team directly via Phone, WhatsApp orders desk, or our secure inquiry form."
      />

      <section className="section-space">
        <div className="container">
          {/* Quick WhatsApp & Phone Banner */}
          <div
            className="p-4 p-md-5 rounded-4 mb-5 text-white shadow-sm"
            style={{
              background: 'linear-gradient(135deg, #20293A 0%, #25D366 180%)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <div className="row align-items-center">
              <div className="col-lg-8">
                <span className="badge bg-success mb-2 px-3 py-2 fs-6">
                  <i className="fa-solid fa-bolt me-1"></i> Fast Order Processing
                </span>
                <h3 className="text-white fw-bold mb-2">Order Directly on WhatsApp: {phoneNumber}</h3>
                <p className="text-light opacity-90 mb-0">
                  You can now send orders, submit deposit proofs, and receive instantaneous responses directly via our dedicated WhatsApp desk.
                </p>
              </div>
              <div className="col-lg-4 text-lg-end mt-4 mt-lg-0">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-light fw-bold px-4 py-3 rounded-pill shadow d-inline-flex align-items-center gap-2"
                  style={{ color: '#130804' }}
                >
                  <span style={{ color: '#25D366', fontSize: '20px' }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.043 2C6.52 2 2.023 6.496 2.023 12.019C2.023 13.784 2.483 15.508 3.356 17.025L2 22L7.099 20.662C8.57 21.465 10.276 21.888 12.043 21.888C17.566 21.888 22.062 17.392 22.062 11.869C22.062 6.346 17.566 2 12.043 2ZM17.472 14.382C17.155 14.223 15.602 13.458 15.313 13.353C15.025 13.248 14.815 13.195 14.606 13.512C14.397 13.829 13.799 14.534 13.616 14.745C13.433 14.957 13.249 14.983 12.933 14.825C12.617 14.666 11.599 14.331 10.392 13.255C9.452 12.417 8.816 11.381 8.633 11.064C8.449 10.747 8.613 10.575 8.772 10.418C8.915 10.276 9.091 10.047 9.249 9.862C9.407 9.677 9.46 9.545 9.565 9.333C9.671 9.122 9.618 8.937 9.539 8.778C9.46 8.619 8.831 7.07 8.569 6.435C8.314 5.817 8.055 5.901 7.863 5.891C7.682 5.882 7.472 5.88 7.262 5.88C7.052 5.88 6.711 5.959 6.423 6.276C6.134 6.593 5.321 7.36 5.321 8.921C5.321 10.482 6.449 11.989 6.607 12.2C6.764 12.412 8.823 15.586 11.969 16.945C12.717 17.268 13.301 17.461 13.754 17.605C14.505 17.844 15.189 17.81 15.731 17.729C16.335 17.639 17.589 16.969 17.851 16.229C18.113 15.488 18.113 14.854 18.034 14.722C17.955 14.59 17.789 14.537 17.472 14.382Z" />
                    </svg>
                  </span>
                  Open WhatsApp Chat
                </a>
              </div>
            </div>
          </div>

          {/* Contact Cards */}
          <div className="row g-4 mb-5">
            {contactCards.map((card, idx) => (
              <div key={idx} className="col-lg-4">
                <div className="contact-info-item shadow-sm h-100 d-flex flex-column">
                  <div className="icon">
                    <span
                      className="d-inline-flex align-items-center justify-content-center"
                      style={{
                        width: '80px',
                        height: '80px',
                        fontSize: '28px',
                        backgroundColor: card.isWhatsApp ? '#25D366' : '#FF7E42',
                        color: '#ffffff',
                      }}
                    >
                      {card.isWhatsApp ? (
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12.043 2C6.52 2 2.023 6.496 2.023 12.019C2.023 13.784 2.483 15.508 3.356 17.025L2 22L7.099 20.662C8.57 21.465 10.276 21.888 12.043 21.888C17.566 21.888 22.062 17.392 22.062 11.869C22.062 6.346 17.566 2 12.043 2ZM17.472 14.382C17.155 14.223 15.602 13.458 15.313 13.353C15.025 13.248 14.815 13.195 14.606 13.512C14.397 13.829 13.799 14.534 13.616 14.745C13.433 14.957 13.249 14.983 12.933 14.825C12.617 14.666 11.599 14.331 10.392 13.255C9.452 12.417 8.816 11.381 8.633 11.064C8.449 10.747 8.613 10.575 8.772 10.418C8.915 10.276 9.091 10.047 9.249 9.862C9.407 9.677 9.46 9.545 9.565 9.333C9.671 9.122 9.618 8.937 9.539 8.778C9.46 8.619 8.831 7.07 8.569 6.435C8.314 5.817 8.055 5.901 7.863 5.891C7.682 5.882 7.472 5.88 7.262 5.88C7.052 5.88 6.711 5.959 6.423 6.276C6.134 6.593 5.321 7.36 5.321 8.921C5.321 10.482 6.449 11.989 6.607 12.2C6.764 12.412 8.823 15.586 11.969 16.945C12.717 17.268 13.301 17.461 13.754 17.605C14.505 17.844 15.189 17.81 15.731 17.729C16.335 17.639 17.589 16.969 17.851 16.229C18.113 15.488 18.113 14.854 18.034 14.722C17.955 14.59 17.789 14.537 17.472 14.382Z" />
                        </svg>
                      ) : (
                        <i className={card.icon}></i>
                      )}
                    </span>
                  </div>
                  <div className="contents pt-3 flex-grow-1 d-flex flex-column">
                    <h3 className="title">{card.title}</h3>
                    <p className="description text-secondary small flex-grow-1">{card.desc}</p>
                    <div className="link fs-5 text-break mb-3">
                      <a
                        href={card.href}
                        target={card.isWhatsApp ? '_blank' : '_self'}
                        rel="noopener noreferrer"
                        className="text-decoration-none text-dark fw-bold"
                      >
                        {card.linkText}
                      </a>
                    </div>
                    <div>
                      <a
                        href={card.href}
                        target={card.isWhatsApp ? '_blank' : '_self'}
                        rel="noopener noreferrer"
                        className={`btn btn-sm rounded-pill px-4 py-2 ${
                          card.isWhatsApp ? 'btn-success' : 'btn-outline-dark'
                        }`}
                      >
                        {card.actionText}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="row justify-content-center mt-5">
            <div className="col-lg-10">
              <div className="contact-form-wrapper p-4 p-md-5 rounded-4 shadow-sm border bg-white">
                <div className="section-title-wrapper text-center mb-4">
                  <h2 className="section-title mb-2 h3">Send Us a Direct Message</h2>
                  <p className="description">
                    Fill in the form below or chat with us on WhatsApp at <strong>{phoneNumber}</strong>.
                  </p>
                </div>

                {status && (
                  <div className="alert alert-success d-flex align-items-center mb-4" role="alert">
                    <i className="fa-solid fa-circle-check fs-4 me-3"></i>
                    <div>{status}</div>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <label className="form-label fw-semibold">Your Name *</label>
                        <input
                          type="text"
                          name="name"
                          className="form-control py-3"
                          placeholder="e.g. Alexander Vance"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <label className="form-label fw-semibold">Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          className="form-control py-3"
                          placeholder="e.g. alex@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <label className="form-label fw-semibold">Phone Number / WhatsApp</label>
                        <input
                          type="tel"
                          name="phone"
                          className="form-control py-3"
                          placeholder="+1 (555) 000-0000"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <label className="form-label fw-semibold">Subject / Order Inquiry *</label>
                        <input
                          type="text"
                          name="subject"
                          className="form-control py-3"
                          placeholder="e.g. New Order Inquiry"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group mb-4">
                        <label className="form-label fw-semibold">Your Message *</label>
                        <textarea
                          name="message"
                          className="form-control py-3"
                          rows="5"
                          placeholder="Please describe your order or inquiry in detail..."
                          value={formData.message}
                          onChange={handleChange}
                          required
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-12 text-center d-flex flex-wrap justify-content-center gap-3">
                      <button type="submit" className="site-btn gdt-btn px-5 py-3 fs-6">
                        Send Message Now
                      </button>
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-success px-4 py-3 rounded-pill fw-semibold d-inline-flex align-items-center gap-2"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12.043 2C6.52 2 2.023 6.496 2.023 12.019C2.023 13.784 2.483 15.508 3.356 17.025L2 22L7.099 20.662C8.57 21.465 10.276 21.888 12.043 21.888C17.566 21.888 22.062 17.392 22.062 11.869C22.062 6.346 17.566 2 12.043 2ZM17.472 14.382C17.155 14.223 15.602 13.458 15.313 13.353C15.025 13.248 14.815 13.195 14.606 13.512C14.397 13.829 13.799 14.534 13.616 14.745C13.433 14.957 13.249 14.983 12.933 14.825C12.617 14.666 11.599 14.331 10.392 13.255C9.452 12.417 8.816 11.381 8.633 11.064C8.449 10.747 8.613 10.575 8.772 10.418C8.915 10.276 9.091 10.047 9.249 9.862C9.407 9.677 9.46 9.545 9.565 9.333C9.671 9.122 9.618 8.937 9.539 8.778C9.46 8.619 8.831 7.07 8.569 6.435C8.314 5.817 8.055 5.901 7.863 5.891C7.682 5.882 7.472 5.88 7.262 5.88C7.052 5.88 6.711 5.959 6.423 6.276C6.134 6.593 5.321 7.36 5.321 8.921C5.321 10.482 6.449 11.989 6.607 12.2C6.764 12.412 8.823 15.586 11.969 16.945C12.717 17.268 13.301 17.461 13.754 17.605C14.505 17.844 15.189 17.81 15.731 17.729C16.335 17.639 17.589 16.969 17.851 16.229C18.113 15.488 18.113 14.854 18.034 14.722C17.955 14.59 17.789 14.537 17.472 14.382Z" />
                        </svg>
                        Order via WhatsApp
                      </a>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
