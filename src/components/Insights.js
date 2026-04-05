import React, { useState, useMemo } from 'react';
import { useAppContext } from '../AppContext';
import { convertCurrency, formatCurrency, getLocaleForCurrency } from '../utils/currencyUtils';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import '../styles/Insights.css';

/**
 * Insights Component
 * 
 * Displays financial insights and analytics:
 * - Spending trend indicators
 * - Budget performance
 * - Category breakdown with bar chart
 * - Monthly comparison
 * - Detailed spending status
 * 
 * Features:
 * - Color-coded insights based on performance
 * - Category icons and color codes
 * - Dynamic bar chart for spending visualization
 * - Monthly comparison analysis
 * - Dark mode support
 * 
 * @component
 * @returns {JSX.Element} The insights panel with analytics
 */
const Insights = () => {
  const { 
    highestSpendingCategory, 
    totalIncome, 
    totalExpenses, 
    spendingByCategory, 
    darkMode, 
    allTransactions,
    currency,
    exchangeRates
  } = useAppContext();

  const [selectedFilter, setSelectedFilter] = useState('This Month');

  // Calculate average monthly values
  const monthlyData = allTransactions.reduce((acc, t) => {
    const month = t.date.slice(0, 7);
    if (!acc[month]) acc[month] = { income: 0, expenses: 0, month: month };
    if (t.type === 'income') acc[month].income += t.amount;
    else acc[month].expenses += Math.abs(t.amount);
    return acc;
  }, {});

  const months = Object.keys(monthlyData).sort();
  const monthlyDataArray = months.map(m => monthlyData[m]);
  const averageMonthlyIncome = totalIncome / Math.max(months.length, 1);
  const averageMonthlyExpenses = totalExpenses / Math.max(months.length, 1);

  // Calculate expense ratio
  const expenseRatio = totalIncome > 0 ? (totalExpenses / totalIncome) * 100 : 0;

  // Get spending by category for bar chart
  const categoryChartData = useMemo(() => {
    return Object.entries(spendingByCategory)
      .map(([category, amount]) => ({
        category: category,
        amount: amount,
        displayAmount: convertCurrency(amount, 'USD', currency, exchangeRates)
      }))
      .sort((a, b) => b.amount - a.amount);
  }, [spendingByCategory, currency, exchangeRates]);

  // Helper function to format amounts with currency conversion
  const formatAmount = (amount) => {
    const converted = convertCurrency(amount, 'USD', currency, exchangeRates);
    return formatCurrency(converted, currency, getLocaleForCurrency(currency));
  };

  // Get current month data
  const currentMonth = months[months.length - 1] || '';
  const previousMonth = months.length > 1 ? months[months.length - 2] : null;
  const currentMonthData = monthlyData[currentMonth] || { income: 0, expenses: 0 };
  const previousMonthData = previousMonth ? monthlyData[previousMonth] : { income: 0, expenses: 0 };

  // Calculate month-over-month comparison
  const expenseChange = previousMonthData.expenses 
    ? ((currentMonthData.expenses - previousMonthData.expenses) / previousMonthData.expenses) * 100 
    : 0;

  return (
    <div className="insights-container">
      {/* Header */}
      <div className="insights-header">
        <h2 className="insights-title">✨ Insights & Analytics</h2>
        <select 
          className="insights-filter"
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
        >
          <option>This Month</option>
          <option>Last Month</option>
          <option>Last Quarter</option>
          <option>Last 6 Months</option>
          <option>Last Year</option>
        </select>
      </div>

      {/* Insight Cards */}
      
      {/* Spending Status Card - Detailed */}
      <div className={`insight-card ${expenseRatio < 50 ? 'positive' : expenseRatio < 75 ? 'cautionary' : 'negative'}`}>
        <div className={`insight-icon ${expenseRatio < 50 ? 'positive' : expenseRatio < 75 ? 'cautionary' : 'negative'}`}>
          {expenseRatio < 50 ? '💚' : expenseRatio < 75 ? '⚠️' : '❌'}
        </div>
        <div className="insight-content">
          <p className="insight-title">Spending Status (Detailed)</p>
          <p className="insight-description">
            You spent <span className="insight-highlight">{expenseRatio.toFixed(1)}%</span> of your income ({formatAmount(totalExpenses)} out of {formatAmount(totalIncome)}). 
            {expenseRatio < 50 ? ' ✅ Great job staying within budget!' : expenseRatio < 75 ? ' ⚠️ Consider reducing expenses.' : ' ❌ Your spending is above income.'}
          </p>
          <div className="spending-status-bar">
            <div className="status-progress" style={{ width: `${Math.min(expenseRatio, 100)}%` }}></div>
          </div>
        </div>
      </div>

      {/* Monthly Comparison Card */}
      <div className={`insight-card ${expenseChange <= 0 ? 'positive' : 'cautionary'}`}>
        <div className={`insight-icon ${expenseChange <= 0 ? 'positive' : 'cautionary'}`}>
          {expenseChange <= 0 ? '📉' : '📈'}
        </div>
        <div className="insight-content">
          <p className="insight-title">Monthly Comparison</p>
          <p className="insight-description">
            Current month expenses: <span className="insight-highlight">{formatAmount(currentMonthData.expenses)}</span>. 
            {expenseChange !== 0 ? (
              `${expenseChange > 0 ? '⬆️ Up' : '⬇️ Down'} ${Math.abs(expenseChange).toFixed(1)}% vs last month`
            ) : 'No previous month data'}
          </p>
        </div>
      </div>

      {/* Highest Spending Category Card */}
      <div className="insight-card cautionary">
        <div className="insight-icon cautionary">📊</div>
        <div className="insight-content">
          <p className="insight-title">Highest Spending Category</p>
          <p className="insight-description">
            <span className="insight-highlight">{highestSpendingCategory || 'N/A'}</span> is your 
            top spending category at <span className="insight-highlight">{formatAmount(spendingByCategory[highestSpendingCategory] || 0)}</span>
            ({totalExpenses > 0 ? ((spendingByCategory[highestSpendingCategory] / totalExpenses) * 100).toFixed(1) : 0}% of total).
          </p>
        </div>
      </div>

      {/* Spending by Category Bar Chart */}
      <div className="insight-chart-section">
        <h3 className="chart-section-title">📊 Spending by Category</h3>
        <div className="insight-chart-container">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={categoryChartData} margin={{ top: 10, right: 10, bottom: 60, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis 
                dataKey="category" 
                tick={{ fontSize: 11, fill: 'var(--text-secondary)' }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                tick={{ fontSize: 11, fill: 'var(--text-secondary)' }}
                tickFormatter={(value) => `$${(value / 100).toFixed(0)}k`}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--bg-card)',
                  border: `1px solid var(--border)`,
                  borderRadius: '8px',
                  padding: '6px'
                }}
                formatter={(value) => formatAmount(value)}
              />
              <Bar 
                dataKey="displayAmount" 
                fill="#6366f1" 
                radius={[6, 6, 0, 0]}
                animationDuration={500}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Spending by Category List */}
      <div className="spending-section">
        <h3 className="spending-title">💰 Breakdown by Category</h3>
        <ul className="spending-list">
          {Object.entries(spendingByCategory)
            .sort(([, a], [, b]) => b - a)
            .map(([category, amount]) => {
              // Determine category icon
              const categoryIcons = {
                'Groceries': '🛒',
                'Shopping': '🛍️',
                'Transport': '🚗',
                'Utilities': '💡',
                'Entertainment': '🎬',
                'Salary': '💼',
                'Freelance': '💻',
                'Food & Dining': '🍽️',
                'Healthcare': '⚕️',
                'Insurance': '🛡️',
                'Bonus': '🎁',
                'Investment': '📈',
                'Interest': '💹'
              };

              const categoryClasses = {
                'Groceries': 'food',
                'Shopping': 'shopping',
                'Transport': 'transport',
                'Utilities': 'utilities',
                'Entertainment': 'entertainment',
              };

              return (
                <li key={category} className="spending-item">
                  <div className="spending-category">
                    <div className={`spending-icon ${categoryClasses[category] || 'other'}`}>
                      {categoryIcons[category] || '📌'}
                    </div>
                    <span className="spending-name">{category}</span>
                  </div>
                  <span className="spending-amount">
                    {formatAmount(amount)}
                    <span className="spending-percentage">
                      {totalExpenses > 0 ? ((amount / totalExpenses) * 100).toFixed(0) : 0}%
                    </span>
                  </span>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default Insights;