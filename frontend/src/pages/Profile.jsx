import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs';
import {
  User,
  LogOut,
  ShoppingBag,
  Settings,
  Bell,
  Shield,
  CreditCard,
  MapPin,
  Package,
} from 'lucide-react';
import { AuthContext } from '../contexts/AuthContext';
import { useTranslation } from 'react-i18next';

const Profile = () => {
  const { t } = useTranslation();
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nom: user?.nom || '',
    prenom: user?.prenom || '',
    email: user?.email || '',
  });

  // Par défaut, pas de commandes
  const orders = [];

  // Fonction pour colorer l'état de la commande
  const getStatusColor = (status) => {
    switch (status) {
      case 'Livré':
        return 'text-green-500';
      case 'En cours':
        return 'text-blue-500';
      case 'En préparation':
        return 'text-yellow-500';
      default:
        return 'text-gray-500';
    }
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-900 py-24">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <Card className="lg:col-span-1 bg-gray-800/50 border border-gray-700 shadow-sm">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-red-500 via-yellow-400 to-blue-500 p-1">
                  <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                    <User className="w-12 h-12 text-white" />
                  </div>
                </div>
                <h2 className="mt-4 text-xl font-bold text-white">
                  {user.prenom} {user.nom}
                </h2>
                <p className="text-gray-400">{user.email}</p>
                <p className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-500/10 text-red-400">
                  {user.role}
                </p>
              </div>
              <div className="mt-6 border-t border-gray-700 pt-6">
                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  {t('navbar.logout')}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="bg-gray-800/50 border border-gray-700 rounded-lg">
                <TabsTrigger
                  value="overview"
                  className="data-[state=active]:bg-gray-700 text-white"
                >
                  <User className="w-4 h-4 mr-2" />
                  {t('profile.overview')}
                </TabsTrigger>
                <TabsTrigger
                  value="orders"
                  className="data-[state=active]:bg-gray-700 text-white"
                >
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  {t('profile.orders')}
                </TabsTrigger>
                <TabsTrigger
                  value="settings"
                  className="data-[state=active]:bg-gray-700 text-white"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  {t('profile.settings')}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <div className="grid gap-6">
                  {/* Statistiques */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="bg-gray-800/50 border border-gray-700 shadow-sm">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                          <ShoppingBag className="w-8 h-8 text-red-500" />
                          <div>
                            <p className="text-sm text-gray-400">
                              {t('profile.stats.totalOrders')}
                            </p>
                            <h3 className="text-2xl font-bold text-white">0</h3>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-gray-800/50 border border-gray-700 shadow-sm">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                          <Package className="w-8 h-8 text-yellow-500" />
                          <div>
                            <p className="text-sm text-gray-400">
                              {t('profile.stats.inProgress')}
                            </p>
                            <h3 className="text-2xl font-bold text-white">0</h3>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-gray-800/50 border border-gray-700 shadow-sm">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                          <CreditCard className="w-8 h-8 text-blue-500" />
                          <div>
                            <p className="text-sm text-gray-400">
                              {t('profile.stats.totalSpent')}
                            </p>
                            <h3 className="text-2xl font-bold text-white">0 €</h3>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Dernières commandes */}
                  <Card className="bg-gray-800/50 border border-gray-700 shadow-sm">
                    <CardHeader>
                      <CardTitle>{t('profile.lastOrders.title')}</CardTitle>
                      <CardDescription>
                        {t('profile.lastOrders.description')}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {orders.length === 0 ? (
                        <div className="text-center text-gray-400 py-4">
                          {t('profile.noOrders')}
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {orders.map((order) => (
                            <div
                              key={order.id}
                              className="flex items-center justify-between p-4 rounded-lg bg-gray-700/50"
                            >
                              <div className="flex items-center space-x-4">
                                <div className="bg-gray-600 p-2 rounded-lg">
                                  <Package className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-white">
                                    {t('profile.orderPrefix')} #{order.id}
                                  </p>
                                  <p className="text-sm text-gray-400">
                                    {order.date}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-medium text-white">
                                  {order.total} €
                                </p>
                                <p className={`text-sm ${getStatusColor(order.status)}`}>
                                  {order.status}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="orders">
                <Card className="bg-gray-800/50 border border-gray-700 shadow-sm">
                  <CardHeader>
                    <CardTitle>{t('profile.orderHistory.title')}</CardTitle>
                    <CardDescription>{t('profile.orderHistory.description')}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {orders.length === 0 ? (
                      <div className="text-center text-gray-400 py-4">
                        {t('profile.noOrders')}
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {orders.map((order) => (
                          <div
                            key={order.id}
                            className="flex flex-col md:flex-row md:items-center justify-between p-6 rounded-lg bg-gray-700/50"
                          >
                            <div className="flex items-center space-x-4">
                              <div className="bg-gray-600 p-3 rounded-lg">
                                <Package className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <p className="text-lg font-medium text-white">
                                  {t('profile.orderPrefix')} #{order.id}
                                </p>
                                <p className="text-sm text-gray-400">
                                  {order.date}
                                </p>
                              </div>
                            </div>
                            <div className="mt-4 md:mt-0 flex items-center space-x-4">
                              <div className="text-right">
                                <p className="text-lg font-medium text-white">
                                  {order.total} €
                                </p>
                                <p className={`text-sm ${getStatusColor(order.status)}`}>
                                  {order.status}
                                </p>
                              </div>
                              <Button variant="outline" size="sm">
                                {t('profile.details')}
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings">
                <Card className="bg-gray-800/50 border border-gray-700 shadow-sm">
                  <CardHeader>
                    <CardTitle>{t('profile.accountSettings.title')}</CardTitle>
                    <CardDescription>
                      {t('profile.accountSettings.description')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-300">
                            {t('register.label.firstName')}
                          </label>
                          <Input
                            value={formData.prenom}
                            onChange={(e) =>
                              setFormData({ ...formData, prenom: e.target.value })
                            }
                            className="bg-gray-700/50 border border-gray-600 text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-300">
                            {t('register.label.name')}
                          </label>
                          <Input
                            value={formData.nom}
                            onChange={(e) =>
                              setFormData({ ...formData, nom: e.target.value })
                            }
                            className="bg-gray-700/50 border border-gray-600 text-white"
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-sm font-medium text-gray-300">
                            {t('register.label.email')}
                          </label>
                          <Input
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({ ...formData, email: e.target.value })
                            }
                            className="bg-gray-700/50 border border-gray-600 text-white"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end space-x-4">
                        <Button variant="outline">{t('profile.cancel')}</Button>
                        <Button>{t('profile.save')}</Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>

                <Card className="mt-6 bg-gray-800/50 border border-gray-700 shadow-sm">
                  <CardHeader>
                    <CardTitle>{t('profile.notifications.title')}</CardTitle>
                    <CardDescription>
                      {t('profile.notifications.description')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Bell className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium text-white">
                              {t('profile.notifications.email')}
                            </p>
                            <p className="text-sm text-gray-400">
                              {t('profile.notifications.emailDesc')}
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          {t('profile.configure')}
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Shield className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium text-white">
                              {t('profile.notifications.security')}
                            </p>
                            <p className="text-sm text-gray-400">
                              {t('profile.notifications.securityDesc')}
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          {t('profile.configure')}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
