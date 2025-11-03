import express from "express";
import { addReview } from "../controllers/review_controller.js";
import auth from "../middleware/auth_middleware.js";

const router = express.Router();

// add new review
router.post("/add-review/:productId", auth, addReview);

export default router;
