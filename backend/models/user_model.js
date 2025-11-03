import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const User = sequelize.define(
  "User",
  {
    UserID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    FirstName: DataTypes.STRING,
    LastName: DataTypes.STRING,
    Email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    Password: DataTypes.STRING,
    Address: DataTypes.STRING,
    Phone: DataTypes.STRING,
    ProfilePicture: DataTypes.STRING,
  },
  {
    tableName: "User",
    timestamps: false,
    freezeTableName: true,
  }
);

export default User;
