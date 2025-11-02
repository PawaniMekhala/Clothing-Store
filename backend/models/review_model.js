import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./user_model.js";

const Review = sequelize.define(
  "Review",
  {
    ReviewID: {
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
    Comment: DataTypes.TEXT,
  },
  {
    tableName: "Review",
    timestamps: false,
    freezeTableName: true,
  }
);

// Relationships
User.hasMany(Review, { foreignKey: "UserID" });
Review.belongsTo(User, { foreignKey: "UserID" });

export default Review;
