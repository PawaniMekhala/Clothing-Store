import { createContext, useContext, useState, useEffect } from 'react';
import { cartAPI } from '../utils/api';
import { toast } from 'react-hot-toast';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    } else {
      setCartItems([]);
    }
  }, [isAuthenticated]);

  const fetchCart = async () => {
    if (!isAuthenticated) return;
    
    setLoading(true);
    try {
      const response = await cartAPI.getCart();
      setCartItems(response.data || []);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1, size, color) => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      return { success: false, error: 'Not authenticated' };
    }

    setLoading(true);
    try {
      const response = await cartAPI.addToCart({
        productId,
        quantity,
        size,
        color,
      });
      
      setCartItems(response.data || []);
      toast.success('Item added to cart!');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to add to cart';
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const updateCartItem = async (itemId, quantity) => {
    if (!isAuthenticated) return;

    setLoading(true);
    try {
      const response = await cartAPI.updateCartItem(itemId, { quantity });
      setCartItems(response.data || []);
      toast.success('Cart updated!');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update cart';
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (itemId) => {
    if (!isAuthenticated) return;

    setLoading(true);
    try {
      const response = await cartAPI.deleteCartItem(itemId);
      setCartItems(response.data || []);
      toast.success('Item removed from cart!');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to remove item';
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
  };

  const getCartItemCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    cartItems,
    loading,
    addToCart,
    updateCartItem,
    removeFromCart,
    fetchCart,
    getCartTotal,
    getCartItemCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

