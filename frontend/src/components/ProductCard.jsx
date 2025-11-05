import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleAddToCart = async () => {
        if (!isAuthenticated) {
            toast.error('Please login to add items to cart');
            navigate('/login');
            return;
        }

        await addToCart({
            productId: product.id,
            quantity: 1,
            color: product.color,
            size: product.size,
        });
        toast.success('Product added to cart!');
    };

    return (
        <div className="card group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
            {/* Product Image */}
            <Link to={`/product/${product.id}`}>
                <div className="relative overflow-hidden">
                    <img
                        src={product.image || '/placeholder-image.jpg'}
                        alt={product.name}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </div>
            </Link>

            {/* Product Info */}
            <div className="p-4">
                {/* Product Name */}
                <Link to={`/product/${product.id}`}>
                    <h3 className="font-semibold text-lg mb-2 hover:text-primary-600 transition-colors">
                        {product.name}
                    </h3>
                </Link>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>

                {/* Price */}
                <div className="flex items-center justify-between mb-3">
                    <span className="text-xl font-bold text-primary-600">${product.price}</span>
                </div>

                {/* Color & Size */}
                <div className="flex items-center justify-between mb-3 text-sm text-gray-600">
                    <span>Color: {product.color || '-'}</span>
                    <span>Size: {product.size || '-'}</span>
                </div>

                {/* Add to Cart Button */}
                <button onClick={handleAddToCart} className="btn-primary w-full">
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
