import React, { useState } from 'react';
import '../styles/Sidebar.css';

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
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Menu items with icons
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'transactions', label: 'Transactions', icon: '💳' },
    { id: 'insights', label: 'Insights', icon: '📈' },
    {/*
    { id: 'budgets', label: 'Budgets', icon: '💰' },
    { id: 'goals', label: 'Goals', icon: '🎯' },
    { id: 'reports', label: 'Reports', icon: '📋' },
    { id: 'settings', label: 'Settings', icon: '⚙️' }, */}
  ];

  return (
    <aside className="sidebar">
      {/* Sidebar Header with Logo */}
      <div className="sidebar-header">
        <div className="sidebar-logo">FD</div>
        <div className="sidebar-title">
          <h3> Dashboard UI</h3>
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
        

        <div className="sidebar-help">
          <span>❓</span>
          <span>Help & Support</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
