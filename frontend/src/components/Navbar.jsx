import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { CartContext } from '../contexts/CartContext';
import { Button } from './ui/Button';
import { LogOut, ShoppingCart, User } from 'lucide-react';
import { Logo } from './Logo';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const cartItemsCount = cart?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav className="bg-transparent shadow-lg">
      <div className="max-w-8xl mx-auto px-1 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Logo />
          </div>
          <div className="flex items-center space-x-6">
            <Link
              to="/products"
              className="text-white font-semibold hover:text-yellow-300 transition-colors"
            >
              {t('navbar.products')}
            </Link>
            <Link
              to="/cart"
              className="text-white hover:text-yellow-300 relative transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            {/* Boutons de changement de langue sans menu déroulant */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => changeLanguage('fr')}
                className="text-white hover:text-yellow-300 transition-colors"
              >
                FR
              </button>
              <button
                onClick={() => changeLanguage('en')}
                className="text-white hover:text-yellow-300 transition-colors"
              >
                EN
              </button>
              <button
                onClick={() => changeLanguage('de')}
                className="text-white hover:text-yellow-300 transition-colors"
              >
                DE
              </button>
            </div>
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/profile">
                  <Button
                    variant="outline"
                    className="border-yellow-400 text-yellow-300 hover:bg-yellow-400 hover:text-black transition-all duration-300"
                  >
                    <User className="h-4 w-4 mr-2" /> {user.prenom}
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="text-white hover:text-yellow-300 transition-colors"
                >
                  <LogOut className="h-5 w-5" /> {t('navbar.logout')}
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/register">
                  <Button
                    variant="outline"
                    className="border-yellow-400 text-yellow-300 hover:bg-yellow-400 hover:text-white transition-all duration-300"
                  >
                    {t('navbar.createAccount')}
                  </Button>
                </Link>
                <Link to="/login">
                  <Button className="bg-gradient-to-r from-yellow-400 to-red-500 hover:from-yellow-500 hover:to-red-600 text-white transition duration-300">
                    {t('navbar.login')}
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
