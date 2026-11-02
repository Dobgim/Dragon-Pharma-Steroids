import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function OffcanvasMenu({ isOpen, onClose }) {
  const phoneNumber = '+1(661)5414978';
  const whatsappUrl =
    'https://wa.me/16615414978?text=Hello%20WorkTrust%20International,%20I%20would%20like%20to%20place%20an%20order%20/%20make%20an%20inquiry.';

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about-us' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'Solutions', href: '/solutions' },
    { label: 'Portfolios', href: '/portfolio' },
    { label: 'Rewards', href: '/rewards' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <div className="fix">
        <div className={`offcanvas-area ${isOpen ? 'info-open' : ''}`}>
          <div className="offcanva-wrapper">
            <div className="offcanvas-content">
              <div className="offcanvas-top d-flex justify-content-between align-items-center">
                <div className="offcanvas-logo">
                  <Link to="/" onClick={onClose}>
                    <img
                      src="/assets/global/images/C0rUJeX0NuUY62jC1nNw.png"
                      alt="WorkTrust International"
                      style={{ height: 'auto', width: '140px' }}
                    />
                  </Link>
                </div>
                <div className="offcanvas-close">
                  <button
                    className="offcanvas-close-icon animation--flip"
                    onClick={onClose}
                    type="button"
                    aria-label="Close menu"
                  >
                    <span className="offcanvas-m-lines">
                      <span className="offcanvas-m-line line--1"></span>
                      <span className="offcanvas-m-line line--2"></span>
                      <span className="offcanvas-m-line line--3"></span>
                    </span>
                  </button>
                </div>
              </div>

              {/* Mobile WhatsApp Quick Action */}
              <div className="mt-3 mb-2 p-3 rounded-3" style={{ background: 'rgba(37, 211, 102, 0.1)' }}>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="d-flex align-items-center gap-2 text-decoration-none fw-bold"
                  style={{ color: '#128C7E', fontSize: '14px' }}
                >
                  <span
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: '#25D366',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.043 2C6.52 2 2.023 6.496 2.023 12.019C2.023 13.784 2.483 15.508 3.356 17.025L2 22L7.099 20.662C8.57 21.465 10.276 21.888 12.043 21.888C17.566 21.888 22.062 17.392 22.062 11.869C22.062 6.346 17.566 2 12.043 2ZM17.472 14.382C17.155 14.223 15.602 13.458 15.313 13.353C15.025 13.248 14.815 13.195 14.606 13.512C14.397 13.829 13.799 14.534 13.616 14.745C13.433 14.957 13.249 14.983 12.933 14.825C12.617 14.666 11.599 14.331 10.392 13.255C9.452 12.417 8.816 11.381 8.633 11.064C8.449 10.747 8.613 10.575 8.772 10.418C8.915 10.276 9.091 10.047 9.249 9.862C9.407 9.677 9.46 9.545 9.565 9.333C9.671 9.122 9.618 8.937 9.539 8.778C9.46 8.619 8.831 7.07 8.569 6.435C8.314 5.817 8.055 5.901 7.863 5.891C7.682 5.882 7.472 5.88 7.262 5.88C7.052 5.88 6.711 5.959 6.423 6.276C6.134 6.593 5.321 7.36 5.321 8.921C5.321 10.482 6.449 11.989 6.607 12.2C6.764 12.412 8.823 15.586 11.969 16.945C12.717 17.268 13.301 17.461 13.754 17.605C14.505 17.844 15.189 17.81 15.731 17.729C16.335 17.639 17.589 16.969 17.851 16.229C18.113 15.488 18.113 14.854 18.034 14.722C17.955 14.59 17.789 14.537 17.472 14.382Z" />
                    </svg>
                  </span>
                  <span>WhatsApp: {phoneNumber}</span>
                </a>
              </div>

              <div className="mobile-menu fix">
                <ul className="mobile-nav-list">
                  {navItems.map((item, idx) => (
                    <li key={idx}>
                      <NavLink
                        to={item.href}
                        onClick={onClose}
                        className={({ isActive }) => (isActive ? 'active' : '')}
                      >
                        {item.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="offcanvas-content">
                <div className="offcanvas-btn mb-3">
                  <div className="offcanvas-header-btn-wrap d-flex flex-wrap gap-2">
                    <Link className="shape-shifter-btn" to="/login" onClick={onClose}>
                      <div className="btn-hover-slide">
                        <span>Log In</span>
                      </div>
                    </Link>
                    <Link className="shape-shifter-btn primary-btn" to="/register" onClick={onClose}>
                      <div className="btn-hover-slide">
                        <span>Sign Up</span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`offcanvas-overlay ${isOpen ? 'overlay-open' : ''}`}
        onClick={onClose}
      ></div>
    </>
  );
}
