const express = require('express');
const app = express();
const port = 3000;

// Mock database of items
const items = [];
for (let i = 1; i <= 100; i++) {
  items.push({ id: i, name: `Item ${i}` });
}

// Middleware to parse JSON requests
app.use(express.json());

// Endpoint for fetching paginated items
app.get('/items', (req, res) => {
  const page = parseInt(req.query.page) || 1; // Get the page number from the query parameter
  const itemsPerPage = 10; // Number of items per page
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Slice the array to get the items for the current page
  const currentItems = items.slice(startIndex, endIndex);

  res.json({
    items: currentItems,
    currentPage: page,
    totalPages: Math.ceil(items.length / itemsPerPage),
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
