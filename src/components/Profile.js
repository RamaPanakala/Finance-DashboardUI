import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import '../styles/Profile.css';

/**
 * Profile Component
 * Allows users to create and edit their profile information
 * Fields: Name, Email, Phone Number
 */
const Profile = ({ onClose }) => {
  const { user, updateProfile, loading } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });
  const [isEditing, setIsEditing] = useState(!user?.name);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
              <div className="info-row">
                <label>Name:</label>
                <p>{user?.name || 'Not set'}</p>
              </div>
              <div className="info-row">
                <label>Email:</label>
                <p>{user?.email || 'Not set'}</p>
              </div>
              <div className="info-row">
                <label>Phone:</label>
                <p>{user?.phone || 'Not set'}</p>
              </div>
              <div className="info-row">
                <label>Role:</label>
                <p className={`role-badge ${user?.role}`}>
                  {user?.role === 'admin' ? '🔐 Admin' : '👁️ Viewer'}
                </p>
              </div>
              <button 
                className="profile-edit-btn"
                onClick={() => setIsEditing(true)}
              >
                ✏️ Edit Profile
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
      </div>
    </div>
  );
};

export default Profile;
