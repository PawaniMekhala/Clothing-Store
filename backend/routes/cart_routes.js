import express from "express";
import {
  addToCart,
  viewCart,
  removeProductFromCart,
  updateCartItem,clearCart
} from "../controllers/cart_controller.js";
import auth from "../middleware/auth_middleware.js";

const router = express.Router();

//add product to cart
router.post("/add", auth, addToCart);
//view cart
router.get("/view", auth, viewCart);
// remove item from cart
router.delete("/remove-item/:productId", auth, removeProductFromCart);
// update product quantity,color,size
router.put("/update-cart/:productId", auth, updateCartItem);
// Clear the entire cart
router.delete("/clear", auth, clearCart);

export default router;
