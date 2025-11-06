import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { productAPI, reviewAPI } from "../utils/api"; // <-- added reviewAPI
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import ReviewCard from "../components/ReviewCard";
import ReviewForm from "../components/ReviewForm";
import { toast } from "react-hot-toast";

const normalizeProduct = (p) => {
  if (!p) return null;
  const clean = (val) => {
    if (typeof val === "string")
      return val.replace(/^"|"$/g, "").replace(/['"]+/g, "").trim();
    return val ?? "";
  };
  const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5500/api";
  let image = p.ImagePath ?? p.image ?? p.imageUrl ?? "/placeholder-image.jpg";
  if (image && !image.startsWith("http")) {
    image = image.replace(/^\/+/, "");
    image = `${baseURL.replace("/api", "")}/${image}`;
  }
  const rawSizes = p.ProductSize ?? p.Sizes ?? p.sizes ?? p.size ?? "";
  const rawColors = p.ProductColor ?? p.Colors ?? p.colors ?? p.color ?? "";
  const sizes = Array.isArray(rawSizes)
    ? rawSizes
    : typeof rawSizes === "string" && rawSizes.includes(",")
    ? rawSizes.split(",").map((s) => s.trim())
    : rawSizes
    ? [String(rawSizes)]
    : [];
  const colors = Array.isArray(rawColors)
    ? rawColors
    : typeof rawColors === "string" && rawColors.includes(",")
    ? rawColors.split(",").map((c) => c.trim())
    : rawColors
    ? [String(rawColors)]
    : [];
  return {
    id: p.ProductID ?? p.id ?? p._id,
    name: clean(p.ProductName ?? p.name ?? "Unnamed Product"),
    description: clean(p.Description ?? p.description ?? ""),
    price: p.Price ?? p.price ?? 0,
    image,
    colors,
    sizes,
    category: p?.Category?.CategoryName ?? p.category ?? p.gender ?? "",
    quantityAvailable: p.Quantity ?? p.quantity ?? 0,
    original: p,
  };
};

const ProductDetail = () => {
  const { id: productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  // fetch product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await productAPI.getProductById(productId);
        const p = res.data?.product ?? res.data;
        setProduct(normalizeProduct(p));
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(err.response?.data?.message || "Product not found");
      } finally {
        setLoading(false);
      }
    };
    if (productId) fetchProduct();
  }, [productId]);

  // fetch reviews for product
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const r = await reviewAPI.getReviews(productId);
        const list = r.data.reviews ?? r.data ?? [];
        // optionally normalize each review here if backend uses different keys
        const normalizedList = list.map((raw) => ({
          _id: raw._id ?? raw.ReviewID ?? raw.id,
          rating: raw.rating ?? raw.Rating,
          comment: raw.comment ?? raw.Comment,
          user:
            raw.user ??
            (raw.UserID
              ? { _id: raw.UserID, name: raw.userName ?? "User" }
              : raw.user),
          createdAt: raw.createdAt ?? raw.created_at ?? raw.createdAt,
          ...raw,
        }));
        setReviews(normalizedList);
      } catch (err) {
        console.error("Failed to load reviews", err);
      }
    };
    if (productId) fetchReviews();
  }, [productId]);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error("Please login to add items to cart");
      return;
    }
    try {
      await addToCart(
        product.id,
        1,
        product.sizes?.[0] ?? "",
        product.colors?.[0] ?? ""
      );
      toast.success("Added to cart");
    } catch (err) {
      console.error("Add to cart failed", err);
      toast.error("Failed to add to cart");
    }
  };

  const handleAddReviewClick = () => setShowForm(true);

  const handleNewReview = (rawReview) => {
    const normalized = {
      _id: rawReview._id ?? rawReview.ReviewID ?? rawReview.id,
      rating: rawReview.rating ?? rawReview.Rating,
      comment: rawReview.comment ?? rawReview.Comment,
      user:
        rawReview.user ??
        (rawReview.UserID
          ? { _id: rawReview.UserID, name: rawReview.userName ?? "You" }
          : null),
      createdAt:
        rawReview.createdAt ?? rawReview.created_at ?? new Date().toISOString(),
      ...rawReview,
    };
    setReviews((prev) => [normalized, ...prev]);
  };

  const handleUpdate = (updated) => {
    setReviews((prev) =>
      prev.map((r) => (r._id === updated._id ? updated : r))
    );
  };

  const handleDelete = (id) =>
    setReviews((prev) =>
      prev.filter((r) => (r._id ?? r.ReviewID ?? r.id) !== id)
    );

  if (loading)
    return (
      <div className="text-center py-10 text-gray-600">
        Loading product details...
      </div>
    );

  if (error)
    return <div className="text-center py-10 text-red-600">{error}</div>;

  if (!product)
    return (
      <div className="text-center py-10 text-gray-600">
        No product data found.
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto p-6 grid md:grid-cols-2 gap-10">
      <div>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-auto rounded-2xl shadow-md object-cover"
          onError={(e) => {
            e.currentTarget.src = "/placeholder-image.jpg";
          }}
        />
      </div>

      <div className="flex flex-col justify-center space-y-5">
        <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
        <p className="text-gray-600 leading-relaxed">{product.description}</p>
        <p className="text-2xl font-semibold text-primary-600">
          Rs. {parseFloat(product.price).toFixed(2)}
        </p>

        <div className="text-gray-700">
          {product.colors?.length > 0 && (
            <p>
              <strong>Color:</strong> {product.colors.join(", ")}
            </p>
          )}
          {product.sizes?.length > 0 && (
            <p>
              <strong>Size:</strong> {product.sizes.join(", ")}
            </p>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          className="btn-primary py-3 rounded-xl text-lg"
        >
          Add to Cart
        </button>

        <button
          onClick={handleAddReviewClick}
          className="btn-primary py-3 rounded-xl text-lg"
        >
          Add a review
        </button>

        {showForm && (
          <div className="mt-4">
            <ReviewForm
              productId={product.id}
              onCreated={(r) => {
                handleNewReview(r);
                setShowForm(false);
              }}
              onClose={() => setShowForm(false)}
            />
          </div>
        )}

        <div className="mt-6 space-y-4">
          {reviews.length === 0 ? (
            <p className="text-gray-600">No reviews yet. Be the first!</p>
          ) : (
            reviews.map((rev) => (
              <ReviewCard
                key={rev._id}
                review={rev}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
