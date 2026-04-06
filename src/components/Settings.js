import React, { useState, useRef, useEffect } from 'react';
import '../styles/Settings.css';
import { useAppContext } from '../AppContext';
import { useAuth } from '../AuthContext';

const TABS = [
  { id: 'general',       label: 'General',       icon: '🎨' },
  { id: 'currency',      label: 'Currency',       icon: '💱' },
  { id: 'notifications', label: 'Notifications',  icon: '🔔' },
  { id: 'export',        label: 'Data Export',    icon: '📊' },
  { id: 'account',       label: 'Account',        icon: '👤' },
];

const CURRENCIES = [
  { code: 'USD', symbol: '$',  name: 'US Dollar' },
  { code: 'EUR', symbol: '€',  name: 'Euro' },
  { code: 'GBP', symbol: '£',  name: 'British Pound' },
  { code: 'INR', symbol: '₹',  name: 'Indian Rupee' },
  { code: 'JPY', symbol: '¥',  name: 'Japanese Yen' },
  { code: 'CAD', symbol: 'CA$',name: 'Canadian Dollar' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
];

export default function Settings() {
  const [activeTab, setActiveTab]   = useState('general');
  const [sliderStyle, setSliderStyle] = useState({});
  const navRef   = useRef(null);
  const btnRefs  = useRef({});

  const { darkMode, setDarkMode, currency, setCurrency } = useAppContext();
  const { userRole } = useAuth();

  /* ── Sliding indicator position ──────────────────────────────── */
  useEffect(() => {
    const btn = btnRefs.current[activeTab];
    const nav = navRef.current;
    if (!btn || !nav) return;

    const btnRect = btn.getBoundingClientRect();
    /*const navRect = nav.getBoundingClientRect();*/

    setSliderStyle({
      left:  btn.offsetLeft + 'px',
      width: btnRect.width  + 'px',
    });
  }, [activeTab]);

  /* ── Scroll active tab into view on mobile ───────────────────── */
  useEffect(() => {
    const btn = btnRefs.current[activeTab];
    if (btn) btn.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
  }, [activeTab]);

  /* ── Notification state ───────────────────────────────────────── */
  const [notif, setNotif] = useState({
    email: true, push: false, budget: true, weekly: false,
  });

  const toggleNotif = (key) => setNotif(p => ({ ...p, [key]: !p[key] }));

  /* ── Export handlers ──────────────────────────────────────────── */
  const handleExport = (format) => {
    alert(`Exporting as ${format.toUpperCase()}… (wire up your export logic here)`);
  };

  /* ── Tab content ─────────────────────────────────────────────── */
  const renderContent = () => {
    switch (activeTab) {

      /* ── General ── */
      case 'general': return (
        <div className="settings-section">
          <h2 className="section-title">General Settings</h2>
          <p className="section-description">Customise how ZORVYN looks and behaves.</p>

          <div className="setting-item">
            <div className="setting-info">
              <p className="setting-label">Dark Mode</p>
              <p className="setting-description">Switch between light and dark theme</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
              />
              <span className="slider" />
            </label>
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <p className="setting-label">Language</p>
              <p className="setting-description">Choose your display language</p>
            </div>
            <select className="setting-select">
              <option>English</option>
              <option>Hindi</option>
              <option>Telugu</option>
              <option>Tamil</option>
            </select>
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <p className="setting-label">Date Format</p>
              <p className="setting-description">How dates are displayed throughout the app</p>
            </div>
            <select className="setting-select">
              <option>DD/MM/YYYY</option>
              <option>MM/DD/YYYY</option>
              <option>YYYY-MM-DD</option>
            </select>
          </div>
        </div>
      );

      /* ── Currency ── */
      case 'currency': return (
        <div className="settings-section">
          <h2 className="section-title">Currency Settings</h2>
          <p className="section-description">Set your primary currency and view exchange rates.</p>

          <div className="setting-item">
            <div className="setting-info">
              <p className="setting-label">Primary Currency</p>
              <p className="setting-description">Used for all balances and transactions</p>
            </div>
            <select
              className="setting-select"
              value={currency || 'INR'}
              onChange={(e) => setCurrency && setCurrency(e.target.value)}
            >
              {CURRENCIES.map(c => (
                <option key={c.code} value={c.code}>
                  {c.symbol} {c.code} — {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="currency-info-card">
            <h4>Live Exchange Rates (vs USD)</h4>
            <div className="exchange-rates-grid">
              {[
                { code:'EUR', val:'0.92' }, { code:'GBP', val:'0.79' },
                { code:'INR', val:'83.12' },{ code:'JPY', val:'149.5' },
                { code:'CAD', val:'1.36' }, { code:'AUD', val:'1.53' },
              ].map(r => (
                <div className="rate-item" key={r.code}>
                  <span className="rate-code">{r.code}</span>
                  <span className="rate-value">1 USD = {r.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

      /* ── Notifications ── */
      case 'notifications': return (
        <div className="settings-section">
          <h2 className="section-title">Notification Preferences</h2>
          <p className="section-description">Choose what alerts you want to receive.</p>

          {[
            { key:'email',  label:'Email Notifications',    desc:'Receive summaries by email' },
            { key:'push',   label:'Push Notifications',     desc:'Browser / mobile push alerts' },
            { key:'budget', label:'Budget Alerts',          desc:'Notify when you exceed a budget limit' },
            { key:'weekly', label:'Weekly Report',          desc:'Get a weekly spending digest every Monday' },
          ].map(({ key, label, desc }) => (
            <div className="setting-item" key={key}>
              <div className="setting-info">
                <p className="setting-label">{label}</p>
                <p className="setting-description">{desc}</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={notif[key]}
                  onChange={() => toggleNotif(key)}
                />
                <span className="slider" />
              </label>
            </div>
          ))}
        </div>
      );

      /* ── Data Export ── */
      case 'export': return (
        <div className="settings-section">
          <h2 className="section-title">Data Export</h2>
          <p className="section-description">Download your transaction data in your preferred format.</p>

          <div className="setting-item" style={{ flexDirection:'column', alignItems:'flex-start', gap:12 }}>
            <div className="setting-info">
              <p className="setting-label">Export Transactions</p>
              <p className="setting-description">Download all your transactions in one file</p>
            </div>
            <div className="export-buttons-group" style={{ width:'100%' }}>
              <button className="export-button pdf" onClick={() => handleExport('pdf')}>
                📄 PDF
              </button>
              <button className="export-button csv" onClick={() => handleExport('csv')}>
                📊 CSV
              </button>
              <button className="export-button json" onClick={() => handleExport('json')}>
                🔧 JSON
              </button>
            </div>
          </div>
        </div>
      );

      /* ── Account ── */
      case 'account': return (
        <div className="settings-section">
          <h2 className="section-title">Account</h2>
          <p className="section-description">Manage your profile and account security.</p>

          <div className="account-info-card">
            <div className="account-header">
              <div className="account-avatar">
                {userRole === 'admin' ? '🔐' : '👤'}
              </div>
              <div className="account-details">
                <h4>{userRole === 'admin' ? 'Admin User' : 'Viewer'}</h4>
                <p>Role: {userRole === 'admin' ? 'Administrator' : 'Read-only Viewer'}</p>
              </div>
            </div>
            <div className="account-actions">
              <button className="action-button secondary">✏️ Edit Profile</button>
              <button className="action-button secondary">🔑 Change Password</button>
            </div>
          </div>

          <div className="danger-section">
            <p className="danger-title">⚠️ Danger Zone</p>
            <button className="action-button danger">🗑️ Delete Account</button>
          </div>
        </div>
      );

      default: return null;
    }
  };

  return (
    <div className="settings-container">

      {/* Header */}
      <div className="settings-header">
        <h1 className="settings-title">Settings</h1>
        <p className="settings-subtitle">Manage your account preferences and application settings</p>
      </div>

      {/* Sliding Tab Nav */}
      <nav className="settings-nav" ref={navRef}>
        {/* The sliding pill */}
        <div className="settings-nav-slider" style={sliderStyle} />

        {TABS.map(tab => (
          <button
            key={tab.id}
            ref={(el) => { btnRefs.current[tab.id] = el; }}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Tab content with slide-in animation */}
      <div className="settings-content" key={activeTab}>
        {renderContent()}
      </div>

    </div>
  );
}