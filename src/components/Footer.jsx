import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Footer({ onSubscribe }) {
  const [email, setEmail] = useState('');
  const phoneNumber = '+1(661)5414978';
  const whatsappUrl =
    'https://wa.me/16615414978?text=Hello%20WorkTrust%20International,%20I%20would%20like%20to%20place%20an%20order%20/%20make%20an%20inquiry.';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }
    if (onSubscribe) {
      onSubscribe(email);
    }
    setEmail('');
  };

  return (
    <footer>
      <div className="footer-section bg-forsythia-bud footer-style-two p-relative z-11">
        <div className="container">
          <div className="footer-main">
            {/* Widget 1: Contact Us */}
            <div className="footer-widget">
              <div className="footer-wg-title">
                <h5>Contact Us</h5>
              </div>
              <div className="footer-contact-info">
                <ul>
                  <li>
                    <a href="mailto:info@worktrustinternational.ltd">
                      <span>
                        <i className="fa-solid fa-envelope"></i>
                      </span>
                      info@worktrustinternational.ltd
                    </a>
                  </li>
                  <li>
                    <a href="tel:+16615414978">
                      <span>
                        <i className="fa-solid fa-phone"></i>
                      </span>
                      {phoneNumber} (Call Support)
                    </a>
                  </li>
                  <li>
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                      <span style={{ backgroundColor: '#25D366', color: '#ffffff' }}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12.043 2C6.52 2 2.023 6.496 2.023 12.019C2.023 13.784 2.483 15.508 3.356 17.025L2 22L7.099 20.662C8.57 21.465 10.276 21.888 12.043 21.888C17.566 21.888 22.062 17.392 22.062 11.869C22.062 6.346 17.566 2 12.043 2ZM17.472 14.382C17.155 14.223 15.602 13.458 15.313 13.353C15.025 13.248 14.815 13.195 14.606 13.512C14.397 13.829 13.799 14.534 13.616 14.745C13.433 14.957 13.249 14.983 12.933 14.825C12.617 14.666 11.599 14.331 10.392 13.255C9.452 12.417 8.816 11.381 8.633 11.064C8.449 10.747 8.613 10.575 8.772 10.418C8.915 10.276 9.091 10.047 9.249 9.862C9.407 9.677 9.46 9.545 9.565 9.333C9.671 9.122 9.618 8.937 9.539 8.778C9.46 8.619 8.831 7.07 8.569 6.435C8.314 5.817 8.055 5.901 7.863 5.891C7.682 5.882 7.472 5.88 7.262 5.88C7.052 5.88 6.711 5.959 6.423 6.276C6.134 6.593 5.321 7.36 5.321 8.921C5.321 10.482 6.449 11.989 6.607 12.2C6.764 12.412 8.823 15.586 11.969 16.945C12.717 17.268 13.301 17.461 13.754 17.605C14.505 17.844 15.189 17.81 15.731 17.729C16.335 17.639 17.589 16.969 17.851 16.229C18.113 15.488 18.113 14.854 18.034 14.722C17.955 14.59 17.789 14.537 17.472 14.382Z" />
                        </svg>
                      </span>
                      WhatsApp Orders: {phoneNumber}
                    </a>
                  </li>
                </ul>
              </div>
              <div className="footer-social">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp Orders"
                  style={{ backgroundColor: '#25D366', color: '#ffffff' }}
                  title="WhatsApp"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.043 2C6.52 2 2.023 6.496 2.023 12.019C2.023 13.784 2.483 15.508 3.356 17.025L2 22L7.099 20.662C8.57 21.465 10.276 21.888 12.043 21.888C17.566 21.888 22.062 17.392 22.062 11.869C22.062 6.346 17.566 2 12.043 2ZM17.472 14.382C17.155 14.223 15.602 13.458 15.313 13.353C15.025 13.248 14.815 13.195 14.606 13.512C14.397 13.829 13.799 14.534 13.616 14.745C13.433 14.957 13.249 14.983 12.933 14.825C12.617 14.666 11.599 14.331 10.392 13.255C9.452 12.417 8.816 11.381 8.633 11.064C8.449 10.747 8.613 10.575 8.772 10.418C8.915 10.276 9.091 10.047 9.249 9.862C9.407 9.677 9.46 9.545 9.565 9.333C9.671 9.122 9.618 8.937 9.539 8.778C9.46 8.619 8.831 7.07 8.569 6.435C8.314 5.817 8.055 5.901 7.863 5.891C7.682 5.882 7.472 5.88 7.262 5.88C7.052 5.88 6.711 5.959 6.423 6.276C6.134 6.593 5.321 7.36 5.321 8.921C5.321 10.482 6.449 11.989 6.607 12.2C6.764 12.412 8.823 15.586 11.969 16.945C12.717 17.268 13.301 17.461 13.754 17.605C14.505 17.844 15.189 17.81 15.731 17.729C16.335 17.639 17.589 16.969 17.851 16.229C18.113 15.488 18.113 14.854 18.034 14.722C17.955 14.59 17.789 14.537 17.472 14.382Z" />
                  </svg>
                </a>
                <a href="https://www.facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
                  <i className="fa-brands fa-facebook-f"></i>
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                  <i className="fa-brands fa-instagram"></i>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">
                  <i className="fa-brands fa-youtube"></i>
                </a>
                <a href="https://telegram.com" target="_blank" rel="noreferrer" aria-label="Telegram">
                  <i className="fa-brands fa-telegram"></i>
                </a>
              </div>
            </div>

            {/* Widget 2: Base Navigation */}
            <div className="footer-widget">
              <div className="footer-wg-title">
                <h5>Base Navigation</h5>
              </div>
              <div className="footer-links">
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/login">Account Login</Link>
                  </li>
                  <li>
                    <Link to="/blog">Blog</Link>
                  </li>
                  <li>
                    <Link to="/contact">Contact</Link>
                  </li>
                  <li>
                    <Link to="/privacy-policy">Privacy</Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Widget 3: Important Links */}
            <div className="footer-widget">
              <div className="footer-wg-title">
                <h5>Important Links</h5>
              </div>
              <div className="footer-links">
                <ul>
                  <li>
                    <Link to="/faq">FAQ</Link>
                  </li>
                  <li>
                    <Link to="/terms-and-conditions">Terms and Conditions</Link>
                  </li>
                  <li>
                    <Link to="/about-us">About</Link>
                  </li>
                  <li>
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                      WhatsApp Orders
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Widget 4: Subscribe */}
            <div className="footer-widget">
              <div className="footer-wg-title">
                <h5>Subscribe Now</h5>
              </div>
              <div className="footer-newsletter">
                <p className="description">Outsource your HR functions to industry-specialized HR.</p>
                <div className="footer-form">
                  <form onSubmit={handleSubmit}>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <button type="submit" className="input-btn" aria-label="Subscribe">
                      <i className="fa-light fa-arrow-right-long"></i>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <div className="footer-copyright">
            <div className="row align-items-center">
              <div className="col-xxl-4 col-xl-5 col-lg-5">
                <div className="content">
                  <p className="description">Copyright © WorkTrust International 2026. All rights reserved.</p>
                </div>
              </div>
              <div className="col-xxl-4 col-xl-2 col-lg-2 text-lg-center">
                <div className="footer-logo">
                  <Link to="/">
                    <img
                      src="/assets/global/images/C0rUJeX0NuUY62jC1nNw.png"
                      alt="WorkTrust International"
                      style={{ height: 'auto', width: '150px' }}
                    />
                  </Link>
                </div>
              </div>
              <div className="col-xxl-4 col-xl-5 col-lg-5">
                <div className="footer-bottom-links">
                  <ul>
                    <li>
                      <Link to="/privacy-policy">Privacy Policy</Link>
                    </li>
                    <li>
                      <Link to="/terms-and-conditions">Terms &amp; Conditions</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
