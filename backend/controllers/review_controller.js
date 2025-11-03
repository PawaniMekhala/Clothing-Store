import Review from "../models/review_model.js";
import Product from "../models/product_model.js";
import User from "../models/user_model.js";

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

// Get all reviews for a specific product
export const getAllReviewsByProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    // Fetch reviews and include user info
    const reviews = await Review.findAll({
      where: { ProductID: productId },
      include: [
        {
          model: User,
          attributes: ["UserID", "FirstName", "LastName"], // only return necessary user fields
        },
      ],
      order: [["ReviewID", "DESC"]], // optional: latest reviews first
    });

    if (!reviews.length) {
      return res
        .status(404)
        .json({ message: "No reviews found for this product." });
    }

    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Something went wrong while fetching reviews." });
  }
};

// Update a review
export const updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user?.id;

    const review = await Review.findOne({
      where: { ReviewID: reviewId, UserID: userId },
    });

    if (!review) {
      return res
        .status(404)
        .json({ message: "Review not found or you cannot edit this review." });
    }

    if (rating !== undefined) review.Rating = rating;
    if (comment !== undefined) review.Comment = comment;

    await review.save();

    res.status(200).json({ message: "Review updated successfully", review });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Something went wrong while updating the review." });
  }
};
