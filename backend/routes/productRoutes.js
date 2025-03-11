import express from 'express';
import pool from '../config/database.js';

const router = express.Router();

// Route pour obtenir tous les produits
router.get('/', async (req, res) => {
  try {
    const [products] = await pool.query(
      'SELECT * FROM produits'
    );
    res.json(products);
  } catch (error) {
    console.error('Erreur lors de la récupération des produits:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des produits' });
  }
});

// Route pour obtenir un produit par son ID
router.get('/:id', async (req, res) => {
  try {
    const [product] = await pool.query(
      'SELECT * FROM produits WHERE id = ?',
      [req.params.id]
    );
    
    if (product.length === 0) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }
    
    res.json(product[0]);
  } catch (error) {
    console.error('Erreur lors de la récupération du produit:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération du produit' });
  }
});

export default router;

