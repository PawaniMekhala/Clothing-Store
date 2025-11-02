import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./user_model.js";

const Cart = sequelize.define(
  "Cart",
  {
    CartID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    UserID: {
      type: DataTypes.INTEGER,
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

