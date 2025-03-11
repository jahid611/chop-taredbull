import bcrypt from 'bcrypt';
import mysql from 'mysql2/promise';

const testHash = async () => {
  const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'ecommerce_db',
    port: 3301
  });

  try {
    // 1. Récupérer le hash de la base de données
    console.log('Récupération du hash de la base de données...');
    const [users] = await pool.query(
      'SELECT email, mot_de_passe FROM users WHERE email = ?',
      ['test@example.com']
    );

    if (users.length === 0) {
      console.log('Utilisateur non trouvé');
      return;
    }

    const storedHash = users[0].mot_de_passe;
    console.log('\nHash stocké dans la BDD:', storedHash);

    // 2. Tester différents mots de passe
    const testPasswords = ['123456', 'mauvaispass', ''];
    
    console.log('\nTest de différents mots de passe:');
    for (const password of testPasswords) {
      const isValid = await bcrypt.compare(password, storedHash);
      console.log(`\nMot de passe testé: "${password}"`);
      console.log('Correspond au hash:', isValid ? '✅ OUI' : '❌ NON');
    }

    // 3. Créer un nouveau hash pour démonstration
    const newHash = await bcrypt.hash('123456', 10);
    console.log('\nNouveau hash généré pour "123456":', newHash);
    console.log('Note: Chaque hash est unique même pour le même mot de passe!');

  } catch (error) {
    console.error('Erreur:', error);
  } finally {
    await pool.end();
  }
};

testHash();