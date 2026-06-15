import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';

export default function SpecialSaleModal() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check session storage so it doesn't show on every single page navigation,
    // but definitely shows on first entry.
    const isDismissed = sessionStorage.getItem('special-sale-dismissed');
    if (!isDismissed) {
      // Small timeout to let the page load smoothly first
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('special-sale-dismissed', 'true');
  };

  const handleImageClick = () => {
    handleClose();
    navigate('/sale-3561');
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-4 animate-fadeIn backdrop-blur-xs"
      onClick={handleClose}
    >
      <div 
        className="relative max-w-sm md:max-w-md w-full bg-black rounded-lg overflow-hidden shadow-2xl border border-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center bg-black/40 text-white/80 hover:text-white hover:bg-black/60 transition-all z-10"
          aria-label="Close sale modal"
        >
          <X size={20} />
        </button>

        {/* Banner Image */}
        <div 
          onClick={handleImageClick}
          className="cursor-pointer group relative overflow-hidden"
        >
          <img 
            src="/special-sale.webp" 
            alt="Special Sale Peptides 40% Off Dianabol Winstrol 50% Off" 
            className="w-full h-auto object-contain select-none group-hover:scale-[1.01] transition-transform duration-300"
          />
        </div>
      </div>
    </div>
  );
}
