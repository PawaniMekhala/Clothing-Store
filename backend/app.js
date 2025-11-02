import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from "./routes/user_routes.js";
import productRoutes from "./routes/product_routes.js";
import tempRoutes from "./routes/temporary_route.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Define the root route
app.get("/", (req, res) => {
  res.send("Welcome to the Clothing Store Backend API");
});
// user routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/temp", tempRoutes);

export default app;
