import express from 'express';
import pool from '../config/database.js';

const router = express.Router();

router.get('/test-db', async (req, res) => {
  try {
    // Test de la connexion
    const connection = await pool.getConnection();
    console.log('Connexion à la base de données réussie');

    // Vérifier les tables
    const [tables] = await connection.query('SHOW TABLES');
    console.log('Tables disponibles:', tables);

    // Compter les produits
    const [products] = await connection.query('SELECT COUNT(*) as count FROM produits');
    console.log('Nombre de produits:', products[0].count);

    // Récupérer un échantillon de produits
    const [sampleProducts] = await connection.query('SELECT * FROM produits LIMIT 2');
    console.log('Échantillon de produits:', sampleProducts);

    connection.release();
    res.json({
      status: 'success',
      tables,
      productCount: products[0].count,
      sampleProducts
    });
  } catch (error) {
    console.error('Erreur de test:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;