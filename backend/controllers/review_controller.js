import Review from "../models/review_model.js";
import Product from "../models/product_model.js";

// export const addReview = async (req, res) => {
//   try {
//     const userId = req.user?.id; // from your auth middleware
//     const { rating, comment } = req.body;

//     if (!userId) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     if (!rating || rating < 1 || rating > 5) {
//       return res
//         .status(400)
//         .json({ message: "Rating must be between 1 and 5" });
//     }

//     // Optional: prevent duplicate reviews by the same user
//     const existing = await Review.findOne({ where: { UserID: userId } });
//     if (existing) {
//       return res
//         .status(400)
//         .json({ message: "You have already submitted a review" });
//     }

//     const review = await Review.create({
//       UserID: userId,
//       Rating: rating,
//       Comment: comment || null,
//     });

//     return res.status(201).json({
//       message: "Thank you for your feedback!",
//       review,
//     });
//   } catch (error) {
//     console.error("Error adding review:", error);
//     res.status(500).json({ message: error.message || "Server error" });
//   }
// };

export const addReview = async (req, res) => {
  try {
    const userId = req.user?.id; // from auth middleware
    const { productId } = req.params;
    const { rating, comment } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Validate input
    if (!rating || rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({ message: "Rating must be between 1 and 5" });
    }

    // Check if product exists
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Optional: Check if user already reviewed this product
    const existingReview = await Review.findOne({
      where: { UserID: userId, ProductID: productId },
    });

    if (existingReview) {
      return res
        .status(400)
        .json({ message: "You have already reviewed this product" });
    }

    // Create review
    const newReview = await Review.create({
      UserID: userId,
      ProductID: productId,
      Rating: rating,
      Comment: comment || null,
    });

    return res.status(201).json({
      message: "Review added successfully",
      review: newReview,
    });
  } catch (error) {
    console.error("Error adding review:", error);
    return res.status(500).json({ message: error.message || "Server error" });
  }
};
