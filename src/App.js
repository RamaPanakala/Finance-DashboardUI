import React, { useState } from 'react';
import { AppProvider } from './AppContext';
import { AuthProvider, useAuth } from './AuthContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Transactions from './components/Transactions';
import Insights from './components/Insights';
import Login from './components/Login';
import './App.css';

/**
 * Placeholder Component for Future Pages
 */
const PlaceholderPage = ({ title, icon }) => (
  <div style={{
    padding: '40px',
    textAlign: 'center',
    color: '#999',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '500px',
    gap: '16px'
  }}>
    <div style={{ fontSize: '64px' }}>{icon}</div>
    <h2 style={{ color: '#1a1a1a', marginBottom: '8px' }}>{title}</h2>
    <p>This page is coming soon!</p>
  </div>
);

/**
 * AppContent Component
 * 
 * Main application layout with sidebar, header, and content areas
 * Uses a professional two-column layout with responsive design
 * Supports fullscreen viewer mode for individual components
 */
function AppContent() {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const { isAuthenticated } = useAuth();

  // If not authenticated, show login page
  if (!isAuthenticated) {
    return <Login />;
  }

  // Function to render the active component
  const renderComponent = () => {
    switch(activeMenu) {
      case 'dashboard':
        return <Dashboard />;
      case 'transactions':
        return <Transactions />;
      case 'insights':
        return <Insights />;
      case 'budgets':
        return <PlaceholderPage title="Budgets" icon="💰" />;
      case 'goals':
        return <PlaceholderPage title="Financial Goals" icon="🎯" />;
      case 'reports':
        return <PlaceholderPage title="Reports" icon="📋" />;
      case 'settings':
        return <PlaceholderPage title="Settings" icon="⚙️" />;
      default:
        return <PlaceholderPage title="Dashboard" icon="📊" />;
    }
  };

  return (
    <div className="app-wrapper">
      {/* Left Navigation Sidebar */}
      <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

      {/* Main Application Container */}
      <div className="app-container">
        {/* Top Navigation Header */}
        <div className="app-header">
          <Header />
        </div>

        {/* Main Content Area */}
        <div className="app-content">
          <div className="content-wrapper">
            {/* Main Content Column - Conditionally Rendered */}
            <div className="main-content">
              {renderComponent()}
            </div>

            {/* Right Sidebar Column - Only show for dashboard */}
            {activeMenu === 'dashboard' && (
              <div className="right-sidebar">
                {/* This will be handled by Dashboard component if needed */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * App Component - Root component
 * 
 * Wraps the entire application with AuthProvider and AppProvider for state management
 * and imports all global styles
 */
function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
