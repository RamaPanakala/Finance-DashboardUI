// Generate 80+ dummy transactions with LOW money amounts - March & April 2026
const generateDummyTransactions = () => {
  const transactions = [];
  
  let id = 1;

  // Generate 80+ transactions with low amounts across March & April 2026
  const transactionData = [
    // MARCH 2026 - Week 1
    { date: '2026-03-01', amount: -8.50, category: 'Transport', type: 'expense' },
    { date: '2026-03-01', amount: -21.00, category: 'Groceries', type: 'expense' },
    { date: '2026-03-01', amount: -5.50, category: 'Coffee', type: 'expense' },
    { date: '2026-03-02', amount: -15.25, category: 'Food & Dining', type: 'expense' },
    { date: '2026-03-02', amount: 45.00, category: 'Freelance', type: 'income' },
    { date: '2026-03-02', amount: -7.99, category: 'Snacks', type: 'expense' },
    { date: '2026-03-03', amount: -6.75, category: 'Coffee', type: 'expense' },
    { date: '2026-03-03', amount: -11.50, category: 'Entertainment', type: 'expense' },
    { date: '2026-03-03', amount: -18.00, category: 'Shopping', type: 'expense' },
    { date: '2026-03-04', amount: -9.25, category: 'Transport', type: 'expense' },
    { date: '2026-03-04', amount: -13.50, category: 'Groceries', type: 'expense' },
    { date: '2026-03-04', amount: 50.00, category: 'Gigs', type: 'income' },

    // MARCH 2026 - Week 2
    { date: '2026-03-08', amount: -5.00, category: 'Coffee', type: 'expense' },
    { date: '2026-03-08', amount: -20.75, category: 'Food & Dining', type: 'expense' },
    { date: '2026-03-08', amount: -11.99, category: 'Books', type: 'expense' },
    { date: '2026-03-09', amount: -8.50, category: 'Transport', type: 'expense' },
    { date: '2026-03-09', amount: -14.00, category: 'Groceries', type: 'expense' },
    { date: '2026-03-09', amount: 35.00, category: 'Part-time', type: 'income' },
    { date: '2026-03-10', amount: -6.25, category: 'Coffee', type: 'expense' },
    { date: '2026-03-10', amount: -18.50, category: 'Groceries', type: 'expense' },
    { date: '2026-03-10', amount: -4.99, category: 'Shopping', type: 'expense' },
    { date: '2026-03-11', amount: -9.75, category: 'Transport', type: 'expense' },
    { date: '2026-03-11', amount: -22.00, category: 'Food & Dining', type: 'expense' },
    { date: '2026-03-11', amount: 40.00, category: 'Tutoring', type: 'income' },

    // MARCH 2026 - Week 3
    { date: '2026-03-15', amount: -5.00, category: 'Entertainment', type: 'expense' },
    { date: '2026-03-15', amount: -14.30, category: 'Groceries', type: 'expense' },
    { date: '2026-03-15', amount: -7.50, category: 'Phone Bill', type: 'expense' },
    { date: '2026-03-16', amount: -11.99, category: 'Subscription', type: 'expense' },
    { date: '2026-03-16', amount: -6.75, category: 'Coffee', type: 'expense' },
    { date: '2026-03-16', amount: 55.00, category: 'Gigs', type: 'income' },
    { date: '2026-03-17', amount: -8.25, category: 'Transport', type: 'expense' },
    { date: '2026-03-17', amount: -19.50, category: 'Shopping', type: 'expense' },
    { date: '2026-03-17', amount: -5.50, category: 'Coffee', type: 'expense' },
    { date: '2026-03-18', amount: -13.75, category: 'Groceries', type: 'expense' },
    { date: '2026-03-18', amount: -20.00, category: 'Food & Dining', type: 'expense' },
    { date: '2026-03-18', amount: 45.00, category: 'Freelance', type: 'income' },

    // MARCH 2026 - Week 4
    { date: '2026-03-22', amount: -6.50, category: 'Coffee', type: 'expense' },
    { date: '2026-03-22', amount: -9.99, category: 'Snacks', type: 'expense' },
    { date: '2026-03-22', amount: -25.00, category: 'Healthcare', type: 'expense' },
    { date: '2026-03-23', amount: -7.25, category: 'Transport', type: 'expense' },
    { date: '2026-03-23', amount: -17.50, category: 'Groceries', type: 'expense' },
    { date: '2026-03-23', amount: 50.00, category: 'Part-time', type: 'income' },
    { date: '2026-03-24', amount: -4.75, category: 'Entertainment', type: 'expense' },
    { date: '2026-03-24', amount: -10.50, category: 'Phone Bill', type: 'expense' },
    { date: '2026-03-24', amount: -12.99, category: 'Internet', type: 'expense' },
    { date: '2026-03-25', amount: -6.00, category: 'Coffee', type: 'expense' },
    { date: '2026-03-25', amount: -16.75, category: 'Shopping', type: 'expense' },
    { date: '2026-03-25', amount: 35.00, category: 'Tutoring', type: 'income' },

    // APRIL 2026 - Week 1
    { date: '2026-04-01', amount: -8.50, category: 'Transport', type: 'expense' },
    { date: '2026-04-01', amount: -21.00, category: 'Groceries', type: 'expense' },
    { date: '2026-04-01', amount: -5.50, category: 'Coffee', type: 'expense' },
    { date: '2026-04-02', amount: -15.25, category: 'Food & Dining', type: 'expense' },
    { date: '2026-04-02', amount: 60.00, category: 'Freelance', type: 'income' },
    { date: '2026-04-02', amount: -7.99, category: 'Snacks', type: 'expense' },
    { date: '2026-04-03', amount: -6.75, category: 'Coffee', type: 'expense' },
    { date: '2026-04-03', amount: -11.50, category: 'Entertainment', type: 'expense' },
    { date: '2026-04-03', amount: -18.00, category: 'Shopping', type: 'expense' },
    { date: '2026-04-04', amount: -9.25, category: 'Transport', type: 'expense' },
    { date: '2026-04-04', amount: -13.50, category: 'Groceries', type: 'expense' },
    { date: '2026-04-04', amount: 65.00, category: 'Gigs', type: 'income' },

    // APRIL 2026 - Week 2
    { date: '2026-04-08', amount: -5.00, category: 'Coffee', type: 'expense' },
    { date: '2026-04-08', amount: -20.75, category: 'Food & Dining', type: 'expense' },
    { date: '2026-04-08', amount: -11.99, category: 'Books', type: 'expense' },
    { date: '2026-04-09', amount: -8.50, category: 'Transport', type: 'expense' },
    { date: '2026-04-09', amount: -14.00, category: 'Groceries', type: 'expense' },
    { date: '2026-04-09', amount: 550000.00, category: 'Salary', type: 'income' },
    { date: '2026-04-10', amount: -6.25, category: 'Coffee', type: 'expense' },
    { date: '2026-04-10', amount: -18.50, category: 'Groceries', type: 'expense' },
    { date: '2026-04-10', amount: -4.99, category: 'Shopping', type: 'expense' },
    { date: '2026-04-11', amount: -9.75, category: 'Transport', type: 'expense' },
    { date: '2026-04-11', amount: -22.00, category: 'Food & Dining', type: 'expense' },
    { date: '2026-04-11', amount: 50.00, category: 'Tutoring', type: 'income' }
  ];

  // Add all transactions
  transactionData.forEach(tx => {
    transactions.push({
      id: id++,
      date: tx.date,
      amount: tx.amount,
      category: tx.category,
      type: tx.type
    });
  });

  return transactions;
};

export const mockTransactions = generateDummyTransactions();