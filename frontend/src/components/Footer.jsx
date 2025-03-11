import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, User, Loader2 } from 'lucide-react';
import { Logo } from './Logo';
import { AuthContext } from '../contexts/AuthContext';
import { Button } from './ui/Button';
import { Input } from './ui/Input';

const Footer = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', content: '' });

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', content: '' });

    try {
      const response = await fetch('http://localhost:5000/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', content: data.message });
        setEmail('');
      } else {
        setMessage({ type: 'error', content: data.message });
      }
    } catch (error) {
      setMessage({ 
        type: 'error', 
        content: 'Erreur lors de l\'inscription à la newsletter' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* À propos */}
          <div>
            <Logo className="mb-4" />
            <p className="text-gray-400 mb-4">
              Votre destination pour les meilleurs produits tech et sportifs.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-gray-400 hover:text-white transition-colors">
                  Produits
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-400">
                <Mail className="h-5 w-5 mr-2" />
                contact@example.com
              </li>
              <li className="flex items-center text-gray-400">
                <Phone className="h-5 w-5 mr-2" />
                01 23 45 67 89
              </li>
              <li className="flex items-center text-gray-400">
                <MapPin className="h-5 w-5 mr-2" />
                Paris, France
              </li>
            </ul>
          </div>

          {/* Newsletter/Auth Section */}
          <div>
            {user ? (
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Mon Compte</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-400 via-purple-500 to-pink-500 p-0.5">
                      <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <div>
                      <p className="text-white font-medium">{user.prenom} {user.nom}</p>
                      <p className="text-gray-400 text-sm">{user.email}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Link to="/profile" className="text-gray-400 hover:text-white block transition-colors">
                      Mon profil
                    </Link>
                    <Link to="/orders" className="text-gray-400 hover:text-white block transition-colors">
                      Mes commandes
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      Se déconnecter
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Newsletter</h3>
                <p className="text-gray-400 mb-4">
                  Inscrivez-vous pour recevoir nos dernières offres.
                </p>
                <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Votre email"
                    required
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                    disabled={isLoading}
                  />
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Inscription...
                      </>
                    ) : (
                      "S'inscrire"
                    )}
                  </Button>
                </form>
                {message.content && (
                  <div className={`mt-2 p-2 rounded text-sm ${
                    message.type === 'success' 
                      ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                      : 'bg-red-500/10 text-red-400 border border-red-500/20'
                  }`}>
                    {message.content}
                  </div>
                )}
                <div className="mt-4 pt-4 border-t border-gray-800">
                  <p className="text-gray-400 mb-2">Vous avez déjà un compte ?</p>
                  <div className="space-x-4">
                    <Link 
                      to="/login" 
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Se connecter
                    </Link>
                    <span className="text-gray-600">ou</span>
                    <Link 
                      to="/register" 
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Créer un compte
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} E-Commerce. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

