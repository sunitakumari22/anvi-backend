import app from "./app.js";
import { connectDB } from "./src/config/db.config.js";
import dotenv from "dotenv";

import authRoutes from "./src/routes/auth.routes.js";
import productRoutes from "./src/routes/product.route.js";
import cartRoutes from "./src/routes/cart.routes.js";
import orderRoutes from "./src/routes/order.routes.js";
import uploadRoutes from "./src/routes/upload.routes.js";

dotenv.config();

// ✅ DB connect (serverless safe)
let isConnected = false;

const connectDatabase = async () => {
  if (isConnected) return;
  await connectDB();
  isConnected = true;
};

// ✅ Routes
app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", orderRoutes);
app.use("/upload", uploadRoutes);

// ✅ Root route (IMPORTANT – warna "Cannot GET /")
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// ❌ REMOVE this
// app.listen(5000)

// ✅ Vercel handler
export default async function handler(req, res) {
  await connectDatabase();
  return app(req, res);
}