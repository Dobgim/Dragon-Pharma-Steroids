interface IconProps {
  className?: string;
  size?: number;
}

// ── Official Bitcoin Logo ──────────────────────────────────────
export function BitcoinLogo({ className = 'w-7 h-7' }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="16" fill="#F7931A" />
      <path
        d="M23.189 14.02c.314-2.096-1.283-3.223-3.465-3.975l.708-2.84-1.728-.43-.69 2.765c-.454-.114-.92-.22-1.385-.326l.695-2.783-1.728-.431-.708 2.839c-.376-.086-.746-.17-1.104-.26l.002-.009-2.384-.595-.46 1.846s1.283.294 1.256.312c.7.175.826.638.805 1.006l-.806 3.235c.048.012.11.03.18.057l-.183-.045-1.13 4.532c-.086.212-.303.531-.793.41.018.025-1.256-.313-1.256-.313l-.858 1.978 2.25.561c.418.105.828.215 1.231.318l-.715 2.872 1.727.43.708-2.84c.472.127.93.245 1.378.357l-.701 2.809 1.728.431.716-2.867c2.948.558 5.164.333 6.097-2.333.752-2.146-.037-3.385-1.588-4.192 1.13-.26 1.98-1.003 2.207-2.538zm-3.95 5.537c-.535 2.146-4.148.986-5.318.695l.949-3.803c1.17.292 4.928.872 4.369 3.108zm.535-5.569c-.487 1.953-3.495.96-4.47.717l.86-3.45c.975.243 4.118.697 3.61 2.733z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

// ── Official Apple Pay Logo ──────────────────────────────────
export function ApplePayLogo({ className = 'w-9 h-7' }: IconProps) {
  return (
    <svg viewBox="0 0 54 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="54" height="32" rx="7" fill="#000000" />
      {/* Apple glyph */}
      <path
        d="M16.8 14.9c-.02-1.76 1.44-2.61 1.51-2.65-.82-1.19-2.09-1.36-2.54-1.38-1.08-.11-2.11.64-2.66.64-.55 0-1.4-.62-2.3-.6-1.17.02-2.27.69-2.87 1.73-1.22 2.11-.31 5.25.87 6.96.59 1.03 1.3 1.89 2.24 1.86.98-.04 1.35-.63 2.52-.63 1.17 0 1.51.63 2.52.61 1.04-.02 1.69-.94 2.27-1.79.67-.98 1.03-1.94 1.04-1.99-.02-.01-1.99-.76-2.01-3.01l.1-.35zM15.1 9.8c.49-.59.81-1.41.72-2.23-.7.03-1.55.47-2.05 1.06-.44.51-.82 1.34-.71 2.14.78.06 1.55-.39 2.04-.97z"
        fill="#FFFFFF"
      />
      {/* Pay wordmark */}
      <path
        d="M24.2 10.8h2.5c1.6 0 2.6.9 2.6 2.2 0 1.5-1.1 2.3-2.6 2.3h-1.3v3.7h-1.2v-8.2zm2.4 3.5c.8 0 1.4-.5 1.4-1.3 0-.8-.6-1.3-1.4-1.3h-1.2v2.6h1.2zM30.1 16.6c0-1.6 1.2-2.4 3.2-2.5l1.7-.1v-.5c0-.8-.5-1.2-1.5-1.2-.8 0-1.4.3-1.6.8l-1.1-.6c.4-.8 1.4-1.3 2.7-1.3 1.8 0 2.7.9 2.7 2.3v5.5h-1.2v-1.3c-.6.9-1.5 1.4-2.4 1.4-1.6 0-2.6-.9-2.6-2.4zm4.9-.9v-.8l-1.5.1c-1.1.1-1.7.5-1.7 1.4 0 .8.6 1.3 1.5 1.3 1 0 1.7-.8 1.7-2zM38.6 21.6l1.3-3.7 1.9-6.6h1.4l-2.6 8-1.2 3.3h-1.5l.7-1z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

// ── Official Bank Transfer / Wire Logo ─────────────────────────
export function BankTransferLogo({ className = 'w-7 h-7' }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="7" fill="#1E3A8A" />
      <path d="M16 6.5L25 11v1.5H7V11L16 6.5z" fill="#93C5FD" />
      <rect x="9" y="14" width="2.5" height="7" rx="0.5" fill="#BFDBFE" />
      <rect x="14.75" y="14" width="2.5" height="7" rx="0.5" fill="#BFDBFE" />
      <rect x="20.5" y="14" width="2.5" height="7" rx="0.5" fill="#BFDBFE" />
      <rect x="6.5" y="22" width="19" height="2.5" rx="0.5" fill="#93C5FD" />
    </svg>
  );
}

// ── Official Credit Card (Visa / Mastercard) Logo ─────────────
export function CreditCardLogo({ className = 'w-8 h-6' }: IconProps) {
  return (
    <svg viewBox="0 0 38 28" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="38" height="28" rx="6" fill="#0F172A" />
      <rect y="5" width="38" height="5" fill="#334155" />
      <circle cx="25" cy="18" r="5" fill="#EB001B" />
      <circle cx="29" cy="18" r="5" fill="#F79E1B" fillOpacity="0.85" />
      <rect x="5" y="16" width="6" height="4.5" rx="1" fill="#E2E8F0" />
    </svg>
  );
}

// ── Official Zelle Logo ───────────────────────────────────────
export function ZelleLogo({ className = 'w-7 h-7' }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="7" fill="#7414CA" />
      <path d="M16 6.5v4M16 21.5V25" stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round" />
      <path d="M9.5 10.5h12.5L10 21.5h12.5" stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── Official Chime Logo ───────────────────────────────────────
export function ChimeLogo({ className = 'w-7 h-7' }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="7" fill="#25C974" />
      {/* Curved Chime C-mark */}
      <path
        d="M16 8C11.58 8 8 11.58 8 16c0 4.42 3.58 8 8 8 2.21 0 4.21-.9 5.66-2.34l-2.12-2.12C18.6 20.48 17.37 21 16 21c-2.76 0-5-2.24-5-5s2.24-5 5-5c1.37 0 2.6.52 3.54 1.46l2.12-2.12C20.21 8.9 18.21 8 16 8zm5.5 4.5v7h2.2v-7h-2.2z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

// ── Official PayPal Logo ──────────────────────────────────────
export function PayPalLogo({ className = 'w-7 h-7' }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="7" fill="#003087" />
      {/* Back P */}
      <path
        d="M12.5 8h5.2c2.8 0 4.8 1.4 4.3 4.1-.4 2.8-2.4 4.4-5.1 4.4h-2.1l-1 6.5h-2.6l2.3-15z"
        fill="#0079C1"
      />
      {/* Front P with transparent shadow overlap */}
      <path
        d="M14.8 10.5h4.9c2.6 0 4.5 1.3 4.1 3.8-.4 2.6-2.2 4.1-4.8 4.1h-2l-.9 6.1h-2.5l2.2-14z"
        fill="#00457C"
        opacity="0.5"
      />
      <path
        d="M13.8 11.8h4.8c2.4 0 4.2 1.2 3.8 3.5-.4 2.4-2.1 3.8-4.5 3.8h-1.9l-.9 5.7h-2.4l2.1-13z"
        fill="#0079C1"
      />
    </svg>
  );
}

// ── Official Cash App Logo ────────────────────────────────────
export function CashAppLogo({ className = 'w-7 h-7' }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="7" fill="#00D632" />
      {/* Dollar sign glyph */}
      <path
        d="M17.8 10.3c.7.2 1.3.5 1.8 1l-1.3 1.5c-.4-.4-.8-.6-1.3-.7-.6-.1-1.1.1-1.2.4-.1.3 0 .5.6.8l1.4.6c1.4.6 2 1.4 1.8 2.5-.3 1.4-1.5 2.1-2.9 2.2v1.4h-1.5v-1.4c-.9-.1-1.7-.5-2.3-1.1l1.3-1.5c.5.4 1 .7 1.6.8.6.1 1.1-.1 1.2-.4.1-.3 0-.5-.6-.8l-1.3-.6c-1.3-.6-2-1.4-1.8-2.5.3-1.4 1.5-2.1 2.8-2.2V9h1.5v1.3h.1z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

// ── Clean Vector USA Flag ─────────────────────────────────────
export function UsFlagIcon({ className = 'w-4 h-3' }: IconProps) {
  return (
    <svg viewBox="0 0 24 16" className={`${className} inline-block rounded-xs overflow-hidden shrink-0`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="16" fill="#B22234" />
      <path d="M0 2.46h24M0 4.92h24M0 7.38h24M0 9.84h24M0 12.3h24M0 14.76h24" stroke="#FFFFFF" strokeWidth="1.23" />
      <rect width="9.6" height="8.61" fill="#3C3B6E" />
    </svg>
  );
}

// ── Clean Vector Globe Icon ───────────────────────────────────
export function GlobeIcon({ className = 'w-3.5 h-3.5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={`${className} inline-block shrink-0`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}
