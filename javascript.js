const users = [
  {
    id: 1,
    email: 'user@example.com',
    password: 'password123',
    expenses: [],
  },
  {
    id: 2,
    email: 'anotheruser@example.com',
    password: 'letmein',
    expenses: [],
  },
];

app.post('/expenses', (req, res) => {
  const { userId, amount, description, category } = req.body;
  const user = users.find((user) => user.id === userId);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const expense = {
    date: new Date(),
    amount,
    description,
    category,
  };

  user.expenses.push(expense);
  res.status(201).json({ message: 'Expense added successfully' });
});

app.delete('/expenses/:userId/:expenseId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const expenseId = parseInt(req.params.expenseId);

  const user = users.find((user) => user.id === userId);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const expenseIndex = user.expenses.findIndex((expense) => expense.date.getTime() === expenseId);

  if (expenseIndex === -1) {
    return res.status(404).json({ message: 'Expense not found' });
  }

  // Check if the user owns the expense
  if (user.expenses[expenseIndex].userId !== userId) {
    return res.status(401).json({ message: 'Unauthorized to delete this expense' });
  }

  // Delete the expense
  user.expenses.splice(expenseIndex, 1);
  res.json({ message: 'Expense deleted successfully' });
});
