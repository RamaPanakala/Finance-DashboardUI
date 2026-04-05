import React, { useState, useEffect } from 'react';
import { useAppContext } from '../AppContext';
import { useAuth } from '../AuthContext';
import RoleSelector from './RoleSelector';
import Profile from './Profile';
import '../styles/Header.css';

/**
 * Header Component
 * 
 * Displays the top navigation bar with:
 * - Page title and subtitle
 * - Dark mode toggle (Light/Dark theme)
 * - User profile with name and email
 * - Logout functionality
 * - Viewer/Admin role indicator
 * 
 * Features:
 * - Responsive layout
 * - Theme toggle with background color change
 * - Profile modal for editing user info
 * - Authentication management
 * 
 * @component
 * @returns {JSX.Element} The header navigation bar
 */
const Header = () => {
  const { darkMode, setDarkMode, } = useAppContext();
  const { user, userRole, logout } = useAuth();
  const [showProfile, setShowProfile] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // TODO: Backend connection - Fetch user data from server
  // useEffect(() => {
  //   if (user?.id) {
  //     fetchUserData(user.id);
  //   }
  // }, [user?.id]);

  // Apply dark mode to document
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
  };

  const getPageTitle = () => {
    const titles = {
      dashboard: 'Dashboard',
      transactions: 'Transactions',
      insights: 'Insights',
      budgets: 'Budgets',
      goals: 'Goals',
      reports: 'Reports',
      settings: 'Settings'
    };
    return titles['dashboard'] || 'Dashboard';
  };

  const userInitials = user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';

  return (
    <>
      <header className="header">
        {/* Left Section: Title */}
        <div className="header-left">
          <h1 className="header-title">{getPageTitle()}</h1>
          <p className="header-subtitle">
            <span>👋</span> Welcome back, {user?.name || 'User'}. Here's your financial overview.
          </p>
        </div>

        {/* Right Section: Actions & Profile */}
        <div className="header-actions">
          {/* Role Selector */}
          <RoleSelector />

          {/* Role Badge 
          <div className={`role-badge ${userRole}`}>
            {userRole === 'admin' ? '🔐 Admin' : '👁️ Viewer'}
          </div>
          */}
          {/* Currency Selector 
          <CurrencySelector 
            currentCurrency={currency} 
            onCurrencyChange={setCurrency}
          />
            */}
          {/* Dark Mode Toggle */}
          <button
            className={`icon-button theme-toggle ${darkMode ? 'active' : ''}`}
            onClick={() => setDarkMode(!darkMode)}
            title={darkMode ? 'Light Mode' : 'Dark Mode'}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>

          {/* Notifications Bell 
          <div className="notification-badge">
            <button className="icon-button" title="Notifications">
              🔔
            </button>
            <span className="badge">3</span>
          </div>
*/}
          {/* User Profile Dropdown */}
          <div className="user-menu">
            <button
              className="user-profile-btn"
              onClick={() => setShowDropdown(!showDropdown)}
              title="User Menu"
            >
              <div className="user-avatar">{userInitials}</div>
              <div className="user-info">
                <h4>{user?.name || 'User'}</h4>
                <p>{user?.email || 'user@example.com'}</p>
              </div>
              <span className={`dropdown-arrow ${showDropdown ? 'open' : ''}`}>▼</span>
            </button>
{/* Profile Dropdown Menu */}
{showDropdown && (
  <div className="user-dropdown-menu">
    

    <div className="dropdown-divider"></div>

    <button 
      className="dropdown-item logout"
      onClick={handleLogout}
    >
      🚪 Logout
    </button>
  </div>
)}
          </div>
        </div>
      </header>

      {/* Profile Modal - Only show if user is Admin */}
      {showProfile && userRole === 'admin' && (
        <Profile onClose={() => setShowProfile(false)} />
      )}
    </>
  );
};

export default Header;
