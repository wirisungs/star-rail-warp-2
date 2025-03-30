import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import soundService from '../services/SoundService';
import { useTranslation } from 'react-i18next';

const AuthPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login, register } = useAuth();

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (error) setError('');
  };

  const validateForm = () => {
    if (!formData.username || !formData.password) {
      setError(t('auth.error.required_fields'));
      return false;
    }
    if (!isLogin && !formData.email) {
      setError(t('auth.error.email_required'));
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      setError('');

      if (isLogin) {
        console.log('Attempting login with username:', formData.username);
        await login(formData.username, formData.password);
      } else {
        console.log('Attempting registration with username:', formData.username);
        await register(formData.username, formData.password, formData.email);
      }

      soundService.playSound('menu-select');
      navigate('/');
    } catch (err) {
      console.error('Auth error:', err);
      setError(err.response?.data?.message || t('auth.error.general'));
      soundService.playSound('menu-close');
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setFormData({
      username: '',
      password: '',
      email: ''
    });
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <LazyLoadImage
          effect="opacity"
          alt="Game Logo"
          src={`assets/menu/${t('language')}/logo.webp`}
          draggable="false"
          width={200}
        />
        <h2>{isLogin ? t('auth.login') : t('auth.register')}</h2>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder={t('auth.username')}
              disabled={loading}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder={t('auth.password')}
              disabled={loading}
              required
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t('auth.email')}
                disabled={loading}
                required
              />
            </div>
          )}

          <button type="submit" disabled={loading}>
            {loading ? t('auth.loading') : (isLogin ? t('auth.login') : t('auth.register'))}
          </button>
        </form>

        <p className="toggle-mode" onClick={toggleMode}>
          {isLogin ? t('auth.no_account') : t('auth.has_account')}
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
