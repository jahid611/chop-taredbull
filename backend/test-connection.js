import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

async function testDatabaseConnection() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
  });

  try {
    await connection.connect();
    console.log('✅ Connecté à la base de données avec succès !');
    console.log(`📊 Base de données: ${process.env.DB_NAME}`);
    console.log(`🔌 Port: ${process.env.DB_PORT}`);
    
    // Tester la requête
    const [tables] = await connection.query('SHOW TABLES');
    console.log('\n📋 Tables dans la base de données :');
    tables.forEach(table => {
      console.log(`- ${Object.values(table)[0]}`);
    });
  } catch (error) {
    console.error('❌ Erreur de connexion :', error);
  } finally {
    await connection.end();
  }
}

testDatabaseConnection();

