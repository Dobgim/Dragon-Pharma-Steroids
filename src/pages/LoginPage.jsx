import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    remember: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setMessage('Login successful! Redirecting to dashboard...');
      setTimeout(() => {
        navigate('/');
      }, 1500);
    }, 1000);
  };

  return (
    <section className="auth-inner section-space">
      <div className="container">
        <div className="auth-wrapper shadow-lg">
          <div className="auth-from-top-content text-center mb-4">
            <div className="auth-logo mb-3">
              <Link to="/">
                <img
                  src="/assets/global/images/C0rUJeX0NuUY62jC1nNw.png"
                  alt="WorkTrust International"
                  style={{ height: 'auto', width: '160px' }}
                />
              </Link>
            </div>
            <h2 className="title h4 fw-bold">Sign In to WorkTrust</h2>
            <p className="text-secondary small">Access your multi-currency wallet and banking dashboard</p>
          </div>

          {message && (
            <div className="alert alert-success py-2 text-center small mb-3">
              <i className="fa-solid fa-circle-check me-2"></i> {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-main-from">
            <div className="mb-3">
              <label className="form-label fw-semibold small">Email or Username *</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0">
                  <i className="fa-solid fa-user text-secondary"></i>
                </span>
                <input
                  type="text"
                  name="username"
                  className="form-control py-2 border-start-0"
                  placeholder="Enter email or username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <div className="d-flex justify-content-between align-items-center">
                <label className="form-label fw-semibold small">Password *</label>
                <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Password reset link will be sent to your registered email.'); }} className="small text-primary text-decoration-none">
                  Forgot Password?
                </a>
              </div>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0">
                  <i className="fa-solid fa-lock text-secondary"></i>
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  className="form-control py-2 border-start-0 border-end-0"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="input-group-text bg-light border-start-0"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i className={`fa-regular ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-secondary`}></i>
                </button>
              </div>
            </div>

            <div className="form-check mb-4">
              <input
                className="form-check-input"
                type="checkbox"
                name="remember"
                id="rememberCheck"
                checked={formData.remember}
                onChange={handleChange}
              />
              <label className="form-check-label small text-secondary" htmlFor="rememberCheck">
                Remember this device for 30 days
              </label>
            </div>

            <button type="submit" className="site-btn gdt-btn w-100 py-3 mb-3" disabled={loading}>
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>

            <div className="text-center text-secondary small">
              Don't have an account yet?{' '}
              <Link to="/register" className="fw-bold text-primary text-decoration-none">
                Sign Up Now
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
