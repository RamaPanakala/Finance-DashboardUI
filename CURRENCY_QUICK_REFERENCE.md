# Currency Conversion - Developer Quick Reference

## 🎯 At a Glance

The Finance Dashboard now supports **10 international currencies** with automatic conversion. All amounts throughout the app display in the user's selected currency.

## 🚀 Quick Start for Developers

### Using Currency in a Component

```javascript
import { convertCurrency, formatCurrency, getLocaleForCurrency } from '../utils/currencyUtils';
import { useAppContext } from '../AppContext';

const MyComponent = () => {
  const { currency, exchangeRates } = useAppContext();
  
  // Convert and format an amount
  const displayAmount = formatCurrency(
    convertCurrency(1000, 'USD', currency, exchangeRates),
    currency,
    getLocaleForCurrency(currency)
  );
  
  return <div>Amount: {displayAmount}</div>;
};
```

### Or Use the Helper Pattern (Recommended)

```javascript
const { currency, exchangeRates } = useAppContext();

// Create helper function in your component
const formatAmount = (amount) => {
  const converted = convertCurrency(amount, 'USD', currency, exchangeRates);
  return formatCurrency(converted, currency, getLocaleForCurrency(currency));
};

// Use everywhere
<div>{formatAmount(totalBalance)}</div>
<div>{formatAmount(totalExpenses)}</div>
```

## 📚 API Reference

### Functions in `currencyUtils.js`

#### `convertCurrency(amount, from, to, rates)`
Converts amount between currencies
```javascript
convertCurrency(100, 'USD', 'EUR', rates) // → 92
```

#### `formatCurrency(amount, currency, locale)`
Formats with currency symbol and locale rules
```javascript
formatCurrency(92, 'EUR', 'de-DE') // → "92,00 €"
```

#### `getLocaleForCurrency(currency)`
Returns locale code for a currency
```javascript
getLocaleForCurrency('JPY') // → 'ja-JP'
```

#### `formatWithConversion(amount, from, to, rates)`
Shows both original and converted
```javascript
formatWithConversion(100, 'USD', 'EUR', rates)
// → "$100.00 ≈ €92.00"
```

#### `getAvailableCurrencies()`
Returns array of all supported currencies
```javascript
[
  { code: 'USD', symbol: '$', name: 'US Dollar', flag: '🇺🇸' },
  { code: 'EUR', symbol: '€', name: 'Euro', flag: '🇪🇺' },
  // ... 8 more
]
```

#### `getPercentageChange(oldAmount, newAmount, currency)`
Calculates percentage change with currency
```javascript
getPercentageChange(100, 120, 'USD')
// → { percentage: '20.00', trend: '↑', amount: '+$20.00', isPositive: true }
```

## 🔄 App Context Integration

### Get Currency Information
```javascript
const { currency } = useAppContext();
// Returns: 'USD', 'EUR', 'GBP', etc.
```

### Get Exchange Rates
```javascript
const { exchangeRates } = useAppContext();
// Returns: { USD: 1.0, EUR: 0.92, GBP: 0.79, ... }
```

### Change Currency (Programmatically)
```javascript
const { setCurrency } = useAppContext();
setCurrency('EUR'); // User prefers EUR
```

### Update Exchange Rates
```javascript
const { setExchangeRates } = useAppContext();
setExchangeRates(newRates); // When API provides new rates
```

## 💾 localStorage Keys

```javascript
// User's preferred currency
localStorage.getItem('preferredCurrency') // → 'EUR'
localStorage.setItem('preferredCurrency', 'GBP')
```

## 🎨 CurrencySelector Component

### Location
Header, next to theme toggle (lights/dark mode button)

### Import & Use
```javascript
import CurrencySelector from './components/CurrencySelector';

<CurrencySelector 
  currentCurrency={currency}
  onCurrencyChange={setCurrency}
/>
```

### Styling
- Light mode: White dropdown with purple accents
- Dark mode: Dark dropdown with blue accents
- Responsive: Works on desktop, tablet, mobile
- File: `src/styles/CurrencySelector.css`

## 📋 Supported Currencies

```
USD - US Dollar          💵 $
EUR - Euro               💶 €
GBP - British Pound      £
JPY - Japanese Yen       ¥
AUD - Australian Dollar  A$
CAD - Canadian Dollar    C$
CHF - Swiss Franc        CHF
CNY - Chinese Yuan       ¥
INR - Indian Rupee       ₹
MXN - Mexican Peso       $
```

