import { createContext, useContext, useState } from 'react';
import { addItem, removeItem, getQuantity, totalItems, totalValue } from '../utils/cartUtils';

const CartContext = createContext();

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, quantity = 1) => {
    setCartItems(prev => addItem(prev, product, quantity));
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => removeItem(prev, productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getItemQuantity = (productId) => {
    return getQuantity(cartItems, productId);
  };

  const cartTotalItems = () => {
    return totalItems(cartItems);
  };

  const cartTotalValue = () => {
    return totalValue(cartItems);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      clearCart,
      getItemQuantity,
      cartTotalItems,
      cartTotalValue
    }}>
      {children}
    </CartContext.Provider>
  );
};