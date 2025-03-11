import React, { useState, useEffect, useContext } from 'react';
import { Card, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import { CartContext } from '../contexts/CartContext';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCollection, setSelectedCollection] = useState('all');
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-400 text-center p-4 bg-red-900/50 rounded-lg max-w-md mx-auto">
        Erreur: {error}
      </div>
    );
  }

  const filteredProducts = selectedCollection === 'all'
    ? products
    : products.filter(product => product.collection_id === parseInt(selectedCollection));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-3xl font-bold text-gray-100">Nos Produits</h2>
        <div className="flex gap-2">
          <Button 
            variant={selectedCollection === 'all' ? 'default' : 'outline'}
            onClick={() => setSelectedCollection('all')}
          >
            Tous
          </Button>
          <Button 
            variant={selectedCollection === '1' ? 'default' : 'outline'}
            onClick={() => setSelectedCollection('1')}
          >
            Technologie
          </Button>
          <Button 
            variant={selectedCollection === '2' ? 'default' : 'outline'}
            onClick={() => setSelectedCollection('2')}
          >
            Sport
          </Button>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center text-gray-400 py-8">
          Aucun produit trouvé dans cette catégorie.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="flex flex-col h-full bg-gray-900 border-gray-800">
              <div className="aspect-square relative overflow-hidden">
                <img
                  src={product.image_url || "/placeholder.svg"}
                  alt={product.nom}
                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = '/placeholder.svg';
                  }}
                />
                {product.stock < 5 && product.stock > 0 && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm">
                    Plus que {product.stock} en stock !
                  </div>
                )}
                {product.stock === 0 && (
                  <div className="absolute inset-0 bg-black/75 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">Rupture de stock</span>
                  </div>
                )}
              </div>
              <CardContent className="flex flex-col flex-grow p-4">
                <h3 className="font-bold text-lg mb-2 text-gray-100">{product.nom}</h3>
                <p className="text-gray-400 mb-4 flex-grow">{product.description}</p>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex flex-col">
                    <span className="text-lg font-bold text-gray-100">
                      {Number(product.prix).toFixed(2)} €
                    </span>
                    <span className="text-sm text-gray-400">
                      {product.stock > 0 ? `Stock: ${product.stock}` : 'Indisponible'}
                    </span>
                  </div>
                  <Button
                    onClick={() => addToCart(product)}
                    disabled={product.stock === 0}
                    className="ml-2"
                  >
                    {product.stock === 0 ? 'Indisponible' : 'Ajouter au panier'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;

