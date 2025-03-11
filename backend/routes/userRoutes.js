import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../config/database.js';

const router = express.Router();

// Middleware de validation des données
const validateLoginData = (req, res, next) => {
  const { email, mot_de_passe } = req.body;
  
  if (!email || !mot_de_passe) {
    return res.status(400).json({
      success: false,
      message: 'Email et mot de passe requis'
    });
  }
  
  if (typeof email !== 'string' || typeof mot_de_passe !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'Format de données invalide'
    });
  }

  next();
};

// Route de connexion simplifiée
router.post('/login', validateLoginData, async (req, res) => {
  const { email, mot_de_passe } = req.body;

  try {
    // 1. Recherche de l'utilisateur
    const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

    // 2. Vérification de l'existence de l'utilisateur
    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Identifiants incorrects'
      });
    }

    const user = users[0];

    // 3. Vérification du mot de passe
    const passwordMatch = await bcrypt.compare(mot_de_passe, user.mot_de_passe);
    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Identifiants incorrects'
      });
    }

    // 4. Création du token JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      'votre_secret_jwt',
      { expiresIn: '24h' }
    );

    // 5. Envoi de la réponse
    res.json({
      success: true,
      message: 'Connexion réussie',
      user: {
        id: user.id,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        role: user.role
      },
      token
    });

  } catch (error) {
    console.error('Erreur de connexion:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la connexion'
    });
  }
});

export default router;

