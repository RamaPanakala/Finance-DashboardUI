import React, { useState, useMemo } from 'react';
import { useAppContext } from '../AppContext';
import { convertCurrency, formatCurrency, getLocaleForCurrency } from '../utils/currencyUtils';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, } from 'recharts';
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
  /*const monthlyDataArray = months.map(m => monthlyData[m]);
  const averageMonthlyIncome = totalIncome / Math.max(months.length, 1);
  const averageMonthlyExpenses = totalExpenses / Math.max(months.length, 1);
*/
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
  const incomeChange = previousMonthData.income 
    ? ((currentMonthData.income - previousMonthData.income) / previousMonthData.income) * 100 
    : 0;
  const expenseChange = previousMonthData.expenses 
    ? ((currentMonthData.expenses - previousMonthData.expenses) / previousMonthData.expenses) * 100 
    : 0;
  const balanceChange = (previousMonthData.income - previousMonthData.expenses) !== 0
    ? (((currentMonthData.income - currentMonthData.expenses) - (previousMonthData.income - previousMonthData.expenses)) / Math.abs(previousMonthData.income - previousMonthData.expenses) * 100)
    : 0;

  // Format month names for display
  const formatMonthName = (monthStr) => {
    if (!monthStr) return '';
    const [ month] = monthStr.split('-');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${monthNames[parseInt(month) - 1]}`;
  };

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
      <div className="insight-card comparison-card">
        <div className="insight-icon">📊</div>
        <div className="insight-content">
          <p className="insight-title">Monthly Comparison</p>
          <p className="comparison-period">{formatMonthName(previousMonth)} vs {formatMonthName(currentMonth)}</p>
          
          {/* Comparison Grid */}
          <div className="comparison-metrics">
            {/* Income Comparison */}
            <div className="metric-box">
              <div className="metric-label">💰 Income</div>
              <div className="metric-values">
                <div className="metric-prev">
                  <span className="label">Previous</span>
                  <span className="amount">{formatAmount(previousMonthData.income)}</span>
                </div>
                <div className="metric-current">
                  <span className="label">Current</span>
                  <span className="amount">{formatAmount(currentMonthData.income)}</span>
                </div>
              </div>
              <div className={`metric-change ${incomeChange >= 0 ? 'positive' : 'negative'}`}>
                {incomeChange > 0 ? '⬆️' : incomeChange < 0 ? '⬇️' : '➡️'} {Math.abs(incomeChange).toFixed(1)}%
              </div>
            </div>

            {/* Expenses Comparison */}
            <div className="metric-box">
              <div className="metric-label">💸 Expenses</div>
              <div className="metric-values">
                <div className="metric-prev">
                  <span className="label">Previous</span>
                  <span className="amount">{formatAmount(previousMonthData.expenses)}</span>
                </div>
                <div className="metric-current">
                  <span className="label">Current</span>
                  <span className="amount">{formatAmount(currentMonthData.expenses)}</span>
                </div>
              </div>
              <div className={`metric-change ${expenseChange <= 0 ? 'positive' : 'negative'}`}>
                {expenseChange > 0 ? '⬆️' : expenseChange < 0 ? '⬇️' : '➡️'} {Math.abs(expenseChange).toFixed(1)}%
              </div>
            </div>

            {/* Balance Comparison */}
            <div className="metric-box">
              <div className="metric-label">💳 Balance</div>
              <div className="metric-values">
                <div className="metric-prev">
                  <span className="label">Previous</span>
                  <span className="amount">{formatAmount(previousMonthData.income - previousMonthData.expenses)}</span>
                </div>
                <div className="metric-current">
                  <span className="label">Current</span>
                  <span className="amount">{formatAmount(currentMonthData.income - currentMonthData.expenses)}</span>
                </div>
              </div>
              <div className={`metric-change ${balanceChange >= 0 ? 'positive' : 'negative'}`}>
                {balanceChange > 0 ? '⬆️' : balanceChange < 0 ? '⬇️' : '➡️'} {Math.abs(balanceChange).toFixed(1)}%
              </div>
            </div>
          </div>
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
            <BarChart data={categoryChartData} margin={{ top: 0, right: 10, bottom: 10, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis 
                dataKey="category" 
                tick={{ fontSize: 1, fill: 'var(--text-secondary)' }}
                angle={45}
                textAnchor="end"
                height={-10}
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
                'Entertainment': '🎬',
                'Freelance': '💻',
                'Food & Dining': '🍽️',
                'Healthcare': '⚕️',
                'Coffee': '☕',
                'Snacks': '🍿',
                'Phone Bill': '📱',
                'Internet': '🌐',
                'Subscription': '📡',
                'Books': '📚',
                'Part-time': '💼',
                'Gigs': '⚡',
                'Tutoring': '🎓',
                'Utilities': '💡',
                'Parking': '🚗',
                'Gas': '⛽',
                'Insurance': '🛡️',
                'Salary': '💼',
                'Bonus': '🎁',
                'Investment': '📈',
                'Interest': '💹'
              };

              const categoryClasses = {
                'Groceries': 'food',
                'Shopping': 'shopping',
                'Transport': 'transport',
                'Entertainment': 'entertainment',
                'Food & Dining': 'food',
                'Freelance': 'income',
                'Coffee': 'food',
                'Snacks': 'food',
                'Part-time': 'income',
                'Gigs': 'income',
                'Tutoring': 'income',
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