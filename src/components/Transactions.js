import React, { useState, useMemo } from 'react';
import { useAppContext } from '../AppContext';
import { convertCurrency, formatCurrency, getLocaleForCurrency } from '../utils/currencyUtils';
import '../styles/Transactions.css';

const Transactions = () => {
  const { 
    transactions, 
    role, 
    filters, 
    setFilters, 
    addTransaction, 
    editTransaction, 
    deleteTransaction, 
    currency,
    exchangeRates
  } = useAppContext();

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({ date: '', amount: '', category: '', type: 'expense' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const paginatedTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return transactions.slice(startIndex, startIndex + itemsPerPage);
  }, [transactions, currentPage]);

  const totalPages = Math.ceil((transactions?.length || 0) / itemsPerPage);

  const handlePageChange = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) setCurrentPage(pageNum);
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...'); pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1); pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1); pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...'); pages.push(totalPages);
      }
    }
    return pages;
  };

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

  const getCategoryBadgeClass = (category) => {
    const map = {
      'Groceries': 'food', 'Shopping': 'shopping',
      'Transport': 'transport', 'Utilities': 'utilities',
      'Entertainment': 'entertainment',
    };
    return map[category] || 'other';
  };

  const getAmountClass = (amount) => amount > 0 ? 'positive' : 'negative';

  const calculateMonthlyComparison = () => {
    const now = new Date();
    const cm = now.getMonth(), cy = now.getFullYear();
    const pm = cm === 0 ? 11 : cm - 1;
    const py = cm === 0 ? cy - 1 : cy;
    const names = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    const filter = (mo, yr) => (transactions || []).filter(t => {
      const d = new Date(t.date);
      return d.getMonth() === mo && d.getFullYear() === yr;
    });

    const curr = filter(cm, cy);
    const prev = filter(pm, py);

    const sum = (arr, type) => arr
      .filter(t => t.type === type)
      .reduce((s, t) => s + Math.abs(t.amount), 0);

    const cI = sum(curr, 'income'),  pI = sum(prev, 'income');
    const cE = sum(curr, 'expense'), pE = sum(prev, 'expense');

    return {
      currentMonth: names[cm], previousMonth: names[pm],
      currentIncome: cI, previousIncome: pI,
      currentExpenses: cE, previousExpenses: pE,
      currentBalance: cI - cE, previousBalance: pI - pE,
    };
  };

  const monthlyData = calculateMonthlyComparison();

  const fmt = (amount) => formatCurrency(
    convertCurrency(amount, 'USD', currency, exchangeRates),
    currency, getLocaleForCurrency(currency)
  );

  const changePct = (curr, prev) => {
    if (prev === 0) return curr > 0 ? '↑ +100%' : 'No change';
    const diff = ((curr - prev) / Math.abs(prev) * 100).toFixed(1);
    return `${curr >= prev ? '↑' : '↓'} ${Math.abs(diff)}%`;
  };

  return (
    <div className="transactions-container">

      {/* ── Header ── */}
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

      {/* ── Monthly Comparison ── */}
      <div className="monthly-comparison">
        <div className="comparison-header">
          <h3>📊 Monthly Comparison</h3>
          <span className="comparison-period">{monthlyData.previousMonth} vs {monthlyData.currentMonth}</span>
        </div>
        <div className="comparison-grid">
          {[
            { cls: 'income',  label: 'Income',   curr: monthlyData.currentIncome,   prev: monthlyData.previousIncome },
            { cls: 'expense', label: 'Expenses',  curr: monthlyData.currentExpenses, prev: monthlyData.previousExpenses },
            { cls: 'balance', label: 'Balance',   curr: monthlyData.currentBalance,  prev: monthlyData.previousBalance },
          ].map(({ cls, label, curr, prev }) => (
            <div key={cls} className={`comparison-card ${cls}`}>
              <div className="comparison-card-label">{label}</div>
              <div className="comparison-values">
                <div className="prev-month">
                  <span className="label">{monthlyData.previousMonth}</span>
                  <span className="amount">{fmt(prev)}</span>
                </div>
                <div className="current-month">
                  <span className="label">{monthlyData.currentMonth}</span>
                  <span className="amount">{fmt(curr)}</span>
                </div>
              </div>
              <div className="comparison-change">{changePct(curr, prev)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Add / Edit Form ── */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          style={{
            marginBottom: '20px', padding: '16px',
            background: 'var(--bg-page)', borderRadius: '10px',
            border: '1px solid var(--border)'
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
            <input type="date"   value={formData.date}     onChange={(e) => setFormData({ ...formData, date: e.target.value })}                      required className="search-input" />
            <input type="number" value={formData.amount}   onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) })}         required className="search-input" placeholder="Amount" />
            <input type="text"   value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}                   required className="search-input" placeholder="Category" />
            <select             value={formData.type}      onChange={(e) => setFormData({ ...formData, type: e.target.value })}                                className="filter-select">
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
          <button type="submit" className="btn-add-transaction" style={{ marginTop: '12px' }}>
            {editing ? '✓ Update Transaction' : '✓ Add Transaction'}
          </button>
        </form>
      )}

      {/* ── Table — wrapped for horizontal scroll on mobile ── */}
      <div className="table-wrapper">
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
              paginatedTransactions.map((t) => (
                <tr key={t.id}>
                  <td className="transaction-date">{t.date}</td>
                  <td className="transaction-description">{t.category} Transfer</td>
                  <td>
                    <span className={`category-badge ${getCategoryBadgeClass(t.category)}`}>
                      {t.category}
                    </span>
                  </td>
                  <td>
                    <span className={`type-badge ${t.type}`}>{t.type}</span>
                  </td>
                  <td className={`transaction-amount ${getAmountClass(t.amount)}`}>
                    {t.amount > 0 ? '+' : ''}{fmt(t.amount)}
                  </td>
                  {role === 'Admin' && (
                    <td className="transaction-actions">
                      <button className="action-btn edit"   onClick={() => handleEdit(t)}          title="Edit">✎</button>
                      <button className="action-btn delete" onClick={() => deleteTransaction(t.id)} title="Delete">🗑</button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={role === 'Admin' ? 6 : 5}>
                  <div className="empty-state">
                    <div className="empty-state-icon">📭</div>
                    <div className="empty-state-text">No transactions found</div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ── Pagination ── */}
      {transactions && transactions.length > 0 && (
        <div className="pagination">
          <span className="pagination-info">
            Showing <strong>{(currentPage - 1) * itemsPerPage + 1}</strong>–
            <strong>{Math.min(currentPage * itemsPerPage, transactions.length)}</strong> of{' '}
            <strong>{transactions.length}</strong>
          </span>
          <div className="pagination-controls">
            <button className="pagination-btn" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>‹</button>
            {getPageNumbers().map((p, i) => (
              <button
                key={i}
                className={`pagination-btn ${p === currentPage ? 'active' : ''}`}
                onClick={() => typeof p === 'number' && handlePageChange(p)}
                disabled={p === '...'}
              >{p}</button>
            ))}
            <button className="pagination-btn" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>›</button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Transactions;