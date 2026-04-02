# Currency Conversion Feature Guide

## Overview

The Finance Dashboard now supports **international currency conversion**, allowing users to view all financial data in their preferred currency. The system automatically converts USD amounts to the selected currency using real-time exchange rates.

## Features

### 1. **Currency Selector Component**
- Located in the header next to the theme toggle
- Shows current currency with flag emoji and code
- Dropdown menu displays all 10 supported currencies
- Persists user preference to `localStorage`

### 2. **Supported Currencies**

| Code | Currency | Flag | Symbol |
|------|----------|------|--------|
| USD  | US Dollar | 🇺🇸 | $ |
| EUR  | Euro | 🇪🇺 | € |
| GBP  | British Pound | 🇬🇧 | £ |
| JPY  | Japanese Yen | 🇯🇵 | ¥ |
| AUD  | Australian Dollar | 🇦🇺 | A$ |
| CAD  | Canadian Dollar | 🇨🇦 | C$ |
| CHF  | Swiss Franc | 🇨🇭 | CHF |
| CNY  | Chinese Yuan | 🇨🇳 | ¥ |
| INR  | Indian Rupee | 🇮🇳 | ₹ |
| MXN  | Mexican Peso | 🇲🇽 | $ |

### 3. **Exchange Rate System**

**Current Implementation: Mock Rates**
```javascript
const MOCK_EXCHANGE_RATES = {
  USD: 1.0,   // Base currency
  EUR: 0.92,
  GBP: 0.79,
  // ... other rates
};
```

**Future Enhancement: Real API Integration**
```javascript
// TODO: Replace with real API call
const response = await fetch(`https://api.exchangerate-api.com/v4/latest/USD`);
const data = await response.json();
setExchangeRates(data.rates);
```

## Integration Points

### 1. **AppContext**
Manages global currency state:
```javascript
const [currency, setCurrency] = useState(() => {
  const saved = localStorage.getItem('preferredCurrency');
  return saved || 'USD';
});

const [exchangeRates, setExchangeRates] = useState({
  // Exchange rates object
});
```

### 2. **Header Component**
Displays currency selector:
```jsx
<CurrencySelector 
  currentCurrency={currency} 
  onCurrencyChange={setCurrency}
/>
```

### 3. **Dashboard Component**
Shows converted amounts in summary cards:
```javascript
const formatAmount = (amount) => {
  const converted = convertCurrency(amount, 'USD', currency, exchangeRates);
  return formatCurrency(converted, currency, getLocaleForCurrency(currency));
};

// Usage in cards:
<div className="card-amount">{formatAmount(totalBalance)}</div>
```

### 4. **Transactions Component**
Displays converted transaction amounts:
```javascript
{formatCurrency(
  convertCurrency(transaction.amount, 'USD', currency, exchangeRates),
  currency,
  getLocaleForCurrency(currency)
)}
```

### 5. **Insights Component**
Shows converted amounts in analysis:
```javascript
// Highest spending category
<span className="insight-highlight">{formatAmount(amount)}</span>

