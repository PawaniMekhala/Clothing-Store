import Cart from "../models/cart_model.js";
import CartItem from "../models/cartItem_model.js";
import Product from "../models/product_model.js";

// Add product to cart
export const addToCart = async (req, res) => {
  try {
    const userId = req.user?.id; // from auth middleware

    // Validate user
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { ProductID, CIQuantity, ProductColor, ProductSize } = req.body;

    // Validate input
    if (!ProductID || !Number.isInteger(CIQuantity) || CIQuantity <= 0) {
      return res.status(400).json({ message: "Invalid product or quantity" });
    }

    // Check if product exists
    const product = await Product.findByPk(ProductID);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    //Check stock availability
    if (product.Quantity < CIQuantity) {
      return res.status(400).json({ message: "Insufficient stock available" });
    }

    // Find or create cart for the user
    let cart = await Cart.findOne({ where: { UserID: userId } });
    if (!cart) {
      cart = await Cart.create({
        UserID: userId,
        CQuantity: 0,
        TotalPrice: 0,
      });
    }

    // Check if product already in cart (with same color & size)
    let cartItem = await CartItem.findOne({
      where: {
        CartID: cart.CartID,
        ProductID: ProductID,
        ProductColor: ProductColor || null,
        ProductSize: ProductSize || null,
      },
    });

    if (cartItem) {
      // Update quantity if already exists
      cartItem.CIQuantity += CIQuantity;
      await cartItem.save();
    } else {
      // Create new cart item
      cartItem = await CartItem.create({
        CartID: cart.CartID,
        ProductID: ProductID,
        CIQuantity,
        ProductColor: ProductColor || null,
        ProductSize: ProductSize || null,
      });
    }

    // Update cart totals
    const cartItems = await CartItem.findAll({
      where: { CartID: cart.CartID },
      include: [{ model: Product }],
    });

    let totalQuantity = 0;
    let totalPrice = 0;

    cartItems.forEach((item) => {
      totalQuantity += item.CIQuantity;
      totalPrice += item.CIQuantity * parseFloat(item.Product.Price);
    });

    cart.CQuantity = totalQuantity;
    cart.TotalPrice = parseFloat(totalPrice.toFixed(2));
    await cart.save();

    return res.status(200).json({
      message: "Product added to cart successfully",
      cart,
      cartItem,
    });
  } catch (error) {
    console.error("Error in addToCart:", error);
    return res.status(500).json({ message: error.message || "Server error" });
  }
};

// View user's cart
export const viewCart = async (req, res) => {
  try {
    const userId = req.user?.id; // assuming auth middleware adds user info
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Find the user's cart
    const cart = await Cart.findOne({
      where: { UserID: userId },
      include: [
        {
          model: CartItem,
          include: [
            {
              model: Product,
              attributes: [
                "ProductID",
                "ProductName",
                "Price",
                "ImagePath",
                "ProductColor",
                "ProductSize",
              ],
            },
          ],
        },
      ],
    });

    // If no cart found, send empty response
    if (!cart) {
      return res.status(200).json({
        message: "Cart is empty",
        cart: { items: [], totalQuantity: 0, totalPrice: 0 },
      });
    }

    // Compute totals dynamically (in case you want fresh totals)
    let totalQuantity = 0;
    let totalPrice = 0;

    cart.CartItems.forEach((item) => {
      totalQuantity += item.CIQuantity;
      totalPrice += item.CIQuantity * parseFloat(item.Product.Price);
    });

    // Return response
    return res.status(200).json({
      message: "Cart retrieved successfully",
      cart: {
        CartID: cart.CartID,
        totalQuantity,
        totalPrice: totalPrice.toFixed(2),
        items: cart.CartItems.map((item) => ({
          CartItemID: item.CartItemID,
          ProductID: item.ProductID,
          ProductName: item.Product.ProductName,
          Price: item.Product.Price,
          Image: item.Product.ImagePath,
          Quantity: item.CIQuantity,
          ProductColor: item.ProductColor,
          ProductSize: item.ProductSize,
          Subtotal: (item.CIQuantity * parseFloat(item.Product.Price)).toFixed(
            2
          ),
        })),
      },
    });
  } catch (error) {
    console.error("Error in viewCart:", error);
    return res.status(500).json({ message: error.message || "Server error" });
  }
};
