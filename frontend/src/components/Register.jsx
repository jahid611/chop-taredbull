import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../src/components/ui/Card';
import { Button } from '../../src/components/ui/Button';
import { Input } from '../../src/components/ui/Input';
import { Loader2 } from 'lucide-react';
import { AuthContext } from '../contexts/AuthContext';
import { useTranslation } from 'react-i18next';

const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
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
        throw new Error(t('register.error.passwordMismatch'));
      }

      if (formData.mot_de_passe.length < 6) {
        throw new Error(t('register.error.passwordTooShort'));
      }

      // Appel à l'API d'inscription
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nom: formData.nom,
          prenom: formData.prenom,
          email: formData.email,
          mot_de_passe: formData.mot_de_passe,
          confirmation_mot_de_passe: formData.confirmation_mot_de_passe
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || t('register.error.registration'));
      }

      // Connexion automatique après inscription
      const loginResponse = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email,
          mot_de_passe: formData.mot_de_passe
        })
      });

      const loginData = await loginResponse.json();

      if (!loginResponse.ok) {
        throw new Error(loginData.message || t('register.error.autoLogin'));
      }

      // Mise à jour du contexte avec les infos de l'utilisateur connecté
      login(loginData.user);
      navigate('/');
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
                {t('register.title')}
              </CardTitle>
            </div>
            <p className="text-gray-400 text-center text-sm">
              {t('register.subtitle')}
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
                <label className="text-sm font-medium text-gray-300">
                  {t('register.label.name')}
                </label>
                <Input
                  type="text"
                  value={formData.nom}
                  onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                  required
                  placeholder={t('register.placeholder.name')}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  {t('register.label.firstName')}
                </label>
                <Input
                  type="text"
                  value={formData.prenom}
                  onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                  required
                  placeholder={t('register.placeholder.firstName')}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  {t('register.label.email')}
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  placeholder={t('register.placeholder.email')}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  {t('register.label.password')}
                </label>
                <Input
                  type="password"
                  value={formData.mot_de_passe}
                  onChange={(e) => setFormData({ ...formData, mot_de_passe: e.target.value })}
                  required
                  placeholder={t('register.placeholder.password')}
                  minLength={6}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  {t('register.label.confirmPassword')}
                </label>
                <Input
                  type="password"
                  value={formData.confirmation_mot_de_passe}
                  onChange={(e) =>
                    setFormData({ ...formData, confirmation_mot_de_passe: e.target.value })
                  }
                  required
                  placeholder={t('register.placeholder.confirmPassword')}
                  minLength={6}
                />
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium py-2.5 rounded-lg transition-all duration-300"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>{t('register.loading')}</span>
                  </div>
                ) : (
                  t('register.submit')
                )}
              </Button>
              <div className="text-center">
                <span className="text-gray-400 text-sm">
                  {t('register.alreadyHaveAccount')}{' '}
                </span>
                <Button
                  variant="link"
                  onClick={() => navigate('/login')}
                  type="button"
                >
                  {t('register.login')}
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
