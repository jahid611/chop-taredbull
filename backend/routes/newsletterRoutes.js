import express from 'express';
import pool from '../config/database.js';

const router = express.Router();

router.post('/subscribe', async (req, res) => {
  const { email } = req.body;

  try {
    // Vérifier si l'email existe déjà
    const [existingSubscriber] = await pool.query(
      'SELECT * FROM newsletter WHERE email = ?',
      [email]
    );

    if (existingSubscriber.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cette adresse email est déjà inscrite à la newsletter'
      });
    }

    // Ajouter le nouvel abonné
    await pool.query(
      'INSERT INTO newsletter (email, date_inscription) VALUES (?, NOW())',
      [email]
    );

    res.json({
      success: true,
      message: 'Inscription à la newsletter réussie'
    });
  } catch (error) {
    console.error('Erreur lors de l\'inscription à la newsletter:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de l\'inscription à la newsletter'
    });
  }
});

export default router;

