import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error("Please login to add items to cart");
      return;
    }

    await addToCart(
      product.ProductID || product.id,
      1,
      product.ProductColor,
      product.ProductSize
    );
  };

  return (
    <div className="card group">
      {/* Use product.id for links */}
      <Link to={`/products/${product.ProductID}`}>
        <div className="relative overflow-hidden">
          <img
            src={product.ImagePath || "/placeholder-image.jpg"}
            alt={product.ProductName}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      <div className="p-4">
        <Link to={`/products/${product.ProductID}`}>
          <h3 className="font-semibold text-lg mb-2 hover:text-primary-600 transition-colors">
            {product.ProductName}
          </h3>
        </Link>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.Description}
        </p>

        <div className="flex items-center justify-between mb-3">
          <span className="text-xl font-bold text-primary-600">
            Rs. {parseFloat(product.Price).toFixed(2)}
          </span>
        </div>

        {/*Replace category/gender with color and size */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-600">
            {product.ProductColor ? `Color: ${product.ProductColor}` : ""}
            {product.ProductSize ? ` • Size: ${product.ProductSize}` : ""}
          </span>
        </div>

        <button onClick={handleAddToCart} className="btn-primary w-full">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
