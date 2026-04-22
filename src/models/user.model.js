// models/User.js
import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  houseNo: { type: String, required: true }, // House no / Building
  area: { type: String, required: true },    // Road / Colony
  landmark: { type: String },                // Nearby (optional)
  pincode: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
});

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: String,
  password: String,

  // ✅ multiple addresses
  address: [addressSchema],
});

export default mongoose.model("User", userSchema);