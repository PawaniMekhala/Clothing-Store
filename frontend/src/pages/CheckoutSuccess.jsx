import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext"; // adjust path if needed

const CheckoutSuccess = () => {
  const { clearCart } = useCart();

  useEffect(() => {
    // Safely clear cart on mount
    if (clearCart) {
      clearCart();
    }
  }, [clearCart]);

  return (
    <div className="text-center mt-20">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-20 h-20 mx-auto text-green-600 mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2l4-4m6 2a9 9 0 11-18 0a9 9 0 0118 0z"
        />
      </svg>

      <h1 className="text-3xl font-bold text-green-600 mb-2">
        Order Confirmed!
      </h1>
      <p className="text-gray-600 mb-6">
        Thank you for shopping with us.
      </p>

      
    </div>
  );
};

export default CheckoutSuccess;
