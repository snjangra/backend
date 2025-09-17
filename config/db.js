import mysql from 'mysql2/promise';
//import 'dotenv/config';

const pool = mysql.createPool({
  host: process.env.DB_HOST || '103.127.31.126',
  user: process.env.DB_USER || 'inetsmsc_testusr',
  password: process.env.DB_PASSWORD || 'iNet@1011',
  database: process.env.DB_NAME || 'inetsmsc_icms_5_1',
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
