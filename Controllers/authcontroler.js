const bcrypt = require('bcryptjs');
const query = require('../models/db');
const crypto = require('crypto'); 


const sessions = require('../session');

exports.register = async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await query(
      'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
      [username, hashedPassword, role]
    );
    res.status(201).json({ id: result.insertId, username, role });
  } catch (error) {
    res.status(400).json({ error: 'User already exists or error occurred' });
  }
};


exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
      const [user] = await query('SELECT * FROM users WHERE username = ?', [username]);
      console.log('User found:', user); 
  
      if (user && await bcrypt.compare(password, user.password)) {
       
        const token = crypto.randomBytes(64).toString('hex');
        sessions[token] = user.id;
        console.log('Token generated:', token); 
        console.log('Current sessions:', sessions); 
        res.json({ token });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } catch (error) {
      console.error('Error during login:', error); 
      res.status(500).json({ error: 'Server error' });
    }
  };
  