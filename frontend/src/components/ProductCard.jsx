import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      return;
    }

    await addToCart(product._id, 1);
  };

  return (
    <div className="card group">
      <Link to={`/products/${product._id}`}>
        <div className="relative overflow-hidden">
          <img
            src={product.image || '/placeholder-image.jpg'}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.onSale && (
            <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
              SALE
            </span>
          )}
        </div>
      </Link>
      
      <div className="p-4">
        <Link to={`/products/${product._id}`}>
          <h3 className="font-semibold text-lg mb-2 hover:text-primary-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-primary-600">${product.price}</span>
            {product.originalPrice && (
              <span className="text-gray-400 line-through text-sm">
                ${product.originalPrice}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-600">
            {product.category} • {product.gender}
          </span>
        </div>

        <button
          onClick={handleAddToCart}
          className="btn-primary w-full"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

