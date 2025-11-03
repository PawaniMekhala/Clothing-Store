import express from "express";
import {
  addReview,
  getAllReviewsByProduct,
} from "../controllers/review_controller.js";
import auth from "../middleware/auth_middleware.js";

const router = express.Router();

// add new review
router.post("/add-review/:productId", auth, addReview);

// Get all reviews for a product
router.get("/get-all-reviews/:productId", getAllReviewsByProduct);

export default router;
