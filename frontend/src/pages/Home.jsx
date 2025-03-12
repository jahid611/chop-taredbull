import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { ArrowRight, ShoppingBag, Shield, Truck, Clock, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();
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
        console.error(t('home.error.fetchProducts'), error);
        setLoading(false);
      }
    };

    fetchBestSellers();
  }, [t]);

  const categories = [
    {
      id: 1,
      title: t('home.categories.classic.title'),
      image: 'https://media.istockphoto.com/id/537022544/fr/photo/en-aluminium-peut-de-boisson-%C3%A9nerg%C3%A9tique-glac%C3%A9-rouge-bull-arri%C3%A8re-plan.jpg?s=612x612&w=0&k=20&c=1do0_2Ud9FvMJtel09bKF5I2blx7C5ew6ti19X0rRRo=',
      description: t('home.categories.classic.description')
    },
    {
      id: 2,
      title: t('home.categories.editions.title'),
      image: 'https://i.pinimg.com/550x/dd/ed/7e/dded7e2b6be6af67421169197ab62fae.jpg',
      description: t('home.categories.editions.description')
    }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Vidéo en arrière-plan */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/videos/RedBullAdvertisement.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Overlay sombre pour lisibilité */}
      <div className="relative z-10 bg-black/60 min-h-screen flex flex-col">
        {/* Hero Section */}
        <section className="flex-grow">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 md:py-28">
            <h1 className="text-8xl md:text-6xl font-bold text-white mb-6">
              {t('home.hero.title')}
            </h1>
            <p className="text-gray-200 text-lg md:text-xl max-w-2xl mx-auto mb-8">
              {t('home.hero.subtitle')}
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/products">
                <Button className="bg-red-600 hover:bg-red-500">
                  {t('home.hero.button')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-black/50">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-white mb-12">
              {t('home.features.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: ShoppingBag,
                  title: t('home.features.productsPremium.title'),
                  description: t('home.features.productsPremium.description')
                },
                {
                  icon: Shield,
                  title: t('home.features.securePayment.title'),
                  description: t('home.features.securePayment.description')
                },
                {
                  icon: Truck,
                  title: t('home.features.fastDelivery.title'),
                  description: t('home.features.fastDelivery.description')
                },
                {
                  icon: Clock,
                  title: t('home.features.support24_7.title'),
                  description: t('home.features.support24_7.description')
                }
              ].map((feature, index) => (
                <Card
                  key={index}
                  className="bg-gray-800/70 border-gray-700 p-6 transition-colors hover:bg-gray-800/90"
                >
                  <feature.icon className="h-8 w-8 text-white-600 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-white mb-12">
              {t('home.categories.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {categories.map((category) => (
                <Link key={category.id} to={`/products?category=${category.id}`}>
                  <Card className="overflow-hidden group cursor-pointer transform hover:scale-105 transition-transform duration-300">
                    <div className="aspect-[16/9] relative overflow-hidden">
                      <img
                        src={category.image || '/placeholder.svg'}
                        alt={category.title}
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {category.title}
                        </h3>
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
        <section className="py-16 bg-black/30">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-white mb-12">
              {t('home.bestSellers.title')}
            </h2>
            {loading ? (
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {bestSellers.map((product) => (
                  <Link key={product.id} to={`/products/${product.id}`}>
                    <Card className="bg-gray-800/70 border-gray-700 overflow-hidden group h-full">
                      <div className="aspect-square relative">
                        <img
                          src={product.image_url || '/placeholder.svg'}
                          alt={product.nom}
                          className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-sm">
                          {t('home.bestSellers.popular')}
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-white mb-2">
                          {product.nom}
                        </h3>
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-current text-yellow-500" />
                          ))}
                        </div>
                        <p className="text-gray-400 mb-4 line-clamp-2">
                          {product.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-white">
                            {Number(product.prix).toFixed(2)} €
                          </span>
                          <Button size="sm" className="bg-red-600 hover:bg-red-500">
                            {t('home.bestSellers.button')}
                          </Button>
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
        <section className="py-20">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {t('home.cta.title')}
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              {t('home.cta.subtitle')}
            </p>
            <Link to="/products">
              <Button size="lg" className="bg-red-600 hover:bg-red-500">
                {t('home.cta.button')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
