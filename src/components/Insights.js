import React from 'react';
import { useAppContext } from '../AppContext';
import { convertCurrency, formatCurrency, getLocaleForCurrency } from '../utils/currencyUtils';
import '../styles/Insights.css';

/**
 * Insights Component
 * 
 * Displays financial insights and analytics:
 * - Spending trend indicators
 * - Budget performance
 * - Category breakdown
 * - Useful observations
 * 
 * Features:
 * - Color-coded insights based on performance
 * - Category icons and color codes
 * - Spending breakdown by category
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

  // Calculate average monthly values
  const monthlyData = allTransactions.reduce((acc, t) => {
    const month = t.date.slice(0, 7);
    if (!acc[month]) acc[month] = { income: 0, expenses: 0 };
    if (t.type === 'income') acc[month].income += t.amount;
    else acc[month].expenses += Math.abs(t.amount);
    return acc;
  }, {});

  const months = Object.keys(monthlyData).sort();
  const averageMonthlyIncome = totalIncome / Math.max(months.length, 1);
  const averageMonthlyExpenses = totalExpenses / Math.max(months.length, 1);

  // Calculate expense ratio
  const expenseRatio = totalIncome > 0 ? (totalExpenses / totalIncome) * 100 : 0;

  // Helper function to format amounts with currency conversion
  const formatAmount = (amount) => {
    const converted = convertCurrency(amount, 'USD', currency, exchangeRates);
    return formatCurrency(converted, currency, getLocaleForCurrency(currency));
  };

  return (
    <div className="insights-container">
      {/* Header */}
      <div className="insights-header">
        <h2 className="insights-title">✨ Insights</h2>
        <select className="insights-filter">
          <option>This Month</option>
          <option>Last Month</option>
          <option>Last Quarter</option>
        </select>
      </div>

      {/* Insight Cards */}
      
      {/* Spending Status Card */}
      <div className={`insight-card ${expenseRatio < 50 ? 'positive' : expenseRatio < 75 ? 'cautionary' : 'negative'}`}>
        <div className={`insight-icon ${expenseRatio < 50 ? 'positive' : expenseRatio < 75 ? 'cautionary' : 'negative'}`}>
          {expenseRatio < 50 ? '💚' : expenseRatio < 75 ? '⚠️' : '❌'}
        </div>
        <div className="insight-content">
          <p className="insight-title">
            Spending Status
          </p>
          <p className="insight-description">
            You spent <span className="insight-highlight">{expenseRatio.toFixed(1)}%</span> of your income. 
            {expenseRatio < 50 ? ' Great job staying within budget!' : expenseRatio < 75 ? ' Consider reducing expenses.' : ' Your spending is above income.'}
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
            top spending category at <span className="insight-highlight">{formatAmount(spendingByCategory[highestSpendingCategory] || 0)}</span>.
          </p>
        </div>
      </div>

      {/* Income Comparison Card */}
      <div className="insight-card positive">
        <div className="insight-icon positive">📈</div>
        <div className="insight-content">
          <p className="insight-title">Monthly Comparison</p>
          <p className="insight-description">
            Average monthly income: <span className="insight-highlight">{formatAmount(averageMonthlyIncome)}</span>. 
            Average expenses: <span className="insight-highlight">{formatAmount(averageMonthlyExpenses)}</span>.
          </p>
        </div>
      </div>

      {/* Spending by Category Section */}
      <div className="spending-section">
        <h3 className="spending-title">Breakdown by Category</h3>
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
        <a href="#" className="view-all-link">View All Insights →</a>
      </div>
    </div>
  );
};

export default Insights;