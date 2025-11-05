import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { reviewAPI } from '../utils/api';
import { toast } from 'react-hot-toast';

const ReviewCard = ({ review, onUpdate, onDelete }) => {
  const { user } = useAuth();
  const isOwner = user?._id === review.user?._id;
  const [isEditing, setIsEditing] = useState(false);
  const [rating, setRating] = useState(review.rating);
  const [comment, setComment] = useState(review.comment);

  const handleUpdate = async () => {
    try {
      const response = await reviewAPI.updateReview(review._id, {
        rating,
        comment,
      });
      onUpdate(response.data);
      setIsEditing(false);
      toast.success('Review updated!');
    } catch (error) {
      toast.error('Failed to update review');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await reviewAPI.deleteReview(review._id);
        onDelete(review._id);
        toast.success('Review deleted!');
      } catch (error) {
        toast.error('Failed to delete review');
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
      {!isEditing ? (
        <>
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center space-x-3">
              {review.user?.profileImage ? (
                <img
                  src={review.user.profileImage}
                  alt={review.user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-semibold">
                  {review.user?.name?.charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <h4 className="font-semibold">{review.user?.name}</h4>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
            <span className="text-sm text-gray-500">
              {new Date(review.createdAt).toLocaleDateString()}
            </span>
          </div>
          
          <p className="text-gray-700 mb-3">{review.comment}</p>

          {isOwner && (
            <div className="flex space-x-2">
              <button
                onClick={() => setIsEditing(true)}
                className="text-primary-600 hover:text-primary-700 text-sm font-medium"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="text-red-600 hover:text-red-700 text-sm font-medium"
              >
                Delete
              </button>
            </div>
          )}
        </>
      ) : (
        <div>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-2">Rating</label>
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setRating(i + 1)}
                  className={`text-2xl ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-3">
            <label className="block text-sm font-medium mb-2">Comment</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="input-field"
              rows="3"
            />
          </div>

          <div className="flex space-x-2">
            <button onClick={handleUpdate} className="btn-primary">
              Save
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setRating(review.rating);
                setComment(review.comment);
              }}
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewCard;

