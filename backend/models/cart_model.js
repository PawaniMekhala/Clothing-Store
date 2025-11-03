import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./user_model.js";

const Cart = sequelize.define(
  "Cart",
  {
    CartID: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    UserID: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: "User",
        key: "UserID",
      },
    },
    CQuantity: DataTypes.INTEGER,
    TotalPrice: DataTypes.DECIMAL(10, 2),
  },
  {
    tableName: "Cart",
    timestamps: false,
    freezeTableName: true,
  }
);

// Relationships
User.hasOne(Cart, { foreignKey: "UserID" });
Cart.belongsTo(User, { foreignKey: "UserID" });

export default Cart;
