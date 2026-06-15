import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  Trash2, 
  ChevronRight, 
  MapPin, 
  CheckCircle, 
  Percent,
  CreditCard
} from 'lucide-react';
import { useCart, type Warehouse } from '../context/CartContext';
import { supabase } from '../lib/supabase-client';

type CheckoutStep = 'cart' | 'shipping' | 'payment' | 'success';
type PaymentMethod = 'bitcoin' | 'applepay' | 'bank' | 'card' | 'zelle' | 'chime' | 'paypal' | 'cashapp';

export default function CartPage() {
  const { state, removeItem, updateQty, clearCart, totalItems, totalPrice } = useCart();
  const [step, setStep] = useState<CheckoutStep>('cart');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('bitcoin');
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  
  // Shipping Form State
  const [shippingForm, setShippingForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
    speed: 'standard' // 'standard' or 'express'
  });


  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (shippingForm.firstName && shippingForm.lastName && shippingForm.email && shippingForm.address) {
      setStep('payment');
    }
  };

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'DRAGON50') {
      setAppliedPromo('DRAGON50');
      setPromoCode('');
    } else {
      alert('Invalid promo code. Try "DRAGON50" for a test discount.');
    }
  };

  // Fees Calculations
  const promoDiscount = appliedPromo === 'DRAGON50' ? totalPrice * 0.15 : 0; // 15% off promo code
  const cryptoDiscount = paymentMethod === 'bitcoin' ? (totalPrice - promoDiscount) * 0.20 : 0; // 20% off for Bitcoin payment
  const shippingFee = shippingForm.speed === 'express' ? 30 : (totalPrice > 200 ? 0 : 15);
  const finalTotal = totalPrice - promoDiscount - cryptoDiscount + shippingFee;

  const handlePlaceOrder = async () => {
    // Save order to Supabase
    const orderId = `DP-${Date.now().toString(36).toUpperCase()}`;
    const newOrder = {
      id: orderId,
      date: new Date().toISOString(),
      status: 'pending',
      customer: {
        firstName: shippingForm.firstName,
        lastName: shippingForm.lastName,
        email: shippingForm.email,
        phone: shippingForm.phone,
        address: shippingForm.address,
        city: shippingForm.city,
        state: shippingForm.state,
        zip: shippingForm.zip,
        country: shippingForm.country,
      },
      items: state.items.map(item => ({
        id: item.product.id,
        name: item.product.name,
        image: item.product.image,
        warehouse: item.warehouse,
        qty: item.quantity,
        price: item.warehouse === 'usa' ? item.product.usaPrice : item.product.intPrice,
      })),
      paymentMethod,
      shippingSpeed: shippingForm.speed,
      subtotal: totalPrice,
      promoCode: appliedPromo,
      promoDiscount,
      cryptoDiscount,
      shippingFee,
      total: finalTotal,
    };

    const paymentLabels: Record<PaymentMethod, string> = {
      bitcoin: 'Bitcoin (BTC)',
      applepay: 'Apple Pay',
      bank: 'Bank Transfer',
      card: 'Credit Card Payment',
      zelle: 'Zelle',
      chime: 'Chime',
      paypal: 'PayPal',
      cashapp: 'Cash App',
    };

    const paymentInstructions: Record<PaymentMethod, string> = {
      bitcoin: 'Bitcoin payment — wallet address will be provided.',
      applepay: 'AWAITING PAYMENT DETAILS: Please reply to this email with your Apple Pay account/phone number so the customer can send payment.',
      bank: 'AWAITING PAYMENT DETAILS: Please reply to this email with your Bank Transfer account details (Account Name, Account Number, Bank Name, Routing/SWIFT) so the customer can wire the funds.',
      card: 'AWAITING PAYMENT DETAILS: Please reply to this email with your card payment link or instructions so the customer can complete the payment.',
      zelle: 'AWAITING PAYMENT DETAILS: Please reply to this email with your Zelle email/phone number so the customer can send payment.',
      chime: 'AWAITING PAYMENT DETAILS: Please reply to this email with your Chime account tag/email so the customer can send payment.',
      paypal: 'AWAITING PAYMENT DETAILS: Please reply to this email with your PayPal email/link so the customer can send payment.',
      cashapp: 'AWAITING PAYMENT DETAILS: Please reply to this email with your Cash App $Cashtag so the customer can send payment.',
    };

    try {
      const { error } = await supabase.from('orders').insert([newOrder]);
      if (error) throw error;

      const existing = JSON.parse(localStorage.getItem('dp_orders') || '[]');
      existing.unshift(newOrder);
      localStorage.setItem('dp_orders', JSON.stringify(existing));

      // Send order notification email to admin via Web3Forms
      try {
        const accessKey = import.meta.env.VITE_WEB3FORMS_KEY || 'cf0bbb8e-ac03-487a-a0ce-9d10f1403833';
        const itemLines = newOrder.items.map((item: any) =>
          `  - ${item.name} x${item.qty} (${item.warehouse === 'usa' ? 'US Hub' : 'Intl Hub'}) — $${(item.price * item.qty).toFixed(2)}`
        ).join('\n');
        const isNonBtc = paymentMethod !== 'bitcoin';
        const emailBody = [
          isNonBtc
            ? `💰 NEW ORDER — PAYMENT DETAILS NEEDED — ${newOrder.id}`
            : `🛒 NEW ORDER RECEIVED — ${newOrder.id}`,
          `Date: ${new Date(newOrder.date).toLocaleString()}`,
          ``,
          isNonBtc
            ? `⚠️  ACTION REQUIRED: Reply to this email with your ${paymentLabels[paymentMethod]} account details so the customer can complete payment.`
            : null,
          isNonBtc ? `` : null,
          `── CUSTOMER ─────────────────────`,
          `Name:    ${newOrder.customer.firstName} ${newOrder.customer.lastName}`,
          `Email:   ${newOrder.customer.email}`,
          `Phone:   ${newOrder.customer.phone}`,
          `Address: ${newOrder.customer.address}, ${newOrder.customer.city}, ${newOrder.customer.state} ${newOrder.customer.zip}, ${newOrder.customer.country}`,
          ``,
          `── PAYMENT & SHIPPING ───────────`,
          `Payment Method:  ${paymentLabels[paymentMethod]}`,
          `Shipping Speed:  ${newOrder.shippingSpeed === 'express' ? 'Express (2–5 days)' : 'Standard (10–21 days)'}`,
          ``,
          `── ITEMS ORDERED ────────────────`,
          itemLines,
          ``,
          `── ORDER TOTAL ──────────────────`,
          `Subtotal:         $${newOrder.subtotal.toFixed(2)}`,
          newOrder.promoDiscount > 0 ? `Promo Discount:   -$${newOrder.promoDiscount.toFixed(2)}` : null,
          newOrder.cryptoDiscount > 0 ? `Bitcoin Discount: -$${newOrder.cryptoDiscount.toFixed(2)}` : null,
          `Shipping Fee:     ${newOrder.shippingFee === 0 ? 'FREE' : '$' + newOrder.shippingFee.toFixed(2)}`,
          `GRAND TOTAL:      $${newOrder.total.toFixed(2)}`,
          ``,
          isNonBtc ? `── NEXT STEP ────────────────────` : null,
          isNonBtc ? paymentInstructions[paymentMethod] : null,
        ].filter(Boolean).join('\n');

        const formData = new FormData();
        formData.append('access_key', accessKey);
        formData.append('name', `${newOrder.customer.firstName} ${newOrder.customer.lastName}`);
        // Set reply-to as customer email so admin can reply directly to send payment details
        formData.append('email', newOrder.customer.email);
        formData.append('replyto', newOrder.customer.email);
        formData.append(
          'subject',
          isNonBtc
            ? `💰 [ACTION NEEDED] Order ${newOrder.id} — ${paymentLabels[paymentMethod]} — Dragon Pharma`
            : `🛒 New Order ${newOrder.id} — Dragon Pharma Storefront`
        );
        formData.append('message', emailBody);
        formData.append('from_name', 'Dragon Pharma Order System');

        await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData });
      } catch (emailErr) {
        console.warn('Order email notification failed (non-critical):', emailErr);
      }

      setStep('success');
      setTimeout(() => {
        clearCart();
      }, 100);
    } catch (err) {
      console.error('Failed to save order to Supabase:', err);
      alert('Could not submit order. Please check your internet connection and try again.');
    }
  };

  return (
    <div className="min-h-screen py-10 page-container">
      {/* ── Steps Indicator ────────────────────────── */}
      {step !== 'success' && (
        <div className="flex justify-center items-center gap-2 mb-10 max-w-lg mx-auto flex-wrap text-center">
          <button
            onClick={() => step !== 'cart' && setStep('cart')}
            className={`flex items-center gap-1.5 text-xs font-black px-3 py-1.5 rounded-full transition-colors ${
              step === 'cart' ? 'bg-primary-500 text-white' : 'text-brand-muted hover:text-brand-text bg-white border border-brand-border'
            }`}
          >
            <ShoppingBag size={13} /> 1. Review Cart
          </button>
          <ChevronRight size={14} className="text-brand-border" />
          <button
            onClick={() => step !== 'shipping' && step !== 'cart' && setStep('shipping')}
            className={`flex items-center gap-1.5 text-xs font-black px-3 py-1.5 rounded-full transition-colors ${
              step === 'shipping' ? 'bg-primary-500 text-white' : 'text-brand-muted hover:text-brand-text bg-white border border-brand-border'
            }`}
            disabled={state.items.length === 0}
          >
            <MapPin size={13} /> 2. Shipping
          </button>
          <ChevronRight size={14} className="text-brand-border" />
          <span
            className={`flex items-center gap-1.5 text-xs font-black px-3 py-1.5 rounded-full ${
              step === 'payment' ? 'bg-primary-500 text-white' : 'text-brand-muted bg-white border border-brand-border'
            }`}
          >
            <CreditCard size={13} /> 3. Payment
          </span>
        </div>
      )}

      {/* ── STEP 1: REVIEW CART ────────────────────── */}
      {step === 'cart' && (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Items Table */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white border border-brand-border rounded-3xl p-6 shadow-brand-sm">
              <div className="flex items-center justify-between pb-4 border-b border-brand-border mb-4">
                <h1 className="text-lg font-black text-brand-text flex items-center gap-2">
                  Shopping Cart <span className="text-xs text-brand-muted font-normal">({totalItems} items)</span>
                </h1>
                {state.items.length > 0 && (
                  <button 
                    onClick={clearCart} 
                    className="text-xs font-extrabold text-red-500 hover:underline"
                  >
                    Clear Cart
                  </button>
                )}
              </div>

              {state.items.length === 0 ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-brand-soft flex items-center justify-center mx-auto text-brand-muted">
                    <ShoppingBag size={24} />
                  </div>
                  <h2 className="font-bold text-brand-text text-sm">Your cart is empty</h2>
                  <p className="text-xs text-brand-muted max-w-xs mx-auto">
                    Take a look at our premium oral tablets, injectables, or peptides to get started.
                  </p>
                  <Link to="/orals-380" className="btn-primary">
                    Go Shopping
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-brand-border">
                  {state.items.map(item => (
                    <div key={`${item.product.id}-${item.warehouse}`} className="py-4 flex gap-4 items-center">
                      <Link to={`/${item.product.categorySlug}/${item.product.slug}`} className="w-16 h-16 rounded-xl bg-brand-soft border border-brand-border overflow-hidden shrink-0">
                        <img src={item.product.image} alt={item.product.name} className="w-full h-full object-contain" />
                      </Link>
                      
                      <div className="flex-grow min-w-0">
                        <Link to={`/${item.product.categorySlug}/${item.product.slug}`} className="font-extrabold text-xs text-brand-text hover:text-primary-500 truncate block">
                          {item.product.name}
                        </Link>
                        <span className="inline-block text-[10px] font-black text-primary-500 bg-primary-50 border border-primary-100 rounded-md px-1.5 py-0.5 mt-1">
                          {item.warehouse === 'usa' ? '🇺🇸 US Domestic' : '🌏 International'}
                        </span>
                      </div>

                      {/* Qty Selector */}
                      <div className="flex items-center border border-brand-border rounded-lg bg-white overflow-hidden shrink-0">
                        <button
                          onClick={() => item.quantity > 1 
                            ? updateQty(item.product.id, item.warehouse as Warehouse, item.quantity - 1)
                            : removeItem(item.product.id, item.warehouse as Warehouse)
                          }
                          className="w-7 h-7 flex items-center justify-center text-brand-muted hover:bg-brand-soft transition-colors font-bold text-xs"
                        >-</button>
                        <span className="w-7 text-center text-xs font-black text-brand-text">{item.quantity}</span>
                        <button
                          onClick={() => updateQty(item.product.id, item.warehouse as Warehouse, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-brand-muted hover:bg-brand-soft transition-colors font-bold text-xs"
                        >+</button>
                      </div>

                      <div className="w-20 text-right shrink-0">
                        <span className="font-black text-xs text-brand-text block">${(item.unitPrice * item.quantity).toFixed(2)}</span>
                        <span className="text-[10px] text-brand-muted block">${item.unitPrice.toFixed(2)} each</span>
                      </div>

                      <button
                        onClick={() => removeItem(item.product.id, item.warehouse as Warehouse)}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-brand-muted hover:text-red-500 transition-colors shrink-0"
                        aria-label="Delete Item"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Checkout Summary Card */}
          <div className="space-y-4">
            <div className="bg-white border border-brand-border rounded-3xl p-6 shadow-brand-sm space-y-4">
              <h2 className="font-black text-brand-text text-sm uppercase tracking-wider pb-3 border-b border-brand-border">
                Order Summary
              </h2>

              <div className="space-y-2.5 text-xs text-brand-muted">
                <div className="flex justify-between">
                  <span>Cart Subtotal:</span>
                  <span className="font-extrabold text-brand-text">${totalPrice.toFixed(2)}</span>
                </div>
                {promoDiscount > 0 && (
                  <div className="flex justify-between text-primary-500 font-bold">
                    <span>Promo Code (DRAGON50):</span>
                    <span>-${promoDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping Fee:</span>
                  <span>{shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}</span>
                </div>
                <div className="border-t border-brand-border/60 pt-2.5 flex justify-between text-sm font-black text-brand-text">
                  <span>Estimated Total:</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Promo Code Input */}
              {state.items.length > 0 && (
                <div className="pt-2 border-t border-brand-border/60">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo Code"
                      value={promoCode}
                      onChange={e => setPromoCode(e.target.value)}
                      className="form-input py-2 flex-grow text-xs rounded-xl"
                    />
                    <button
                      onClick={handleApplyPromo}
                      className="btn-primary py-2 px-3 rounded-xl text-xs shrink-0 cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                  {appliedPromo && (
                    <div className="text-[10px] text-green-600 font-bold mt-1.5 flex items-center gap-1">
                      <Percent size={10} /> 15% discount applied!
                    </div>
                  )}
                </div>
              )}

              {state.items.length > 0 ? (
                <button
                  onClick={() => setStep('shipping')}
                  className="w-full btn-primary py-3 rounded-xl justify-center font-bold text-sm shadow-md cursor-pointer"
                >
                  Proceed to Shipping <ChevronRight size={14} />
                </button>
              ) : (
                <button
                  disabled
                  className="w-full bg-brand-soft border border-brand-border text-brand-muted py-3 rounded-xl font-bold text-sm"
                >
                  Cart is Empty
                </button>
              )}
            </div>

            {/* Pay with bitcoin reminder banner */}
            <div className="bg-gradient-to-br from-amber-500/10 to-orange-600/15 border border-orange-500/20 rounded-3xl p-5 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center font-black text-xs">₿</span>
                <h3 className="font-black text-xs text-brand-text">Pay with Bitcoin: Save 20%!</h3>
              </div>
              <p className="text-[11px] text-brand-muted leading-relaxed">
                Pay using Bitcoin (BTC) in Step 3 and automatically receive an extra 20% off your entire order value.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── STEP 2: SHIPPING FORM ──────────────────── */}
      {step === 'shipping' && (
        <div className="grid lg:grid-cols-3 gap-8">
          <form onSubmit={handleShippingSubmit} className="lg:col-span-2 space-y-4">
            <div className="bg-white border border-brand-border rounded-3xl p-6 shadow-brand-sm space-y-4">
              <h2 className="text-lg font-black text-brand-text border-b border-brand-border pb-3">
                Shipping & Delivery Address
              </h2>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="form-label text-xs">First Name</label>
                  <input
                    type="text"
                    required
                    value={shippingForm.firstName}
                    onChange={e => setShippingForm({...shippingForm, firstName: e.target.value})}
                    className="form-input text-xs rounded-xl"
                  />
                </div>
                <div>
                  <label className="form-label text-xs">Last Name</label>
                  <input
                    type="text"
                    required
                    value={shippingForm.lastName}
                    onChange={e => setShippingForm({...shippingForm, lastName: e.target.value})}
                    className="form-input text-xs rounded-xl"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="form-label text-xs">Email Address</label>
                  <input
                    type="email"
                    required
                    value={shippingForm.email}
                    onChange={e => setShippingForm({...shippingForm, email: e.target.value})}
                    className="form-input text-xs rounded-xl"
                  />
                </div>
                <div>
                  <label className="form-label text-xs">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={shippingForm.phone}
                    onChange={e => setShippingForm({...shippingForm, phone: e.target.value})}
                    className="form-input text-xs rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="form-label text-xs">Delivery Address</label>
                <input
                  type="text"
                  required
                  value={shippingForm.address}
                  onChange={e => setShippingForm({...shippingForm, address: e.target.value})}
                  className="form-input text-xs rounded-xl"
                  placeholder="Street Address, Suite, Apartment number"
                />
              </div>

              <div className="grid sm:grid-cols-4 gap-4">
                <div className="sm:col-span-2">
                  <label className="form-label text-xs">City</label>
                  <input
                    type="text"
                    required
                    value={shippingForm.city}
                    onChange={e => setShippingForm({...shippingForm, city: e.target.value})}
                    className="form-input text-xs rounded-xl"
                  />
                </div>
                <div>
                  <label className="form-label text-xs">State / Province</label>
                  <input
                    type="text"
                    required
                    value={shippingForm.state}
                    onChange={e => setShippingForm({...shippingForm, state: e.target.value})}
                    className="form-input text-xs rounded-xl"
                  />
                </div>
                <div>
                  <label className="form-label text-xs">ZIP / Postal Code</label>
                  <input
                    type="text"
                    required
                    value={shippingForm.zip}
                    onChange={e => setShippingForm({...shippingForm, zip: e.target.value})}
                    className="form-input text-xs rounded-xl"
                  />
                </div>
              </div>

              {/* Shipping Delivery Speed */}
              <div className="pt-4 border-t border-brand-border/60 space-y-3">
                <h3 className="font-extrabold text-xs text-brand-text uppercase tracking-wider">Shipping Method</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  <label className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer select-none transition-all ${
                    shippingForm.speed === 'standard' 
                      ? 'border-primary-500 bg-primary-50/40 text-brand-text font-bold'
                      : 'border-brand-border text-brand-muted bg-white'
                  }`}>
                    <div className="flex gap-2.5 items-center">
                      <input
                        type="radio"
                        name="speed"
                        checked={shippingForm.speed === 'standard'}
                        onChange={() => setShippingForm({...shippingForm, speed: 'standard'})}
                        className="text-primary-500 focus:ring-primary-500"
                      />
                      <div className="text-left">
                        <div className="text-xs">Standard Shipping</div>
                        <div className="text-[10px] text-brand-muted font-normal mt-0.5">Worldwide delivery in 10-21 days</div>
                      </div>
                    </div>
                    <span className="text-xs font-black">{totalPrice > 200 ? 'FREE' : '$15.00'}</span>
                  </label>

                  <label className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer select-none transition-all ${
                    shippingForm.speed === 'express' 
                      ? 'border-primary-500 bg-primary-50/40 text-brand-text font-bold'
                      : 'border-brand-border text-brand-muted bg-white'
                  }`}>
                    <div className="flex gap-2.5 items-center">
                      <input
                        type="radio"
                        name="speed"
                        checked={shippingForm.speed === 'express'}
                        onChange={() => setShippingForm({...shippingForm, speed: 'express'})}
                        className="text-primary-500 focus:ring-primary-500"
                      />
                      <div className="text-left">
                        <div className="text-xs">Express Shipping</div>
                        <div className="text-[10px] text-brand-muted font-normal mt-0.5">Domestic hubs delivery in 2-5 days</div>
                      </div>
                    </div>
                    <span className="text-xs font-black">$30.00</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                type="button"
                onClick={() => setStep('cart')}
                className="py-2.5 px-4 rounded-xl text-xs font-bold text-brand-muted hover:text-brand-text transition-colors"
              >
                Back to Cart
              </button>
              <button
                type="submit"
                className="btn-primary py-3 px-6 rounded-xl font-bold text-xs shadow-md cursor-pointer"
              >
                Proceed to Payment <ChevronRight size={14} />
              </button>
            </div>
          </form>

          {/* Sidebar Summary */}
          <div className="bg-white border border-brand-border rounded-3xl p-6 shadow-brand-sm space-y-4 self-start">
            <h2 className="font-black text-brand-text text-sm uppercase tracking-wider pb-3 border-b border-brand-border">
              Order Summary
            </h2>
            <div className="divide-y divide-brand-border/60 max-h-56 overflow-y-auto pr-1">
              {state.items.map(i => (
                <div key={`${i.product.id}-${i.warehouse}`} className="py-2.5 flex justify-between gap-3 text-xs">
                  <div>
                    <span className="font-extrabold text-brand-text">{i.product.name}</span>
                    <span className="text-[10px] text-brand-muted block mt-0.5">Qty: {i.quantity} • {i.warehouse === 'usa' ? 'US Hub' : 'Intl Hub'}</span>
                  </div>
                  <span className="font-extrabold text-brand-text shrink-0">${(i.unitPrice * i.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2.5 text-xs text-brand-muted pt-3 border-t border-brand-border">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              {promoDiscount > 0 && (
                <div className="flex justify-between text-primary-500 font-bold">
                  <span>Promo (DRAGON50):</span>
                  <span>-${promoDiscount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>{shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}</span>
              </div>
              <div className="border-t border-brand-border/60 pt-2.5 flex justify-between text-sm font-black text-brand-text">
                <span>Total:</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── STEP 3: PAYMENT SELECTOR ───────────────── */}
      {step === 'payment' && (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-brand-border rounded-3xl p-6 shadow-brand-sm space-y-4">
              <h2 className="text-lg font-black text-brand-text border-b border-brand-border pb-3">
                Select Payment Method
              </h2>

              {/* Payment Methods Grid - 8 options */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {/* Bitcoin */}
                <button
                  onClick={() => setPaymentMethod('bitcoin')}
                  className={`p-3 rounded-2xl border text-left flex flex-col gap-1.5 transition-all cursor-pointer relative ${
                    paymentMethod === 'bitcoin'
                      ? 'border-amber-500 bg-amber-50/30 text-brand-text ring-1 ring-amber-500'
                      : 'border-brand-border hover:border-amber-300 text-brand-muted bg-white'
                  }`}
                >
                  <span className="absolute top-2 right-2 text-[8px] font-black text-white bg-amber-500 rounded px-1 py-0.5">20% OFF</span>
                  <span className="text-lg">₿</span>
                  <span className="font-extrabold text-xs block leading-tight">Bitcoin</span>
                </button>

                {/* Apple Pay */}
                <button
                  onClick={() => setPaymentMethod('applepay')}
                  className={`p-3 rounded-2xl border text-left flex flex-col gap-1.5 transition-all cursor-pointer ${
                    paymentMethod === 'applepay'
                      ? 'border-slate-800 bg-slate-900/10 text-brand-text ring-1 ring-slate-800'
                      : 'border-brand-border hover:border-slate-400 text-brand-muted bg-white'
                  }`}
                >
                  <span className="text-lg">🍎</span>
                  <span className="font-extrabold text-xs block leading-tight">Apple Pay</span>
                </button>

                {/* Bank Transfer */}
                <button
                  onClick={() => setPaymentMethod('bank')}
                  className={`p-3 rounded-2xl border text-left flex flex-col gap-1.5 transition-all cursor-pointer ${
                    paymentMethod === 'bank'
                      ? 'border-blue-500 bg-blue-50/30 text-brand-text ring-1 ring-blue-500'
                      : 'border-brand-border hover:border-blue-300 text-brand-muted bg-white'
                  }`}
                >
                  <span className="text-lg">🏦</span>
                  <span className="font-extrabold text-xs block leading-tight">Bank Transfer</span>
                </button>

                {/* Credit Card */}
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-2xl border text-left flex flex-col gap-1.5 transition-all cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'border-primary-500 bg-primary-50/40 text-brand-text ring-1 ring-primary-500'
                      : 'border-brand-border hover:border-primary-300 text-brand-muted bg-white'
                  }`}
                >
                  <span className="text-lg">💳</span>
                  <span className="font-extrabold text-xs block leading-tight">Credit Card</span>
                </button>

                {/* Zelle */}
                <button
                  onClick={() => setPaymentMethod('zelle')}
                  className={`p-3 rounded-2xl border text-left flex flex-col gap-1.5 transition-all cursor-pointer ${
                    paymentMethod === 'zelle'
                      ? 'border-violet-500 bg-violet-50/30 text-brand-text ring-1 ring-violet-500'
                      : 'border-brand-border hover:border-violet-300 text-brand-muted bg-white'
                  }`}
                >
                  <span className="text-lg">⚡</span>
                  <span className="font-extrabold text-xs block leading-tight">Zelle</span>
                </button>

                {/* Chime */}
                <button
                  onClick={() => setPaymentMethod('chime')}
                  className={`p-3 rounded-2xl border text-left flex flex-col gap-1.5 transition-all cursor-pointer ${
                    paymentMethod === 'chime'
                      ? 'border-emerald-500 bg-emerald-50/30 text-brand-text ring-1 ring-emerald-500'
                      : 'border-brand-border hover:border-emerald-300 text-brand-muted bg-white'
                  }`}
                >
                  <span className="text-lg">🟢</span>
                  <span className="font-extrabold text-xs block leading-tight">Chime</span>
                </button>

                {/* PayPal */}
                <button
                  onClick={() => setPaymentMethod('paypal')}
                  className={`p-3 rounded-2xl border text-left flex flex-col gap-1.5 transition-all cursor-pointer ${
                    paymentMethod === 'paypal'
                      ? 'border-sky-500 bg-sky-50/30 text-brand-text ring-1 ring-sky-500'
                      : 'border-brand-border hover:border-sky-300 text-brand-muted bg-white'
                  }`}
                >
                  <span className="text-lg">🅿️</span>
                  <span className="font-extrabold text-xs block leading-tight">PayPal</span>
                </button>

                {/* Cash App */}
                <button
                  onClick={() => setPaymentMethod('cashapp')}
                  className={`p-3 rounded-2xl border text-left flex flex-col gap-1.5 transition-all cursor-pointer ${
                    paymentMethod === 'cashapp'
                      ? 'border-green-500 bg-green-50/30 text-brand-text ring-1 ring-green-500'
                      : 'border-brand-border hover:border-green-300 text-brand-muted bg-white'
                  }`}
                >
                  <span className="text-lg">💵</span>
                  <span className="font-extrabold text-xs block leading-tight">Cash App</span>
                </button>
              </div>

              {/* ── Bitcoin Details Board ── */}
              {paymentMethod === 'bitcoin' && (
                <div className="border border-amber-200 bg-amber-50/30 rounded-2xl p-5 space-y-4">
                  <div className="flex gap-3 items-start">
                    <span className="w-5 h-5 bg-amber-500 text-white font-black text-xs rounded-full flex items-center justify-center shrink-0">!</span>
                    <div className="space-y-1">
                      <h4 className="font-bold text-xs text-amber-800">Bitcoin — 20% Discount Applied!</h4>
                      <p className="text-[11px] text-amber-700 leading-relaxed">
                        An automatic 20% discount has been applied to your order. Send the exact BTC amount shown below to our wallet and place your order.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-5 items-center bg-white border border-brand-border rounded-xl p-4">
                    {/* QR placeholder */}
                    <div className="w-24 h-24 bg-brand-soft border border-brand-border rounded-lg flex items-center justify-center shrink-0 p-1 text-center font-bold text-[10px] text-brand-muted select-none">
                      BTC QR CODE
                    </div>
                    <div className="flex-1 w-full space-y-2.5 text-xs">
                      <div>
                        <span className="font-bold text-brand-muted block uppercase text-[9px] tracking-wide">Bitcoin Wallet Address</span>
                        <code className="bg-brand-soft px-2 py-1.5 rounded-lg font-mono text-[11px] block border border-brand-border break-all select-all mt-1">
                          bc1qzpsvvk9grgha0ek3zpjxau6u3t9dhrc4h7tpcn
                        </code>
                      </div>
                      <div className="flex justify-between text-xs text-brand-text font-bold pt-1">
                        <span>Amount Required (BTC):</span>
                        <span className="text-amber-600 font-extrabold">{(finalTotal / 32000).toFixed(6)} BTC</span>
                      </div>
                      <div className="flex justify-between text-xs text-brand-text font-bold">
                        <span>USD Equivalent:</span>
                        <span className="text-primary-500 font-extrabold">${finalTotal.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── Auto-generated Order Summary Form for non-Bitcoin methods ── */}
              {paymentMethod !== 'bitcoin' && (
                <div className="border border-blue-200 bg-blue-50/30 rounded-2xl p-5 space-y-4">
                  {/* Header */}
                  <div className="flex gap-3 items-start pb-3 border-b border-blue-200">
                    <span className="w-6 h-6 bg-blue-500 text-white font-black text-xs rounded-full flex items-center justify-center shrink-0 mt-0.5">📋</span>
                    <div>
                      <h4 className="font-bold text-sm text-brand-text">
                        {paymentMethod === 'applepay' && '🍎 Apple Pay — Order Summary'}
                        {paymentMethod === 'bank' && '🏦 Bank Transfer — Order Summary'}
                        {paymentMethod === 'card' && '💳 Credit Card — Order Summary'}
                        {paymentMethod === 'zelle' && '⚡ Zelle — Order Summary'}
                        {paymentMethod === 'chime' && '🟢 Chime — Order Summary'}
                        {paymentMethod === 'paypal' && '🅿️ PayPal — Order Summary'}
                        {paymentMethod === 'cashapp' && '💵 Cash App — Order Summary'}
                      </h4>
                      <p className="text-[11px] text-blue-700 mt-0.5 leading-relaxed">
                        Review your order below. When you click <strong>Submit Order</strong>, this will be sent to our team.
                        We'll reply to <strong>{shippingForm.email || 'your email'}</strong> with the payment account details.
                      </p>
                    </div>
                  </div>

                  {/* Customer Info Block */}
                  <div className="bg-white border border-brand-border rounded-xl p-4 space-y-2">
                    <h5 className="font-extrabold text-[10px] uppercase tracking-wider text-brand-muted">Customer Information</h5>
                    <div className="grid sm:grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
                      <div className="flex gap-2">
                        <span className="text-brand-muted w-16 shrink-0">Name:</span>
                        <span className="font-bold text-brand-text">{shippingForm.firstName} {shippingForm.lastName}</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-brand-muted w-16 shrink-0">Email:</span>
                        <span className="font-bold text-brand-text break-all">{shippingForm.email}</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-brand-muted w-16 shrink-0">Phone:</span>
                        <span className="font-bold text-brand-text">{shippingForm.phone}</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-brand-muted w-16 shrink-0">Country:</span>
                        <span className="font-bold text-brand-text">{shippingForm.country}</span>
                      </div>
                      <div className="flex gap-2 sm:col-span-2">
                        <span className="text-brand-muted w-16 shrink-0">Address:</span>
                        <span className="font-bold text-brand-text">{shippingForm.address}, {shippingForm.city}, {shippingForm.state} {shippingForm.zip}</span>
                      </div>
                    </div>
                  </div>

                  {/* Items Ordered */}
                  <div className="bg-white border border-brand-border rounded-xl p-4 space-y-2">
                    <h5 className="font-extrabold text-[10px] uppercase tracking-wider text-brand-muted">Products Ordered</h5>
                    <div className="divide-y divide-brand-border/60">
                      {state.items.map(item => (
                        <div key={`${item.product.id}-${item.warehouse}-summary`} className="py-2 flex items-center gap-3">
                          <img src={item.product.image} alt={item.product.name} className="w-8 h-8 object-contain rounded-lg bg-brand-soft border border-brand-border shrink-0" />
                          <div className="flex-grow min-w-0">
                            <span className="font-bold text-xs text-brand-text block truncate">{item.product.name}</span>
                            <span className="text-[10px] text-brand-muted">
                              Qty: {item.quantity} • {item.warehouse === 'usa' ? '🇺🇸 US Hub' : '🌏 Intl Hub'}
                            </span>
                          </div>
                          <span className="font-extrabold text-xs text-brand-text shrink-0">${(item.unitPrice * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Payment & Total */}
                  <div className="bg-white border border-brand-border rounded-xl p-4 space-y-2">
                    <h5 className="font-extrabold text-[10px] uppercase tracking-wider text-brand-muted">Payment & Total</h5>
                    <div className="space-y-1.5 text-xs">
                      <div className="flex justify-between">
                        <span className="text-brand-muted">Payment Method:</span>
                        <span className="font-bold text-brand-text">
                          {paymentMethod === 'applepay' && '🍎 Apple Pay'}
                          {paymentMethod === 'bank' && '🏦 Bank Transfer'}
                          {paymentMethod === 'card' && '💳 Credit Card'}
                          {paymentMethod === 'zelle' && '⚡ Zelle'}
                          {paymentMethod === 'chime' && '🟢 Chime'}
                          {paymentMethod === 'paypal' && '🅿️ PayPal'}
                          {paymentMethod === 'cashapp' && '💵 Cash App'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-brand-muted">Shipping:</span>
                        <span className="font-bold text-brand-text">{shippingForm.speed === 'express' ? 'Express (2-5 days)' : 'Standard (10-21 days)'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-brand-muted">Subtotal:</span>
                        <span className="font-bold text-brand-text">${totalPrice.toFixed(2)}</span>
                      </div>
                      {promoDiscount > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>Promo (DRAGON50):</span>
                          <span className="font-bold">-${promoDiscount.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-brand-muted">Shipping Fee:</span>
                        <span className="font-bold text-brand-text">{shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}</span>
                      </div>
                      <div className="border-t border-brand-border/60 pt-2 flex justify-between font-black text-sm">
                        <span className="text-brand-text">GRAND TOTAL:</span>
                        <span className="text-primary-500">${finalTotal.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* What happens next */}
                  <div className="flex gap-2 items-start text-[11px] text-blue-700 bg-blue-100/60 rounded-xl px-3 py-2.5">
                    <span className="shrink-0 mt-0.5">📧</span>
                    <span>After submitting, our team will email you at <strong>{shippingForm.email}</strong> with the exact account details for your chosen payment method. Simply send the payment and your order ships!</span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                type="button"
                onClick={() => setStep('shipping')}
                className="py-2.5 px-4 rounded-xl text-xs font-bold text-brand-muted hover:text-brand-text transition-colors"
              >
                Back to Shipping
              </button>
              <button
                type="button"
                onClick={handlePlaceOrder}
                className="btn-primary py-3 px-6 rounded-xl font-bold text-xs shadow-md cursor-pointer"
              >
                Submit Order & Complete Checkout
              </button>
            </div>
          </div>

          {/* Summary Sidebar */}
          <div className="bg-white border border-brand-border rounded-3xl p-6 shadow-brand-sm space-y-4 self-start">
            <h2 className="font-black text-brand-text text-sm uppercase tracking-wider pb-3 border-b border-brand-border">
              Checkout Details
            </h2>

            <div className="text-xs space-y-2 border-b border-brand-border pb-3">
              <div className="font-bold text-brand-text">Shipping Address:</div>
              <div className="text-brand-muted leading-relaxed">
                {shippingForm.firstName} {shippingForm.lastName}<br />
                {shippingForm.address}, {shippingForm.city}, {shippingForm.state} {shippingForm.zip}
              </div>
            </div>

            <div className="space-y-2.5 text-xs text-brand-muted pt-1">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              {promoDiscount > 0 && (
                <div className="flex justify-between text-primary-500 font-bold">
                  <span>Promo (DRAGON50):</span>
                  <span>-${promoDiscount.toFixed(2)}</span>
                </div>
              )}
              {cryptoDiscount > 0 && (
                <div className="flex justify-between text-amber-500 font-bold">
                  <span>Crypto discount (-20%):</span>
                  <span>-${cryptoDiscount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>{shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}</span>
              </div>
              <div className="border-t border-brand-border/60 pt-2.5 flex justify-between text-sm font-black text-brand-text">
                <span>Grand Total:</span>
                <span className="text-primary-500 font-black">${finalTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── STEP 4: SUCCESS CONFIRMATION ────────────── */}
      {step === 'success' && (
        <div className="max-w-md mx-auto bg-white border border-brand-border rounded-3xl p-8 text-center shadow-brand-md space-y-6 py-12">
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-500 mx-auto animate-scaleIn">
            <CheckCircle size={36} />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-2xl font-black text-brand-text">Order Submitted Successfully!</h1>
            <p className="text-xs text-brand-muted">
              Thank you for shopping with Dragon Pharma! Your order has been received.
            </p>
          </div>

          <div className="bg-brand-soft border border-brand-border rounded-2xl p-4 text-xs space-y-2.5 text-left">
            <div className="flex justify-between">
              <span className="font-bold text-brand-muted">Shipping Est:</span>
              <span className="font-extrabold text-brand-text">
                {shippingForm.speed === 'express' ? '2-5 Business Days' : '10-21 Business Days'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold text-brand-muted">Contact Email:</span>
              <span className="font-extrabold text-brand-text">{shippingForm.email || 'customer@example.com'}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold text-brand-muted">Payment:</span>
              <span className="font-extrabold text-brand-text">
                {paymentMethod === 'bitcoin' && '₿ Bitcoin'}
                {paymentMethod === 'applepay' && '🍎 Apple Pay'}
                {paymentMethod === 'bank' && '🏦 Bank Transfer'}
                {paymentMethod === 'card' && '💳 Credit Card'}
                {paymentMethod === 'zelle' && '⚡ Zelle'}
                {paymentMethod === 'chime' && '🟢 Chime'}
                {paymentMethod === 'paypal' && '🅿️ PayPal'}
                {paymentMethod === 'cashapp' && '💵 Cash App'}
              </span>
            </div>
          </div>

          <p className="text-[10px] text-brand-muted leading-relaxed">
            {paymentMethod === 'bitcoin'
              ? 'Please send the exact BTC amount to the wallet address provided. Your order will be confirmed once payment is detected on the blockchain.'
              : `Our team has received your order and will email you at ${shippingForm.email} with the payment account details shortly. Once you send payment, your order will be confirmed and shipped!`
            }
          </p>

          <Link to="/" className="w-full btn-primary py-3 rounded-xl justify-center font-bold text-sm shadow-md">
            Continue Shopping
          </Link>
        </div>
      )}
    </div>
  );
}
