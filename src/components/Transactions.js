import React, { useState, useRef, useMemo } from 'react';
import { useAppContext } from '../AppContext';
import { convertCurrency, formatCurrency, formatWithConversion, getLocaleForCurrency } from '../utils/currencyUtils';
import '../styles/Transactions.css';

/**
 * Transactions Component
 * 
 * Displays a searchable, filterable table of transactions
 * 
 * Features:
 * - Search by category/date
 * - Filter by type (Income/Expense)
 * - Edit/Delete functionality for Admin role
 * - Add new transactions form
 * - Pagination support
 * - Responsive design
 * 
 * @component
 * @returns {JSX.Element} The transactions table and controls
 */
const Transactions = () => {
  const { 
    transactions, 
    role, 
    filters, 
    setFilters, 
    addTransaction, 
    editTransaction, 
    deleteTransaction, 
    darkMode,
    currency,
    exchangeRates
  } = useAppContext();

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({ date: '', amount: '', category: '', type: 'expense' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const tableRef = useRef(null);

  /**
   * Calculate pagination
   */
  const paginatedTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return transactions.slice(startIndex, endIndex);
  }, [transactions, currentPage, itemsPerPage]);

  const totalPages = Math.ceil((transactions?.length || 0) / itemsPerPage);

  /**
   * Handle page change
   */
  const handlePageChange = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    }
  };

  /**
   * Generate page numbers to display
   */
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  };

  /**
   * Handle form submission for adding/editing transactions
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      editTransaction(editing.id, formData);
      setEditing(null);
    } else {
      addTransaction(formData);
    }
    setFormData({ date: '', amount: '', category: '', type: 'expense' });
    setShowForm(false);
  };

  /**
   * Handle edit button click - populate form with transaction data
   */
  const handleEdit = (transaction) => {
    setEditing(transaction);
    setFormData({ 
      date: transaction.date, 
      amount: transaction.amount, 
      category: transaction.category, 
      type: transaction.type 
    });
    setShowForm(true);
  };

  /**
   * Get category badge color/style based on category name
   */
  const getCategoryBadgeClass = (category) => {
    const categoryMap = {
      'Groceries': 'food',
      'Shopping': 'shopping',
      'Transport': 'transport',
      'Utilities': 'utilities',
      'Entertainment': 'entertainment',
    };
    return categoryMap[category] || 'other';
  };

  /**
   * Get type badge color based on transaction type
   */
  const getTypeBadgeClass = (type) => {
    return type === 'income' ? 'income' : 'expense';
  };

  /**
   * Check if amount is positive or negative
   */
  const getAmountClass = (amount) => {
    return amount > 0 ? 'positive' : 'negative';
  };

  /**
   * Calculate monthly comparison data
   */
  const calculateMonthlyComparison = () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const currentMonthTransactions = (transactions || []).filter(t => {
      const tDate = new Date(t.date);
      return tDate.getMonth() === currentMonth && tDate.getFullYear() === currentYear;
    });

    const previousMonthTransactions = (transactions || []).filter(t => {
      const tDate = new Date(t.date);
      return tDate.getMonth() === previousMonth && tDate.getFullYear() === previousYear;
    });

    const currentIncome = currentMonthTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const previousIncome = previousMonthTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);

    const currentExpenses = currentMonthTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + Math.abs(t.amount), 0);
    const previousExpenses = previousMonthTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + Math.abs(t.amount), 0);

    return {
      currentMonth: monthNames[currentMonth],
      previousMonth: monthNames[previousMonth],
      currentIncome,
      previousIncome,
      currentExpenses,
      previousExpenses,
      currentBalance: currentIncome - currentExpenses,
      previousBalance: previousIncome - previousExpenses,
    };
  };

  const monthlyData = calculateMonthlyComparison();

  const formatAmount = (amount) => {
    const converted = convertCurrency(amount, 'USD', currency, exchangeRates);
    return formatCurrency(converted, currency, getLocaleForCurrency(currency));
  };

  return (
    <div className="transactions-container">
      {/* Header with Title and Controls */}
      <div className="transactions-header">
        <h2 className="transactions-title">Recent Transactions</h2>
        <div className="transactions-controls">
          <input
            type="text"
            className="search-input"
            placeholder="Search transactions..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
          <select
            className="filter-select"
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          >
            <option value="">All Categories</option>
            <option value="Groceries">Groceries</option>
            <option value="Transport">Transport</option>
            <option value="Coffee">Coffee</option>
            <option value="Food & Dining">Food & Dining</option>
            <option value="Shopping">Shopping</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Snacks">Snacks</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Phone Bill">Phone Bill</option>
            <option value="Internet">Internet</option>
            <option value="Subscription">Subscription</option>
            <option value="Books">Books</option>
            <option value="Freelance">Freelance</option>
            <option value="Part-time">Part-time</option>
            <option value="Gigs">Gigs</option>
            <option value="Tutoring">Tutoring</option>
          </select>
          <select
            className="filter-select"
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          >
            <option value="">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          {role === 'Admin' && (
            <button
              className="btn-add-transaction"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? '✕ Cancel' : '✓ Add Transaction'}
            </button>
          )}
        </div>
      </div>

      {/* Monthly Comparison Cards */}
      <div className="monthly-comparison">
        <div className="comparison-header">
          <h3>📊 Monthly Comparison</h3>
          <span className="comparison-period">{monthlyData.previousMonth} vs {monthlyData.currentMonth}</span>
        </div>
        <div className="comparison-grid">
          <div className="comparison-card income">
            <div className="comparison-card-label">Income</div>
            <div className="comparison-values">
              <div className="prev-month">
                <span className="label">{monthlyData.previousMonth}</span>
                <span className="amount">{formatAmount(monthlyData.previousIncome)}</span>
              </div>
              <div className="current-month">
                <span className="label">{monthlyData.currentMonth}</span>
                <span className="amount">{formatAmount(monthlyData.currentIncome)}</span>
              </div>
            </div>
            <div className="comparison-change">
              {monthlyData.previousIncome !== 0 ? 
                `${monthlyData.currentIncome > monthlyData.previousIncome ? '↑' : '↓'} ${Math.abs(((monthlyData.currentIncome - monthlyData.previousIncome) / monthlyData.previousIncome * 100).toFixed(1))}%` 
                : (monthlyData.currentIncome > 0 ? '↑ +100%' : 'No change')
              }
            </div>
          </div>

          <div className="comparison-card expense">
            <div className="comparison-card-label">Expenses</div>
            <div className="comparison-values">
              <div className="prev-month">
                <span className="label">{monthlyData.previousMonth}</span>
                <span className="amount">{formatAmount(monthlyData.previousExpenses)}</span>
              </div>
              <div className="current-month">
                <span className="label">{monthlyData.currentMonth}</span>
                <span className="amount">{formatAmount(monthlyData.currentExpenses)}</span>
              </div>
            </div>
            <div className="comparison-change">
              {monthlyData.previousExpenses !== 0 ? 
                `${monthlyData.currentExpenses > monthlyData.previousExpenses ? '↑' : '↓'} ${Math.abs(((monthlyData.currentExpenses - monthlyData.previousExpenses) / monthlyData.previousExpenses * 100).toFixed(1))}%` 
                : (monthlyData.currentExpenses > 0 ? '↑ +100%' : 'No change')
              }
            </div>
          </div>

          <div className="comparison-card balance">
            <div className="comparison-card-label">Balance</div>
            <div className="comparison-values">
              <div className="prev-month">
                <span className="label">{monthlyData.previousMonth}</span>
                <span className="amount">{formatAmount(monthlyData.previousBalance)}</span>
              </div>
              <div className="current-month">
                <span className="label">{monthlyData.currentMonth}</span>
                <span className="amount">{formatAmount(monthlyData.currentBalance)}</span>
              </div>
            </div>
            <div className="comparison-change">
              {monthlyData.previousBalance !== 0 ? 
                `${monthlyData.currentBalance > monthlyData.previousBalance ? '↑' : '↓'} ${Math.abs(((monthlyData.currentBalance - monthlyData.previousBalance) / Math.abs(monthlyData.previousBalance) * 100).toFixed(1))}%` 
                : (monthlyData.currentBalance > 0 ? '↑ +100%' : 'No change')
              }
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Transaction Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="transaction-form" style={{ marginBottom: '20px', padding: '16px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
              className="search-input"
              style={{ fontSize: '13px' }}
            />
            <input
              type="number"
              placeholder="Amount"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) })}
              required
              className="search-input"
              style={{ fontSize: '13px' }}
            />
            <input
              type="text"
              placeholder="Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
              className="search-input"
              style={{ fontSize: '13px' }}
            />
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="filter-select"
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
          <button 
            type="submit" 
            className="btn-add-transaction"
            style={{ marginTop: '12px' }}
          >
            {editing ? '✓ Update Transaction' : '✓ Add Transaction'}
          </button>
        </form>
      )}

      {/* Transactions Table */}
      <table className="transactions-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Type</th>
            <th>Amount</th>
            {role === 'Admin' && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {paginatedTransactions && paginatedTransactions.length > 0 ? (
            paginatedTransactions.map((transaction) => (
              <tr key={transaction.id}>
                <td className="transaction-date">{transaction.date}</td>
                <td className="transaction-description">
                  {transaction.category} Transfer
                </td>
                <td>
                  <span className={`category-badge ${getCategoryBadgeClass(transaction.category)}`}>
                    {transaction.category}
                  </span>
                </td>
                <td>
                  <span className={`type-badge ${getTypeBadgeClass(transaction.type)}`}>
                    {transaction.type}
                  </span>
                </td>
                <td className={`transaction-amount ${getAmountClass(transaction.amount)}`}>
                  {transaction.amount > 0 ? '+' : ''}{formatCurrency(
                    convertCurrency(transaction.amount, 'USD', currency, exchangeRates),
                    currency,
                    getLocaleForCurrency(currency)
                  )}
                </td>
                {role === 'Admin' && (
                  <td className="transaction-actions">
                    <button
                      className="action-btn edit"
                      onClick={() => handleEdit(transaction)}
                      title="Edit transaction"
                    >
                      ✎
                    </button>
                    <button
                      className="action-btn delete"
                      onClick={() => deleteTransaction(transaction.id)}
                      title="Delete transaction"
                    >
                      🗑
                    </button>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={role === 'Admin' ? 6 : 5} className="empty-state">
                <div className="empty-state-icon">📭</div>
                <div className="empty-state-text">No transactions found</div>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {transactions && transactions.length > 0 && (
        <div className="pagination">
          <span className="pagination-info">
            Showing <strong>{((currentPage - 1) * itemsPerPage) + 1}</strong> to <strong>{Math.min(currentPage * itemsPerPage, transactions.length)}</strong> of <strong>{transactions.length}</strong> transactions ({itemsPerPage} per page)
          </span>
          <div className="pagination-controls">
            {/* Previous Button */}
            <button
              className={`pagination-btn ${currentPage === 1 ? 'disabled' : ''}`}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              ‹ 
            </button>

            {/* Page Numbers */}
            {getPageNumbers().map((pageNum, index) => (
              <button
                key={index}
                className={`pagination-btn ${pageNum === currentPage ? 'active' : ''} ${pageNum === '...' ? 'ellipsis' : ''}`}
                onClick={() => typeof pageNum === 'number' && handlePageChange(pageNum)}
                disabled={pageNum === '...'}
              >
                {pageNum}
              </button>
            ))}

            {/* Next Button */}
            <button
              className={`pagination-btn ${currentPage === totalPages ? 'disabled' : ''}`}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
               ›
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transactions;