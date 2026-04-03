import React, { useState } from 'react';
import { useAppContext } from '../AppContext';
import { convertCurrency, formatCurrency, getLocaleForCurrency } from '../utils/currencyUtils';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell, ResponsiveContainer, Area, AreaChart
} from 'recharts';
import '../styles/Dashboard.css';

/**
 * Dashboard Component — Professional Edition
 *
 * Upgraded features:
 * - Gradient area chart for Balance Trend (richer visual depth)
 * - Donut-style Pie with center summary label
 * - Animated summary cards with accent bars
 * - Custom tooltips matching design system
 * - Dark mode aware chart colors via CSS variables
 */

/* ─── Custom Tooltip for Area Chart ─────────────────────────── */
const BalanceTooltip = ({ active, payload, label, formatAmount }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="custom-tooltip">
      <p className="tooltip-label">{label}</p>
      <p className="tooltip-value">{formatAmount(payload[0].value)}</p>
    </div>
  );
};

/* ─── Custom Tooltip for Pie Chart ──────────────────────────── */
const SpendingTooltip = ({ active, payload, formatAmount }) => {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  return (
    <div className="custom-tooltip">
      <p className="tooltip-label">{item.name}</p>
      <p className="tooltip-value">{formatAmount(item.value)}</p>
      <p className="tooltip-sub">{(item.payload.percent * 100).toFixed(1)}% of total</p>
    </div>
  );
};

/* ─── Donut Center Label ─────────────────────────────────────── */
const DonutCenter = ({ cx, cy, total, formatAmount }) => (
  <text textAnchor="middle" dominantBaseline="middle">
    <tspan x={cx} y={cy - 10} className="donut-center-value" fontSize="18" fontWeight="700" fill="currentColor">
      {formatAmount(total)}
    </tspan>
    <tspan x={cx} y={cy + 14} fontSize="11" fill="#999">
      Total Spent
    </tspan>
  </text>
);

/* ─── Main Dashboard ─────────────────────────────────────────── */
const Dashboard = () => {
  const {
    totalBalance,
    totalIncome,
    totalExpenses,
    spendingByCategory,
    balanceTrend,
    darkMode,
    currency,
    exchangeRates,
  } = useAppContext();

  const [trendRange, setTrendRange] = useState('Last 6 Months');
  const [spendRange, setSpendRange] = useState('This Month');

  const formatAmount = (amount) => {
    const converted = convertCurrency(amount, 'USD', currency, exchangeRates);
    return formatCurrency(converted, currency, getLocaleForCurrency(currency));
  };

  /* Pie / Donut data */
  const pieData = Object.keys(spendingByCategory).map((cat) => ({
    name: cat,
    value: spendingByCategory[cat],
  }));
  const totalSpent = pieData.reduce((s, d) => s + d.value, 0);

  const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#3b82f6', '#ef4444', '#8b5cf6', '#ec4899'];

  /* Gradient id */
  const gradientId = 'balanceGradient';

  const summaryCards = [
    {
      title: 'Total Balance',
      value: formatAmount(totalBalance),
      icon: '💳',
      iconClass: 'blue',
      change: '+12.5%',
      dir: 'up',
      accent: '#6366f1',
    },
    {
      title: 'Total Income',
      value: formatAmount(totalIncome),
      icon: '📈',
      iconClass: 'green',
      change: '+8.3%',
      dir: 'up',
      accent: '#10b981',
    },
    {
      title: 'Total Expenses',
      value: formatAmount(totalExpenses),
      icon: '💸',
      iconClass: 'red',
      change: '-5.2%',
      dir: 'down',
      accent: '#ef4444',
    },
  ];

  return (
    <div className="dashboard-container">

      {/* ── Summary Cards ──────────────────────────────────── */}
      <div className="summary-cards">
        {summaryCards.map((card) => (
          <div className="summary-card" key={card.title} style={{ '--accent': card.accent }}>
            <div className="card-accent-bar" />
            <div className="card-header">
              <div>
                <p className="card-title">{card.title}</p>
                <p className="card-amount">{card.value}</p>
              </div>
              <div className={`card-icon ${card.iconClass}`}>{card.icon}</div>
            </div>
            <div className="card-footer">
              <span className={`badge ${card.dir === 'up' ? 'badge-positive' : 'badge-negative'}`}>
                {card.dir === 'up' ? '↑' : '↓'} {card.change}
              </span>
              <span className="footer-note">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Charts ─────────────────────────────────────────── */}
      <div className="charts-grid">

        {/* Balance Trend — Area Chart */}
        <div className="chart-card">
          <div className="chart-header">
            <div>
              <h3 className="chart-title">Balance Trend</h3>
              <p className="chart-subtitle">Net balance over time</p>
            </div>
            <select
              className="chart-dropdown"
              value={trendRange}
              onChange={(e) => setTrendRange(e.target.value)}
            >
              <option>Last 3 Months</option>
              <option>Last 6 Months</option>
              <option>Last 12 Months</option>
            </select>
          </div>

          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={balanceTrend} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--grid-color)" vertical={false} />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12, fill: 'var(--axis-color)' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: 'var(--axis-color)' }}
                  axisLine={false}
                  tickLine={false}
                  width={60}
                  tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<BalanceTooltip formatAmount={formatAmount} />} />
                <Area
                  type="monotone"
                  dataKey="balance"
                  stroke="#6366f1"
                  strokeWidth={2.5}
                  fill={`url(#${gradientId})`}
                  dot={{ fill: '#6366f1', r: 4, strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 6, strokeWidth: 2, stroke: '#fff' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Spending Breakdown — Donut Chart */}
        <div className="chart-card">
          <div className="chart-header">
            <div>
              <h3 className="chart-title">Spending Breakdown</h3>
              <p className="chart-subtitle">By category</p>
            </div>
            <select
              className="chart-dropdown"
              value={spendRange}
              onChange={(e) => setSpendRange(e.target.value)}
            >
              <option>This Month</option>
              <option>Last Month</option>
              <option>Last Quarter</option>
            </select>
          </div>

          <div className="chart-container donut-container">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius="55%"
                  outerRadius="78%"
                  paddingAngle={3}
                  dataKey="value"
                  labelLine={false}
                  label={false}
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      stroke="transparent"
                    />
                  ))}
                </Pie>
                <Tooltip content={<SpendingTooltip formatAmount={formatAmount} />} />
              </PieChart>
            </ResponsiveContainer>

            {/* Center overlay label */}
            <div className="donut-overlay">
              <span className="donut-total">{formatAmount(totalSpent)}</span>
              <span className="donut-label">Total Spent</span>
            </div>
          </div>

          {/* Legend */}
          <div className="chart-legend">
            {pieData.map((item, index) => {
              const pct = totalSpent > 0 ? ((item.value / totalSpent) * 100).toFixed(1) : 0;
              return (
                <div className="legend-item" key={item.name}>
                  <span
                    className="legend-dot"
                    style={{ background: COLORS[index % COLORS.length] }}
                  />
                  <span className="legend-label">{item.name}</span>
                  <span className="legend-pct">{pct}%</span>
                  <span className="legend-value">{formatAmount(item.value)}</span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
