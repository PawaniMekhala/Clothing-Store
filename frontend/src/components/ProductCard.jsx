import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const { isAuthenticated } = useAuth();

    const id = product.ProductID ?? product.id ?? product._id;
    const name = (product.ProductName ?? product.name ?? '').replace(/['"]+/g, '');
    const desc = (product.Description ?? product.description ?? '').replace(/['"]+/g, '');
    const price = product.Price ?? product.price;
    const image = product.ImagePath ?? product.image ?? '/placeholder-image.jpg';
    const color = product.ProductColor ?? product.color;
    const size = product.ProductSize ?? product.size;

    const handleAddToCart = async () => {
        if (!isAuthenticated) {
            toast.error('Please login to add items to cart');
            return;
        }
        await addToCart(id, 1, color, size);
        toast.success('Added to cart');
    };

    return (
        <div className="card group">
            <Link to={`/product/${id}`}>
                <div className="relative overflow-hidden">
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </div>
            </Link>

            <div className="p-4">
                <Link to={`/product/${id}`}>
                    <h3 className="font-semibold text-lg mb-2 hover:text-primary-600 transition-colors">{name}</h3>
                </Link>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{desc}</p>

                <div className="flex items-center justify-between mb-3">
                    <span className="text-xl font-bold text-primary-600">Rs. {parseFloat(price ?? 0).toFixed(2)}</span>
                </div>

                <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-600">
                        {color ? `Color: ${color}` : ''} {size ? `• Size: ${size}` : ''}
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
