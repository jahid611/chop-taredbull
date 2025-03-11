import React, { useState, useEffect } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';

export default function TestProducts() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/test-db');
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center p-4">Chargement...</div>;
  if (error) return <div className="text-center p-4 text-red-500">Erreur: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Nos Produits</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.sampleProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <div className="aspect-square relative">
              <img
                src={product.image_url || "/placeholder.svg"}
                alt={product.nom}
                className="object-cover w-full h-full"
                onError={(e) => {
                  e.target.src = '/placeholder.svg';
                }}
              />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">{product.nom}</h3>
              <p className="text-gray-600 mb-2">{product.description}</p>
              <div className="flex justify-between items-center">
                <p className="text-lg font-bold">{product.prix}€</p>
                <Button>Ajouter au panier</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

