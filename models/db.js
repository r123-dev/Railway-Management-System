const mysql = require("mysql");
require('dotenv').config('./env');
const dbConn = mysql.createConnection({
  host:process.env.DB_HOST,
  user: process.env.DB_USER,  
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD
});

dbConn.connect((err) => {
  if (err) {
    console.error("Connection Failed:", err);
  } else {
    console.log("Connected");
  }
});
const query = (sql, params = []) => {
    return new Promise((resolve, reject) => {
      dbConn.query(sql, params, (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  };
  
  module.exports = query;
 