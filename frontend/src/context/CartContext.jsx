import { createContext, useContext, useState, useEffect } from "react";
import { cartAPI } from "../utils/api";
import { toast } from "react-hot-toast";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
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

  // Fetch entire cart
  const fetchCart = async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    try {
      const response = await cartAPI.getCart();
      const cartData = response.data?.cart;
      setCartItems(cartData?.items || []);
    } catch (error) {
      console.error("Error fetching cart:", error);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  // Add to cart 
  const addToCart = async (productId, quantity = 1, size, color) => {
    if (!isAuthenticated) {
      toast.error("Please login to add items to cart");
      return { success: false, error: "Not authenticated" };
    }

    setLoading(true);
    try {
      const response = await cartAPI.addToCart({
        ProductID: productId,
        CIQuantity: quantity,
        ProductColor: color || "Default",
        ProductSize: size || "M",
      });

      if (response.data?.cartItem) {
        setCartItems((prev) => [...prev, response.data.cartItem]);
      } else if (Array.isArray(response.data)) {
        setCartItems(response.data);
      }

      toast.success("Item added to cart!");
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || "Failed to add to cart";
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  // Update cart item 
  const updateCartItem = async (productId, updatedData) => {
  if (!isAuthenticated) return;
  setLoading(true);

  try {
    const response = await cartAPI.updateCartItem(productId, updatedData);
    toast.success(response.data?.message || "Cart item updated successfully");

    
    await fetchCart();

    return { success: true };
  } catch (error) {
    const message = error.response?.data?.message || "Failed to update cart";
    toast.error(message);
    return { success: false, error: message };
  } finally {
    setLoading(false);
  }
};


  // Remove from cart
  const removeFromCart = async (productId) => {
    if (!isAuthenticated) return;
    setLoading(true);

    try {
      const response = await cartAPI.deleteCartItem(productId);
      const updatedCart = response.data?.cart;

      if (updatedCart?.items) {
        setCartItems(updatedCart.items);
      }

      toast.success(response.data?.message || "Item removed from cart!");
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || "Failed to remove item";
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const getCartTotal = () => {
  if (!cartItems || cartItems.length === 0) return 0;

  return cartItems.reduce((total, item) => {
    const price = parseFloat(item.Price);
    const quantity = parseInt(item.Quantity);
    return total + (price * quantity || 0);
  }, 0);
};


  const getCartItemCount = () => {
    if (!Array.isArray(cartItems)) return 0;
    return cartItems.reduce((count, item) => count + (item.CIQuantity || 1), 0);
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
