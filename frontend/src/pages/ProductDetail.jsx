import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productAPI, reviewAPI } from '../utils/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import ReviewCard from '../components/ReviewCard';
import { toast } from 'react-hot-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  
  // Review form state
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    fetchProductDetails();
    fetchReviews();
  }, [id]);

  const fetchProductDetails = async () => {
    setLoading(true);
    try {
      const response = await productAPI.getProductById(id);
      setProduct(response.data);
      if (response.data.sizes && response.data.sizes.length > 0) {
        setSelectedSize(response.data.sizes[0]);
      }
      if (response.data.colors && response.data.colors.length > 0) {
        setSelectedColor(response.data.colors[0]);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await reviewAPI.getReviews(id);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      navigate('/login');
      return;
    }

    if (!selectedSize && product.sizes && product.sizes.length > 0) {
      toast.error('Please select a size');
      return;
    }

    await addToCart(id, quantity, selectedSize, selectedColor);
  };

  const handleSubmitReview = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to submit a review');
      return;
    }

    if (!reviewComment.trim()) {
      toast.error('Please enter a comment');
      return;
    }

    setSubmittingReview(true);
    try {
      const response = await reviewAPI.addReview({
        productId: id,
        rating: reviewRating,
        comment: reviewComment,
      });
      
      setReviews([response.data, ...reviews]);
      setShowReviewForm(false);
      setReviewComment('');
      setReviewRating(5);
      toast.success('Review submitted successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit review');
    } finally {
      setSubmittingReview(false);
    }
  };

  const handleReviewUpdate = (updatedReview) => {
    setReviews(reviews.map(r => r._id === updatedReview._id ? updatedReview : r));
  };

  const handleReviewDelete = (reviewId) => {
    setReviews(reviews.filter(r => r._id !== reviewId));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Product not found</h1>
        <button onClick={() => navigate('/')} className="btn-primary">
          Go to Home
        </button>
      </div>
    );
  }

  const hasUserReviewed = reviews.some(r => r.user?._id === user?._id);
  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <div>
            <img
              src={product.image || '/placeholder-image.jpg'}
              alt={product.name}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < averageRating ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-gray-600">({reviews.length} reviews)</span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-center space-x-4">
                <span className="text-4xl font-bold text-primary-600">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-2xl text-gray-400 line-through">
                    ${product.originalPrice}
                  </span>
                )}
                {product.onSale && (
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    ON SALE
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-700 mb-6 leading-relaxed">{product.description}</p>

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Size</label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                        selectedSize === size
                          ? 'border-primary-600 bg-primary-50 text-primary-600'
                          : 'border-gray-300 hover:border-primary-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Color</label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                        selectedColor === color
                          ? 'border-primary-600 bg-primary-50 text-primary-600'
                          : 'border-gray-300 hover:border-primary-400'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Quantity</label>
              <div className="flex items-center border border-gray-300 rounded-lg w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-6 py-2 border-x border-gray-300">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button onClick={handleAddToCart} className="btn-primary w-full text-lg py-3">
              Add to Cart
            </button>

            {/* Additional Info */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-600">Category:</span>
                  <p className="text-gray-800">{product.category}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Gender:</span>
                  <p className="text-gray-800">{product.gender}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="border-t border-gray-200 pt-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Customer Reviews</h2>
            {isAuthenticated && !hasUserReviewed && (
              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="btn-primary"
              >
                Write a Review
              </button>
            )}
          </div>

          {/* Review Form */}
          {showReviewForm && (
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h3 className="text-xl font-bold mb-4">Write a Review</h3>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Rating</label>
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setReviewRating(i + 1)}
                      className={`text-3xl ${i < reviewRating ? 'text-yellow-400' : 'text-gray-300'}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Comment</label>
                <textarea
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  className="input-field"
                  rows="4"
                  placeholder="Share your thoughts about this product..."
                />
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={handleSubmitReview}
                  disabled={submittingReview}
                  className="btn-primary"
                >
                  {submittingReview ? 'Submitting...' : 'Submit Review'}
                </button>
                <button
                  onClick={() => {
                    setShowReviewForm(false);
                    setReviewComment('');
                    setReviewRating(5);
                  }}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Reviews List */}
          <div className="space-y-4">
            {reviews.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No reviews yet. Be the first to review!</p>
            ) : (
              reviews.map((review) => (
                <ReviewCard
                  key={review._id}
                  review={review}
                  onUpdate={handleReviewUpdate}
                  onDelete={handleReviewDelete}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

