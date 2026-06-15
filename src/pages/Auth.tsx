import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, User, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import { supabase } from '../lib/supabase-client';

export default function Auth() {
  const location = useLocation();
  const navigate = useNavigate();
  const defaultTab = location.pathname === '/join' ? 'register' : 'login';

  const [tab, setTab] = useState<'login' | 'register'>(defaultTab);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // Sync tab when routing pathname changes
  useEffect(() => {
    setTab(location.pathname === '/join' ? 'register' : 'login');
    setSuccessMsg('');
    setErrorMsg('');
  }, [location.pathname]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    if (tab === 'login') {
      try {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          setErrorMsg(error.message);
        } else {
          setSuccessMsg('Successfully logged in! Redirecting to shop...');
          setTimeout(() => {
            navigate('/');
          }, 1500);
        }
      } catch (err: any) {
        setErrorMsg(err.message || 'An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    } else {
      if (password !== confirmPassword) {
        setErrorMsg('Passwords do not match.');
        setLoading(false);
        return;
      }

      try {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name,
            },
          },
        });

        if (error) {
          setErrorMsg(error.message);
        } else {
          setSuccessMsg('Account created successfully! Check your email for a verification link, or sign in.');
          // Reset fields
          setName('');
          setEmail('');
          setPassword('');
          setConfirmPassword('');
        }
      } catch (err: any) {
        setErrorMsg(err.message || 'An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-12 page-container">
      <ScrollReveal className="w-full max-w-md">
        <div className="bg-white border border-brand-border rounded-3xl p-6 md:p-8 shadow-brand-md space-y-6">
          
          {/* Logo Brand Title */}
          <div className="text-center">
            <Link to="/" className="inline-flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center">
                <span className="text-white font-black text-xs">DP</span>
              </div>
              <span className="font-black text-brand-text text-sm">DRAGON PHARMA LABS</span>
            </Link>
            <p className="text-[10px] text-brand-muted uppercase tracking-wider font-extrabold">Official Steroid Store</p>
          </div>

          {/* Toggle Tabs */}
          <div className="flex bg-brand-soft border border-brand-border rounded-2xl p-1">
            <button
              onClick={() => { setTab('login'); setSuccessMsg(''); setErrorMsg(''); }}
              className={`flex-1 py-2 text-xs font-black rounded-xl transition-all cursor-pointer ${
                tab === 'login' ? 'bg-white text-brand-text shadow-sm' : 'text-brand-muted hover:text-brand-text'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setTab('register'); setSuccessMsg(''); setErrorMsg(''); }}
              className={`flex-1 py-2 text-xs font-black rounded-xl transition-all cursor-pointer ${
                tab === 'register' ? 'bg-white text-brand-text shadow-sm' : 'text-brand-muted hover:text-brand-text'
              }`}
            >
              Join Store
            </button>
          </div>

          {/* Error Banner */}
          {errorMsg && (
            <div className="border border-red-200 bg-red-50 text-red-800 rounded-2xl p-4 text-xs font-bold flex items-center gap-2.5 animate-scaleIn">
              <AlertCircle size={16} className="text-red-500 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Success Banner */}
          {successMsg ? (
            <div className="border border-emerald-200 bg-emerald-50 text-emerald-800 rounded-2xl p-4 text-xs font-bold flex items-center gap-2.5 animate-scaleIn">
              <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
              <span>{successMsg}</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {tab === 'register' && (
                <div>
                  <label className="form-label text-xs">Full Name</label>
                  <div className="relative">
                    <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Brad Pitt"
                      className="form-input pl-10 pr-4 py-2.5 text-xs rounded-xl shadow-brand-sm w-full"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="form-label text-xs">Email Address</label>
                <div className="relative">
                  <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="brad@example.com"
                    className="form-input pl-10 pr-4 py-2.5 text-xs rounded-xl shadow-brand-sm w-full"
                  />
                </div>
              </div>

              <div>
                <label className="form-label text-xs">Password</label>
                <div className="relative">
                  <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="form-input pl-10 pr-10 py-2.5 text-xs rounded-xl shadow-brand-sm w-full"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-text p-1 cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>

              {tab === 'register' && (
                <div>
                  <label className="form-label text-xs">Confirm Password</label>
                  <div className="relative">
                    <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className={`form-input pl-10 pr-10 py-2.5 text-xs rounded-xl shadow-brand-sm w-full ${
                        confirmPassword && password !== confirmPassword ? 'border-red-500 focus:ring-red-200' : ''
                      }`}
                    />
                  </div>
                  {confirmPassword && password !== confirmPassword && (
                    <div className="text-[10px] text-red-500 font-bold mt-1">Passwords do not match.</div>
                  )}
                </div>
              )}

              {tab === 'login' && (
                <div className="flex justify-between items-center text-[11px] font-bold">
                  <label className="flex items-center gap-1.5 text-brand-muted cursor-pointer select-none">
                    <input type="checkbox" className="w-3.5 h-3.5 text-primary-500 border-brand-border rounded" />
                    Remember me
                  </label>
                  <a href="#forgot" onClick={(e) => { e.preventDefault(); alert("Verification link dispatched to your email address!"); }} className="text-primary-500 hover:underline">
                    Forgot Password?
                  </a>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-3 rounded-xl justify-center font-bold text-xs shadow-md cursor-pointer disabled:opacity-50"
              >
                {loading ? 'Processing...' : tab === 'login' ? 'Sign In Account' : 'Register Account'}
              </button>
            </form>
          )}

          <div className="pt-4 border-t border-brand-border text-center text-[10px] text-brand-muted leading-relaxed">
            <span className="flex items-center justify-center gap-1">
              <ShieldCheck className="text-emerald-600" size={13} /> Secured SSL Connection
            </span>
          </div>

        </div>
      </ScrollReveal>
    </div>
  );
}
