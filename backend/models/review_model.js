import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./user_model.js";
import Product from "./product_model.js";

const Review = sequelize.define(
  "Review",
  {
    ReviewID: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    UserID: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: "User",
        key: "UserID",
      },
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
    Rating: {
      type: DataTypes.INTEGER, // 1–5 rating for the website
      allowNull: false,
    },
    Comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "Review",
    timestamps: false,
    freezeTableName: true,
  }
);

// Relationships
User.hasMany(Review, {
  foreignKey: "UserID",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Review.belongsTo(User, {
  foreignKey: "UserID",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Product.hasMany(Review, {
  foreignKey: "ProductID",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Review.belongsTo(Product, {
  foreignKey: "ProductID",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

export default Review;
