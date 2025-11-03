import express from "express";
import { addToCart, viewCart } from "../controllers/cart_controller.js";
import auth from "../middleware/auth_middleware.js";

const router = express.Router();

//add product to cart
router.post("/add", auth, addToCart);
router.get("/view", auth, viewCart);

export default router;
