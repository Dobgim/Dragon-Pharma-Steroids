/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#b54444',
          50: '#fdf1ef',
          100: '#f8ebea',
          200: '#f0d1ce',
          300: '#e5a9a4',
          400: '#d47570',
          500: '#b54444',
          600: '#a33b3b',
          700: '#883030',
          800: '#6e2828',
          900: '#5a2020',
        },
        brand: {
          dark: '#201c2b',
          text: '#201c2b',
          muted: '#5c5568',
          soft: '#faf7f7',
          border: '#efe7e5',
          green: '#66B622',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        'brand': '14px',
        'brand-sm': '10px',
      },
      boxShadow: {
        'brand-sm': '0 4px 12px rgba(25, 18, 35, 0.04)',
        'brand-md': '0 10px 24px rgba(25, 18, 35, 0.06)',
        'brand-lg': '0 20px 40px rgba(25, 18, 35, 0.10)',
        'primary': '0 8px 20px rgba(181, 68, 68, 0.18)',
        'primary-lg': '0 12px 28px rgba(181, 68, 68, 0.25)',
      },
      animation: {
        'fadeSlide': 'fadeSlide 0.22s ease-out',
        'fadeIn': 'fadeIn 0.3s ease-out',
        'slideDown': 'slideDown 0.25s ease-out',
        'pulse-soft': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeSlide: {
          'from': { opacity: '0', transform: 'translateY(4px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        slideDown: {
          'from': { opacity: '0', transform: 'translateY(-8px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
      }
    },
  },
  plugins: [],
}
