import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Cart from "./cart_model.js";
import Product from "./product_model.js";

const CartItem = sequelize.define(
  "CartItem",
  {
    CartItemID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    CartID: {
      type: DataTypes.INTEGER,
      references: {
        model: "Cart",
        key: "CartID",
      },
    },
    ProductID: {
      type: DataTypes.INTEGER,
      references: {
        model: "Product",
        key: "ProductID",
      },
    },
    CIQuantity: DataTypes.INTEGER,
    ProductColor: DataTypes.STRING,
    ProductSize: DataTypes.STRING,
  },
  {
    tableName: "CartItem",
    timestamps: false,
    freezeTableName: true,
  }
);

// Relationships
Cart.hasMany(CartItem, { foreignKey: "CartID" });
CartItem.belongsTo(Cart, { foreignKey: "CartID" });

Product.hasMany(CartItem, { foreignKey: "ProductID" });
CartItem.belongsTo(Product, { foreignKey: "ProductID" });

export default CartItem;
