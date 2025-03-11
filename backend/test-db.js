import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

async function testConnection() {
  const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT)
  };

  console.log('🔄 Tentative de connexion avec les paramètres suivants :');
  console.log('Host:', config.host);
  console.log('User:', config.user);
  console.log('Port:', config.port);
  console.log('Database:', config.database);

  try {
    const connection = await mysql.createConnection(config);
    console.log('\n✅ Connexion réussie à MySQL !');
    
    // Tester l'accès à la base de données
    const [result] = await connection.query('SHOW TABLES');
    console.log('\n📋 Tables trouvées :', result.length);
    result.forEach(table => {
      console.log(`- ${Object.values(table)[0]}`);
    });

    await connection.end();
  } catch (error) {
    console.error('\n❌ Erreur de connexion :', error.message);
    console.log('\n🔍 Suggestions de résolution :');
    console.log('1. Vérifiez que le mot de passe dans .env est correct');
    console.log('2. Vérifiez que MySQL est bien en cours d\'exécution');
    console.log('3. Vérifiez que l\'utilisateur root a les permissions nécessaires');
  }
}

testConnection();