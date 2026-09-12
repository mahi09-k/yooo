const mysql = require('mysql2');

// ── Connection Pool ────────────────────────────────────────────────────────────
// Uses a pool (not a single connection) for better performance under concurrent
// requests. All credentials come from environment variables — never hardcoded.
const pool = mysql.createPool({
  host:              process.env.DB_HOST,
  port:              process.env.DB_PORT     || 3306,
  user:              process.env.DB_USER,
  password:          process.env.DB_PASSWORD,
  database:          process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit:   10,
  queueLimit:        0,
});

// Wrap pool with promise support for async/await usage in controllers
const promisePool = pool.promise();

// ── Optional: verify connection on startup ─────────────────────────────────────
pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ MySQL connection failed:', err.message);
    return;
  }
  console.log('✅ MySQL connected successfully to:', process.env.DB_NAME);
  connection.release();
});

module.exports = promisePool;
