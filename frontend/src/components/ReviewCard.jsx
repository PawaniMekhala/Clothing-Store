import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { reviewAPI } from "../utils/api";
import { toast } from "react-hot-toast";

const getId = (r) => r._id ?? r.id ?? r.ReviewID ?? null;
const getUserId = (u) => u?._id ?? u?.id ?? u?.UserID ?? null;

const ReviewCard = ({ review, onUpdate, onDelete }) => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [rating, setRating] = useState(review.rating);
  const [comment, setComment] = useState(review.comment);

  const ownerId = getUserId(review.user) ?? review.UserID ?? null;
  const currentUserId = user?._id ?? user?.id ?? user?.UserID ?? null;
  const isOwner =
    currentUserId && ownerId && currentUserId.toString() === ownerId.toString();

  const handleUpdate = async () => {
    const reviewId = getId(review);
    if (!reviewId) return toast.error("Invalid review ID");
    try {
      const response = await reviewAPI.updateReview(reviewId, {
        rating,
        comment,
      });
      // normalize returned data (backend may return updated review directly or under .review)
      const updated = response.data?.review ?? response.data;
      onUpdate?.({
        _id: updated._id ?? updated.id ?? updated.ReviewID,
        rating: updated.rating ?? updated.Rating,
        comment: updated.comment ?? updated.Comment,
        user: updated.user ?? review.user,
        createdAt: updated.createdAt ?? updated.created_at ?? review.createdAt,
        ...updated,
      });
      setIsEditing(false);
      toast.success("Review updated!");
    } catch (error) {
      console.error("Update review error:", error);
      console.error("Server response:", error.response?.data);
      toast.error(error.response?.data?.message || "Failed to update review");
    }
  };

  const handleDelete = async () => {
    const reviewId = getId(review);
    if (!reviewId) return toast.error("Invalid review ID");
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    try {
      const res = await reviewAPI.deleteReview(reviewId);
      // optional: backend might return { id } or { message }
      onDelete?.(reviewId);
      toast.success("Review deleted!");
    } catch (error) {
      console.error("Delete review error:", error);
      console.error("Server response:", error.response?.data);
      toast.error(error.response?.data?.message || "Failed to delete review");
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
                  alt={review.user.name ?? "User"}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-semibold">
                  {(review.user?.name ?? review.user?.userName ?? "U")
                    ?.charAt(0)
                    ?.toUpperCase()}
                </div>
              )}
              <div>
                <h4 className="font-semibold">
                  {review.user?.name ?? review.user?.userName ?? "User"}
                </h4>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${
                        i < (review.rating ?? review.Rating ?? rating)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
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
              {new Date(
                review.createdAt ?? review.created_at ?? Date.now()
              ).toLocaleDateString()}
            </span>
          </div>

          <p className="text-gray-700 mb-3">
            {review.comment ?? review.Comment}
          </p>

          {isOwner && (
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  setIsEditing(true);
                  setRating(review.rating ?? review.Rating ?? rating);
                  setComment(review.comment ?? review.Comment ?? comment);
                }}
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
                  className={`text-2xl ${
                    i < rating ? "text-yellow-400" : "text-gray-300"
                  }`}
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
                setRating(review.rating ?? review.Rating ?? rating);
                setComment(review.comment ?? review.Comment ?? comment);
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
