import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'ecommerce_db',
  port: 3302,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test de connexion initial
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Connecté à la base de données MySQL');
    connection.release();
  } catch (err) {
    console.error('❌ Erreur de connexion à la base de données:', err);
    process.exit(1);
  }
};

testConnection();

export default pool;

