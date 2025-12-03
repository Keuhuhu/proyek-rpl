const mysql = require('mysql2');

// Gunakan createPool, bukan createConnection
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  connectionLimit: 10, // Maksimal koneksi sekaligus
  waitForConnections: true, // Ini baru berfungsi di sini
  queueLimit: 0
});

// Test koneksi (Opsional, hanya untuk cek saat start)
db.getConnection((err, connection) => {
  if (err) {
    console.error('Error koneksi database:', err);
  } else {
    console.log('Database Terhubung via Pool!');
    connection.release(); // Kembalikan koneksi ke pool
  }
});

module.exports = db;