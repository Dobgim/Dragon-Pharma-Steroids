import React, { useState, useEffect } from 'react';

export default function CookieAlert() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      const timer = setTimeout(() => {
        setShow(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="caches-privacy cookiealert">
      <div className="content">
        <h4 className="title">Cookie Settings</h4>
        <p>
          Please allow us to collect data about how you use our website. We will use it to improve our website, make
          your browsing experience and our business decisions better. Learn more
        </p>
      </div>
      <div className="caches-btn">
        <a className="learn-more" href="#privacy">
          Learn More
        </a>
        <button className="site-btn primary-btn acceptcookies" onClick={handleAccept} type="button">
          Accept All
        </button>
      </div>
    </div>
  );
}
