const  query  = require('../models/db');

module.exports = async function adminMiddleware(req, res, next) {
  try {
    debugger;
    const userId = req.userId;
    console.log(await query('SELECT role FROM users WHERE id = ?', [userId]))
    
    const [user] = await query('SELECT role FROM users WHERE id = ?', [userId]);
    
   
    

    if (user.role !== 'admin') {
      return res.sendStatus(403); 
    }

    next(); 
  } catch (error) {
    console.error('Error in adminMiddleware:', error); 
    res.status(500).json({ error: 'Server error' });
  }
};
