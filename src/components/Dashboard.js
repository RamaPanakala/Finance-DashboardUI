import React from 'react';
import { useAppContext } from '../AppContext';
import { convertCurrency, formatCurrency, getLocaleForCurrency } from '../utils/currencyUtils';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import '../styles/Dashboard.css';

/**
 * Dashboard Component
 * 
 * Main dashboard view displaying:
 * - Summary cards (Total Balance, Income, Expenses)
 * - Balance trend chart (line chart over months)
 * - Spending breakdown chart (pie chart by category)
 * 
 * Features:
 * - Real-time calculations from transaction data
 * - Responsive grid layout
 * - Color-coded visualizations
 * - Dark mode support
 * 
 * @component
 * @returns {JSX.Element} The complete dashboard overview
 */
const Dashboard = () => {
  const { 
    totalBalance, 
    totalIncome, 
    totalExpenses, 
    spendingByCategory, 
    balanceTrend, 
    darkMode,
    currency,
    exchangeRates
  } = useAppContext();

  // Prepare pie chart data from spending categories
  const pieData = Object.keys(spendingByCategory).map(category => ({
    name: category,
    value: spendingByCategory[category]
  }));

  // Helper function to format amounts with currency conversion
  const formatAmount = (amount) => {
    const converted = convertCurrency(amount, 'USD', currency, exchangeRates);
    return formatCurrency(converted, currency, getLocaleForCurrency(currency));
  };

  // Color palette for pie chart segments
  const COLORS = ['#667eea', '#2ecc71', '#ffa500', '#3498db', '#e74c3c', '#9b59b6'];

  return (
    <div className="dashboard-container">
      {/* Summary Cards Row */}
      <div className="summary-cards">
        {/* Total Balance Card */}
        <div className="summary-card">
          <div className="card-header">
            <h3 className="card-title">Total Balance</h3>
            <div className="card-icon blue">💳</div>
          </div>
          <div className="card-amount">{formatAmount(totalBalance)}</div>
          <div className="card-footer">
            <span className="change-indicator positive">
              ↑ <span className="change-percentage">+12.5%</span>
            </span>
            <span className="change-percentage">vs last month</span>
          </div>
        </div>

        {/* Total Income Card */}
        <div className="summary-card">
          <div className="card-header">
            <h3 className="card-title">Total Income</h3>
            <div className="card-icon green">📈</div>
          </div>
          <div className="card-amount">{formatAmount(totalIncome)}</div>
          <div className="card-footer">
            <span className="change-indicator positive">
              ↑ <span className="change-percentage">+12.5%</span>
            </span>
            <span className="change-percentage">vs last month</span>
          </div>
        </div>

        {/* Total Expenses Card */}
        <div className="summary-card">
          <div className="card-header">
            <h3 className="card-title">Total Expenses</h3>
            <div className="card-icon red">💸</div>
          </div>
          <div className="card-amount">{formatAmount(totalExpenses)}</div>
          <div className="card-footer">
            <span className="change-indicator negative">
              ↓ <span className="change-percentage">-5.2%</span>
            </span>
            <span className="change-percentage">vs last month</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-grid">
        {/* Balance Trend Chart */}
        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Balance Trend</h3>
            <select className="chart-dropdown">
              <option>Last 6 Months</option>
              <option>Last 3 Months</option>
              <option>Last 12 Months</option>
            </select>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={balanceTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#999" />
                <YAxis stroke="#999" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="balance" 
                  stroke="#667eea" 
                  strokeWidth={2}
                  dot={{ fill: '#667eea', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Spending Breakdown Chart */}
        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Spending Breakdown</h3>
            <select className="chart-dropdown">
              <option>This Month</option>
              <option>Last Month</option>
              <option>Last Quarter</option>
            </select>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="chart-legend">
            {pieData.map((item, index) => (
              <div key={item.name} className="legend-item">
                <div 
                  className="legend-color" 
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="legend-label">{item.name}</span>
                <span className="legend-value">${item.value.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;