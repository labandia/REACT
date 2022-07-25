const mysql = require('mysql2');

const { DB_HOST, DB_USER, DB_NAME, DB_PASSWORD } = process.env;

// Create the connection pool. The pool-specific settings are the defaults
const connection = mysql.createPool({
  user: DB_USER,
  host: DB_HOST,
  password: DB_PASSWORD,
  database: DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = connection.promise();

