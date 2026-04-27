import "dotenv/config";
import app from "./app.js";
import { connectDB } from "./src/config/db.config.js";

import authRoutes from "./src/routes/auth.routes.js";
import productRoutes from "./src/routes/product.route.js";
import cartRoutes from "./src/routes/cart.routes.js";
import orderRoutes from "./src/routes/order.routes.js";
import uploadRoutes from "./src/routes/upload.routes.js";
import contactRoutes from "./src/routes/contact.routes.js";

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
app.use("/contact", contactRoutes);

// ✅ Root route
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});


// ===============================
// ✅ LOCAL SERVER (only local)
// ===============================
if (process.env.VERCEL !== "1") {
  const PORT = process.env.PORT || 5000;

  connectDatabase().then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  });
}


// ===============================
// ✅ VERCEL HANDLER
// ===============================
export default async function handler(req, res) {
  await connectDatabase();
  return app(req, res);
}