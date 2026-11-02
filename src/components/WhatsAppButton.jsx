import React, { useState } from 'react';

export default function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false);
  const phoneNumber = '+1(661)5414978';
  const whatsappUrl =
    'https://wa.me/16615414978?text=Hello%20WorkTrust%20International,%20I%20would%20like%20to%20place%20an%20order%20/%20make%20an%20inquiry.';

  return (
    <div
      className="whatsapp-float-wrap"
      style={{
        position: 'fixed',
        bottom: '28px',
        left: '28px',
        zIndex: 99998,
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Order on WhatsApp"
        className="whatsapp-btn shadow-lg"
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: '#25D366',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 18px rgba(37, 211, 102, 0.45)',
          transition: 'transform 0.25s ease, box-shadow 0.25s ease',
          transform: isHovered ? 'scale(1.08)' : 'scale(1)',
          cursor: 'pointer',
          textDecoration: 'none',
        }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382C17.155 14.223 15.602 13.458 15.313 13.353C15.025 13.248 14.815 13.195 14.606 13.512C14.397 13.829 13.799 14.534 13.616 14.745C13.433 14.957 13.249 14.983 12.933 14.825C12.617 14.666 11.599 14.331 10.392 13.255C9.452 12.417 8.816 11.381 8.633 11.064C8.449 10.747 8.613 10.575 8.772 10.418C8.915 10.276 9.091 10.047 9.249 9.862C9.407 9.677 9.46 9.545 9.565 9.333C9.671 9.122 9.618 8.937 9.539 8.778C9.46 8.619 8.831 7.07 8.569 6.435C8.314 5.817 8.055 5.901 7.863 5.891C7.682 5.882 7.472 5.88 7.262 5.88C7.052 5.88 6.711 5.959 6.423 6.276C6.134 6.593 5.321 7.36 5.321 8.921C5.321 10.482 6.449 11.989 6.607 12.2C6.764 12.412 8.823 15.586 11.969 16.945C12.717 17.268 13.301 17.461 13.754 17.605C14.505 17.844 15.189 17.81 15.731 17.729C16.335 17.639 17.589 16.969 17.851 16.229C18.113 15.488 18.113 14.854 18.034 14.722C17.955 14.59 17.789 14.537 17.472 14.382ZM12.043 21.666H12.038C10.368 21.666 8.735 21.217 7.302 20.366L6.962 20.164L3.486 21.076L4.417 17.687L4.195 17.333C3.259 15.844 2.766 14.108 2.768 12.324C2.772 7.214 6.932 3.053 12.046 3.053C14.521 3.054 16.845 4.019 18.595 5.772C20.345 7.525 21.307 9.851 21.305 12.327C21.3 17.439 17.14 21.666 12.043 21.666ZM19.658 4.708C17.624 2.671 14.921 1.549 12.043 1.547C6.103 1.547 1.267 6.384 1.264 12.326C1.262 14.225 1.76 16.079 2.706 17.718L0.75 24.862L8.064 22.944C9.643 23.804 11.424 24.261 13.237 24.262H13.242C19.181 24.262 24.018 19.424 24.021 13.481C24.023 10.601 22.899 7.896 20.864 5.86L19.658 4.708Z" />
        </svg>
      </a>

      {/* Pop-out label badge */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          backgroundColor: '#20293A',
          color: '#ffffff',
          padding: '8px 16px',
          borderRadius: '24px',
          fontSize: '13px',
          fontWeight: 600,
          boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          transition: 'all 0.2s ease',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
        className="whatsapp-label d-none d-sm-flex"
      >
        <span
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: '#25D366',
            display: 'inline-block',
            boxShadow: '0 0 8px #25D366',
          }}
        ></span>
        <span>Order on WhatsApp:</span>
        <span style={{ color: '#25D366' }}>{phoneNumber}</span>
      </a>
    </div>
  );
}
