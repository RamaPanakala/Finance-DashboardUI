import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { useAppContext } from '../AppContext';
import '../styles/Profile.css';

/**
 * Profile Component
 * Allows users to create and edit their profile information
 * Fields: Name, Email, Phone Number
 */
const Profile = ({ onClose }) => {
  const { user, updateProfile, loading, setUserRole, currency, logout} = useAuth();
  
  const { role, setRole } = useAppContext();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });
  const [isEditing, setIsEditing] = useState(!user?.name);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [showCredentialModal, setShowCredentialModal] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [credentialError, setCredentialError] = useState('');
  const [credentialLoading, setCredentialLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRoleChange = (e) => {
    const newRole = e.target.value;
    
    // If switching to Admin, show credential modal
    if (newRole === 'Admin') {
      setShowCredentialModal(true);
      setCredentialError('');
      setAdminEmail('');
      setAdminPassword('');
    } else {
      // Switching to Viewer - no credentials needed
      setRole('Viewer');
      const roleValue = 'viewer';
      setUserRole(roleValue);
      
      if (user) {
        const updatedUser = { ...user, role: roleValue };
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
    }
  };

  const handleCredentialSubmit = async (e) => {
    e.preventDefault();
    setCredentialError('');
    setCredentialLoading(true);

    // Validate credentials (mock implementation - replace with actual backend call)
    if (adminEmail === 'admin@gmail.com' && adminPassword === 'admin123') {
      // Credentials correct - switch to Admin
      setRole('Admin');
      const roleValue = 'admin';
      setUserRole(roleValue);
      
      if (user) {
        const updatedUser = { ...user, role: roleValue };
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
      
      setShowCredentialModal(false);
      setAdminEmail('');
      setAdminPassword('');
      setSuccess('Role switched to Admin successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } else {
      // Invalid credentials
      setCredentialError('Invalid email or password');
    }
    
    setCredentialLoading(false);
  };

  const handleModalClose = () => {
    setShowCredentialModal(false);
    setAdminEmail('');
    setAdminPassword('');
    setCredentialError('');
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!formData.name.trim()) {
      setError('Name is required');
      return;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return;
    }
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email');
      return;
    }
    if (!formData.phone.trim()) {
      setError('Phone number is required');
      return;
    }

    try {
      await updateProfile(formData);
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message);
    }
  };
  const handleLogout = () => {
  logout();
  setRole('Viewer');
  window.location.href = '/login';
};

  return (
    <div className="profile-modal">
      <div className="profile-content">
        {/* Header */}
        <div className="profile-header">
          <h2>👤 My Profile</h2>
          <button className="profile-close-btn" onClick={onClose}>✕</button>
        </div>

        {/* Success Message */}
        {success && (
          <div className="profile-success">
            <span>✓</span>
            <p>{success}</p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="profile-error">
            <span>⚠️</span>
            <p>{error}</p>
          </div>
        )}

        {/* Profile Info View */}
        {!isEditing && (
          <div className="profile-info">
            <div className="profile-avatar">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="profile-details">
              <h3>User Information</h3>
              
              {/* Always Show: Name */}
              <div className="info-row">
                <label>Name:</label>
                <p>{user?.name || 'Not set'}</p>
              </div>

              {/* Show if Admin: Email and Phone */}
              {role === 'Admin' && (
                <>
                  <div className="info-row admin-section">
                    <label>Admin Email:</label>
                    <p>{user?.email || 'Not set'}</p>
                  </div>
                  <div className="info-row admin-section">
                    <label>Phone:</label>
                    <p>{user?.phone || 'Not set'}</p>
                  </div>
                </>
              )}

              {/* Current Role Display */}
              <div className="info-row">
                <label>Current Role:</label>
                <p className={`role-badge ${role?.toLowerCase()}`}>
                  {role === 'Admin' ? '🔐 Admin' : '👁️ Viewer'}
                </p>
              </div>

              {/* Switch Role */}
              <div className="info-row">
                <label>Switch Role:</label>
                <select
                  value={role || 'Viewer'}
                  onChange={handleRoleChange}
                  className="role-selector-input"
                >
                  <option value="Viewer">Viewer</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>

              {/* Show only for Admin: Edit button */}
              {role === 'Admin' && (
                <button 
                  className="profile-edit-btn"
                  onClick={() => setIsEditing(true)}
                >
                  ✏️ Edit Profile
                </button>
                
              )}
              <button 
      className="profile-logout-btn"
      onClick={handleLogout}
    >
      🚪 Logout
    </button>
            </div>
          </div>
        )}

        {/* Profile Edit Form */}
        {isEditing && (
          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number *</label>
              <input
                id="phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                disabled={loading}
              />
            </div>

            <div className="form-actions">
              <button 
                type="button"
                className="profile-cancel-btn"
                onClick={() => setIsEditing(false)}
                disabled={loading}
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="profile-save-btn"
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save Profile'}
              </button>
            </div>
          </form>
        )}

      {/* Credential Modal */}
      {showCredentialModal && (
        <div className="profile-modal-overlay" onClick={handleModalClose}>
          <div className="profile-credential-modal" onClick={(e) => e.stopPropagation()}>
            <div className="profile-modal-header">
              <h3>🔐 Admin Access Required</h3>
              <button 
                className="profile-close-btn"
                onClick={handleModalClose}
              >
                ✕
              </button>
            </div>
            
            {credentialError && (
              <div className="profile-error">
                <span>⚠️</span>
                <p>{credentialError}</p>
              </div>
            )}

            <form onSubmit={handleCredentialSubmit} className="profile-form">
              <div className="form-group">
                <label htmlFor="admin-email">Admin Email</label>
                <input
                  id="admin-email"
                  type="email"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  placeholder="admin@gmail.com"
                  disabled={credentialLoading}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="admin-password">Admin Password</label>
                <input
                  id="admin-password"
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="admin123"
                  disabled={credentialLoading}
                  required
                />
              </div>

              <div className="form-actions">
                <button 
                  type="button"
                  className="profile-cancel-btn"
                  onClick={handleModalClose}
                  disabled={credentialLoading}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="profile-save-btn"
                  disabled={credentialLoading}
                >
                  {credentialLoading ? 'Verifying...' : 'Verify & Switch'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default Profile;
