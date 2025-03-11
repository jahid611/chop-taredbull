// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import newsletterRoutes from './routes/newsletterRoutes.js';
// (Importe ici d’autres routes si nécessaire, par exemple productRoutes, newsletterRoutes, etc.)

dotenv.config();

const app = express();

// Middleware de logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Configuration CORS (assure-toi que l’URL du frontend est correcte)
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// Parsers JSON et URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Montage des routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/newsletter', newsletterRoutes);

// Gestion des erreurs 404 (route non trouvée)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route non trouvée'
  });
});

// Gestion globale des erreurs
app.use((err, req, res, next) => {
  console.error('Erreur serveur:', err);
  res.status(500).json({
    success: false,
    message: 'Erreur serveur',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
