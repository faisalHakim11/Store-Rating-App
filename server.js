const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8081;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'userDB',
});

db.connect((err) => {
  if (err) {
    console.error('MySQL Connection Failed:', err);
  } else {
    console.log('MySQL Connected');
  }
});



app.post('/api/register', (req, res) => {
  const { name, email, address, password, role } = req.body;

  if (!name || !email || !address || !password || !role) {
    return res.status(400).json({ message: 'All fields are required including role' });
  }

  const sql = 'INSERT INTO users (name, email, address, password, role) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [name, email, address, password, role], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ message: 'Email already registered' });
      }
      return res.status(500).json({ message: 'Server error', error: err });
    }
    res.status(201).json({ message: 'User registered successfully' });
  });
});
app.post('/api/stores', (req, res) => {
  const { name, description, ownerId } = req.body;
  if (!name || !description || !ownerId) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const sql = 'INSERT INTO stores (name, description, ownerId) VALUES (?, ?, ?)';
  db.query(sql, [name, description, ownerId], (err, result) => {
    if (err) return res.status(500).json({ message: 'Server error', error: err });
    res.status(201).json({ message: 'Store created successfully' });
  });
});
app.post('/api/ratings', (req, res) => {
  const { storeId, userId, rating } = req.body;
  if (!storeId || !userId || !rating) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (rating < 1 || rating > 5) {
    return res.status(400).json({ message: 'Rating must be between 1 and 5' });
  }

  const sql = 'INSERT INTO ratings (storeId, userId, rating) VALUES (?, ?, ?)';
  db.query(sql, [storeId, userId, rating], (err, result) => {
    if (err) return res.status(500).json({ message: 'Server error', error: err });
    res.status(201).json({ message: 'Rating submitted successfully' });
  });
});
app.get('/api/stores', (req, res) => {
  const sql = 'SELECT * FROM stores';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: 'Server error' });
    res.json(results);
  });
});
app.get('/api/stores/:storeId/ratings', (req, res) => {
  const { storeId } = req.params;
  const sql = `
    SELECT r.rating, u.name AS userName 
    FROM ratings r 
    JOIN users u ON r.userId = u.id 
    WHERE r.storeId = ?
  `;
  db.query(sql, [storeId], (err, results) => {
    if (err) return res.status(500).json({ message: 'Server error' });
    res.json(results);
  });
});


app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(sql, [email, password], (err, results) => {
    if (err) return res.status(500).json({ message: 'Server error' });

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = results[0];
    res.json({ message: 'Login successful', user });
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
