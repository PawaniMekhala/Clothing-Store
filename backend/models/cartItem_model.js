import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Cart from "./cart_model.js";
import Product from "./product_model.js";

const CartItem = sequelize.define(
  "CartItem",
  {
    CartItemID: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    CartID: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "Cart",
        key: "CartID",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    ProductID: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "Product",
        key: "ProductID",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
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
Cart.hasMany(CartItem, { foreignKey: "CartID", onDelete: "CASCADE" });
CartItem.belongsTo(Cart, { foreignKey: "CartID" });

Product.hasMany(CartItem, { foreignKey: "ProductID", onDelete: "CASCADE" });
CartItem.belongsTo(Product, { foreignKey: "ProductID" });

export default CartItem;
