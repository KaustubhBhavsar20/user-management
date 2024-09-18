const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Change this if your MySQL username is different
  password: '', // Add your MySQL password here
  database: 'user_management',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// User Signup
app.post('/signup', (req, res) => {
  const { firstName, lastName, phone, dob, email, password } = req.body;

  const sql = 'INSERT INTO users (firstName, lastName, phone, dob, email, password) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sql, [firstName, lastName, phone, dob, email, password], (err, result) => {
    if (err) {
      return res.status(500).send('Error creating user');
    }
    res.status(201).send({ message: 'User created successfully' });
  });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(query, [email, password], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.send({ loggedIn: true, user: result[0] });
    } else {
      res.send({ loggedIn: false });
    }
  });
 });

// Get All Users
app.get('/users', (req, res) => {
  const sql = 'SELECT id, firstName, lastName, email FROM users';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Get a specific user by ID
app.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  const sql = 'SELECT * FROM users WHERE id = ?';
  db.query(sql, [userId], (err, result) => {
    if (err) throw err;
    res.send(result[0]);
  });
});

// Update a user by ID
app.put('/update/:id', (req, res) => {
  const userId = req.params.id;
  const { firstName, lastName, phone, dob, email } = req.body;
  const sql = 'UPDATE users SET firstName = ?, lastName = ?, phone = ?, dob = ?, email = ? WHERE id = ?';
  db.query(sql, [firstName, lastName, phone, dob, email, userId], (err, result) => {
    if (err) throw err;
    res.send({ message: 'User updated successfully' });
  });
});

// Delete a user by ID
app.delete('/delete/:id', (req, res) => {
  const userId = req.params.id;
  const sql = 'DELETE FROM users WHERE id = ?';
  db.query(sql, [userId], (err, result) => {
    if (err) throw err;
    res.send({ message: 'User deleted successfully' });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
