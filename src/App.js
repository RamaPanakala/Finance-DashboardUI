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
  const [fullscreenComponent, setFullscreenComponent] = useState(null);
  const { isAuthenticated, userRole } = useAuth();

  // Fixed: Only toggle fullscreen when clicking on the component itself, not anywhere
  const toggleFullscreen = (componentName, e) => {
    // Prevent click propagation
    e.stopPropagation();
    setFullscreenComponent(fullscreenComponent === componentName ? null : componentName);
  };

  const exitFullscreen = () => {
    setFullscreenComponent(null);
  };

  // If not authenticated, show login page
  if (!isAuthenticated) {
    return <Login />;
  }

  // Render fullscreen viewer with click containment
  if (fullscreenComponent) {
    return (
      <div className="fullscreen-viewer" onClick={exitFullscreen}>
        <button 
          className="fullscreen-exit-btn" 
          onClick={exitFullscreen}
          title="Exit fullscreen (ESC)"
        >
          ✕
        </button>
        <div 
          className="app-container fullscreen-active"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="app-content fullscreen-active">
            <div className="content-wrapper fullscreen-active main-content">
              {fullscreenComponent === 'dashboard' && <Dashboard />}
              {fullscreenComponent === 'transactions' && <Transactions />}
              {fullscreenComponent === 'insights' && <Insights />}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Function to render the active component
  const renderComponent = () => {
    const handleComponentClick = (componentName) => (e) => {
      // Only allow fullscreen for admin users
      if (userRole === 'admin') {
        toggleFullscreen(componentName, e);
      }
    };

    switch(activeMenu) {
      case 'dashboard':
        return (
          <div 
            className="fullscreen-trigger"
            onClick={handleComponentClick('dashboard')}
            title={userRole === 'admin' ? 'Click to expand to fullscreen' : 'Read-only viewer'}
          >
            <Dashboard />
          </div>
        );
      case 'transactions':
        return (
          <div 
            className="fullscreen-trigger"
            onClick={handleComponentClick('transactions')}
            title={userRole === 'admin' ? 'Click to expand to fullscreen' : 'Read-only viewer'}
          >
            <Transactions />
          </div>
        );
      case 'insights':
        return (
          <div 
            className="fullscreen-trigger"
            onClick={handleComponentClick('insights')}
            title={userRole === 'admin' ? 'Click to expand to fullscreen' : 'Read-only viewer'}
          >
            <Insights />
          </div>
        );
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
