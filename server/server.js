const express = require('express');
const mysql = require('mysql2');
const app = express();
const PORT = process.env.PORT || 3000;

// Create a MySQL database connection
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'surya@93452',
  database: 'aravi',
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Middleware to parse JSON request bodies
app.use(express.json());

// API endpoint to create new content
app.post('/api/content', (req, res) => {
  const { title, content, author, date } = req.body;
  const sql = 'INSERT INTO content (title, content, author, date) VALUES (?, ?, ?, ?)';
  db.query(sql, [title, content, author, date], (err, results) => {
    if (err) {
      console.error('Error inserting new content:', err);
      return res.status(500).json({ error: 'An error occurred while creating new content.' });
    }
    res.status(201).json({ message: 'Content created successfully' });
  });
});

// API endpoint to fetch content
app.get('/api/get/content', (req, res) => {
  const sql = 'SELECT * FROM content'; // Use the correct table name (content)
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      return res.status(500).json({ error: 'An error occurred while fetching content.' });
    }
    res.json(results);
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
const customPort = 4000; // Change to your desired port number
const server = app.listen(customPort, () => {
  console.log(`Server is running on port ${customPort}`);
});

// Close the database connection when the server is shutting down
process.on('SIGTERM', () => {
  server.close(() => {
    db.end((err) => {
      if (err) {
        console.error('Error closing database connection:', err);
      }
      console.log('Database connection closed');
    });
  });
});