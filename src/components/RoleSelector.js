import React, { useState } from 'react';
import { useAppContext } from '../AppContext';
import { useAuth } from '../AuthContext';
import '../styles/RoleSelector.css';

const RoleSelector = () => {
  const { role, setRole } = useAppContext();
  const { user, setUser, setUserRole } = useAuth();
  const [showCredentialModal, setShowCredentialModal] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [errors, setErrors] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRoleChange = (e) => {
    const newRole = e.target.value;
    
    // If switching to Admin, show credential modal
    if (newRole === 'Admin') {
      setShowCredentialModal(true);
      setErrors('');
      setAdminEmail('');
      setAdminPassword('');
      // Reset select to current role
      e.target.value = role;
    } else {
      // Switching to Viewer - no credentials needed
      setRole('Viewer');
      const roleValue = 'viewer';
      setUserRole(roleValue);
      
      if (user) {
        const updatedUser = { ...user, role: roleValue };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
    }
  };

  const handleCredentialSubmit = async (e) => {
    e.preventDefault();
    setErrors('');
    setLoading(true);

    // Validate credentials (mock implementation - replace with actual backend call)
    if (adminEmail === 'admin@example.com' && adminPassword === 'admin123') {
      // Credentials correct - switch to Admin
      setRole('Admin');
      const roleValue = 'admin';
      setUserRole(roleValue);
      
      if (user) {
        const updatedUser = { ...user, role: roleValue };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
      
      setShowCredentialModal(false);
      setAdminEmail('');
      setAdminPassword('');
    } else {
      // Invalid credentials
      setErrors('Invalid email or password');
    }
    
    setLoading(false);
  };

  const handleModalClose = () => {
    setShowCredentialModal(false);
    setAdminEmail('');
    setAdminPassword('');
    setErrors('');
  };

  return (
    <>
      <div className="role-selector-container">
        <label className="role-selector-label">Switch Role:</label>
        <select
          value={role}
          onChange={handleRoleChange}
          className="role-selector-input"
        >
          <option value="Viewer">Viewer</option>
          <option value="Admin">Admin</option>
        </select>
      </div>

      {/* Credential Modal */}
      {showCredentialModal && (
        <div className="role-modal-overlay" onClick={handleModalClose}>
          <div className="role-modal" onClick={(e) => e.stopPropagation()}>
            <div className="role-modal-header">
              <h3>Admin Access Required</h3>
              <button 
                className="role-modal-close"
                onClick={handleModalClose}
              >
                ✕
              </button>
            </div>
            
            <div className="role-modal-content">
              <p>Please enter admin credentials to switch to Admin role.</p>
              
              <form onSubmit={handleCredentialSubmit}>
                <div className="role-form-group">
                  <label htmlFor="admin-email">Email:</label>
                  <input
                    id="admin-email"
                    type="email"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    placeholder="admin@example.com"
                    className="role-form-input"
                    disabled={loading}
                  />
                </div>

                <div className="role-form-group">
                  <label htmlFor="admin-password">Password:</label>
                  <input
                    id="admin-password"
                    type="password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="••••••••"
                    className="role-form-input"
                    disabled={loading}
                  />
                </div>

                {errors && (
                  <div className="role-error-message">
                    ⚠️ {errors}
                  </div>
                )}

                <div className="role-modal-actions">
                  <button
                    type="button"
                    className="role-btn-cancel"
                    onClick={handleModalClose}
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="role-btn-submit"
                    disabled={loading}
                  >
                    {loading ? 'Verifying...' : 'Continue'}
                  </button>
                </div>
              </form>

              <div className="role-hint-text">
                <small>Demo credentials: admin@example.com / admin123</small>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RoleSelector;