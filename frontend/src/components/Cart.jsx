import React, { useContext, useState } from 'react';
import { CartContext } from '../contexts/CartContext';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import {
  X,
  CheckCircle2,
  CreditCard,
  User,
  CalendarDays,
  Shield,
  MapPin,
} from 'lucide-react';

const Cart = () => {
  const { cart, total, removeFromCart, updateQuantity } = useContext(CartContext);

  // State for controlling the payment modal
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Payment form state
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [securityCode, setSecurityCode] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const handleOpenModal = () => {
    setShowPaymentModal(true);
    setPaymentSuccess(false); // reset success state if reopened
  };

  const handleCloseModal = () => {
    setShowPaymentModal(false);
  };

  const handlePay = (e) => {
    e.preventDefault();
    // Here you would add real payment logic. For now, just simulate success:
    setPaymentSuccess(true);

    // Optionally, you could empty the cart or do other actions after success.
  };

  if (!cart || cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto mt-8 px-4">
        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-6">
            <p className="text-center text-gray-400">Votre panier est vide</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-12 px-4">
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Votre Panier</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 border border-gray-700 rounded-lg bg-gray-900/50"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image_url || '/placeholder.svg'}
                    alt={item.nom}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-100">{item.nom}</h3>
                    <p className="text-sm text-gray-400">
                      {Number(item.prix).toFixed(2)} €
                    </p>
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
                    <span className="w-8 text-center text-gray-100">
                      {item.quantity}
                    </span>
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

            <div className="flex justify-between items-center pt-4 border-t border-gray-700">
              <span className="font-semibold text-gray-100">Total:</span>
              <span className="text-xl font-bold text-gray-100">
                {total.toFixed(2)} €
              </span>
            </div>

            <Button className="w-full mt-4" onClick={handleOpenModal}>
              Passer la commande
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          {/* Modal Container */}
          <div className="relative w-full max-w-md bg-gray-800 text-white rounded-lg shadow-lg border border-gray-700">
            {/* Close button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-200"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Payment Form (if not paid yet) */}
            {!paymentSuccess && (
              <div className="p-6 space-y-6">
                <h2 className="text-xl font-bold mb-2 flex items-center space-x-2">
                  <CreditCard className="w-6 h-6 text-gray-200" />
                  <span>Paiement de {total.toFixed(2)} €</span>
                </h2>
                <form onSubmit={handlePay} className="space-y-4">
                  {/* Name on card */}
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-1 flex items-center space-x-1">
                      <User className="w-4 h-4 text-gray-400" />
                      <span>Nom sur la carte</span>
                    </label>
                    <Input
                      type="text"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      required
                      className="bg-gray-700 border-gray-600 placeholder:text-gray-400"
                    />
                  </div>

                  {/* Card number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-1 flex items-center space-x-1">
                      <CreditCard className="w-4 h-4 text-gray-400" />
                      <span>Numéro de carte</span>
                    </label>
                    <Input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      required
                      placeholder="XXXX XXXX XXXX XXXX"
                      className="bg-gray-700 border-gray-600 placeholder:text-gray-400"
                    />
                  </div>

                  {/* Expiry / Security */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-1 flex items-center space-x-1">
                        <CalendarDays className="w-4 h-4 text-gray-400" />
                        <span>Date d'expiration</span>
                      </label>
                      <Input
                        type="text"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        required
                        placeholder="MM/YY"
                        className="bg-gray-700 border-gray-600 placeholder:text-gray-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-1 flex items-center space-x-1">
                        <Shield className="w-4 h-4 text-gray-400" />
                        <span>Code CVC</span>
                      </label>
                      <Input
                        type="text"
                        value={securityCode}
                        onChange={(e) => setSecurityCode(e.target.value)}
                        required
                        placeholder="CVC"
                        className="bg-gray-700 border-gray-600 placeholder:text-gray-400"
                      />
                    </div>
                  </div>

                  {/* ZIP / Postal */}
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-1 flex items-center space-x-1">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span>Code Postal</span>
                    </label>
                    <Input
                      type="text"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      placeholder="75000"
                      className="bg-gray-700 border-gray-600 placeholder:text-gray-400"
                    />
                  </div>

                  {/* Pay Button */}
                  <Button type="submit" className="w-full mt-2">
                    Payer {total.toFixed(2)} €
                  </Button>
                </form>
              </div>
            )}

            {/* Success Screen (if payment successful) */}
            {paymentSuccess && (
              <div className="p-6 text-center space-y-4">
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
                <h2 className="text-xl font-bold">Paiement Réussi!</h2>
                <p className="text-gray-300">
                  Merci pour votre commande. Votre paiement de{' '}
                  <span className="font-semibold">{total.toFixed(2)} €</span>{' '}
                  a bien été effectué.
                </p>
                <ul className="space-y-1 text-left mt-4 mx-auto max-w-sm">
                  {cart.map((item) => (
                    <li key={item.id} className="text-gray-300 flex items-center">
                      <span className="mr-2 text-green-500">•</span>
                      {item.nom} x {item.quantity}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="mt-4" onClick={handleCloseModal}>
                  Fermer
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
