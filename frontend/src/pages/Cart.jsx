import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import CartItem from '../components/CartItem';

const Cart = () => {
  const { cartItems, loading, getCartTotal, fetchCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    } else {
      navigate('/login');
    }
  }, [isAuthenticated]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg shadow">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Add some items to your cart to continue shopping.</p>
            <Link to="/" className="btn-primary inline-block">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <CartItem key={item._id} item={item} />
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${getCartTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>$10.00</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span>${(getCartTotal() * 0.08).toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-xl font-bold">
                      <span>Total</span>
                      <span className="text-primary-600">
                        ${(getCartTotal() + 10 + getCartTotal() * 0.08).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <Link
                  to="/checkout"
                  className="btn-primary w-full text-center block mb-4"
                >
                  Proceed to Checkout
                </Link>
                
                <Link
                  to="/"
                  className="btn-secondary w-full text-center block"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

