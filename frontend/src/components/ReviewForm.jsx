// components/ReviewForm.jsx
import { useState } from "react";
import { reviewAPI } from "../utils/api";
import { toast } from "react-hot-toast";

const ReviewForm = ({ productId, onCreated, onClose }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setLoading(true);
    try {
      const res = await reviewAPI.addReview(productId, { rating, comment });
      // Backend should return created review; pass it up
      onCreated(res.data.review || res.data);
      toast.success("Review added!");
      setComment("");
      setRating(5);
      onClose?.();
    } catch (err) {
      console.error("Add review error", err);
      console.error("Server response:", err.response?.data);
      toast.error(err.response?.data?.message || "Failed to add review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 p-4 bg-white rounded">
      <div>
        <label className="block text-sm font-medium">Rating</label>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              type="button"
              key={n}
              onClick={() => setRating(n)}
              className={`text-2xl ${
                n <= rating ? "text-yellow-400" : "text-gray-300"
              }`}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium">Comment</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={3}
          className="w-full border p-2 rounded"
        />
      </div>

      <div className="flex space-x-2">
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? "Saving..." : "Submit"}
        </button>
        <button type="button" onClick={onClose} className="btn-secondary">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;
