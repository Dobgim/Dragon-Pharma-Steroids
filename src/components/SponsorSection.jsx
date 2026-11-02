import React from 'react';

export default function SponsorSection() {
  const gateways = [
    { name: 'PayPal', file: 'paypal.png' },
    { name: 'Stripe', file: 'stripe.png' },
    { name: 'Mollie', file: 'mollie.png' },
    { name: 'Perfect Money', file: 'perfectmoney.png' },
    { name: 'Coinbase', file: 'coinbase.png' },
    { name: 'Paystack', file: 'paystack.png' },
    { name: 'VoguePay', file: 'voguepay.png' },
    { name: 'Flutterwave', file: 'flutterwave.png' },
    { name: 'CoinGate', file: 'coingate.png' },
    { name: 'Monnify', file: 'monnify.svg' },
    { name: 'SecurionPay', file: 'securionpay.png' },
    { name: 'CoinPayments', file: 'coinpayments.svg' },
    { name: 'NOWPayments', file: 'nowpayments.png' },
    { name: 'Coinremitter', file: 'coinremitter.png' },
    { name: 'Cryptomus', file: 'cryptomus.png' },
    { name: 'PayMongo', file: 'paymongo.png' },
    { name: 'BTCPayServer', file: 'btcpayserver.png' },
    { name: 'Binance', file: 'binance.svg' },
    { name: 'Cashmaal', file: 'cashmaal.png' },
    { name: 'Block.io', file: 'blockio.png' },
    { name: 'Blockchain', file: 'blockchain.png' },
    { name: 'Instamojo', file: 'instamojo.png' },
    { name: 'Paytm', file: 'paytm.png' },
    { name: 'Razorpay', file: 'razorpay.png' },
    { name: '2Checkout', file: 'twocheckout.png' },
  ];

  return (
    <section className="sponsor-section" id="sponsors">
      <div className="container">
        <div className="sponsor-main-wrapper">
          <div className="sponsor-marquee-container">
            <div className="sponsor-marquee-track">
              {/* Duplicate array for seamless infinite looping */}
              {[...gateways, ...gateways].map((gw, idx) => (
                <div key={idx} className="sponsor-item" style={{ flexShrink: 0, padding: '0 10px' }}>
                  <div className="sponsor-thumb">
                    <img
                      src={`/assets/global/gateway/${gw.file}`}
                      alt={gw.name}
                      style={{ maxHeight: '45px', width: 'auto', objectFit: 'contain' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
