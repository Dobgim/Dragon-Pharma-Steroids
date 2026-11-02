import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Preloader from './components/Preloader';
import BackToTop from './components/BackToTop';
import WhatsAppButton from './components/WhatsAppButton';
import OffcanvasMenu from './components/OffcanvasMenu';
import Header from './components/Header';
import Footer from './components/Footer';
import CookieAlert from './components/CookieAlert';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import HowItWorksPage from './pages/HowItWorksPage';
import SolutionsPage from './pages/SolutionsPage';
import PortfolioPage from './pages/PortfolioPage';
import RewardsPage from './pages/RewardsPage';
import BlogPage from './pages/BlogPage';
import BlogDetailPage from './pages/BlogDetailPage';
import ContactPage from './pages/ContactPage';
import FaqPage from './pages/FaqPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleSubscribe = (email) => {
    setToastMessage(`Thank you! ${email} has been subscribed to our updates.`);
    setTimeout(() => {
      setToastMessage('');
    }, 4000);
  };

  return (
    <>
      {/* Scroll window to top on route change */}
      <ScrollToTop />

      {/* Initial 3-dots bounce preloader */}
      <Preloader />

      {/* Circular scroll progress back to top button */}
      <BackToTop />

      {/* Floating WhatsApp Order Button */}
      <WhatsAppButton />

      {/* Offcanvas Drawer Menu for mobile */}
      <OffcanvasMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* Sticky Header with navigation */}
      <Header onOpenMobileMenu={() => setMobileMenuOpen(true)} />

      {/* Page Routing */}
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about-us" element={<AboutPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/rewards" element={<RewardsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-and-conditions" element={<TermsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      {/* Footer across all pages */}
      <Footer onSubscribe={handleSubscribe} />

      {/* Cookie Settings Bar */}
      <CookieAlert />

      {/* Toast Alert */}
      {toastMessage && (
        <div className="toast-alert" role="alert">
          <i className="fa-solid fa-circle-check"></i>
          <span>{toastMessage}</span>
        </div>
      )}
    </>
  );
}
