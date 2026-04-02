/**
 * Currency Conversion Utilities
 * Handles currency conversion and formatting for international support
 * 
 * Features:
 * - Multiple currency support
 * - Real exchange rate integration (TODO: connect to API)
 * - Currency formatting
 * - Locale-specific formatting
 */

// Supported currencies with symbols and codes
export const CURRENCY_LIST = {
  USD: { symbol: '$', name: 'US Dollar', flag: '🇺🇸' },
  EUR: { symbol: '€', name: 'Euro', flag: '🇪🇺' },
  GBP: { symbol: '£', name: 'British Pound', flag: '🇬🇧' },
  JPY: { symbol: '¥', name: 'Japanese Yen', flag: '🇯🇵' },
  AUD: { symbol: 'A$', name: 'Australian Dollar', flag: '🇦🇺' },
  CAD: { symbol: 'C$', name: 'Canadian Dollar', flag: '🇨🇦' },
  CHF: { symbol: 'CHF', name: 'Swiss Franc', flag: '🇨🇭' },
  CNY: { symbol: '¥', name: 'Chinese Yuan', flag: '🇨🇳' },
  INR: { symbol: '₹', name: 'Indian Rupee', flag: '🇮🇳' },
  MXN: { symbol: '$', name: 'Mexican Peso', flag: '🇲🇽' },
};

// Mock exchange rates (TODO: Replace with real API call)
const MOCK_EXCHANGE_RATES = {
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
};

/**
 * Get current exchange rates
 * TODO: Replace with real API call
 * Example API: https://api.exchangerate-api.com/v4/latest/USD
 */
export const getExchangeRates = async (baseCurrency = 'USD') => {
  try {
    // TODO: Uncomment for real API
    // const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
    // const data = await response.json();
    // return data.rates;

    // Mock response for development
    return MOCK_EXCHANGE_RATES;
  } catch (error) {
    console.error('Exchange rate fetch error:', error);
    return MOCK_EXCHANGE_RATES; // Fallback to mock rates
  }
};

/**
 * Convert amount from one currency to another
 * @param {Number} amount - Amount to convert
 * @param {String} fromCurrency - Source currency code
 * @param {String} toCurrency - Target currency code
 * @param {Object} rates - Exchange rates (optional)
 */
export const convertCurrency = (amount, fromCurrency = 'USD', toCurrency = 'USD', rates = MOCK_EXCHANGE_RATES) => {
  if (fromCurrency === toCurrency) return amount;
  
  const baseAmount = amount / rates[fromCurrency];
  const convertedAmount = baseAmount * rates[toCurrency];
  
  return parseFloat(convertedAmount.toFixed(2));
};

/**
 * Format currency for display
 * @param {Number} amount - Amount to format
 * @param {String} currency - Currency code
 * @param {String} locale - Locale for formatting (default: 'en-US')
 */
export const formatCurrency = (amount, currency = 'USD', locale = 'en-US') => {
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch (error) {
    console.error('Currency formatting error:', error);
    // Fallback formatting
    const currencyInfo = CURRENCY_LIST[currency] || CURRENCY_LIST.USD;
    return `${currencyInfo.symbol}${amount.toFixed(2)}`;
  }
};

/**
 * Get currency info
 * @param {String} currency - Currency code
 */
export const getCurrencyInfo = (currency) => {
  return CURRENCY_LIST[currency] || CURRENCY_LIST.USD;
};

/**
 * Get all available currencies
 */
export const getAvailableCurrencies = () => {
  return Object.entries(CURRENCY_LIST).map(([code, info]) => ({
    code,
    ...info
  }));
};

/**
 * Get locale for currency
 * @param {String} currency - Currency code
 */
export const getLocaleForCurrency = (currency) => {
  const localeMap = {
    USD: 'en-US',
    EUR: 'de-DE',
    GBP: 'en-GB',
    JPY: 'ja-JP',
    AUD: 'en-AU',
    CAD: 'en-CA',
    CHF: 'de-CH',
    CNY: 'zh-CN',
    INR: 'en-IN',
    MXN: 'es-MX',
  };
  
  return localeMap[currency] || 'en-US';
};

/**
 * Format currency with conversion display
 * Shows original amount and converted amount
 * @param {Number} amount - Amount
 * @param {String} fromCurrency - Original currency
 * @param {String} toCurrency - Target currency
 * @param {Object} rates - Exchange rates
 */
export const formatWithConversion = (amount, fromCurrency, toCurrency, rates = MOCK_EXCHANGE_RATES) => {
  const converted = convertCurrency(amount, fromCurrency, toCurrency, rates);
  const original = formatCurrency(amount, fromCurrency, getLocaleForCurrency(fromCurrency));
  const convertedFormatted = formatCurrency(converted, toCurrency, getLocaleForCurrency(toCurrency));
  
  if (fromCurrency === toCurrency) {
    return original;
  }
  
  return `${original} ≈ ${convertedFormatted}`;
};

/**
 * Calculate percentage change with currency
 * @param {Number} oldAmount - Old amount
 * @param {Number} newAmount - New amount
 * @param {String} currency - Currency code
 */
export const getPercentageChange = (oldAmount, newAmount, currency = 'USD') => {
  if (oldAmount === 0) return 0;
  
  const percentChange = ((newAmount - oldAmount) / oldAmount) * 100;
  const trend = newAmount >= oldAmount ? '↑' : '↓';
  const formatted = formatCurrency(Math.abs(newAmount - oldAmount), currency);
  
  return {
    percentage: percentChange.toFixed(2),
    trend,
    amount: formatted,
    isPositive: newAmount >= oldAmount,
  };
};
