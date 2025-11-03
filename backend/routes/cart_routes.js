import express from "express";
import { addToCart } from "../controllers/cart_controller.js";
import auth from "../middleware/auth_middleware.js";

const router = express.Router();

//add product to cart
router.post("/add", auth, addToCart);

export default router;
