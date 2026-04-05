import React, { useState } from 'react';
import { useAppContext } from '../AppContext';
import { useAuth } from '../AuthContext';
import { convertCurrency, formatCurrency, getLocaleForCurrency } from '../utils/currencyUtils';
import CurrencySelector from './CurrencySelector';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import '../styles/Settings.css';

/**
 * Settings Component
 * 
 * Allows users to configure:
 * - Currency preferences
 * - Theme settings
 * - Account information
 * - Export preferences
 * 
 * @component
 * @returns {JSX.Element} The settings page
 */
const Settings = () => {
  const { 
    darkMode, 
    setDarkMode, 
    currency, 
    exchangeRates,
    allTransactions
  } = useAppContext();
  const { user, logout } = useAuth();
  
  const [activeTab, setActiveTab] = useState('general');
  const [exportDateRange, setExportDateRange] = useState('all');
  const [exportLoading, setExportLoading] = useState(false);
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    transactionAlerts: true,
    budgetWarnings: true,
    weeklyReport: true,
  });

  const handleNotificationChange = (key) => {
    setNotificationSettings({
      ...notificationSettings,
      [key]: !notificationSettings[key]
    });
  };

  /**
   * Filter transactions based on date range
   */
  const getFilteredTransactions = () => {
    const now = new Date();
    let startDate = new Date(now.getFullYear(), now.getMonth(), 1);

    switch(exportDateRange) {
      case 'current-month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case 'last-30-days':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case 'last-quarter':
        startDate = new Date(now.getFullYear(), now.getMonth() - 3, 1);
        break;
      case 'current-year':
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      case 'all':
      default:
        return allTransactions || [];
    }

    return (allTransactions || []).filter(t => new Date(t.date) >= startDate);
  };

  /**
   * Export transactions as PDF
   */
  const exportToPDF = async () => {
    setExportLoading(true);
    try {
      const transactions = getFilteredTransactions();
      const pdf = new jsPDF();
      const pageWidth = pdf.internal.pageSize.getWidth();
      
      // Header
      pdf.setFontSize(20);
      pdf.text('Transaction Report', pageWidth / 2, 20, { align: 'center' });
      
      // Date
      pdf.setFontSize(11);
      pdf.text(`Report Date: ${new Date().toLocaleDateString()}`, pageWidth / 2, 30, { align: 'center' });
      pdf.text(`Period: ${exportDateRange}`, pageWidth / 2, 37, { align: 'center' });
      
      // Summary
      const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
      const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + Math.abs(t.amount), 0);
      const balance = totalIncome - totalExpenses;
      
      pdf.setFontSize(10);
      pdf.text(`Total Income: ${formatCurrency(convertCurrency(totalIncome, 'USD', currency, exchangeRates), currency, getLocaleForCurrency(currency))}`, 14, 47);
      pdf.text(`Total Expenses: ${formatCurrency(convertCurrency(totalExpenses, 'USD', currency, exchangeRates), currency, getLocaleForCurrency(currency))}`, 14, 54);
      pdf.text(`Balance: ${formatCurrency(convertCurrency(balance, 'USD', currency, exchangeRates), currency, getLocaleForCurrency(currency))}`, 14, 61);
      
      // Table data
      const tableData = transactions.map(t => [
        t.date,
        t.category,
        t.type.charAt(0).toUpperCase() + t.type.slice(1),
        formatCurrency(convertCurrency(t.amount, 'USD', currency, exchangeRates), currency, getLocaleForCurrency(currency))
      ]);
      
      // Table
      pdf.autoTable({
        head: [['Date', 'Category', 'Type', 'Amount']],
        body: tableData,
        startY: 70,
        theme: 'grid',
        headerStyles: {
          fillColor: [99, 102, 241],
          textColor: [255, 255, 255],
          fontStyle: 'bold'
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245]
        },
        columnStyles: {
          3: { halign: 'right' }
        }
      });
      
      // Footer
      const finalY = pdf.lastAutoTable.finalY || 50;
      pdf.setFontSize(9);
      pdf.text('This is a professional financial report generated from your transaction history.', 14, finalY + 10);
      
      pdf.save(`transactions-report-${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error('Export error:', error);
      alert('Error exporting PDF. Please try again.');
    } finally {
      setExportLoading(false);
    }
  };

  /**
   * Export transactions as CSV
   */
  const exportToCSV = () => {
    setExportLoading(true);
    try {
      const transactions = getFilteredTransactions();
      const headers = ['Date', 'Category', 'Description', 'Type', 'Amount'];
      const rows = transactions.map(t => [
        t.date,
        t.category,
        `${t.category} Transfer`,
        t.type,
        formatCurrency(convertCurrency(t.amount, 'USD', currency, exchangeRates), currency, getLocaleForCurrency(currency))
      ]);

      let csv = headers.join(',') + '\n';
      rows.forEach(row => {
        csv += row.map(cell => `"${cell}"`).join(',') + '\n';
      });

      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `transactions-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Export error:', error);
      alert('Error exporting CSV. Please try again.');
    } finally {
      setExportLoading(false);
    }
  };

  /**
   * Export transactions as JSON
   */
  const exportToJSON = () => {
    setExportLoading(true);
    try {
      const transactions = getFilteredTransactions();
      const data = {
        exportDate: new Date().toISOString(),
        period: exportDateRange,
        currency: currency,
        transactions: transactions.map(t => ({
          ...t,
          amount: formatCurrency(convertCurrency(t.amount, 'USD', currency, exchangeRates), currency, getLocaleForCurrency(currency))
        }))
      };

      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `transactions-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Export error:', error);
      alert('Error exporting JSON. Please try again.');
    } finally {
      setExportLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="settings-container">
      {/* Settings Header */}
      <div className="settings-header">
        <h2 className="settings-title">⚙️ Settings</h2>
        <p className="settings-subtitle">Customize your preferences and account settings</p>
      </div>

      {/* Settings Navigation Tabs */}
      <div className="settings-nav">
        <button
          className={`tab-button ${activeTab === 'general' ? 'active' : ''}`}
          onClick={() => setActiveTab('general')}
        >
          🎨 General
        </button>
        <button
          className={`tab-button ${activeTab === 'currency' ? 'active' : ''}`}
          onClick={() => setActiveTab('currency')}
        >
          💱 Currency
        </button>
        <button
          className={`tab-button ${activeTab === 'notifications' ? 'active' : ''}`}
          onClick={() => setActiveTab('notifications')}
        >
          🔔 Notifications
        </button>
        <button
          className={`tab-button ${activeTab === 'export' ? 'active' : ''}`}
          onClick={() => setActiveTab('export')}
        >
          📊 Data Export
        </button>
        <button
          className={`tab-button ${activeTab === 'account' ? 'active' : ''}`}
          onClick={() => setActiveTab('account')}
        >
          👤 Account
        </button>
      </div>

      {/* Settings Content */}
      <div className="settings-content">

        {/* General Settings */}
        {activeTab === 'general' && (
          <div className="settings-section">
            <h3 className="section-title">General Settings</h3>
            
            {/* Dark Mode Toggle */}
            <div className="setting-item">
              <div className="setting-info">
                <h4 className="setting-label">Dark Mode</h4>
                <p className="setting-description">Enable dark theme for better visibility at night</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={() => setDarkMode(!darkMode)}
                />
                <span className="slider"></span>
              </label>
            </div>

            {/* Default View */}
            <div className="setting-item">
              <div className="setting-info">
                <h4 className="setting-label">Default View</h4>
                <p className="setting-description">Choose your preferred default dashboard view</p>
              </div>
              <select className="setting-select">
                <option>Dashboard</option>
                <option>Transactions</option>
                <option>Insights</option>
              </select>
            </div>
          </div>
        )}

        {/* Currency Settings */}
        {activeTab === 'currency' && (
          <div className="settings-section">
            <h3 className="section-title">Currency Settings</h3>

            {/* Currency Selector */}
         
              
              <h4>Current Exchange Rates</h4>
              <div className="exchange-rates-grid">
                {Object.entries(exchangeRates).map(([code, rate]) => (
                  <div key={code} className="rate-item">
                    <span className="rate-code">{code}</span>
                    <span className="rate-value">1 USD = {rate.toFixed(2)} {code}</span>
                  </div>
                ))}
              </div>
            </div>
        
        )}

        {/* Notification Settings */}
        {activeTab === 'notifications' && (
          <div className="settings-section">
            <h3 className="section-title">Notification Preferences</h3>
            
            {/* Email Notifications */}
            <div className="setting-item">
              <div className="setting-info">
                <h4 className="setting-label">Email Notifications</h4>
                <p className="setting-description">Receive important updates via email</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={notificationSettings.emailNotifications}
                  onChange={() => handleNotificationChange('emailNotifications')}
                />
                <span className="slider"></span>
              </label>
            </div>

            {/* Transaction Alerts */}
            <div className="setting-item">
              <div className="setting-info">
                <h4 className="setting-label">Transaction Alerts</h4>
                <p className="setting-description">Get notified on large transactions</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={notificationSettings.transactionAlerts}
                  onChange={() => handleNotificationChange('transactionAlerts')}
                />
                <span className="slider"></span>
              </label>
            </div>

            {/* Budget Warnings */}
            <div className="setting-item">
              <div className="setting-info">
                <h4 className="setting-label">Budget Warnings</h4>
                <p className="setting-description">Alert me when approaching budget limits</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={notificationSettings.budgetWarnings}
                  onChange={() => handleNotificationChange('budgetWarnings')}
                />
                <span className="slider"></span>
              </label>
            </div>

            {/* Weekly Report */}
            <div className="setting-item">
              <div className="setting-info">
                <h4 className="setting-label">Weekly Report</h4>
                <p className="setting-description">Receive weekly summary reports</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={notificationSettings.weeklyReport}
                  onChange={() => handleNotificationChange('weeklyReport')}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        )}

        {/* Data Export Settings */}
        {activeTab === 'export' && (
          <div className="settings-section">
            <h3 className="section-title">Data Export & Reports</h3>
            
            <p className="section-description">Export your transaction data in various formats for backup or analysis</p>

            {/* Export Options */}
            <div className="setting-item">
              <div className="setting-info">
                <h4 className="setting-label">Date Range</h4>
                <p className="setting-description">Select the period for your export</p>
              </div>
              <select 
                className="setting-select"
                value={exportDateRange}
                onChange={(e) => setExportDateRange(e.target.value)}
              >
                <option value="all">All Transactions</option>
                <option value="current-month">Current Month</option>
                <option value="last-30-days">Last 30 Days</option>
                <option value="last-quarter">Last 3 Months</option>
                <option value="current-year">Current Year</option>
              </select>
            </div>

            {/* Export Buttons */}
            <div className="export-buttons-group">
              <button 
                className="export-button pdf"
                onClick={exportToPDF}
                disabled={exportLoading}
                title="Export as PDF with formatted report"
              >
                📄 {exportLoading ? 'Exporting...' : 'Export as PDF'}
              </button>
              <button 
                className="export-button csv"
                onClick={exportToCSV}
                disabled={exportLoading}
                title="Export as CSV for Excel or other spreadsheet applications"
              >
                📋 {exportLoading ? 'Exporting...' : 'Export as CSV'}
              </button>
              <button 
                className="export-button json"
                onClick={exportToJSON}
                disabled={exportLoading}
                title="Export as JSON for data backup or integration"
              >
                🔧 {exportLoading ? 'Exporting...' : 'Export as JSON'}
              </button>
            </div>

            
          </div>
        )}

        {/* Account Settings */}
        {activeTab === 'account' && (
          <div className="settings-section">
            <h3 className="section-title">Account Information</h3>
            
            {/* User Info Display */}
            <div className="account-info-card">
              <div className="account-header">
                <div className="account-avatar">
                  {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                </div>
                <div className="account-details">
                  <h4>{user?.name || 'User'}</h4>
                  <p>{user?.email || 'user@example.com'}</p>
                </div>
              </div>
            </div>

            {/* Account Actions */}
            <div className="account-actions">
              <button className="action-button secondary">
                ✎ Edit Profile
              </button>
              <button className="action-button secondary">
                🔒 Change Password
              </button>
            </div>

            {/* Danger Zone */}
            <div className="danger-section">
              <h4 className="danger-title">Danger Zone</h4>
              <button 
                className="action-button danger"
                onClick={handleLogout}
              >
                🚪 Logout
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Settings;
