
const { query } = require('../models/db');


const sessions = require('../session');

module.exports = function authenticateToken(req, res, next) {
 
  console.log('Incoming request headers:', req.headers);

 
  const token = req.headers['authorization']?.split(' ')[1];
  console.log('Extracted token:', token); 

  if (!token) {
    console.log('No token provided'); 
    return res.sendStatus(401); 
  }

  const userId = sessions[token];
  if (!userId) {
    console.log('Invalid token'); 
    return res.sendStatus(403); 
  }

  req.userId = userId; 
  next();
};
