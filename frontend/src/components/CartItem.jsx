import { useCart } from "../context/CartContext";
import { useState } from "react";

const CartItem = ({ item }) => {
  const { updateCartItem, removeFromCart } = useCart();
  const [quantity, setQuantity] = useState(item.Quantity);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < 1 || isUpdating) return;

    setQuantity(newQuantity);
    setIsUpdating(true);

    await updateCartItem(item.ProductID, newQuantity);
    setIsUpdating(false);
  };

  const handleRemove = async () => {
    setIsUpdating(true);
    await removeFromCart(iitem.ProductID);
    setIsUpdating(false);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
      <div className="flex items-center space-x-4">
        {/* Product Image */}
        <img
          src={item.Image || "/placeholder-image.jpg"}
          alt={item.ProductName}
          className="w-24 h-24 object-cover rounded"
        />

        {/* Product Details */}
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-1">{item.ProductName}</h3>
          <p className="text-gray-600 text-sm mb-2">
            {" "}
            Rs. {parseFloat(item.Price).toFixed(2)}
          </p>

          {/* Size and Color */}
          <div className="flex space-x-4 text-sm mb-2">
            {item.ProductSize && (
              <span>
                Size: <strong>{item.ProductSize}</strong>
              </span>
            )}
            {item.ProductColor && (
              <span>
                Color: <strong>{item.ProductColor}</strong>
              </span>
            )}
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center border border-gray-300 rounded">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={isUpdating}
                className="px-3 py-1 hover:bg-gray-100 disabled:opacity-50"
              >
                -
              </button>
              <span className="px-4 py-1 border-x border-gray-300">
                {quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={isUpdating}
                className="px-3 py-1 hover:bg-gray-100 disabled:opacity-50"
              >
                +
              </button>
            </div>

            <button
              onClick={handleRemove}
              disabled={isUpdating}
              className="text-red-600 hover:text-red-700 text-sm font-medium disabled:opacity-50"
            >
              Remove
            </button>
          </div>
        </div>

        {/* Total Price */}
        <div className="text-right">
          <p className="text-xl font-bold text-primary-600">
            Rs. {(parseFloat(item.Price) * quantity).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
