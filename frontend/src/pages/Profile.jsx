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

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nom: user?.nom || '',
    prenom: user?.prenom || '',
    email: user?.email || '',
  });

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Commandes factices pour la démo
  const orders = [
    { id: '1', date: '2024-01-15', status: 'Livré', total: 199.99 },
    { id: '2', date: '2024-01-10', status: 'En cours', total: 149.99 },
    { id: '3', date: '2023-12-28', status: 'En préparation', total: 299.99 },
  ];

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
                  Se déconnecter
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
                  Aperçu
                </TabsTrigger>
                <TabsTrigger
                  value="orders"
                  className="data-[state=active]:bg-gray-700 text-white"
                >
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Commandes
                </TabsTrigger>
                <TabsTrigger
                  value="settings"
                  className="data-[state=active]:bg-gray-700 text-white"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Paramètres
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
                              Total Commandes
                            </p>
                            <h3 className="text-2xl font-bold text-white">12</h3>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-gray-800/50 border border-gray-700 shadow-sm">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                          <Package className="w-8 h-8 text-yellow-500" />
                          <div>
                            <p className="text-sm text-gray-400">En cours</p>
                            <h3 className="text-2xl font-bold text-white">2</h3>
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
                              Total Dépensé
                            </p>
                            <h3 className="text-2xl font-bold text-white">
                              649.97 €
                            </h3>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Dernières commandes */}
                  <Card className="bg-gray-800/50 border border-gray-700 shadow-sm">
                    <CardHeader>
                      <CardTitle>Dernières Commandes</CardTitle>
                      <CardDescription>
                        Vos 3 dernières commandes
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
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
                                  Commande #{order.id}
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
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="orders">
                <Card className="bg-gray-800/50 border border-gray-700 shadow-sm">
                  <CardHeader>
                    <CardTitle>Historique des Commandes</CardTitle>
                    <CardDescription>Toutes vos commandes</CardDescription>
                  </CardHeader>
                  <CardContent>
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
                                Commande #{order.id}
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
                              Détails
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings">
                <Card className="bg-gray-800/50 border border-gray-700 shadow-sm">
                  <CardHeader>
                    <CardTitle>Paramètres du Compte</CardTitle>
                    <CardDescription>
                      Gérez vos informations personnelles
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-300">
                            Prénom
                          </label>
                          <Input
                            value={formData.prenom}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                prenom: e.target.value,
                              })
                            }
                            className="bg-gray-700/50 border border-gray-600 text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-300">
                            Nom
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
                            Email
                          </label>
                          <Input
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                email: e.target.value,
                              })
                            }
                            className="bg-gray-700/50 border border-gray-600 text-white"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end space-x-4">
                        <Button variant="outline">Annuler</Button>
                        <Button>Sauvegarder</Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>

                <Card className="mt-6 bg-gray-800/50 border border-gray-700 shadow-sm">
                  <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>
                      Gérez vos préférences de notifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Bell className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium text-white">
                              Notifications par email
                            </p>
                            <p className="text-sm text-gray-400">
                              Recevez des mises à jour sur vos commandes
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Configurer
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Shield className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium text-white">
                              Sécurité
                            </p>
                            <p className="text-sm text-gray-400">
                              Gérez vos paramètres de sécurité
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Configurer
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
