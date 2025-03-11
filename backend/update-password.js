import bcrypt from 'bcrypt';
import mysql from 'mysql2/promise';

const updatePassword = async () => {
  // Configuration de la base de données avec le mot de passe
  const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root', // Ajout du mot de passe 'root'
    database: 'ecommerce_db',
    port: 3301
  });

  try {
    // Tester la connexion d'abord
    console.log('Test de la connexion à la base de données...');
    await pool.getConnection();
    console.log('Connexion à la base de données réussie!');

    // Mot de passe en clair actuel
    const plainPassword = '123456';
    
    // Générer le hash
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    console.log('Hash généré:', hashedPassword);

    // Mettre à jour le mot de passe dans la base de données
    console.log('Mise à jour du mot de passe...');
    const [result] = await pool.query(
      'UPDATE users SET mot_de_passe = ? WHERE email = ?',
      [hashedPassword, 'test@example.com']
    );

    console.log('Mise à jour réussie:', result.affectedRows, 'ligne(s) modifiée(s)');

    // Vérifier que la mise à jour a bien été effectuée
    const [users] = await pool.query(
      'SELECT * FROM users WHERE email = ?',
      ['test@example.com']
    );
    
    if (users.length > 0) {
      console.log('Utilisateur mis à jour avec succès');
    } else {
      console.log('Attention: Aucun utilisateur trouvé avec cet email');
    }

  } catch (error) {
    console.error('Erreur détaillée:', error);
    if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('\nErreur d\'accès à la base de données:');
      console.error('1. Vérifiez que le mot de passe MySQL est bien "root"');
      console.error('2. Si ce n\'est pas le cas, modifiez la ligne password dans le script');
      console.error('3. Le mot de passe doit correspondre à celui que vous utilisez dans MySQL Workbench');
    }
  } finally {
    await pool.end();
  }
};

updatePassword();