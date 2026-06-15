import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Eye, EyeOff, Lock, Mail, AlertCircle } from 'lucide-react';

const ADMIN_EMAIL = 'contact@dragonpharma.online';
const ADMIN_PASSWORD = 'DragonAdmin2025!';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        sessionStorage.setItem('dp_admin_auth', 'true');
        navigate('/admin/dashboard');
      } else {
        setError('Invalid credentials. Please try again.');
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0f 0%, #0f1a2e 40%, #1a0a1e 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      fontFamily: "'Inter', 'Outfit', sans-serif",
    }}>
      {/* Background glow effects */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '-200px', left: '50%', transform: 'translateX(-50%)',
          width: '600px', height: '600px',
          background: 'radial-gradient(circle, rgba(220,38,38,0.15) 0%, transparent 70%)',
          borderRadius: '50%',
        }} />
        <div style={{
          position: 'absolute', bottom: '-100px', right: '-100px',
          width: '400px', height: '400px',
          background: 'radial-gradient(circle, rgba(139,0,0,0.1) 0%, transparent 70%)',
          borderRadius: '50%',
        }} />
      </div>

      <div style={{ width: '100%', maxWidth: '440px', position: 'relative', zIndex: 1 }}>
        {/* Logo Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            width: '72px', height: '72px', borderRadius: '20px',
            background: 'linear-gradient(135deg, #dc2626, #7f1d1d)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px',
            boxShadow: '0 0 40px rgba(220,38,38,0.4)',
          }}>
            <Shield size={34} color="white" />
          </div>
          <h1 style={{
            fontSize: '26px', fontWeight: 800, color: '#ffffff',
            letterSpacing: '-0.5px', marginBottom: '6px',
          }}>
            Admin Portal
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '14px' }}>
            Dragon Pharma Store — Restricted Access
          </p>
        </div>

        {/* Login Card */}
        <div style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '24px',
          padding: '40px',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
        }}>
          <form onSubmit={handleLogin}>
            {/* Email */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block', fontSize: '12px', fontWeight: 600,
                color: '#94a3b8', letterSpacing: '0.05em', textTransform: 'uppercase',
                marginBottom: '8px',
              }}>
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{
                  position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)',
                  color: '#64748b',
                }} />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="contact@dragonpharma.online"
                  required
                  style={{
                    width: '100%', padding: '12px 14px 12px 42px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px', color: '#ffffff', fontSize: '14px',
                    outline: 'none', boxSizing: 'border-box',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={e => e.target.style.borderColor = 'rgba(220,38,38,0.6)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block', fontSize: '12px', fontWeight: 600,
                color: '#94a3b8', letterSpacing: '0.05em', textTransform: 'uppercase',
                marginBottom: '8px',
              }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{
                  position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)',
                  color: '#64748b',
                }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  style={{
                    width: '100%', padding: '12px 42px 12px 42px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px', color: '#ffffff', fontSize: '14px',
                    outline: 'none', boxSizing: 'border-box',
                  }}
                  onFocus={e => e.target.style.borderColor = 'rgba(220,38,38,0.6)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', padding: 0,
                  }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.3)',
                borderRadius: '10px', padding: '10px 14px', marginBottom: '20px',
                color: '#fca5a5', fontSize: '13px',
              }}>
                <AlertCircle size={14} />
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', padding: '14px',
                background: loading
                  ? 'rgba(220,38,38,0.5)'
                  : 'linear-gradient(135deg, #dc2626, #b91c1c)',
                border: 'none', borderRadius: '12px',
                color: '#ffffff', fontSize: '15px', fontWeight: 700,
                cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: loading ? 'none' : '0 8px 24px rgba(220,38,38,0.35)',
                transition: 'all 0.2s', letterSpacing: '0.02em',
              }}
            >
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <span style={{
                    width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)',
                    borderTopColor: '#fff', borderRadius: '50%',
                    animation: 'spin 0.7s linear infinite', display: 'inline-block',
                  }} />
                  Authenticating...
                </span>
              ) : 'Sign In to Admin Panel'}
            </button>
          </form>
        </div>

        {/* Footer note */}
        <p style={{
          textAlign: 'center', marginTop: '24px',
          color: 'rgba(148,163,184,0.5)', fontSize: '12px',
        }}>
          🔒 Secure Admin Access · Dragon Pharma © {new Date().getFullYear()}
        </p>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        input::placeholder { color: rgba(148,163,184,0.4); }
      `}</style>
    </div>
  );
}
