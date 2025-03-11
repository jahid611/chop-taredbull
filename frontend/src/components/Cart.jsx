import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';

const Cart = () => {
  const { cart, total, removeFromCart, updateQuantity } = useContext(CartContext);

  if (!cart || cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto mt-8 px-4">
        <Card>
          <CardContent className="p-6">
            <p className="text-center text-gray-400">Votre panier est vide</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle>Votre Panier</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 border border-gray-800 rounded-lg bg-gray-900/50">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image_url || "/placeholder.svg"}
                    alt={item.nom}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-100">{item.nom}</h3>
                    <p className="text-sm text-gray-400">{Number(item.prix).toFixed(2)} €</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </Button>
                    <span className="w-8 text-center text-gray-100">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </Button>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Supprimer
                  </Button>
                </div>
              </div>
            ))}
            <div className="flex justify-between items-center pt-4 border-t border-gray-800">
              <span className="font-semibold text-gray-100">Total:</span>
              <span className="text-xl font-bold text-gray-100">{total.toFixed(2)} €</span>
            </div>
            <Button className="w-full mt-4">
              Passer la commande
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Cart;

