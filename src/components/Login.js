import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import './Login.css';

/**
 * Login Component
 * Provides two authentication methods:
 * - Viewer: Read-only access with a key
 * - Admin: Full access with email/password credentials
 */
const Login = () => {
  const { loginViewer, loginAdmin, loading, error } = useAuth();
  const [loginMode, setLoginMode] = useState('viewer'); // 'viewer' or 'admin'
  const [viewerKey, setViewerKey] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [localError, setLocalError] = useState('');

  const handleViewerLogin = async (e) => {
    e.preventDefault();
    setLocalError('');
    if (!viewerKey.trim()) {
      setLocalError('Please enter a viewer key');
      return;
    }
    await loginViewer(viewerKey);
    setViewerKey('');
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setLocalError('');
    if (!adminEmail.trim() || !adminPassword.trim()) {
      setLocalError('Please enter both email and password');
      return;
    }
    await loginAdmin(adminEmail, adminPassword);
    setAdminEmail('');
    setAdminPassword('');
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        {/* Header */}
        <div className="login-header">
          <div className="login-logo">💰</div>
          <h1>MoneyMate</h1>
          <p>Smart Finance Management</p>
        </div>

        {/* Mode Toggle */}
        <div className="login-toggle">
          <button
            className={`toggle-btn ${loginMode === 'viewer' ? 'active' : ''}`}
            onClick={() => setLoginMode('viewer')}
          >
            👁️ Viewer
          </button>
          <button
            className={`toggle-btn ${loginMode === 'admin' ? 'active' : ''}`}
            onClick={() => setLoginMode('admin')}
          >
            🔐 Admin
          </button>
        </div>

        {/* Error Message */}
        {(error || localError) && (
          <div className="login-error">
            <span>⚠️</span>
            <p>{error || localError}</p>
          </div>
        )}

        {/* Viewer Login Form */}
        {loginMode === 'viewer' && (
          <form onSubmit={handleViewerLogin} className="login-form">
            <div className="form-group">
              <label htmlFor="viewer-key">Viewer Access Key</label>
              <input
                id="viewer-key"
                type="password"
                placeholder="Enter your viewer access key"
                value={viewerKey}
                onChange={(e) => setViewerKey(e.target.value)}
                disabled={loading}
              />
              <small>📌 Demo key: viewer123</small>
            </div>
            <button type="submit" disabled={loading} className="login-btn">
              {loading ? 'Logging in...' : 'Access Dashboard'}
            </button>
            <p className="login-info">
              📖 Viewer mode: Read-only access. You can view all data but cannot make changes.
            </p>
          </form>
        )}

        {/* Admin Login Form */}
        {loginMode === 'admin' && (
          <form onSubmit={handleAdminLogin} className="login-form">
            <div className="form-group">
              <label htmlFor="admin-email">Email</label>
              <input
                id="admin-email"
                type="email"
                placeholder="Enter your email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                disabled={loading}
              />
              <small>📌 Demo email: admin@example.com</small>
            </div>
            <div className="form-group">
              <label htmlFor="admin-password">Password</label>
              <input
                id="admin-password"
                type="password"
                placeholder="Enter your password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                disabled={loading}
              />
              <small>📌 Demo password: admin123</small>
            </div>
            <button type="submit" disabled={loading} className="login-btn">
              {loading ? 'Logging in...' : 'Login as Admin'}
            </button>
            <p className="login-info">
              🔐 Admin mode: Full access. You can view, edit, and delete data.
            </p>
          </form>
        )}

        {/* Footer */}
        <div className="login-footer">
          <p>🔒 Your data is secure and encrypted</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
