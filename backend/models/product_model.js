import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Category from "./category_model.js";

const Product = sequelize.define(
  "Product",
  {
    ProductID: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    ProductName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    Price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    Quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    CategoryID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Category", // Table name
        key: "CategoryID",
      },
    },
    ImagePath: {
      type: DataTypes.STRING,
      allowNull: true, // Cloudinary image URL
    },
    ProductColor: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ProductSize: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "Product",
    timestamps: false,
    freezeTableName: true,
  }
);

// Define relationship here directly
Category.hasMany(Product, { foreignKey: "CategoryID" });
Product.belongsTo(Category, { foreignKey: "CategoryID" });

export default Product;
