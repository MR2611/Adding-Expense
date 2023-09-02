const expenses = [];

// POST endpoint to add an expense
app.post('/expenses', (req, res) => {
  const { amount, description, category } = req.body;
  const expense = {
    date: new Date(),
    amount,
    description,
    category,
  };
  expenses.push(expense);
  res.status(201).json({ message: 'Expense added successfully' });
});

// GET endpoint to fetch expenses
app.get('/expenses', (req, res) => {
  res.json(expenses);
});
