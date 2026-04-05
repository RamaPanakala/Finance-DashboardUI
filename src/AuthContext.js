import React, { createContext, useContext, useState, useEffect } from 'react';

// API Base URL - Change this to your backend URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null); // 'viewer' or 'admin'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check if user is logged in on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('authToken');
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setUserRole(JSON.parse(savedUser).role);
      setIsAuthenticated(true);
    }
  }, []);

  /**
   * Viewer Login - Read-only access
   * @param {string} viewerKey - Viewer access key
   */
  const loginViewer = async (viewerKey) => {
    setLoading(true);
    setError(null);
    try {
      // TODO: Replace with actual backend call
      // const response = await fetch(`${API_BASE_URL}/auth/viewer-login`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ viewerKey })
      // });
      // const data = await response.json();
      
      // Temporary mock implementation
      if (viewerKey === 'viewer123') {
        const viewerUser = {
          id: 'viewer-1',
          name: 'Viewer User',
          email: 'viewer@example.com',
          role: 'viewer',
          canEdit: false
        };
        const mockToken = 'viewer-token-' + Date.now();
        
        setUser(viewerUser);
        setUserRole('viewer');
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(viewerUser));
        localStorage.setItem('authToken', mockToken);
      } else {
        throw new Error('Invalid viewer key');
      }
    } catch (err) {
      setError(err.message);
      console.error('Viewer login error:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Admin Login - Full access with edit/delete permissions
   * @param {string} email - Admin email
   * @param {string} password - Admin password
   */
  const loginAdmin = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      // TODO: Replace with actual backend call
      // const response = await fetch(`${API_BASE_URL}/auth/admin-login`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password })
      // });
      // const data = await response.json();
      
      // Mock implementation - check default admin or registered admins
      let adminValid = false;
      let adminData = null;

      // Check default admin
      if (email === 'admin@gmail.com' && password === 'admin123') {
        adminValid = true;
        adminData = {
          id: 'admin-1',
          name: 'Admin User',
          email: email,
          role: 'admin',
          canEdit: true
        };
      } else {
        // Check registered admins in localStorage
        const adminsList = JSON.parse(localStorage.getItem('adminsList') || '[]');
        const registeredAdmin = adminsList.find(admin => admin.email === email && admin.password === password);
        if (registeredAdmin) {
          adminValid = true;
          adminData = {
            id: registeredAdmin.id,
            name: registeredAdmin.name,
            email: registeredAdmin.email,
            role: 'admin',
            canEdit: true
          };
        }
      }

      if (adminValid && adminData) {
        const mockToken = 'admin-token-' + Date.now();
        
        setUser(adminData);
        setUserRole('admin');
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(adminData));
        localStorage.setItem('authToken', mockToken);
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (err) {
      setError(err.message);
      console.error('Admin login error:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Update User Profile - For creating/updating profile info
   * @param {object} profileData - User profile data (name, email, phone, etc.)
   */
  const updateProfile = async (profileData) => {
    setLoading(true);
    setError(null);
    try {
      // TODO: Replace with actual backend call
      // const response = await fetch(`${API_BASE_URL}/user/profile`, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      //   },
      //   body: JSON.stringify(profileData)
      // });
      // const data = await response.json();
      
      const updatedUser = { ...user, ...profileData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (err) {
      setError(err.message);
      console.error('Profile update error:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Logout - Clear authentication
   */
  const logout = () => {
    setUser(null);
    setUserRole(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{
      user,
      setUser,
      isAuthenticated,
      userRole,
      setUserRole,
      loading,
      error,
      loginViewer,
      loginAdmin,
      updateProfile,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};
