import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../lib/products-data';
import { useCart } from '../context/CartContext';
import type { Warehouse } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  size?: 'sm' | 'md';
}

export default function ProductCard({ product, size = 'sm' }: ProductCardProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    const warehouse: Warehouse = 'int';
    addItem(product, warehouse);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="product-card flex flex-col h-full bg-white border border-brand-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group">
      {/* Image */}
      <Link to={`/${product.categorySlug}/${product.slug}`} className="block relative bg-[#f5f5f5] aspect-square overflow-hidden">
        {/* Ribbons */}
        <div className="absolute left-0 top-3 z-10 flex flex-col gap-1.5 items-start">
          {product.labTested && (
            <div 
              className="text-white text-[10px] font-black py-1 pl-3 pr-4 shadow-sm select-none"
              style={{
                background: '#70b324',
                clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 50%, calc(100% - 8px) 100%, 0 100%)',
              }}
            >
              Lab Tested
            </div>
          )}
          {product.ribbons.includes('Domestic & International') && (
            <div 
              className="text-white text-[10px] font-black py-1 pl-3 pr-4 shadow-sm select-none"
              style={{
                background: '#c93b3b',
                clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 50%, calc(100% - 8px) 100%, 0 100%)',
              }}
            >
              Domestic & International
            </div>
          )}
          {(product.ribbons.includes('Buy 3 Get 1 FREE') || product.categorySlug === 'orals-380' || product.categorySlug === 'injectables-391') && (
            <div 
              className="text-white text-[10px] font-black py-0.5 px-2.5 shadow-sm select-none animate-pulse max-w-[90%] truncate"
              style={{
                background: '#c93b3b',
                clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 50%, calc(100% - 8px) 100%, 0 100%)',
              }}
            >
              Buy 3 Get 1 FREE
            </div>
          )}
        </div>
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-contain p-2 sm:p-4 group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 256' width='256' height='256'><rect width='256' height='256' fill='%23faf7f7'/><rect x='88' y='50' width='80' height='24' rx='6' fill='%23b54444' opacity='0.3'/><rect x='78' y='74' width='100' height='14' rx='4' fill='%23b54444' opacity='0.4'/><rect x='82' y='88' width='92' height='120' rx='16' fill='%23b54444' opacity='0.12'/><rect x='92' y='110' width='72' height='50' rx='6' fill='%23b54444'/><text x='128' y='142' font-family='Arial,sans-serif' font-size='16' font-weight='900' fill='white' text-anchor='middle'>DRAGON</text><text x='128' y='225' font-family='Arial,sans-serif' font-size='11' font-weight='700' fill='%23888888' text-anchor='middle'>PHARMA LABS</text></svg>";
          }}
        />
      </Link>

      {/* Content */}
      <div className="flex flex-col items-center text-center flex-1 p-4 gap-2">
        {/* Brand capsule */}
        <div className="flex justify-center my-0.5">
          <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-full text-[10px] font-black text-white bg-[#3e3e3f] leading-none tracking-wide">
            {product.brand}, Europe
          </span>
        </div>

        {/* Product Name */}
        <Link
          to={`/${product.categorySlug}/${product.slug}`}
          className="font-extrabold text-[#333333] text-sm leading-snug hover:text-primary-500 transition-colors line-clamp-2 min-h-[40px] flex items-center justify-center"
        >
          {product.name}
        </Link>

        {size === 'md' && (
          <p className="text-xs text-brand-muted line-clamp-3 leading-relaxed max-w-xs">{product.description}</p>
        )}

        {/* Price */}
        <div className="mt-auto pt-2 flex flex-col items-center">
          <div className="flex items-baseline gap-2 justify-center">
            <span className="text-[#c93b3b] font-black text-lg">${product.intPrice.toFixed(2)}</span>
            {product.intOriginalPrice && (
              <span className="text-gray-400 line-through text-xs font-semibold">${product.intOriginalPrice.toFixed(2)}</span>
            )}
          </div>
        </div>

        {/* Add to Cart button */}
        <div className="w-full pt-2">
          <button
            onClick={handleAdd}
            className={`w-full py-2.5 px-6 rounded-full text-xs font-black text-white transition-all duration-200 ${
              added
                ? 'bg-green-600'
                : 'bg-[#b54444] hover:bg-[#a33b3b] hover:shadow-lg active:scale-95'
            }`}
            style={{ boxShadow: added ? 'none' : '0 4px 12px rgba(181, 68, 68, 0.2)' }}
          >
            {added ? 'Added!' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}
