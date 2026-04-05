/**
 * CurrencySelector Component
 * Dropdown to select display currency for the entire app
 * Integrates with AppContext to update all transaction displays
 */

import React, { useState } from 'react';
import { getAvailableCurrencies } from '../utils/currencyUtils';
import '../styles/CurrencySelector.css';

const CurrencySelector = ({ currentCurrency, onCurrencyChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const currencies = getAvailableCurrencies();
  const selected = currencies.find(c => c.code === currentCurrency);

  const handleSelect = (currencyCode) => {
    onCurrencyChange(currencyCode);
    localStorage.setItem('preferredCurrency', currencyCode);
    setIsOpen(false);
  };

  return (
    <div className="currency-selector">
      <button
        className="currency-button"
        onClick={() => setIsOpen(!isOpen)}
        title="Select currency"
      >
        <span className="currency-flag">{selected?.flag}</span>
        <span className="currency-code">{selected?.code}</span>
        <span className="dropdown-arrow">Select Currency cle▼</span>
      </button>

      {isOpen && (
        <div className="currency-dropdown">
          <div className="currency-header">Select Currency</div>
          <div className="currency-list">
            {currencies.map((currency) => (
              <div
                key={currency.code}
                className={`currency-item ${
                  currency.code === currentCurrency ? 'active' : ''
                }`}
                onClick={() => handleSelect(currency.code)}
              >
                <span className="currency-flag">{currency.flag}</span>
                <div className="currency-info">
                  <div className="currency-code">{currency.code}</div>
                  <div className="currency-name">{currency.name}</div>
                </div>
                <span className="currency-symbol">{currency.symbol}</span>
                {currency.code === currentCurrency && (
                  <span className="checkmark">✓</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrencySelector;
