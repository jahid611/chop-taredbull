import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { ArrowRight, ShoppingBag, Shield, Truck, Clock, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        const data = await response.json();
        // Simuler les meilleurs vendeurs en prenant les 4 premiers produits
        setBestSellers(data.slice(0, 4));
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors du chargement des produits:', error);
        setLoading(false);
      }
    };

    fetchBestSellers();
  }, []);

  const categories = [
    {
      id: 1,
      title: "Technologie",
      image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500",
      description: "Les dernières innovations"
    },
    {
      id: 2,
      title: "Sport",
      image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500",
      description: "Équipements sportifs"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="py-20 md:py-28">
            <h1 className="text-4xl md:text-6xl font-bold text-center bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6">
              Découvrez Notre Collection Tech & Sport
            </h1>
            <p className="text-gray-400 text-center text-lg md:text-xl max-w-2xl mx-auto mb-8">
              Les dernières innovations technologiques et les meilleurs équipements sportifs sélectionnés pour vous.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/products">
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500">
                  Explorer les produits
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Pourquoi nous choisir ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: ShoppingBag,
                title: "Produits Premium",
                description: "Sélection rigoureuse des meilleurs produits"
              },
              {
                icon: Shield,
                title: "Paiement Sécurisé",
                description: "Vos transactions sont 100% sécurisées"
              },
              {
                icon: Truck,
                title: "Livraison Rapide",
                description: "Livraison en 24/48h partout en France"
              },
              {
                icon: Clock,
                title: "Support 24/7",
                description: "Une équipe à votre écoute"
              }
            ].map((feature, index) => (
              <Card key={index} className="bg-gray-800/50 border-gray-700 p-6 hover:bg-gray-800/80 transition-colors">
                <feature.icon className="h-8 w-8 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Nos Catégories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map((category) => (
              <Link key={category.id} to={`/products?category=${category.id}`}>
                <Card className="overflow-hidden group cursor-pointer transform hover:scale-105 transition-transform duration-300">
                  <div className="aspect-[16/9] relative overflow-hidden">
                    <img
                      src={category.image || "/placeholder.svg"}
                      alt={category.title}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-2xl font-bold text-white mb-2">{category.title}</h3>
                      <p className="text-gray-200">{category.description}</p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="py-16 bg-gray-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Meilleures Ventes
          </h2>
          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {bestSellers.map((product) => (
                <Link key={product.id} to={`/products/${product.id}`}>
                  <Card className="bg-gray-800/50 border-gray-700 overflow-hidden group h-full">
                    <div className="aspect-square relative">
                      <img
                        src={product.image_url || "/placeholder.svg"}
                        alt={product.nom}
                        className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded text-sm">
                        Populaire
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-white mb-2">{product.nom}</h3>
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-current text-yellow-500" />
                        ))}
                      </div>
                      <p className="text-gray-400 mb-4 line-clamp-2">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-white">{Number(product.prix).toFixed(2)} €</span>
                        <Button size="sm">Voir plus</Button>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Prêt à découvrir nos produits ?
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Rejoignez des milliers de clients satisfaits et découvrez notre sélection de produits premium.
            </p>
            <Link to="/products">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500">
                Commencer vos achats
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

