import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import '../styles/Sidebar.css';
import HelpSupport from './HelpSupport';
import Profile from './Profile';
import { useAppContext } from '../AppContext';
import { useAuth } from '../AuthContext';

/**
 * Sidebar Component
 * 
 * Displays the left navigation menu with links to different sections
 * Features:
 * - Fixed left sidebar with navigation items
 * - Active state highlighting
 * - Premium features section
 * - Help & Support link
 * - Responsive collapse on smaller screens
 * 
 * @component
 * @returns {JSX.Element} The sidebar navigation element
 */
const Sidebar = ({ activeMenu, setActiveMenu }) => {
  /*const [isCollapsed, setIsCollapsed] = useState(false);*/
  const [showHelp, setShowHelp] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const { darkMode, setDarkMode } = useAppContext();
  const {  userRole } = useAuth();

  const roleDisplay = userRole === 'admin' ? '🔐 Admin' : '👁️ Viewer';
  /*const userName = user?.name || 'Guest';*/

  // Menu items with icons
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'transactions', label: 'Transactions', icon: '💳' },
    { id: 'insights', label: 'Insights', icon: '📈' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },];
    /*
    { id: 'budgets', label: 'Budgets', icon: '💰' },
    { id: 'goals', label: 'Goals', icon: '🎯' },
    { id: 'reports', label: 'Reports', icon: '📋' },*/
    


  return (
    <>
    <aside className="sidebar">
      {/* Sidebar Header with Logo */}
      <div className="sidebar-header">
        <div className="sidebar-logo">ZV</div>
        <div className="sidebar-title">
          <h3>ZORVYN</h3>
        </div>
      </div>

      {/* Navigation Menu */}
      <ul className="sidebar-menu">
        {menuItems.map((item) => (
          <li
            key={item.id}
            className={`sidebar-menu-item ${activeMenu === item.id ? 'active' : ''}`}
            onClick={() => setActiveMenu(item.id)}
          >
            <span className="sidebar-menu-icon">{item.icon}</span>
            <span>{item.label}</span>
          </li>
        ))}
      </ul>

      {/* Premium/Help Section at Footer */}
      <div className="sidebar-footer">
        {/* Dark/Light Mode Toggle */}
        <button
          className={`sidebar-theme-toggle ${darkMode ? 'dark' : 'light'}`}
          onClick={() => setDarkMode(!darkMode)}
          title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {darkMode ? '🌙 Dark' : '☀️ Light'}
        </button>

        <div className="sidebar-help" onClick={() => setShowHelp(true)}>
          <span>❓</span>
          <span>Help & Support</span>
        </div>

        {/* Live User Status Display */}
        
        <div className="sidebar-profile" onClick={() => setShowProfile(true)}>
          <div className="status-indicator">
            <span className={`status-role ${userRole}`}>{roleDisplay}</span>
          </div>
          <span>Profile</span>
        </div>
      </div>

      {/* Modals rendered via Portal outside the sidebar DOM */}
    </aside>

    {/* Help & Support Modal - Rendered outside sidebar */}
    {showHelp && ReactDOM.createPortal(
      <HelpSupport onClose={() => setShowHelp(false)} />,
      document.body
    )}

    {/* Profile Modal - Rendered outside sidebar */}
    {showProfile && ReactDOM.createPortal(
      <Profile onClose={() => setShowProfile(false)} />,
      document.body
    )}
  </>
  );
};

export default Sidebar;