// Monthly comparisons
Average monthly income: {formatAmount(averageMonthlyIncome)}
```

## Utility Functions

### `currencyUtils.js`

#### `convertCurrency(amount, fromCurrency, toCurrency, rates)`
Converts amount between currencies
```javascript
convertCurrency(100, 'USD', 'EUR', rates); // Returns ~92
```

#### `formatCurrency(amount, currency, locale)`
Formats amount with proper currency symbol and locale
```javascript
formatCurrency(92, 'EUR', 'de-DE'); // Returns "92,00 €"
```

#### `formatWithConversion(amount, fromCurrency, toCurrency, rates)`
Shows both original and converted amounts
```javascript
formatWithConversion(100, 'USD', 'EUR', rates); 
// Returns "$100.00 ≈ €92.00"
```

#### `getLocaleForCurrency(currency)`
Returns appropriate locale for currency formatting
```javascript
getLocaleForCurrency('EUR'); // Returns 'de-DE'
```

#### `getAvailableCurrencies()`
Returns array of all supported currencies
```javascript
[
  { code: 'USD', symbol: '$', name: 'US Dollar', flag: '🇺🇸' },
  // ... others
]
```

## Styling

### CurrencySelector.css
- **Light Mode**: Clean white dropdown with hover effects
- **Dark Mode**: Dark background with adjusted colors
- **Responsive**: Optimized for desktop, tablet, and mobile screens

Key styles:
```css
.currency-button { /* Main dropdown toggle button */ }
.currency-dropdown { /* Dropdown menu container */ }
.currency-item { /* Individual currency option */ }
.currency-item.active { /* Currently selected currency */ }
```

## Implementation Exercise

### For Developers Adding Currency Support:

1. **New Currency Addition**:
   - Add to `CURRENCY_LIST` in `currencyUtils.js`
   - Add exchange rate to `MOCK_EXCHANGE_RATES`
   - Add locale mapping in `getLocaleForCurrency()`

2. **Real API Integration**:
   - Replace mock rates function in `currencyUtils.js`
   - Call real exchange rate API
   - Add error handling and caching

3. **Display Currency Conversion**:
   - Import utilities: `convertCurrency`, `formatCurrency`
   - Get currency from context: `const { currency, exchangeRates } = useAppContext()`
   - Use helper function: `formatCurrency(convertCurrency(amount, 'USD', currency, rates), currency, locale)`

## Data Persistence

- **Storage Key**: `preferredCurrency`
- **Location**: Browser `localStorage`
- **Behavior**: Currency preference persists across sessions
- **Default**: USD if no preference saved

```javascript
// Access preference
const preferred = localStorage.getItem('preferredCurrency') || 'USD';

// Save preference
localStorage.setItem('preferredCurrency', 'EUR');
```

## Example Usage

### Selecting Currency
1. Click currency button in header
2. Choose desired currency from dropdown
3. All amounts throughout app update instantly
4. Preference automatically saved

### Converting Amounts Programmatically
```javascript
import { convertCurrency, formatCurrency } from './utils/currencyUtils';

const amountInEuro = convertCurrency(1000, 'USD', 'EUR', exchangeRates);
const displayText = formatCurrency(amountInEuro, 'EUR', 'de-DE');
console.log(displayText); // "€920,00"
```

## Performance Notes

- **Lightweight**: No external API calls (using mock rates)
- **Locale Formatting**: Uses native `Intl.NumberFormat` API
- **Storage**: Minimal localStorage usage (~20 bytes)
- **Re-renders**: Only affected components re-render on currency change

## Future Enhancements

1. **Real Exchange Rates**
   - Connect to live API (OpenExchangeRates, FX API, etc.)
   - Cache rates with TTL
   - Handle API failures gracefully

2. **Rate History**
   - Track exchange rate changes over time
   - Display rate trends in Insights

3. **Multi-Base Currency**
   - Allow selection of base currency (not just USD)
   - Convert between any two currencies

4. **Offline Support**
   - Cache rates for offline mode
   - Use last known rates if API unavailable

5. **Advanced Features**
   - Currency conversion calculator
   - Rate alerts for favorable conversions
   - Bulk currency conversion tools

## Troubleshooting

### Currency Not Persisting
- Check browser localStorage is enabled
- Verify `preferredCurrency` key in Storage
- Clear localStorage and refresh

### Amounts Display Incorrectly
- Verify exchange rates in `exchangeRates` object
- Check `locale` parameter in `formatCurrency()`
- Confirm `currency` code matches supported list

### Dropdown Not Appearing
- Check `CurrencySelector.js` imported in Header
- Verify CSS file is linked
- Check z-index in `CurrencySelector.css`

## Testing Checklist

- [ ] Currency selector appears in header
- [ ] All 10 currencies selectable from dropdown
- [ ] Currency preference persists after page refresh
- [ ] Dashboard amounts convert correctly
- [ ] Transactions show converted values
- [ ] Insights use converted amounts
- [ ] Dark mode styling works
- [ ] Mobile responsive layout works
- [ ] No console errors on currency change
- [ ] Exchange rates can be updated without issues
