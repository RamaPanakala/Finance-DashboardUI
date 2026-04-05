// Generate 500+ dummy transactions spanning 12 months
const generateDummyTransactions = () => {
  const transactions = [];
  const categories = ['Salary', 'Freelance', 'Groceries', 'Transport', 'Utilities', 'Entertainment', 'Shopping', 'Food & Dining', 'Healthcare', 'Insurance'];
  const expenses = ['Groceries', 'Transport', 'Utilities', 'Entertainment', 'Shopping', 'Food & Dining', 'Healthcare', 'Insurance'];
  const income = ['Salary', 'Freelance', 'Bonus', 'Investment', 'Interest'];
  
  let id = 1;
  const startDate = new Date('2023-01-01');
  const endDate = new Date('2023-12-31');
  
  // Generate daily transactions
  for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
    const currentDate = new Date(date);
    const dateStr = currentDate.toISOString().split('T')[0];
    
    // 2-4 transactions per day
    const txCount = Math.floor(Math.random() * 3) + 2;
    
    for (let i = 0; i < txCount; i++) {
      // 30% chance of income, 70% expense
      if (Math.random() < 0.3) {
        // Income transaction
        const incomeCategory = income[Math.floor(Math.random() * income.length)];
        const amount = Math.floor(Math.random() * 500) + 200;
        transactions.push({
          id: id++,
          date: dateStr,
          amount: amount,
          category: incomeCategory,
          type: 'income'
        });
      } else {
        // Expense transaction
        const expenseCategory = expenses[Math.floor(Math.random() * expenses.length)];
        const amount = -(Math.floor(Math.random() * 100) + 5);
        transactions.push({
          id: id++,
          date: dateStr,
          amount: amount,
          category: expenseCategory,
          type: 'expense'
        });
      }
    }
  }
  
  return transactions;
};

export const mockTransactions = generateDummyTransactions();