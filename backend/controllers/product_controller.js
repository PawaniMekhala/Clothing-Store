import Product from "../models/product_model.js";
import Category from "../models/category_model.js";
import cloudinary from "../config/cloudinary.js";

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
    const { categoryId } = req.params;

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

// CREATE PRODUCT WITH IMAGE
export const createProduct = async (req, res) => {
  try {
    const {
      ProductName,
      Description,
      Price,
      Quantity,
      CategoryID,
      ProductColor,
      ProductSize,
    } = req.body;

    // Validate required fields
    if (!ProductName || !Price || !Quantity || !CategoryID) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if Category exists
    const category = await Category.findByPk(CategoryID);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Handle image upload
    let imageUrl = null;
    if (req.file) {
      imageUrl = req.file.secure_url || req.file.path;
    }

    // Create new product
    const newProduct = await Product.create({
      ProductName,
      Description,
      Price,
      Quantity,
      CategoryID,
      ProductColor,
      ProductSize,
      ImagePath: imageUrl,
    });

    return res.status(201).json({
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error("Error in createProduct:", error);
    return res.status(500).json({ message: error.message || "Server error" });
  }
};

// Update product image
export const updateProductImage = async (req, res) => {
  try {
    const { productId } = req.params; // product id from URL
    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: "No image uploaded." });
    }

    // Find the product
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    // Delete old image from Cloudinary (optional but clean)
    if (product.ImagePath) {
      try {
        const publicIdMatch = product.ImagePath.match(
          /\/product_images\/([^/.]+)/
        );
        if (publicIdMatch) {
          const publicId = `product_images/${publicIdMatch[1]}`;
          await cloudinary.uploader.destroy(publicId);
        }
      } catch (err) {
        console.warn("Failed to delete old image:", err.message);
      }
    }

    // Cloudinary URL — multer-storage-cloudinary provides secure_url or path
    const imageUrl = req.file.secure_url || req.file.path;
    product.ImagePath = imageUrl;

    await product.save();

    return res.json({
      message: "Product image updated successfully!",
      imageUrl,
      product: product.toJSON(),
    });
  } catch (error) {
    console.error("Error updating product image:", error);
    return res.status(500).json({ message: error.message || "Server error" });
  }
};