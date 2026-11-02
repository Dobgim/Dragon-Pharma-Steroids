import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: 'United States',
    phone: '',
    password: '',
    confirmPassword: '',
    agree: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match. Please re-enter.');
      return;
    }
    if (!formData.agree) {
      setError('You must accept the Terms and Conditions to proceed.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setMessage('Registration successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    }, 1200);
  };

  const countries = [
    'United States',
    'United Kingdom',
    'Canada',
    'Australia',
    'Germany',
    'France',
    'Singapore',
    'United Arab Emirates',
    'Switzerland',
    'Other International',
  ];

  return (
    <section className="auth-inner section-space">
      <div className="container">
        <div className="auth-wrapper sing-up shadow-lg">
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
            <h2 className="title h4 fw-bold">Open An Account</h2>
            <p className="text-secondary small">Join thousands of verified members managing modern finances</p>
          </div>

          {error && (
            <div className="alert alert-danger py-2 text-center small mb-3">
              <i className="fa-solid fa-triangle-exclamation me-2"></i> {error}
            </div>
          )}

          {message && (
            <div className="alert alert-success py-2 text-center small mb-3">
              <i className="fa-solid fa-circle-check me-2"></i> {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-main-from">
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold small">First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  className="form-control py-2"
                  placeholder="e.g. John"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold small">Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  className="form-control py-2"
                  placeholder="e.g. Doe"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold small">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  className="form-control py-2"
                  placeholder="e.g. john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold small">Country of Residence *</label>
                <select
                  name="country"
                  className="form-select py-2"
                  value={formData.country}
                  onChange={handleChange}
                >
                  {countries.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold small">Mobile Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  className="form-control py-2"
                  placeholder="+1 (555) 123-4567"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold small">Password *</label>
                <div className="input-group">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    className="form-control py-2 border-end-0"
                    placeholder="Create password"
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

              <div className="col-md-6">
                <label className="form-label fw-semibold small">Confirm Password *</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  className="form-control py-2"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-12">
                <div className="form-check my-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="agree"
                    id="termsCheck"
                    checked={formData.agree}
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label small text-secondary" htmlFor="termsCheck">
                    I agree to the{' '}
                    <Link to="/terms-and-conditions" target="_blank" className="text-primary text-decoration-none">
                      Terms &amp; Conditions
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy-policy" target="_blank" className="text-primary text-decoration-none">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
              </div>

              <div className="col-12">
                <button type="submit" className="site-btn gdt-btn w-100 py-3 mb-3" disabled={loading}>
                  {loading ? 'Registering Account...' : 'Create Account'}
                </button>
              </div>

              <div className="col-12 text-center text-secondary small">
                Already have an account?{' '}
                <Link to="/login" className="fw-bold text-primary text-decoration-none">
                  Log In Here
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
