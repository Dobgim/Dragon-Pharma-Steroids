import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Header({ onOpenMobileMenu }) {
  const phoneNumber = '+1(661)5414978';
  const whatsappUrl =
    'https://wa.me/16615414978?text=Hello%20WorkTrust%20International,%20I%20would%20like%20to%20place%20an%20order%20/%20make%20an%20inquiry.';

  const [isSticky, setIsSticky] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('English');
  const langRef = useRef(null);

  useEffect(() => {
    // Check initial theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-theme');
      setIsDarkMode(true);
    }

    // Scroll listener for sticky header
    const handleScroll = () => {
      if (window.scrollY > 250) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Click outside to close language dropdown
    const handleClickOutside = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      document.body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
  };

  const languages = ['English', 'Spanish', 'French', 'German'];

  return (
    <header>
      <div
        className={`header-area header-style-two header-transparent ${isSticky ? 'active-sticky' : ''}`}
        id="header-sticky"
      >
        <div className="header-inner">
          <div className="header-left">
            <div className="header-logo">
              <Link to="/">
                <img
                  className="logo-white"
                  src="/assets/global/images/C0rUJeX0NuUY62jC1nNw.png"
                  style={{ height: 'auto', width: '150px', maxWidth: 'none' }}
                  alt="WorkTrust International"
                />
                <img
                  className="logo-black"
                  src="/assets/global/images/C0rUJeX0NuUY62jC1nNw.png"
                  style={{ height: 'auto', width: '150px', maxWidth: 'none' }}
                  alt="WorkTrust International"
                />
              </Link>
            </div>
            <div className="header-menu d-none d-lg-inline-flex">
              <nav className="td-main-menu" id="mobile-menu">
                <ul>
                  <li>
                    <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/about-us" className={({ isActive }) => (isActive ? 'active' : '')}>
                      About
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/how-it-works" className={({ isActive }) => (isActive ? 'active' : '')}>
                      How It Works
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/solutions" className={({ isActive }) => (isActive ? 'active' : '')}>
                      Solutions
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/portfolio" className={({ isActive }) => (isActive ? 'active' : '')}>
                      Portfolios
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/rewards" className={({ isActive }) => (isActive ? 'active' : '')}>
                      Rewards
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/blog" className={({ isActive }) => (isActive ? 'active' : '')}>
                      Blog
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : '')}>
                      Contact
                    </NavLink>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          <div className="header-right">
            {/* Direct Phone / WhatsApp Quick Contact */}
            <div className="d-none d-xl-flex align-items-center gap-2 me-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm px-3 py-1 rounded-pill fw-semibold d-flex align-items-center gap-2 text-decoration-none"
                style={{
                  backgroundColor: '#25D366',
                  color: '#ffffff',
                  fontSize: '13px',
                  boxShadow: '0 2px 8px rgba(37, 211, 102, 0.3)',
                }}
                title="Order on WhatsApp"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.043 2C6.52 2 2.023 6.496 2.023 12.019C2.023 13.784 2.483 15.508 3.356 17.025L2 22L7.099 20.662C8.57 21.465 10.276 21.888 12.043 21.888C17.566 21.888 22.062 17.392 22.062 11.869C22.062 6.346 17.566 2 12.043 2ZM17.472 14.382C17.155 14.223 15.602 13.458 15.313 13.353C15.025 13.248 14.815 13.195 14.606 13.512C14.397 13.829 13.799 14.534 13.616 14.745C13.433 14.957 13.249 14.983 12.933 14.825C12.617 14.666 11.599 14.331 10.392 13.255C9.452 12.417 8.816 11.381 8.633 11.064C8.449 10.747 8.613 10.575 8.772 10.418C8.915 10.276 9.091 10.047 9.249 9.862C9.407 9.677 9.46 9.545 9.565 9.333C9.671 9.122 9.618 8.937 9.539 8.778C9.46 8.619 8.831 7.07 8.569 6.435C8.314 5.817 8.055 5.901 7.863 5.891C7.682 5.882 7.472 5.88 7.262 5.88C7.052 5.88 6.711 5.959 6.423 6.276C6.134 6.593 5.321 7.36 5.321 8.921C5.321 10.482 6.449 11.989 6.607 12.2C6.764 12.412 8.823 15.586 11.969 16.945C12.717 17.268 13.301 17.461 13.754 17.605C14.505 17.844 15.189 17.81 15.731 17.729C16.335 17.639 17.589 16.969 17.851 16.229C18.113 15.488 18.113 14.854 18.034 14.722C17.955 14.59 17.789 14.537 17.472 14.382Z" />
                </svg>
                <span>Orders: {phoneNumber}</span>
              </a>
            </div>

            {/* Dark / Light Mode Switcher */}
            <div className="header-switcher">
              <div className="switcher-box">
                <label className="color-switcher" title="Toggle Theme">
                  <input
                    type="checkbox"
                    id="themeSwitcher"
                    checked={isDarkMode}
                    onChange={toggleTheme}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>

            {/* Language Switcher */}
            <div className="header-quick-action" ref={langRef}>
              <div className="language-box">
                <div className="header-lang-item header-lang">
                  <span
                    className="header-lang-toggle"
                    id="header-lang-toggle"
                    onClick={() => setLangOpen(!langOpen)}
                  >
                    <i className="fa-regular fa-globe"></i>
                    <span className="lang-text">{currentLang}</span>
                  </span>

                  {langOpen && (
                    <ul className="lang-dropdown-menu">
                      {languages.map((lang) => (
                        <li key={lang}>
                          <button
                            type="button"
                            className={currentLang === lang ? 'active' : ''}
                            onClick={() => {
                              setCurrentLang(lang);
                              setLangOpen(false);
                            }}
                          >
                            {lang}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>

            {/* Auth Action Buttons */}
            <div className="header-action">
              <div className="header-btn-wrap d-none d-xxl-inline-flex">
                <Link className="site-btn white-btn" to="/register">
                  <span>
                    <svg width="19" height="21" viewBox="0 0 19 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M13.2154 13.2178C13.8062 12.9004 14.4825 12.7197 15.2027 12.7197H15.2051C15.2784 12.7197 15.3126 12.6318 15.2589 12.583C14.5099 11.9108 13.6543 11.368 12.7271 10.9766C12.7173 10.9717 12.7076 10.9692 12.6978 10.9644C14.2139 9.86328 15.2003 8.07373 15.2003 6.05469C15.2003 2.70996 12.4952 0 9.15777 0C5.82037 0 3.11774 2.70996 3.11774 6.05469C3.11774 8.07373 4.10406 9.86328 5.62262 10.9644C5.61285 10.9692 5.60309 10.9717 5.59332 10.9766C4.50201 11.438 3.52301 12.0996 2.68073 12.9443C1.84329 13.7802 1.1766 14.7712 0.717834 15.8618C0.26645 16.9298 0.022843 18.0741 6.10498e-05 19.2334C-0.000590574 19.2595 0.00397981 19.2854 0.013503 19.3096C0.0230262 19.3339 0.0373095 19.356 0.0555113 19.3747C0.073713 19.3933 0.0954649 19.4082 0.119485 19.4183C0.143506 19.4284 0.169309 19.4336 0.195374 19.4336H1.65778C1.76276 19.4336 1.85065 19.3481 1.85309 19.2432C1.90192 17.3584 2.65631 15.5933 3.99176 14.2554C5.37115 12.8711 7.20709 12.1094 9.16022 12.1094C10.5445 12.1094 11.8726 12.4927 13.0176 13.2104C13.0471 13.2289 13.0808 13.2393 13.1155 13.2406C13.1503 13.2419 13.1847 13.234 13.2154 13.2178ZM9.16022 10.2539C8.04205 10.2539 6.98981 9.81689 6.19635 9.02344C5.80596 8.63406 5.49647 8.17128 5.28571 7.66176C5.07494 7.15225 4.96708 6.60607 4.96832 6.05469C4.96832 4.93408 5.40533 3.87939 6.19635 3.08594C6.98737 2.29248 8.03961 1.85547 9.16022 1.85547C10.2808 1.85547 11.3306 2.29248 12.1241 3.08594C12.5145 3.47532 12.824 3.9381 13.0347 4.44761C13.2455 4.95712 13.3534 5.5033 13.3521 6.05469C13.3521 7.17529 12.9151 8.22998 12.1241 9.02344C11.3306 9.81689 10.2784 10.2539 9.16022 10.2539ZM18.1397 16.0645H16.0889V14.0137C16.0889 13.9062 16.001 13.8184 15.8936 13.8184H14.5264C14.419 13.8184 14.3311 13.9062 14.3311 14.0137V16.0645H12.2803C12.1729 16.0645 12.085 16.1523 12.085 16.2598V17.627C12.085 17.7344 12.1729 17.8223 12.2803 17.8223H14.3311V19.873C14.3311 19.9805 14.419 20.0684 14.5264 20.0684H15.8936C16.001 20.0684 16.0889 19.9805 16.0889 19.873V17.8223H18.1397C18.2471 17.8223 18.335 17.7344 18.335 17.627V16.2598C18.335 16.1523 18.2471 16.0645 18.1397 16.0645Z"
                        fill="#130804"
                      />
                    </svg>
                  </span>
                  Sign Up
                </Link>
                <Link className="site-btn gdt-btn" to="/login">
                  <span>
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M10.76 1C16.417 1 21 5.477 21 11C21 16.523 16.416 21 10.76 21C7.569 21 4.618 19.563 2.69 17.154C2.63595 17.0867 2.59598 17.0093 2.57246 16.9262C2.54894 16.8432 2.54234 16.7563 2.55307 16.6706C2.5638 16.585 2.59163 16.5024 2.6349 16.4277C2.67818 16.3531 2.73603 16.2879 2.805 16.236C2.94565 16.129 3.12243 16.0809 3.2979 16.102C3.47336 16.1231 3.63372 16.2117 3.745 16.349C4.58843 17.3972 5.65709 18.2421 6.87168 18.8208C8.08627 19.3995 9.41559 19.6973 10.761 19.692C15.676 19.692 19.661 15.8 19.661 11C19.661 6.2 15.676 2.308 10.761 2.308C9.4348 2.30283 8.12398 2.59213 6.92315 3.15502C5.72232 3.71791 4.66142 4.54035 3.817 5.563C3.70396 5.69904 3.54236 5.78569 3.36648 5.80454C3.19061 5.8234 3.01431 5.77299 2.875 5.664C2.80663 5.61123 2.74956 5.54524 2.70721 5.46997C2.66486 5.39469 2.63808 5.31167 2.62847 5.22583C2.61886 5.14 2.62662 5.05311 2.65127 4.97033C2.67593 4.88756 2.71699 4.81059 2.772 4.744C4.703 2.394 7.614 1 10.76 1ZM11.306 7.862L14.013 10.569C14.275 10.831 14.28 11.249 14.024 11.505L11.38 14.15C11.3179 14.2111 11.2444 14.2593 11.1636 14.2919C11.0828 14.3244 10.9963 14.3407 10.9092 14.3396C10.8221 14.3386 10.7361 14.3204 10.656 14.2859C10.576 14.2515 10.5036 14.2016 10.443 14.139C10.3805 14.0783 10.3307 14.0059 10.2963 13.9258C10.262 13.8457 10.2438 13.7597 10.2429 13.6726C10.2419 13.5855 10.2583 13.4991 10.2909 13.4183C10.3235 13.3375 10.3718 13.264 10.433 13.202L11.98 11.654L1.67 11.655C1.58291 11.6563 1.49642 11.6404 1.41551 11.6081C1.33461 11.5759 1.26089 11.5279 1.1986 11.467C1.13632 11.4061 1.08671 11.3335 1.05262 11.2534C1.01853 11.1732 1.00065 11.0871 1 11C1 10.639 1.3 10.346 1.67 10.346H11.938L10.38 8.787C10.3175 8.72631 10.2677 8.65385 10.2333 8.5738C10.199 8.49375 10.1808 8.40769 10.1799 8.32058C10.1789 8.23348 10.1953 8.14705 10.2279 8.06628C10.2605 7.98552 10.3088 7.91201 10.37 7.85C10.432 7.78919 10.5055 7.74122 10.5861 7.70885C10.6667 7.67648 10.7529 7.66034 10.8398 7.66136C10.9267 7.66238 11.0125 7.68054 11.0923 7.7148C11.1721 7.74906 11.2444 7.79874 11.305 7.861"
                        fill="white"
                      />
                    </svg>
                  </span>
                  Log In
                </Link>
              </div>
              <div className="header-hamburger d-xxl-none">
                <button
                  className="sidebar-toggle btn p-0 border-0 bg-transparent"
                  onClick={onOpenMobileMenu}
                  type="button"
                  aria-label="Open mobile menu"
                >
                  <span className="menu-icon">
                    <span></span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
