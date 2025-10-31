import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';



dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// routes

// Define the root route
app.get("/", (req, res) => {
  res.send("Welcome to the Clothing Store Backend API");
});
// app.use('/api/products', productRoutes);

export default app;
