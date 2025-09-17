import mysql from 'mysql2/promise';
//import 'dotenv/config';

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'icms_5',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

// Test the pool
pool.getConnection()
  .then(conn => {
    console.log('✅ DB connection successful');
    conn.release();
  })
  .catch(err => {
    console.error('❌ DB connection failed:', err);
  });

export default pool;
