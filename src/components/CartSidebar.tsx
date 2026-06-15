import { X, Trash2, ShoppingBag, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import type { Warehouse } from '../context/CartContext';

export default function CartSidebar() {
  const { state, closeCart, removeItem, updateQty, totalItems, totalPrice } = useCart();

  return (
    <>
      {state.isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm" onClick={closeCart} />
      )}
      <div className={`cart-sidebar ${state.isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-brand-border">
          <div className="flex items-center gap-2">
            <ShoppingBag className="text-primary-500" size={20} />
            <h2 className="font-bold text-brand-text">
              Cart <span className="text-brand-muted font-normal text-sm">({totalItems} item{totalItems !== 1 ? 's' : ''})</span>
            </h2>
          </div>
          <button onClick={closeCart} className="p-2 rounded-xl hover:bg-brand-soft text-brand-muted transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto">
          {state.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 p-8 text-center">
              <div className="w-16 h-16 rounded-2xl bg-brand-soft flex items-center justify-center">
                <ShoppingBag size={28} className="text-brand-muted" />
              </div>
              <div>
                <p className="font-semibold text-brand-text mb-1">Your cart is empty</p>
                <p className="text-sm text-brand-muted">Browse our products and add something to get started.</p>
              </div>
              <Link to="/orals-380" onClick={closeCart} className="btn-primary">
                Shop Now
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-brand-border">
              {state.items.map(item => (
                <div key={`${item.product.id}-${item.warehouse}`} className="p-4 flex gap-3">
                  {/* Image */}
                  <Link to={`/${item.product.categorySlug}/${item.product.slug}`} onClick={closeCart}
                    className="w-16 h-16 rounded-xl bg-brand-soft overflow-hidden shrink-0 block">
                    <img src={item.product.image} alt={item.product.name}
                      className="w-full h-full object-contain" />
                  </Link>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <Link to={`/${item.product.categorySlug}/${item.product.slug}`} onClick={closeCart}
                      className="font-semibold text-brand-text text-sm leading-tight hover:text-primary-500 transition-colors line-clamp-2">
                      {item.product.name}
                    </Link>
                    <div className="text-xs text-brand-muted mt-1">
                      {item.warehouse === 'usa' ? '🇺🇸 US Domestic' : '🌏 International'}
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Qty */}
                      <div className="flex items-center gap-1 border border-brand-border rounded-lg overflow-hidden">
                        <button
                          onClick={() => item.quantity > 1
                            ? updateQty(item.product.id, item.warehouse as Warehouse, item.quantity - 1)
                            : removeItem(item.product.id, item.warehouse as Warehouse)
                          }
                          className="w-7 h-7 flex items-center justify-center text-brand-muted hover:bg-brand-soft hover:text-primary-500 transition-colors font-bold"
                        >-</button>
                        <span className="w-8 text-center text-sm font-semibold text-brand-text">{item.quantity}</span>
                        <button
                          onClick={() => updateQty(item.product.id, item.warehouse as Warehouse, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-brand-muted hover:bg-brand-soft hover:text-primary-500 transition-colors font-bold"
                        >+</button>
                      </div>
                      <span className="font-extrabold text-brand-text text-sm">
                        ${(item.unitPrice * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.product.id, item.warehouse as Warehouse)}
                    className="p-1.5 rounded-lg hover:bg-red-50 text-brand-muted hover:text-red-500 transition-colors shrink-0 self-start"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {state.items.length > 0 && (
          <div className="border-t border-brand-border p-5 space-y-3">
            {/* Crypto Banner */}
            <div className="flex items-center gap-3 bg-gradient-to-r from-primary-50 to-primary-100 border border-primary-200 rounded-2xl p-3">
              <div className="w-9 h-9 rounded-full bg-primary-500 flex items-center justify-center shrink-0">
                <span className="text-white text-sm">₿</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-xs text-brand-text">Pay with Crypto, Get 20% Back!</p>
                <p className="text-[11px] text-brand-muted leading-tight">Use crypto at checkout and earn 20% cashback.</p>
              </div>
            </div>

            {/* Total */}
            <div className="flex items-center justify-between py-2">
              <span className="font-semibold text-brand-muted text-sm">Total Cost:</span>
              <span className="font-extrabold text-xl text-brand-text">${totalPrice.toFixed(2)}</span>
            </div>

            {/* Buttons */}
            <Link
              to="/cart"
              onClick={closeCart}
              className="w-full btn-primary justify-center py-3 rounded-xl text-base"
            >
              Checkout <ChevronRight size={16} />
            </Link>
            <button
              onClick={closeCart}
              className="w-full py-2.5 text-sm font-semibold text-brand-muted hover:text-primary-500 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
