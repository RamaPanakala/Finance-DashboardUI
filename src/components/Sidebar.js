import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import '../styles/Sidebar.css';
import HelpSupport from './HelpSupport';
import Profile from './Profile';
import { useAppContext } from '../AppContext';
import { useAuth } from '../AuthContext';

const Sidebar = ({ activeMenu, setActiveMenu }) => {
  const [showHelp, setShowHelp]       = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const { darkMode, setDarkMode }     = useAppContext();
  const { userRole }                  = useAuth();

  const roleDisplay = userRole === 'admin' ? '🔐 Admin' : '👁️ Viewer';

  const menuItems = [
    { id: 'dashboard',    label: 'Dashboard',    icon: '📊' },
    { id: 'transactions', label: 'Transactions', icon: '💳' },
    { id: 'insights',     label: 'Insights',     icon: '📈' },
    { id: 'settings',     label: 'Settings',     icon: '⚙️' },
  ];

  /* Close drawer when resizing past mobile breakpoint */
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const handler = (e) => { if (!e.matches) setMobileOpen(false); };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  /* Lock body scroll while drawer is open on mobile */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  /* Sync dark-mode class on <body> so App.css CSS vars apply globally */
  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  const handleMenuClick = (id) => {
    setActiveMenu(id);
    setMobileOpen(false);
  };

  return (
    <>
      {/* ══════════════════════════════════════════════════
          MOBILE TOP BAR
          Hidden on desktop/tablet via CSS (display:none).
          Shows on ≤768px.
          ══════════════════════════════════════════════════ */}
      <div className="mobile-topbar">
        <button
          className="hamburger-btn"
          onClick={() => setMobileOpen(true)}
          aria-label="Open navigation"
        >
          <span /><span /><span />
        </button>

        <div className="mobile-topbar-logo">
          <div
            className="sidebar-logo"
            style={{ width: 32, height: 32, fontSize: 13, borderRadius: 8 }}
          >
            ZV
          </div>
          <span className="mobile-topbar-title">ZORVYN</span>
        </div>

        <button
          className={`mobile-theme-btn ${darkMode ? 'dark' : ''}`}
          onClick={() => setDarkMode(!darkMode)}
          aria-label="Toggle dark mode"
        >
          {darkMode ? '🌙' : '☀️'}
        </button>
      </div>

      {/* ══════════════════════════════════════════════════
          BACKDROP — rendered behind open drawer on mobile
          ══════════════════════════════════════════════════ */}
      {mobileOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ══════════════════════════════════════════════════
          SIDEBAR
          • Desktop / Tablet: position:fixed left panel
          • Mobile: slide-in drawer, toggled by .mobile-open
          ══════════════════════════════════════════════════ */}
      <aside className={`sidebar${mobileOpen ? ' mobile-open' : ''}`}>

        {/* Header */}
        <div className="sidebar-header">
          <div className="sidebar-logo">ZV</div>
          <div className="sidebar-title">
            <h3>ZORVYN</h3>
          </div>
          {/* Only shown on mobile via CSS */}
          <button
            className="sidebar-close-btn"
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation"
          >
            ✕
          </button>
        </div>

        {/* Navigation menu */}
        <ul className="sidebar-menu">
          {menuItems.map((item) => (
            <li
              key={item.id}
              className={`sidebar-menu-item${activeMenu === item.id ? ' active' : ''}`}
              onClick={() => handleMenuClick(item.id)}
            >
              <span className="sidebar-menu-icon">{item.icon}</span>
              <span className="sidebar-menu-label">{item.label}</span>
            </li>
          ))}
        </ul>

        {/* Footer */}
        <div className="sidebar-footer">

          {/* Theme toggle */}
          <button
            className={`sidebar-theme-toggle ${darkMode ? 'dark' : 'light'}`}
            onClick={() => setDarkMode(!darkMode)}
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            <span className="sidebar-menu-icon">{darkMode ? '🌙' : '☀️'}</span>
            <span className="sidebar-menu-label">
              {darkMode ? 'Dark Mode' : 'Light Mode'}
            </span>
          </button>

          {/* Help & Support */}
          <div
            className="sidebar-help"
            onClick={() => { setShowHelp(true); setMobileOpen(false); }}
          >
            <span className="sidebar-menu-icon">❓</span>
            <span className="sidebar-menu-label">Help &amp; Support</span>
          </div>

          {/* Profile / role */}
          <div
            className="sidebar-profile"
            onClick={() => { setShowProfile(true); setMobileOpen(false); }}
          >
            <span className={`status-role ${userRole}`}>{roleDisplay}</span>
            <span className="sidebar-menu-label">Profile</span>
          </div>

        </div>
      </aside>

      {/* Modals — portalled outside sidebar DOM */}
      {showHelp && ReactDOM.createPortal(
        <HelpSupport onClose={() => setShowHelp(false)} />,
        document.body
      )}
      {showProfile && ReactDOM.createPortal(
        <Profile onClose={() => setShowProfile(false)} />,
        document.body
      )}
    </>
  );
};

export default Sidebar;