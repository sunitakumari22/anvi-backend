// models/Product.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  brand: { type: String, default: "Memory Books & Moments" },
  images: [String],
  stock: Number,
});

export default mongoose.model("Product", productSchema);