import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';
import SpecialSaleModal from './components/SpecialSaleModal';

// Pages
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/CartPage';
import LabTested from './pages/LabTested';
import FAQ from './pages/FAQ';
import Reviews from './pages/Reviews';
import Contact from './pages/Contact';
import Auth from './pages/Auth';
import InfoPage from './pages/InfoPage';

// Admin Pages (completely separate from storefront — no links visible on site)
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <CartProvider>
        <Routes>
          {/* ── Admin Portal (standalone, no header/footer) ── */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          {/* ── Public Storefront ── */}
          <Route path="/*" element={
            <div className="flex flex-col min-h-screen bg-brand-soft">
              {/* Header height is 64px, pages should account for fixed positioning */}
              <Header />
              <CartSidebar />
              <SpecialSaleModal />
              
              <main className="flex-grow pt-16">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/search" element={<ProductList />} />
                  <Route path="/lab-tested-3525" element={<LabTested />} />
                  <Route path="/reviews" element={<Reviews />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/login" element={<Auth />} />
                  <Route path="/join" element={<Auth />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/info/:slug" element={<InfoPage />} />
                  
                  {/* Slugs for Category, Brand, Sale, Warehouse */}
                  <Route path="/:slug" element={<ProductList />} />
                  
                  {/* Product Detail Page */}
                  <Route path="/:categorySlug/:productSlug" element={<ProductDetail />} />
                </Routes>
              </main>

              <Footer />
            </div>
          } />
        </Routes>
      </CartProvider>
    </Router>
  );
}

export default App;

