const mysql = require('mysql2/promise');

const db = await mysql.createConnection({
  host: 'localhost',
  user: 'root@localhost',
  password: '2005',
  database: 'hema'
});

module.exports = db;


