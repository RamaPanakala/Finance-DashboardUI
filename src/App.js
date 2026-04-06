import React, { useState } from 'react';
import { AppProvider } from './AppContext';
import { AuthProvider, useAuth } from './AuthContext';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Transactions from './components/Transactions';
import Insights from './components/Insights';
import Settings from './components/Settings';
import Login from './components/Login';
import './App.css';

const PlaceholderPage = ({ title, icon }) => (
  <div style={{
    padding: '40px',
    textAlign: 'center',
    color: '#999',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '400px',
    gap: '16px'
  }}>
    <div style={{ fontSize: '64px' }}>{icon}</div>
    <h2 style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>{title}</h2>
    <p style={{ color: 'var(--text-secondary)' }}>This page is coming soon!</p>
  </div>
);

function AppContent() {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Login />;

  const renderComponent = () => {
    switch (activeMenu) {
      case 'dashboard':    return <Dashboard />;
      case 'transactions': return <Transactions />;
      case 'insights':     return <Insights />;
      case 'budgets':      return <PlaceholderPage title="Budgets"         icon="💰" />;
      case 'goals':        return <PlaceholderPage title="Financial Goals" icon="🎯" />;
      case 'reports':      return <PlaceholderPage title="Reports"         icon="📋" />;
      case 'settings':     return <Settings />;
      default:             return <PlaceholderPage title="Dashboard"       icon="📊" />;
    }
  };

  return (
    /*
      Layout structure:
      ┌─────────────────────────────────────────┐
      │ .app-wrapper  (display:block)           │
      │  ├── <Sidebar />  (position:fixed)      │
      │  │    └── .mobile-topbar (mobile only)  │
      │  └── .app-container  (margin-left:250px)│
      │       └── .app-content                  │
      │            └── .content-wrapper         │
      │                 └── .main-content       │
      └─────────────────────────────────────────┘
    */
    <div className="app-wrapper">
      <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

      <div className="app-container">
        <div className="app-content">
          <div className="content-wrapper">
            <div className="main-content">
              {renderComponent()}
            </div>

            {/* Right panel — dashboard only, hidden on tablet/mobile */}
            {activeMenu === 'dashboard' && (
              <div className="right-sidebar" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContentWrapper />
    </AuthProvider>
  );
}

function AppContentWrapper() {
  const { userRole } = useAuth();
  return (
    <AppProvider userRole={userRole}>
      <AppContent />
    </AppProvider>
  );
}

export default App;