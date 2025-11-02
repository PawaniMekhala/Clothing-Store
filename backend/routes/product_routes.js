import express from "express";
import {
  getAllProducts,
  getProductsByCategory,
  getProductById,
  createProduct,
} from "../controllers/product_controller.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// Get all products
router.get("/", getAllProducts);

// Get products by category (e.g., /products/category/Kid)
router.get("/category/:categoryId", getProductsByCategory);

// Get product details by product ID (e.g., /products/5)
router.get("/:productId", getProductById);

// POST /api/products  (multipart/form-data with field 'productImage')
router.post("/add/newProduct", upload.single("productImage"), createProduct);

export default router;
