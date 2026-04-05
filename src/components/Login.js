import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import '../styles/Login.css';

/**
 * Login Component
 * Provides three authentication methods:
 * - Viewer: Read-only access with a key
 * - Admin: Full access with email/password credentials
 * - Register: Create new admin account
 */
const Login = () => {
  const { loginViewer, loginAdmin, loading, error } = useAuth();
  const [loginMode, setLoginMode] = useState('viewer'); // 'viewer', 'admin', or 'register'
  const [viewerKey, setViewerKey] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
  const [viewerAccessKey, setViewerAccessKey] = useState('');
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

  const handleRegister = async (e) => {
    e.preventDefault();
    setLocalError('');
    
    if (!registerEmail.trim() || !registerPassword.trim() || !registerConfirmPassword.trim() || !viewerAccessKey.trim()) {
      setLocalError('Please fill in all fields');
      return;
    }

    if (registerPassword !== registerConfirmPassword) {
      setLocalError('Passwords do not match');
      return;
    }

    if (registerPassword.length < 6) {
      setLocalError('Password must be at least 6 characters');
      return;
    }

    // Register new admin
    try {
      const newAdmin = {
        id: 'admin-' + Date.now(),
        name: registerEmail.split('@')[0],
        email: registerEmail,
        password: registerPassword,
        role: 'admin',
        viewerAccessKey: viewerAccessKey,
        canEdit: true,
        createdAt: new Date().toISOString()
      };
      
      // Store admin in localStorage (in production, send to backend)
      const adminsList = JSON.parse(localStorage.getItem('adminsList') || '[]');
      adminsList.push(newAdmin);
      localStorage.setItem('adminsList', JSON.stringify(adminsList));
      
      // Auto-login with new account
      await loginAdmin(registerEmail, registerPassword);
      setRegisterEmail('');
      setRegisterPassword('');
      setRegisterConfirmPassword('');
      setViewerAccessKey('');
    } catch (err) {
      setLocalError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        {/* Header */}
        <div className="login-header">
          <div className="login-logo"></div>
          <h1>Dashboard UI</h1>
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

        {/* Register Link for Admin */}
        {(loginMode === 'admin') && (
          <div style={{ textAlign: 'center', marginTop: '12px', fontSize: '13px' }}>
            <span style={{ color: '#666' }}>New admin? </span>
            <button
              onClick={() => setLoginMode('register')}
              style={{
                background: 'none',
                border: 'none',
                color: '#6366f1',
                cursor: 'pointer',
                fontWeight: '600',
                textDecoration: 'underline'
              }}
            >
              Register here
            </button>
          </div>
        )}

        {/* Back to Admin Link for Register */}
        {(loginMode === 'register') && (
          <div style={{ textAlign: 'center', marginTop: '12px', fontSize: '13px' }}>
            <span style={{ color: '#666' }}>Already have an account? </span>
            <button
              onClick={() => setLoginMode('admin')}
              style={{
                background: 'none',
                border: 'none',
                color: '#6366f1',
                cursor: 'pointer',
                fontWeight: '600',
                textDecoration: 'underline'
              }}
            >
              Login here
            </button>
          </div>
        )}

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
                placeholder="Demo Key: viewer123"
                value={viewerKey}
                onChange={(e) => setViewerKey(e.target.value)}
                disabled={loading}
              />
              
            </div>
            <button type="submit" disabled={loading} className="login-btn">
              {loading ? 'Logging in...' : 'Access Dashboard'}
            </button>
          
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
              
            </div>
            <button type="submit" disabled={loading} className="login-btn">
              {loading ? 'Logging in...' : 'Login as Admin'}
            </button>
          
          </form>
        )}

        {/* Register Admin Form */}
        {loginMode === 'register' && (
          <form onSubmit={handleRegister} className="login-form">
            <div className="form-group">
              <label htmlFor="register-email">Email</label>
              <input
                id="register-email"
                type="email"
                placeholder="Enter your email"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label htmlFor="register-password">Password</label>
              <input
                id="register-password"
                type="password"
                placeholder="Min 6 characters"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label htmlFor="register-confirm">Confirm Password</label>
              <input
                id="register-confirm"
                type="password"
                placeholder="Confirm password"
                value={registerConfirmPassword}
                onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label htmlFor="viewer-access-key">Viewer Access Key</label>
              <input
                id="viewer-access-key"
                type="text"
                placeholder="Create a key for viewers (e.g., viewer123)"
                value={viewerAccessKey}
                onChange={(e) => setViewerAccessKey(e.target.value)}
                disabled={loading}
              />
            </div>
            <button type="submit" disabled={loading} className="login-btn">
              {loading ? 'Creating Account...' : 'Create Admin Account'}
            </button>
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
