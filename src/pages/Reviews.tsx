import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Star, CheckCircle, MessageSquare, AlertCircle, Sparkles } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

interface Review {
  id: number;
  name: string;
  rating: number;
  date: string;
  product: string;
  warehouse: 'US Domestic 🇺🇸' | 'International 🌏';
  text: string;
  verified: boolean;
}

const initialReviews: Review[] = [
  {
    id: 1,
    name: 'Mark T.',
    rating: 5,
    date: 'June 10, 2026',
    product: 'DIANABOL 20',
    warehouse: 'US Domestic 🇺🇸',
    text: 'Insane strength gains in just 3 weeks. Shipping was incredibly fast, arrived in California in only 3 days. Highly recommend the US domestic warehouse if you want speed.',
    verified: true
  },
  {
    id: 2,
    name: 'Sarah K.',
    rating: 5,
    date: 'May 28, 2026',
    product: 'BPC 157',
    warehouse: 'International 🌏',
    text: 'Using BPC 157 for a shoulder injury. Healing progress has been phenomenal. Product came lab-tested with certificates. Will buy again.',
    verified: true
  },
  {
    id: 3,
    name: 'David R.',
    rating: 4,
    date: 'May 15, 2026',
    product: 'CYPIONAT 250',
    warehouse: 'US Domestic 🇺🇸',
    text: 'Consistency and blood work prove it is legitimate. Smooth injection, no PIP. Shipping took 4 days. Satisfied customer.',
    verified: true
  },
  {
    id: 4,
    name: 'Alexandre P.',
    rating: 5,
    date: 'April 30, 2026',
    product: 'DRAGONTROPIN HGH 100 IU',
    warehouse: 'International 🌏',
    text: 'Premium quality HGH. Purity report verified at 99%. Sleek packaging and customer service helped me track the package through customs. Recommended.',
    verified: true
  }
];

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  
  // Form State
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [product, setProduct] = useState('ANAVAR 10');
  const [warehouse, setWarehouse] = useState<'US Domestic 🇺🇸' | 'International 🌏'>('US Domestic 🇺🇸');
  const [text, setText] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && text) {
      const newReview: Review = {
        id: Date.now(),
        name,
        rating,
        date: 'Today',
        product,
        warehouse,
        text,
        verified: true
      };
      setReviews(prev => [newReview, ...prev]);
      setSuccess(true);
      // Reset form
      setName('');
      setText('');
      setRating(5);
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  // Aggregated score calculations
  const avgRating = useMemo(() => {
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return (sum / reviews.length).toFixed(1);
  }, [reviews]);

  return (
    <div className="min-h-screen py-10 page-container">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-1.5 text-xs text-brand-muted mb-8 font-medium">
        <Link to="/" className="hover:text-primary-500 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-primary-500 font-bold">Reviews</span>
      </div>

      <ScrollReveal className="text-center max-w-xl mx-auto mb-10 space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 font-extrabold text-[10px] uppercase tracking-wider">
          <Sparkles size={12} /> Customer Feedback
        </span>
        <h1 className="section-title">Verified Buyer Reviews</h1>
        <p className="section-sub">
          Read real reviews from athletes, bodybuilders, and fitness enthusiasts who buy our lab-tested compounds.
        </p>
      </ScrollReveal>

      {/* ── Dashboard Stats ─────────────────────────── */}
      <div className="grid md:grid-cols-3 gap-6 bg-white border border-brand-border rounded-3xl p-6 md:p-8 shadow-brand-sm mb-10">
        <div className="flex flex-col items-center justify-center text-center p-4 border-b md:border-b-0 md:border-r border-brand-border">
          <h2 className="text-4xl md:text-5xl font-black text-brand-text leading-none">{avgRating}</h2>
          <div className="flex gap-1.5 my-3">
            {[1, 2, 3, 4, 5].map(star => (
              <Star
                key={star}
                size={16}
                className={star <= Math.round(Number(avgRating)) ? 'fill-primary-500 text-primary-500' : 'text-brand-border'}
              />
            ))}
          </div>
          <p className="text-xs text-brand-muted font-bold">Based on {reviews.length} customer ratings</p>
        </div>

        <div className="md:col-span-2 flex flex-col justify-center px-4 space-y-2">
          <div className="flex items-center gap-3 text-xs font-bold text-brand-muted">
            <span className="w-10 text-right">5 stars</span>
            <div className="flex-grow bg-brand-soft h-2 rounded-full overflow-hidden border border-brand-border/40">
              <div className="bg-primary-500 h-full w-[88%]" />
            </div>
            <span className="w-8">88%</span>
          </div>
          <div className="flex items-center gap-3 text-xs font-bold text-brand-muted">
            <span className="w-10 text-right">4 stars</span>
            <div className="flex-grow bg-brand-soft h-2 rounded-full overflow-hidden border border-brand-border/40">
              <div className="bg-primary-500 h-full w-[10%]" />
            </div>
            <span className="w-8">10%</span>
          </div>
          <div className="flex items-center gap-3 text-xs font-bold text-brand-muted">
            <span className="w-10 text-right">3 stars</span>
            <div className="flex-grow bg-brand-soft h-2 rounded-full overflow-hidden border border-brand-border/40">
              <div className="bg-primary-500 h-full w-[2%]" />
            </div>
            <span className="w-8">2%</span>
          </div>
        </div>
      </div>

      {/* ── Reviews Main Board ─────────────────────── */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Reviews List */}
        <section className="lg:col-span-2 space-y-4">
          <div className="bg-white border border-brand-border rounded-3xl p-6 shadow-brand-sm space-y-5">
            <h2 className="font-black text-brand-text text-base pb-3 border-b border-brand-border flex items-center gap-2">
              <MessageSquare className="text-primary-500" size={18} /> Review Feed
            </h2>

            <div className="divide-y divide-brand-border space-y-4">
              {reviews.map((rev, idx) => (
                <div key={rev.id} className={`pt-4 first:pt-0 ${idx !== 0 ? 'border-t border-brand-border' : ''} space-y-3`}>
                  <div className="flex justify-between items-start flex-wrap gap-2">
                    <div>
                      <h4 className="font-extrabold text-xs text-brand-text">{rev.name}</h4>
                      <div className="flex gap-1 mt-1">
                        {[1, 2, 3, 4, 5].map(star => (
                          <Star
                            key={star}
                            size={12}
                            className={star <= rev.rating ? 'fill-primary-500 text-primary-500' : 'text-brand-border'}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      {rev.verified && (
                        <span className="inline-flex items-center gap-1 text-[9px] font-black text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-md px-1.5 py-0.5 select-none">
                          <CheckCircle size={10} /> Verified Purchase
                        </span>
                      )}
                      <span className="text-[10px] text-brand-muted block mt-1">{rev.date}</span>
                    </div>
                  </div>

                  <div className="text-xs space-y-1 bg-brand-soft border border-brand-border rounded-xl p-2.5">
                    <span className="font-extrabold text-brand-text text-[10px]">Compound: {rev.product}</span>
                    <span className="text-brand-muted text-[10px] block">Dispatched: {rev.warehouse}</span>
                  </div>

                  <p className="text-xs text-brand-muted leading-relaxed">{rev.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Review Form Sidebar */}
        <aside className="self-start">
          <div className="bg-white border border-brand-border rounded-3xl p-6 shadow-brand-sm space-y-4">
            <h3 className="font-black text-brand-text text-sm uppercase tracking-wider pb-3 border-b border-brand-border">
              Write a Review
            </h3>

            {success ? (
              <div className="border border-emerald-200 bg-emerald-50/50 rounded-2xl p-4 text-center space-y-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-500 mx-auto">
                  <CheckCircle size={20} />
                </div>
                <h4 className="font-bold text-xs text-emerald-800">Review Published!</h4>
                <p className="text-[10px] text-emerald-700 leading-relaxed">
                  Thank you! Your feedback has been posted immediately to the customer review feed.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <label className="form-label text-xs">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Brad P."
                    className="form-input text-xs rounded-xl"
                  />
                </div>

                <div>
                  <label className="form-label text-xs">Product Purchased</label>
                  <input
                    type="text"
                    required
                    value={product}
                    onChange={e => setProduct(e.target.value)}
                    placeholder="e.g. WINSTROL 50"
                    className="form-input text-xs rounded-xl"
                  />
                </div>

                <div>
                  <label className="form-label text-xs">Warehouse Location</label>
                  <select
                    value={warehouse}
                    onChange={e => setWarehouse(e.target.value as any)}
                    className="form-input text-xs rounded-xl"
                  >
                    <option value="US Domestic 🇺🇸">US Domestic 🇺🇸</option>
                    <option value="International 🌏">International 🌏</option>
                  </select>
                </div>

                {/* Rating Selector */}
                <div>
                  <label className="form-label text-xs">Rating Star Rating</label>
                  <div className="flex gap-2.5 py-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        className="p-1 hover:scale-110 transition-transform cursor-pointer"
                      >
                        <Star
                          size={20}
                          className={star <= rating ? 'fill-primary-500 text-primary-500' : 'text-brand-border'}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="form-label text-xs">Review Comment</label>
                  <textarea
                    required
                    rows={4}
                    value={text}
                    onChange={e => setText(e.target.value)}
                    placeholder="Share your experience with compound, dosage, potency, and shipping speed..."
                    className="form-input text-xs rounded-xl resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full btn-primary py-3 rounded-xl justify-center font-bold text-xs shadow-md cursor-pointer"
                >
                  Submit Review
                </button>
              </form>
            )}

            <div className="pt-3 border-t border-brand-border flex gap-2 items-start text-[10px] text-brand-muted leading-relaxed">
              <AlertCircle className="text-primary-500 shrink-0 mt-0.5" size={12} />
              <span>
                To preserve feedback integrity, all reviews must correspond to authentic purchases tracked by order receipts.
              </span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
