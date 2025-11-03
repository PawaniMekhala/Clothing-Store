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
router.get("/get-all-products", getAllProducts);

// Get products by category
router.get("/category/:categoryId", getProductsByCategory);

// Get product details by product ID
router.get("/:productId", getProductById);

//create new product
router.post("/add/newProduct", upload.single("productImage"), createProduct);

export default router;
