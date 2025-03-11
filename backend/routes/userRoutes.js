// routes/userRoutes.js
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/database.js';

const router = express.Router();

// Route d'inscription
router.post('/register', async (req, res) => {
  const { email, mot_de_passe, confirmation_mot_de_passe, prenom, nom } = req.body;
  
  // Vérification de la présence de tous les champs
  if (!email || !mot_de_passe || !confirmation_mot_de_passe || !prenom || !nom) {
    return res.status(400).json({
      success: false,
      message: 'Tous les champs sont requis'
    });
  }
  
  // Vérification que les mots de passe correspondent
  if (mot_de_passe !== confirmation_mot_de_passe) {
    return res.status(400).json({
      success: false,
      message: 'Les mots de passe ne correspondent pas'
    });
  }

  // Vérification de la longueur du mot de passe
  if (mot_de_passe.length < 6) {
    return res.status(400).json({
      success: false,
      message: 'Le mot de passe doit contenir au moins 6 caractères'
    });
  }
  
  try {
    // Vérifier si un utilisateur avec cet email existe déjà
    const [existingUsers] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUsers.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Un utilisateur avec cet email existe déjà'
      });
    }
    
    // Hashage du mot de passe
    const hashedPassword = await bcrypt.hash(mot_de_passe, 10);
    
    // Insertion de l'utilisateur en base
    await pool.query(
      'INSERT INTO users (email, mot_de_passe, prenom, nom) VALUES (?, ?, ?, ?)',
      [email, hashedPassword, prenom, nom]
    );
    
    res.status(201).json({
      success: true,
      message: 'Utilisateur créé avec succès'
    });
  
  } catch (error) {
    console.error('Erreur lors de l’inscription:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Route de connexion (exemple)
router.post('/login', async (req, res) => {
  const { email, mot_de_passe } = req.body;
  
  if (!email || !mot_de_passe) {
    return res.status(400).json({
      success: false,
      message: 'Email et mot de passe requis'
    });
  }
  
  try {
    const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Identifiants incorrects'
      });
    }
    
    const user = users[0];
    const passwordMatch = await bcrypt.compare(mot_de_passe, user.mot_de_passe);
    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Identifiants incorrects'
      });
    }
    
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'votre_secret_jwt',
      { expiresIn: '24h' }
    );
    
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
