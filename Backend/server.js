import express from "express";
import cors from "cors";
import "dotenv/config";

import connectDB from "./config/db.js";
import connectCloudinary from "./config/cloudinary.js";

import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

const app = express();

app.set("trust proxy", 1);

app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://bookara-admin.vercel.app",
      "https://bookara.vercel.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors());

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("API Successfully connected");
});

const PORT = process.env.PORT || 3000;

async function initializeConnection() {
  try {
    await connectDB();
    await connectCloudinary();

    console.log("Cloudinary connected");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect:", error.message);
    process.exit(1);
  }
}

initializeConnection();