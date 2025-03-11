import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Search, ShoppingCart } from 'lucide-react';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur réseau');
        }
        return response.json();
      })
      .then(data => {
        console.log('Produits reçus:', data); // Pour déboguer
        setProducts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erreur:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter(product =>
    product.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        <p>Erreur: {error}</p>
        <Button 
          onClick={() => window.location.reload()} 
          className="mt-4"
          variant="outline"
        >
          Réessayer
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <h1 className="text-2xl font-bold">Nos Produits ({filteredProducts.length})</h1>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="search"
            placeholder="Rechercher..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Aucun produit trouvé</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <Card key={product.id} className="flex flex-col hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="line-clamp-1">{product.nom}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="aspect-square mb-4 overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src={product.image_url || '/placeholder.svg?height=400&width=400'}
                    alt={product.nom}
                    className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = '/placeholder.svg?height=400&width=400';
                    }}
                  />
                </div>
                <p className="text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                <p className="text-2xl font-bold">{product.prix?.toFixed(2)} €</p>
                <div className="text-sm text-gray-500 mt-2">
                  <p>Stock: {product.stock} unités</p>
                  {product.collection_nom && <p>Collection: {product.collection_nom}</p>}
                  {product.fournisseur_nom && <p>Fournisseur: {product.fournisseur_nom}</p>}
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full flex items-center justify-center gap-2"
                  disabled={product.stock === 0}
                >
                  <ShoppingCart className="h-5 w-5" />
                  {product.stock === 0 ? 'Rupture de stock' : 'Ajouter au panier'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}