import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      return [];
    }
  });

  const [total, setTotal] = useState(0);

  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
      const newTotal = cart.reduce((sum, item) => {
        const price = typeof item.prix === 'string' 
          ? parseFloat(item.prix) 
          : item.prix;
        return sum + (price * item.quantity);
      }, 0);
      setTotal(newTotal);
    } catch (error) {
      console.error('Error in cart effect:', error);
    }
  }, [cart]);

  const addToCart = (product) => {
    console.log('Adding to cart:', product);
    setCart(currentCart => {
      const existingItem = currentCart.find(item => item.id === product.id);
      if (existingItem) {
        return currentCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // Ensure prix is a number
      const price = typeof product.prix === 'string' 
        ? parseFloat(product.prix) 
        : product.prix;
      return [...currentCart, { ...product, prix: price, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(currentCart => currentCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return;
    setCart(currentCart =>
      currentCart.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  return (
    <CartContext.Provider value={{
      cart,
      total,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

