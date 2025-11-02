import express from "express";
import { 
  getAllProducts, 
  getProductsByCategory, 
  getProductById 
} from "../controllers/product_controller.js";

const router = express.Router();

// Get all products
router.get("/", getAllProducts);

// Get products by category (e.g., /products/category/Kid)
router.get("/category/:categoryId", getProductsByCategory);

// Get product details by product ID (e.g., /products/5)
router.get("/:productId", getProductById);

export default router;
