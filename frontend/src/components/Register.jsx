import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Loader2 } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    mot_de_passe: '',
    confirmation_mot_de_passe: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (formData.mot_de_passe !== formData.confirmation_mot_de_passe) {
        throw new Error('Les mots de passe ne correspondent pas');
      }

      if (formData.mot_de_passe.length < 6) {
        throw new Error('Le mot de passe doit contenir au moins 6 caractères');
      }

      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nom: formData.nom,
          prenom: formData.prenom,
          email: formData.email,
          mot_de_passe: formData.mot_de_passe
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de l\'inscription');
      }

      navigate('/login', {
        state: { message: 'Inscription réussie ! Vous pouvez maintenant vous connecter.' }
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      
      <div className="w-full max-w-md px-4 z-10">
        <Card className="backdrop-blur-xl bg-white/10 border border-white/20">
          <CardHeader className="space-y-3 pb-6">
            <div>
              <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Créer un compte
              </CardTitle>
            </div>
            <p className="text-gray-400 text-center text-sm">
              Rejoignez-nous pour accéder à toutes nos fonctionnalités
            </p>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-200 text-sm">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Nom</label>
                <Input
                  type="text"
                  value={formData.nom}
                  onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                  required
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-white/30 focus:ring-white/20"
                  placeholder="Votre nom"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Prénom</label>
                <Input
                  type="text"
                  value={formData.prenom}
                  onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                  required
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-white/30 focus:ring-white/20"
                  placeholder="Votre prénom"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Email</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-white/30 focus:ring-white/20"
                  placeholder="votre@email.com"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Mot de passe</label>
                <Input
                  type="password"
                  value={formData.mot_de_passe}
                  onChange={(e) => setFormData({ ...formData, mot_de_passe: e.target.value })}
                  required
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-white/30 focus:ring-white/20"
                  placeholder="••••••••"
                  minLength={6}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Confirmer le mot de passe</label>
                <Input
                  type="password"
                  value={formData.confirmation_mot_de_passe}
                  onChange={(e) => setFormData({ ...formData, confirmation_mot_de_passe: e.target.value })}
                  required
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-white/30 focus:ring-white/20"
                  placeholder="••••••••"
                  minLength={6}
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium py-2.5 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Inscription en cours...</span>
                  </div>
                ) : (
                  'S\'inscrire'
                )}
              </Button>
              <div className="text-center">
                <span className="text-gray-400 text-sm">
                  Déjà un compte ?{' '}
                </span>
                <Button
                  variant="link"
                  className="text-blue-400 hover:text-blue-300 font-semibold p-0 h-auto"
                  onClick={() => navigate('/login')}
                  type="button"
                >
                  Se connecter
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;

