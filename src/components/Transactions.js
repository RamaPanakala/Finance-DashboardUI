import React, { useState } from 'react';
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
            <option value="Utilities">Utilities</option>
            <option value="Entertainment">Entertainment</option>
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
          {transactions && transactions.length > 0 ? (
            transactions.map((transaction) => (
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
          <span>Showing <strong>5</strong> per page</span>
          <div className="pagination-controls">
            <button className="pagination-btn">‹</button>
            <button className="pagination-btn active">1</button>
            <button className="pagination-btn">2</button>
            <button className="pagination-btn">3</button>
            <button className="pagination-btn">›</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transactions;