## 🔧 Common Tasks

### Add New Currency
1. Edit `src/utils/currencyUtils.js`
2. Add to `CURRENCY_LIST`:
```javascript
CNY: { symbol: '¥', name: 'Chinese Yuan', flag: '🇨🇳' }
```
3. Add to `MOCK_EXCHANGE_RATES`:
```javascript
CNY: 7.24
```
4. Add to `getLocaleForCurrency()`:
```javascript
CNY: 'zh-CN'
```

### Switch to Real API
1. Edit `getExchangeRates()` in `currencyUtils.js`
2. Uncomment API code
3. Replace with your API endpoint
```javascript
const response = await fetch(`https://your-api.com/rates/USD`);
const data = await response.json();
return data.rates;
```

### Format Amount in Template
```javascript
// Simple pattern used throughout app
{formatCurrency(
  convertCurrency(amount, 'USD', currency, exchangeRates),
  currency,
  getLocaleForCurrency(currency)
)}
```

### Handle Currency in Calculations
```javascript
// Amounts stored in USD (base)
const usdAmount = 100;

// Convert for display
const converted = convertCurrency(usdAmount, 'USD', currency, rates);
const display = formatCurrency(converted, currency, locale);

// For calculations, always use USD
const total = transactions.reduce((sum, t) => sum + t.amount, 0);
```

## 🧪 Testing Currency Features

### Manual Testing
```javascript
// Test conversion
convertCurrency(100, 'USD', 'EUR', exchangeRates) // Should work

// Test formatting
formatCurrency(92.5, 'EUR', 'de-DE') // Should format as "92,50 €"

// Test locale
getLocaleForCurrency('JPY') // Should return 'ja-JP'

// Test get currencies
getAvailableCurrencies() // Should return array of 10 items
```

### Check localStorage
```javascript
// In browser console
localStorage.getItem('preferredCurrency') // View saved currency
localStorage.setItem('preferredCurrency', 'GBP') // Change it
localStorage.removeItem('preferredCurrency') // Reset
```

## 💡 Best Practices

### ✅ DO
- Always convert from USD (base currency)
- Store amounts in USD in database
- Use formatAmount helper for consistency
- Display formatted amounts to users
- Persist preference after selection

### ❌ DON'T
- Store amounts in multiple currencies
- Skip formatting for display
- Assume user's locale from currency
- Hardcode exchange rates
- Forget to import utilities

## 🎓 Examples by Component

### Dashboard.js
```javascript
const formatAmount = (amount) => {
  const converted = convertCurrency(amount, 'USD', currency, exchangeRates);
  return formatCurrency(converted, currency, getLocaleForCurrency(currency));
};

<div className="card-amount">{formatAmount(totalBalance)}</div>
```

### Transactions.js
```javascript
{formatCurrency(
  convertCurrency(transaction.amount, 'USD', currency, exchangeRates),
  currency,
  getLocaleForCurrency(currency)
)}
```

### Insights.js
```javascript
<span className="insight-highlight">
  {formatAmount(spendingByCategory[category])}
</span>
```

## 🚀 Next Steps

1. **Integrate Real API**
   - Enabled automated exchange rate updates
   - Add error handling and caching

2. **Enhanced Features**
   - Add rate history charts
   - Implement rate alerts
   - Create currency calculator

3. **Optimization**
   - Memoize conversion results
   - Cache formatted amounts
   - Preload common currency pairs

## 📱 Mobile Considerations

- CurrencySelector dropdown positions correctly on mobile
- Amount formatting adjusts for small screens
- Touch-friendly currency selection
- No overflow on currency display

## 🐛 Troubleshooting

**Issue: Amount shows as NaN**
- Check exchangeRates has all currency codes
- Verify convertCurrency parameters are correct

**Issue: Currency not persisting**
- Check localStorage is enabled
- Verify preferred currency is being saved
- Clear cache and localStorage

**Issue: Wrong formatting**
- Verify locale code is correct
- Check currency code matches CURRENCY_LIST
- Test Intl.NumberFormat in console

## 📞 Support

For detailed information:
- See `CURRENCY_CONVERSION_GUIDE.md` for complete guide
- See `ARCHITECTURE.js` for system design
- Check `currencyUtils.js` for function documentation
- Review component files for implementation examples
