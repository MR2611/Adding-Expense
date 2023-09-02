app.delete('/expenses/:userId/:expenseId', async (req, res) => {
  try {
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

    // Begin a database transaction here using your database library

    // Check if the user owns the expense
    if (user.expenses[expenseIndex].userId !== userId) {
      return res.status(401).json({ message: 'Unauthorized to delete this expense' });
    }

    // Delete the expense
    user.expenses.splice(expenseIndex, 1);

    // Commit the transaction here

    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    // Handle errors here, and roll back the transaction if necessary
    console.error('Error deleting expense:', error);
    // Rollback the transaction here if needed
    res.status(500).json({ message: 'Internal server error' });
  }
});
