import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockTransactions } from './data';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('transactions');
    return saved ? JSON.parse(saved) : mockTransactions;
  });
  const [role, setRole] = useState('Viewer'); // 'Viewer' or 'Admin'
  const [filters, setFilters] = useState({ category: '', type: '', search: '' });
  const [darkMode, setDarkMode] = useState(false);
  const [currency, setCurrency] = useState(() => {
    const saved = localStorage.getItem('preferredCurrency');
    return saved || 'USD';
  });
  const [exchangeRates, setExchangeRates] = useState({
    USD: 1.0,
    EUR: 0.92,
    GBP: 0.79,
    JPY: 149.50,
    AUD: 1.52,
    CAD: 1.36,
    CHF: 0.88,
    CNY: 7.24,
    INR: 83.12,
    MXN: 17.05,
  });

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  // Calculate summary
  const totalBalance = transactions.reduce((sum, t) => sum + t.amount, 0);
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + Math.abs(t.amount), 0);

  // Filtered transactions
  const filteredTransactions = transactions.filter(t => {
    const matchesCategory = !filters.category || t.category.toLowerCase().includes(filters.category.toLowerCase());
    const matchesType = !filters.type || t.type === filters.type;
    const matchesSearch = !filters.search || t.category.toLowerCase().includes(filters.search.toLowerCase()) || t.date.includes(filters.search);
    return matchesCategory && matchesType && matchesSearch;
  });

  // Insights
  const spendingByCategory = transactions.filter(t => t.type === 'expense').reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount);
    return acc;
  }, {});
  const highestSpendingCategory = Object.keys(spendingByCategory).reduce((a, b) => spendingByCategory[a] > spendingByCategory[b] ? a : b, '');

  const monthlyData = transactions.reduce((acc, t) => {
    const month = t.date.slice(0, 7); // YYYY-MM
    if (!acc[month]) acc[month] = { income: 0, expenses: 0 };
    if (t.type === 'income') acc[month].income += t.amount;
    else acc[month].expenses += Math.abs(t.amount);
    return acc;
  }, {});

  const balanceTrend = Object.keys(monthlyData).sort().map(month => ({
    month,
    balance: monthlyData[month].income - monthlyData[month].expenses
  }));

  const addTransaction = (transaction) => {
    setTransactions([...transactions, { ...transaction, id: Date.now() }]);
  };

  const editTransaction = (id, updatedTransaction) => {
    setTransactions(transactions.map(t => t.id === id ? { ...t, ...updatedTransaction } : t));
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  return (
    <AppContext.Provider value={{
      transactions: filteredTransactions,
      allTransactions: transactions,
      role,
      setRole,
      filters,
      setFilters,
      darkMode,
      setDarkMode,
      currency,
      setCurrency,
      exchangeRates,
      setExchangeRates,
      totalBalance,
      totalIncome,
      totalExpenses,
      spendingByCategory,
      highestSpendingCategory,
      balanceTrend,
      addTransaction,
      editTransaction,
      deleteTransaction
    }}>
      {children}
    </AppContext.Provider>
  );
};