import Product from "../models/product_model.js";
import Category from "../models/category_model.js";

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: {
        model: Category,
        attributes: ["CategoryName"],
      },
    });
    res.json({
      message: "All products fetched successfully",
      products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get products by category
export const getProductsByCategory = async (req, res) => {
  try {
    const { categoryId  } = req.params;

    // Validate category exists
    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Find products with that CategoryID
    const products = await Product.findAll({
      where: { CategoryID: categoryId },
      include: { model: Category, attributes: ["CategoryName"] },
    });

    res.json({
      message: `Products for category ${category.CategoryName} fetched successfully`,
      products,
    });
  } catch (error) {
    console.error("Error fetching products by category ID:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get product details by ID
export const getProductById = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findByPk(productId, {
      include: { model: Category, attributes: ["CategoryName"] },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      message: "Product details fetched successfully",
      product,
    });
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    res.status(500).json({ message: error.message });
  }
};
