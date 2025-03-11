import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/database.js';

const router = express.Router();

// Route d'inscription
router.post('/register', async (req, res) => {
  try {
    const { email, mot_de_passe, prenom, nom } = req.body;
    const hashedPassword = await bcrypt.hash(mot_de_passe, 10);
    
    const [result] = await pool.query(
      'INSERT INTO utilisateurs (email, mot_de_passe, prenom, nom) VALUES (?, ?, ?, ?)',
      [email, hashedPassword, prenom, nom]
    );
    
    res.status(201).json({ message: 'Utilisateur créé avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route de connexion
router.post('/login', async (req, res) => {
  try {
    const { email, mot_de_passe } = req.body;
    const [users] = await pool.query('SELECT * FROM utilisateurs WHERE email = ?', [email]);
    
    if (users.length === 0) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }
    
    const user = users[0];
    const validPassword = await bcrypt.compare(mot_de_passe, user.mot_de_passe);
    
    if (!validPassword) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }
    
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || 'votre_secret_jwt',
      { expiresIn: '24h' }
    );
    
    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        prenom: user.prenom,
        nom: user.nom,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;